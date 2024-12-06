import UForm from '@/components/UForm'
import UInputTextarea from '@/components/UInputTextarea'

import { Subnote } from '@/@types/subnote.d'

export default function SubnoteWriteMode ({ props: { text, onSaveSubnote } }: { props: { text: string, onSaveSubnote: (payload: Subnote) => void } }) {
  return (
    <UForm id="subnote-form" onSubmit={onSaveSubnote}>
      <div className="p-3 mb-3 text-xl bg-qoyyid-secondary text-qoyyid-black font-bold" dir="auto">{text}</div>
      <UInputTextarea name="text" inputStyle="w-full bg-transparent border-none text-lg text-black focus:outline-none" autoFocus />
    </UForm>
  )
}