import UForm from '@/components/UForm'
import UInputTextarea from '@/components/UInputTextarea'

import { useLocale } from '@/contexts/LocaleProvider'

import { Note } from '@/@types/note.d'

export default function NoteWriteMode ({ props: { onSaveNote } }: { props: { onSaveNote: (payload: Note) => void } }) {
  const { locale } = useLocale()
  
  return (
    <div className="h-full p-2">
      <UForm id="note-form" onSubmit={onSaveNote}>
        <UInputTextarea name="title" inputStyle="w-full bg-transparent border-none text-3xl text-center text-black focus:outline-none" hideMessage placeholder={(value) => locale('Untitled')} />
        <UInputTextarea name="content" inputStyle="w-full px-1.5 mx-3 bg-transparent border-none text-lg text-black focus:outline-none" hideMessage />
      </UForm>
    </div>
  )
}