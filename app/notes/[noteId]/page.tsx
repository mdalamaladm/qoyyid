'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useLocale } from '@/contexts/LocaleProvider'
import { useSnackbar } from '@/contexts/SnackbarProvider'
import { useApi } from '@/contexts/ApiProvider'
import { useForm } from '@/contexts/FormProvider'

import NoteWriteMode from '@/components/NoteWriteMode'
import NoteReadMode from '@/components/NoteReadMode'
import UButton from '@/components/UButton'

import { FormValue } from '@/@types/form.d'
import { Word } from '@/@types/word.d'

import diff from '@/utils/diff'
import Markdown from '@/utils/markdown/v1'
import objToClassName from '@/utils/objToClassName'
import { MarkdownNode } from '@/@types/markdown'

let dblClickTimer = null
let dblClick: { id?: string, time?: number } = {}

type DetailNotesParams = {
  noteId: string;
}

type DetailNotesNoteButtonParams = {
  state: string;
  setState: () => void;
  selected: Word[];
  onClickPreview: () => void;
  onClickChanges: () => void;
}

const PreviewButton = ({ state, setState, onClickPreview, onClickChanges }) => (
  <div className="flex mr-3">
    <UButton type="solidinv" color="accent" icon="edit" style="rounded-r-none" disabled={state !== 'preview' && state !== 'changes'} onClick={() => setState('write')} />
    <UButton type="solidinv" color="accent" icon="preview" style="rounded-none" disabled={state === 'preview'} onClick={onClickPreview} />
    <UButton type="solidinv" color="accent" icon="difference" style="rounded-l-none" disabled={state === 'changes'} onClick={onClickChanges} />
  </div>
)

const NoteButton = ({ state, setState, selected, onClickPreview, onClickChanges }) => {
  if (state === 'write' || state === 'preview' || state === 'changes') return (
    <div className="flex">
      <PreviewButton state={state} setState={setState} onClickPreview={onClickPreview} onClickChanges={onClickChanges} />
      <UButton key="save-note" type="link" color="accent" icon="save" submit="note-form" />
    </div>
  )
  else return (
    <UButton key="edit-note" type="link" color="accent" icon="edit" onClick={() => setState('write')} disabled={selected.length > 0} />
    )
  }

const NoteContent = ({ state, title, preview, changes, noteWriteModeProps, noteReadModeProps }) => {
  if (state === 'preview') return <div>
    <h1 className="px-2 pt-4 mb-[2.65rem] text-3xl text-center break-words select-none">{title}</h1>
    <div className="markdown mx-4 text-lg" dir="auto">{preview}</div>
  </div>
  else if (state === 'changes') return <div>
    <h1 className="px-2 pt-4 mb-[2.65rem] text-3xl text-center break-words select-none">{title}</h1>
    <div className="markdown mx-4 text-lg" dir="auto">{changes}</div>
  </div>
  else if (state === 'write') return (
     <NoteWriteMode
      props={noteWriteModeProps}
    />
  )
  else return (
    <NoteReadMode
      props={noteReadModeProps}
    />
  )
}

export default function DetailNotesPage ({ params }: { params: DetailNotesParams }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isNew = searchParams.get('isNew') === 'true'
  
  const [state, setState] = React.useState<'read' | 'write'>('read')
  const [title, setTitle] = React.useState<string>('')
  const [content, setContent] = React.useState<string>('')
  const [oldContent, setOldContent] = React.useState<string>('')
  const [contentRendered, setContentRendered] = React.useState<object>(<></>)
  const [contentAst, setContentAst] = React.useState<MarkdownNode[] | null>(null)
  const [words, setWords] = React.useState<Word[]>([])
  const [selected, setSelected] = React.useState<Word[]>([])
  const [multitextMode, setMultitextMode] = React.useState<boolean>(false)
  const [subnoteState, setSubnoteState] = React.useState<'read' | 'write'>('read')
  const [subnote, setSubnote] = React.useState<string>('')
  const [subnoteId, setSubnoteId] = React.useState<string>('')
  const [orders, setOrders] = React.useState<Word[]>([])
  const [subnotePage, setSubnotePage] = React.useState<number>(0)
  const [currentWordIds, setCurrentWordIds] = React.useState<string[]>([])
  const [currentText, setCurrentText] = React.useState<string>('')
  const [preview, setPreview] = React.useState<string>('')
  const [changes, setChanges] = React.useState<string>('')

  const { locale } = useLocale()
  const { snackbar } = useSnackbar()
  const { getNote, editNote, getSubnote, addSubnote, editSubnote, getSubnoteOrder } = useApi()
  const { formValue, initForm } = useForm()
  
  const strip = (value: string) => value?.replace(/<div>|<br>/g, '\n')?.replace(/<\/div>/g, '')
  
  const getWords = (
    { content, ast, idGtr }:
    {
      content: string;
      ast: MarkdownNode[];
      idGtr: any;
    }
  ) => {
    type DiffInput = string | {
      value: string;
      meta: object;
    }

    const extractWord = (tc: MarkdownNode, res: DiffInput[]) => {
      if (tc.type === 'TEXT') {
        if (tc.isWord) return res.push(idGtr ? { value: tc.value, meta: { id: idGtr.next().value }} : tc.value)
        else return res.push('IGNORE')
      } else {
        tc.value?.forEach(tcv => extractWord(tcv, res))
      }
    }
      
    const mapWords = (node: MarkdownNode) => {
      let res: DiffInput[] = []
  
      if (node.type === 'PARAGRAPH') {
        node.children.forEach(tc => {
          extractWord(tc, res)
        })
      } else if (node.type === 'UNORDERED_LIST') {
        node.children.forEach(tc => {
          tc.sentences.forEach(tcs => {
            extractWord(tcs, res)
          })
        })
      }
      
      return res.filter(r => r !== 'IGNORE')
    }
  
    const node = ast || Markdown.parse(content)
    
    return node?.children.reduce((result, current, index) => {
      if (index !== 0) result.push(`[[BREAK_${index}_${current.type}]]`)
      
      return [...result, ...mapWords(current, index)]
      
      return result
    }, []) || []
  }

  const loadNote = async () => {
    const noteId = (await params).noteId
    
    const { data, err, errParams } = await getNote(noteId)
    
    loadSubnoteOrder()
    
    if (err) {
      snackbar.error(locale(err, errParams))
      
      if (err === 'Please login again') router.push('/login')
    }
    
    if (!data) return
    
    setTitle(data.note?.title)
    setContent(data.note?.content)
    setOldContent(data.note?.content)
    setWords(data.words)
  
    initForm({
      value: {
        title: data.note?.title,
        content: data.note?.content,
      },
      rules: {
        title: [],
        content: [],
      }
    })
  }
  
  const loadSubnote = async () => {
    const noteId = (await params).noteId
    const wordIds = currentWordIds
      
    const { data, err, errParams } = await getSubnote(noteId, wordIds)
    
    if (err) {
      snackbar.error(locale(err, errParams))
      
      if (err === 'Please login again') router.push('/login')
    }
    
    if (!data) {
      setSubnote('')
      setSubnoteId('')
      
      initForm({
        value: {
          text: '',
        },
        rules: {
          text: [],
        }
      })
      
      return
    }
    
    setSubnote(data.text)
    setSubnoteId(data.id)
    
    initForm({
      value: {
        text: data.text,
      },
      rules: {
        text: [],
      }
    })
  }
  
  const loadSubnoteOrder = async () => {
    const noteId = (await params).noteId
    
    const { data, err, errParams: errParams } = await getSubnoteOrder(noteId)
    
    if (err) {
      snackbar.error(locale(err, errParams))
      
      if (err === 'Please login again') router.push('/login')
    }
    
    if (!data) return
    
    setOrders(data)
  }

  const backToNotes = () => router.push('/notes')
  
  const onSaveNote = async (payload: FormValue) => {
    const id = (await params).noteId
    
    const idGtr = (function* () { for (const word of words) yield word.id })()
    
    const oldWords = getWords({ ast: contentAst, idGtr })
    
    payload.content = strip(payload.content)
    
    const currentWords = getWords({ content: payload.content })

    let diffRes = diff(oldWords, currentWords)
    
    // diffRes = diffRes.filter(d => !d.old.includes('[[BREAK') && !d.current.includes('[[BREAK'))
    
    payload.words = diffRes
  
    const { err, errParams } = await editNote(id, payload)
    
    if (err) {
      snackbar.error(locale(err, errParams))
      
      if (err === 'Please login again') router.push('/login')
    }
    
    snackbar.success(locale('$1 is saved', ['Notes']))
    
    setState('read')
    
    loadNote()
  }
  
  const onClickPreview = () => {
    const preview = Markdown.generate({
      markdown: strip(formValue.content),
      render: renderMarkdown()
    })

    setPreview(preview)
    
    setState('preview')
  }
  
  const onClickChanges = () => {
    function* diffGenerator (diffRes): Generator<object> {
      for (const d of diffRes) {
        const current = d.current?.text || d.current
        const old = d.old?.text || d.old

        if (!current.includes('[[BREAK') && !old.includes('[[BREAK')) yield d
      }
    }
    
    const oldWords = getWords({ ast: contentAst })
    
    const currentWords = getWords({ content: strip(formValue.content) })

    const diffRes = diff(oldWords, currentWords)
    
    const diffGtr = () => diffGenerator(diffRes)
    
    const changes = Markdown.generate({
      markdown: strip(formValue.content),
      render: renderMarkdown({ diffGtr })
    })

    setChanges(changes)
    
    setState('changes')
  }

  const onSaveSubnote = async (payload: FormValue) => {
    const noteId = (await params).noteId
    const wordIds = [...selected].map(w => w.id)
    
    let err = null
    let errParams = []
    
    payload = { ...payload, textId: subnoteId, wordIds }
    
    if (!subnote) {
      const res = await addSubnote(noteId, payload as { text: string, textId: string, wordIds: string[] })
      
      err = res.err
      errParams = res.errParams
    } else {
      const res = await editSubnote(noteId, payload as { text: string, textId: string, wordIds: string[] })
      
      err = res.err
      errParams = res.errParams
    }
    
    if (err) {
      snackbar.error(locale(err, errParams))
      
      if (err === 'Please login again') router.push('/login')
    }
    
    snackbar.success(locale('$1 is saved', ['Subnotes']))
    
    setSubnoteState('read')
    
    loadSubnote()
    loadSubnoteOrder()
  }
  
  const onChangeSubnotePage = (direction: 1 | -1) => {
    if (orders.length < 1) return
    
    let current = subnotePage + direction
    
    if (current < 0) current = orders.length - 1
    else if (current > orders.length - 1) current = 0
    
    const currentOrder = orders[current]
    
    setSubnotePage(current)
    setCurrentWordIds(currentOrder.wordIds)
    
    setSelected(currentOrder.selected)
  }
  
  const onSelectText = ({ id, text, sequence }: Word) => {
    dblClickTimer = setTimeout(() => dblClick = {}, 500)

    const now = Date.now()
    const isBelow500 = now - dblClick?.time! < 500
    const isSameText = id === dblClick?.id
    const isDoubleClick = isSameText && isBelow500
    
    dblClick = {
      id,
      time: now
    }
  
    if (isDoubleClick) {
      if (multitextMode) {
        setMultitextMode(false)
      } else {
        clearTimeout(dblClickTimer)
        setMultitextMode(true)
      }

      setSelected([{ id, text, sequence }])
      
      return
    }
    
    if (multitextMode || isDoubleClick) {
      const alreadySelected = selected.find(s => s.id === id)
  
      if (alreadySelected && selected.length > 1) {
        if (multitextMode) {
          const filtered = selected.filter(s => s.id !== id)
          
          setSelected(filtered)
        }
      } else if (!alreadySelected) {
        const newSelected = [...selected, { id, text, sequence }]
        newSelected.sort((a, b) => a.sequence - b.sequence)
        setSelected(newSelected)
      }
    }
    else setSelected([{ id, text, sequence }])
  }
  
  const onEditSubnote = () => setSubnoteState('write')
  
  const onCloseSubnote = () => {
    setSelected([])
    setMultitextMode(false)
    setSubnoteState('read')
    
    loadNote()
  }
  
  React.useEffect(() => {
    if (isNew) setState('write')
  }, [])
  
  React.useEffect(() => {
    const wordIds = [...selected].map(s => s.id)

    setCurrentWordIds(wordIds)
    
    const currentPage = orders.findIndex(o => o.wordIds.length === wordIds.length && wordIds.every(w => o.wordIds.includes(w)))
    const currentText = selected.map(s => s.text).join(' ')
    
    setSubnotePage(currentPage)
    setCurrentText(currentText)
  }, [selected])
  
  React.useEffect(() => {
    if (currentWordIds.length > 0) loadSubnote()
    
    function* readGenerator (): Generator<object> {
      for (const word of words) yield word
    }
    
    const readGtr = readGenerator()
    
    setContentRendered(Markdown.generate({ ast: contentAst,
      render: renderMarkdown({ readGtr })
    }))
  }, [currentWordIds])
  
  
  const renderMarkdown = (
    { diffGtr, readGtr } = {}
  ) => {
    let currentDiffGtr = diffGtr ? diffGtr() : null
    let step = 0
    
    function prev () {
      currentDiffGtr = diffGtr()
      
      step--
      
      for (let i = 1; i <= step; i++) currentDiffGtr.next()
    }

    function getUniqueChildren (children: React.ReactElement[]) {
      return children?.map((c, i) => <React.Fragment key={i}>{c}</React.Fragment>) || children
    }
  
    return {
      body: (children: React.ReactElement[]) => <React.Fragment>{getUniqueChildren(children)}</React.Fragment>,
      paragraph: (children: React.ReactElement[]) => <p>{getUniqueChildren(children)}</p>,
      unorderedList: (children: React.ReactElement[]) => <ul>{getUniqueChildren(children)}</ul>,
      newLine: () => <br/>,
      list: (children: React.ReactElement[]) => <li>{getUniqueChildren(children)}</li>,
      bold: (children: React.ReactElement[]) => <b>{getUniqueChildren(children)}</b>,
      italic: (children: React.ReactElement[]) => <i>{getUniqueChildren(children)}</i>,
      text: (
        { children, isWord, textIndex, parentType }:
        {
          children: React.ReactElement;
          isWord: boolean;
          textIndex: number;
          parentType: string;
        }
      ) => {
        if (!isWord) return <span>{children}</span>
    
        let texts: React.ReactElement[] = []
        
        if (currentDiffGtr) {
          let value = currentDiffGtr?.next().value
          
          step++
  
          let old = value?.old?.text || value?.old
          let current = value?.current?.text || value?.current
          let action = value?.action
          
          if (textIndex === 0) {
            if (action === 'DELETE') {
              while (action === 'DELETE') {
                texts.push(<><span className="bg-red-500 text-white">{old}</span><span>&nbsp;</span></>)
                
                value = currentDiffGtr?.next().value
                
                step++
    
                old = value?.old?.text || value?.old
                current = value?.current?.text || value?.current
                action = value?.action
              }
            }
          }
          
          if (action === 'INSERT') texts.push(<span className="bg-green-500 text-white">{current}</span>)
          else if (action === 'ALTER') texts.push(<span><span className="bg-red-500 text-white">{old}</span><span className="bg-green-500 text-white">{current}</span></span>)
          else texts.push(<span>{current || children}</span>)
          
          value = currentDiffGtr?.next().value
              
          step++

          old = value?.old?.text || value?.old
          current = value?.current?.text || value?.current
          action = value?.action
          
          if (action === 'DELETE') {
            while (action === 'DELETE') {
              texts.push(<><span>&nbsp;</span><span className="bg-red-500 text-white">{old}</span></>)
              
              value = currentDiffGtr?.next().value
              
              step++
  
              old = value?.old?.text || value?.old
              current = value?.current?.text || value?.current
              action = value?.action
            }
          }
          
          prev()
        } else if (readGtr) {
          const word = readGtr.next().value
          texts.push(
            <span
            key={word.id}
            className={objToClassName({
                'px-[2.2px]': true,
                'bg-qoyyid-main': currentWordIds.includes(word.id),
                'text-qoyyid-accent': currentWordIds.includes(word.id),
                'select-none': true,
                'text-lg': true,
              })}
              onClick={() => onSelectText(word)}
            >{children}</span>
          )
        }
        else texts = [children]
        
        return (
          <span>
            {
              texts.map((text, index) => <React.Fragment key={index}>{text}</React.Fragment>)
            }
          </span>
        )
      },
    }
  }
  
  React.useEffect(() => {
    function* readGenerator (): Generator<object> {
      for (const word of words) yield word
    }
    
    const readGtr = readGenerator()
    
    const ast = Markdown.parse(content)
    setContentAst(ast)
    
    setContentRendered(Markdown.generate({ ast,
      render: renderMarkdown({ readGtr })
    }))
  }, [content])
  
  React.useEffect(() => {
    loadNote()
  }, [])
  
  return (
    <div className="flex flex-col min-h-full bg-qoyyid-secondary">
      {JSON.stringify(strip(formValue?.content))}
      <div className="flex-none flex items-center justify-between py-2 pl-1 pr-3">
        <UButton type="link" color="accent" icon="chevronLeft-40" onClick={() => backToNotes()} />
        <NoteButton state={state} setState={setState} selected={selected} onClickPreview={onClickPreview} onClickChanges={onClickChanges} />
      </div>
      <NoteContent
        state={state}
        title={formValue?.title || title}
        preview={preview}
        changes={changes}
        noteWriteModeProps={{
          onSaveNote
        }}
        noteReadModeProps={{
          title,
          contentRendered,
          selected,
          subnoteState,
          multitextMode,
          onChangeSubnotePage,
          onSelectText,
          onCloseSubnote,
          onEditSubnote,
          subnoteWriteProps: {
            text: currentText,
            onSaveSubnote,
          },
          subnoteReadProps: {
            subnote
          }
        }}
      />
    </div>
  )
}
