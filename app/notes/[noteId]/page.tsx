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

import { Note } from '@/@types/note.d'
import { FormValue } from '@/@types/form.d'
import { Word } from '@/@types/word.d'

import diff from '@/utils/diff'
import Markdown from '@/utils/markdown/v1'

let dblClickTimer = null
let dblClick: { id?: string, time?: number } = {}


type DetailNotesParams = {
  noteId: string;
}

const renderMarkdown = {
  body: (children) => <>{children}</>,
  paragraph: (children) => <p>{children}</p>,
  unorderedList: (children) => <ul>{children}</ul>,
  newLine: (children) => <br/>,
  list: (children) => <li>{children}</li>,
  bold: (children) => <b>{children}</b>,
  italic: (children) => <i>{children}</i>,
  text: (children, isWord) => <span className="word">{children}</span>,
}

const PreviewButton = ({ state, setState, onClickPreview }) => (
  <div class="flex mr-3">
    <UButton type="solid" color="accent" style="rounded-r-none" disabled={state !== 'preview'} onClick={() => setState('write')}>Text</UButton>
    <UButton type="solid" color="accent" style="rounded-l-none" disabled={state === 'preview'} onClick={onClickPreview}>Preview</UButton>
  </div>
)

const NoteButton = ({ state, setState, selected, onClickPreview }) => {
  if (state === 'write' || state === 'preview') return (
    <div className="flex">
      <PreviewButton state={state} setState={setState} onClickPreview={onClickPreview} />
      <UButton key="save-note" type="link" color="accent" icon="save" submit="note-form" />
    </div>
  )
  else return (
    <UButton key="edit-note" type="link" color="accent" icon="edit" onClick={() => setState('write')} disabled={selected.length > 0} />
    )
  }

const NoteContent = ({ state, title, preview, noteWriteModeProps, noteReadModeProps }) => {
  if (state === 'preview') return <div>
    <h1 className="px-2 pt-2 mb-[2.65rem] text-3xl text-center break-words select-none">{title}</h1>
    <div className="markdown px-1.5">{preview}</div>
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
  const [words, setWords] = React.useState<Word[]>([])
  const [selected, setSelected] = React.useState<Content[]>([])
  const [multitextMode, setMultitextMode] = React.useState<boolean>(false)
  const [subnoteState, setSubnoteState] = React.useState<'read' | 'write'>('read')
  const [subnote, setSubnote] = React.useState<string>('')
  const [orders, setOrders] = React.useState<Word[]>([])
  const [subnotePage, setSubnotePage] = React.useState<number | null>(null)
  const [currentWordId, setCurrentWordId] = React.useState<string>('')
  const [currentText, setCurrentText] = React.useState<string>('')
  const [preview, setPreview] = React.useState<string>('')

  const { locale } = useLocale()
  const { snackbar } = useSnackbar()
  const { getNote, editNote, getSubnote, addSubnote, editSubnote, getSubnoteOrder } = useApi()
  const { formValue, initForm } = useForm()
  
  const backToNotes = () => router.push('/notes')
  
  const onSaveNote = async (payload: FormValue) => {
    const id = params.noteId
    
    const oldWords = words.map(c => ({ text: c.text, meta: { id: c.id } }))

    // payload.words = diff(oldWords, payload.words.trim().split(/\s{1,}|\t/g))
  
    const { err, errParams } = await editNote(id, payload)
    
    if (err) {
      snackbar.error(locale(err, errParams))
      
      if (err === 'Please login again') router.push('/login')
    }
    
    snackbar.success(locale('$1 is saved', ['Notes']))
    
    setState('read')
    
    loadNote()
  }

  const onSaveSubnote = async (payload: FormValue) => {
    const noteId = params.noteId
    const wordId = params.noteId + '|' + [...selected].sort((a, b) => a?.sequence! - b?.sequence!).map(s => s.sequence).join('')
    
    let err = null
    let errParams = []
    
    if (!subnote) {
      const res = await addSubnote(noteId, wordId, payload as { text: string })
      
      err = res.err
      errParams = res.errParams
    } else {
      const res = await editSubnote(noteId, wordId, payload as { text: string })
      
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
  }
  
  const loadNote = async () => {
    const noteId = params.noteId
    
    const { data, err, errParams } = await getNote(noteId)
    
    const { data: orders, err: errOrder, errParams: errOrderParams } = await getSubnoteOrder(noteId)
    
    if (err || errOrder) {
      snackbar.error(locale(err || errOrder, errParams || errOrderParams))
      
      if ((err || errOrder ) === 'Please login again') router.push('/login')
    }
    
    if (!data) return
    
    setTitle(data.note?.title)
    setContent(data.note?.content)
    setOldContent(data.note?.content)
    setContentRendered(Markdown.generate(data.note?.content, renderMarkdown))
    setWords(data.words)
    setOrders(orders)
  
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
    const noteId = params.noteId
    const wordId = currentWordId
      
    const { data, err, errParams } = await getSubnote(noteId, wordId)
    
    if (err) {
      snackbar.error(locale(err, errParams))
      
      if (err === 'Please login again') router.push('/login')
    }
    
    if (!data) {
      setSubnote('')
      
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
    
    initForm({
      value: {
        text: data.text,
      },
      rules: {
        text: [],
      }
    })
  }
  
  const onChangeSubnotePage = (direction) => {
    let current = subnotePage + direction
    
    if (current < 0) current = orders.length - 1
    else if (current > orders.length - 1) current = 0
    
    setSubnotePage(current)
    
    const currentSelected = orders[current]
    
    setCurrentWordId(currentSelected.word_id)
    
    const currentSelectedArr = currentSelected.word_id.split('|').map((ci) => {
      const current = words.find((c) => c.id === ci)
      
      return { id: current.id, text: current.text, sequence: current.sequence }
    })
    
    setSelected(currentSelectedArr)
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
        setSelected([{ id, text, sequence }])
        setMultitextMode(false)
      } else {
        clearTimeout(dblClickTimer)
        setMultitextMode(true)
      }
      
      return
    }
    
    if (multitextMode || isDoubleClick) {
      const alreadySelected = selected.find(s => s.id === id)

      if (alreadySelected && selected.length > 1) {
        if (multitextMode) {
          const filtered = selected.filter((s: Word) => s.id !== id)
          
          setSelected(filtered)
        }
      } else if (!alreadySelected) {
        setSelected([...selected, { id, text, sequence }])
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
  const [test, setTest] = React.useState<string>('')
  const onClickPreview = () => {
    const preview = Markdown.generate(formValue.content, renderMarkdown)
    setPreview(preview)
    
    function extractWord (tc, res) {
      if (tc.type === 'TEXT') {
        if (tc.isWord) return res.push(tc.value)
        else return res.push('IGNORE')
      } else {
        tc.value?.forEach(tcv => extractWord(tcv, res))
      }
    }
    
    function mapWords (t, index, isOld) {
      let res = []

      if (t.type === 'PARAGRAPH') {
        t.children.forEach(tc => {
          extractWord(tc, res)
        })
      } else if (t.type === 'UNORDERED_LIST') {
        t.children.forEach(tc => {
          tc.sentences.forEach(tcs => {
            extractWord(tcs, res)
          })
        })
      }
      
      res = res.filter(r => r !== 'IGNORE')
      
      return { value: t.type,
      meta: { [isOld ? 'oldWords' : 'words']: res  }
        
      }
    }
    
    const token = Markdown.parse(formValue.content)
    const tokenParent = token.children.map((t, index) => mapWords(t, index, false))

    const oldToken = Markdown.parse(oldContent)
    const oldTokenParent = oldToken?.children.map((t, index) => mapWords(t, index, true)) || []
    
    alert('DIFF PARENT')
    const diffParent = diff(oldTokenParent, tokenParent)
    
    // alert(JSON.stringify(diffParent
    // //.map(d => ({ action: d.action }))
    // ))
    
    diffParent.forEach((d) => {
      if (d.action === 'NONE') {
        alert(JSON.stringify(d.meta.oldWords.join(' ')))
        alert(JSON.stringify(d.meta.words.join(' ')))
        const resDiff = diff(d.meta.oldWords, d.meta.words)
        
        // alert(JSON.stringify(d.meta.oldWords))
        // alert(JSON.stringify(d.meta.words))
        // alert(JSON.stringify(d.meta.words) === JSON.stringify(d.meta.oldWords))
        alert(JSON.stringify(resDiff))
        alert('≈=======')
      }
    })
    
    
    setState('preview')
  }
  
  React.useEffect(() => {
    if (isNew) setState('write')
  }, [])
  
  React.useEffect(() => {
    loadNote()
  }, [])
  
  React.useEffect(() => {
    loadSubnote()
  }, [currentWordId])
  
  React.useEffect(() => {
    const wordId = params.noteId + '|' + [...selected].sort((a, b) => a?.sequence! - b?.sequence!).map(s => s.sequence).join('')

    setCurrentWordId(wordId)
    
    const currentPage = orders.findIndex(o => o.word_id === wordId)
    const currentText = selected.map(s => s.text).join(' ')
    
    setSubnotePage(currentPage)
    setCurrentText(currentText)
  }, [selected])
  
  return (
    <div className="flex flex-col min-h-full bg-qoyyid-secondary px-3">
      <div className="flex-none flex items-center justify-between py-2 pl-1 pr-3">
        <UButton type="link" color="accent" icon="chevronLeft-40" onClick={() => backToNotes()} />
        <NoteButton state={state} setState={setState} selected={selected} onClickPreview={onClickPreview} />
      </div>
      <p>{JSON.stringify(test)}</p>
      <NoteContent
        state={state}
        title={title}
        preview={preview}
        noteWriteModeProps={{
          onSaveNote
        }}
        noteReadModeProps={{
          title,
          contentRendered,
          words,
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
