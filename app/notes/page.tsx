'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useLocale } from '@/contexts/LocaleProvider'
import { useSnackbar } from '@/contexts/SnackbarProvider'
import { useApi } from '@/contexts/ApiProvider'
import { useModal } from '@/contexts/ModalProvider'

import UButton from '@/components/UButton'
import UPopover from '@/components/UPopover'

import { Note } from '@/@types/note.d'

export default function NotesPage () {
  const router = useRouter()
  const { locale } = useLocale()
  const { snackbar } = useSnackbar()
  const { modal } = useModal()
  const { getAllNote, addNote, removeNote } = useApi()
  
  const [notes, setNotes] = React.useState<Note[]>([])
  
  const goToDetailNote = async (id?: string) => {
    if (id) return router.push(`/notes/${id}`)
    
    const { data, err, errParams } = await addNote()
    
    if (err) {
      snackbar.error(locale(err, errParams))
      
      if (err === 'Please login again') router.push('/login')
      
      return
    }
    
    snackbar.success(locale('$1 is added', ['Notes']))
    
    router.push(`/notes/${data?.id}?isNew=true`)
  }
  
  const onRemoveNote = async (id: string, title: string) => {
    const { err, errParams } = await removeNote(id)
    
    if (err) {
      snackbar.error(locale(err, errParams))
      
      if (err === 'Please login again') router.push('/login')
      
      return
    }
  
    snackbar.success(locale(`$1 is removed`, ['Notes']))
    
    loadNotes()
  }
  
  const loadNotes = async () => {
    const { data, err, errParams } = await getAllNote()

    if (err) {
      snackbar.error(locale(err, errParams))
      
      if (err === 'Please login again') router.push('/login')
    }
    
    setNotes(data || [])
  }
  
  const onConfirmRemove = (e: React.SyntheticEvent, id: string, title: string) => {
    e.stopPropagation()
  
    modal.open({
      content: (
        <p className="break-all">Apakah yakin ingin hapus {title}?</p>
      ),
      actions: [
          <UButton type="solid" color="accent" onClick={async () => {
            await onRemoveNote(id, title)
            
            modal.close()
          }}>Ya</UButton>,
          <UButton type="outlined" color="accent" onClick={modal.close} style="ml-2">Tidak</UButton>
      ]
    })
  }
  
  const items = (id, title) => [
    <UButton type="link" color="accent" onClick={(e) => onConfirmRemove(e, id, title)}>Hapus</UButton>
  ]
  
  React.useEffect(() => {
    loadNotes()
  }, [])
  
  return (
    <div className="grid grid-cols-2 gap-3 content-start min-h-full p-5 bg-qoyyid-main">
      <UButton type="outlined" color="accent" style="aspect-square" icon="add-70" onClick={() => goToDetailNote()} />
      {
        notes.map((note: Note) => (
          <div key={note.id}>
            <div className="relative h-70 p-3 aspect-square bg-qoyyid-secondary" onClick={() => goToDetailNote(note.id)} dir="auto"><p className="line-clamp-5">{note.content}</p></div>
            <div className="flex items-center h-12">
              <p className="flex-1 min-w-0 line-clamp-2 break-words text-center" dir="auto">{note.title || locale('Untitled')}</p>
              <UPopover color="main" items={items(note.id, note.title || locale('Untitled'))} style="flex-none">
                <UButton type="link" color="accent" icon="more"/>
              </UPopover>
            </div>
          </div>
        ))
      }
    </div>
  )
}