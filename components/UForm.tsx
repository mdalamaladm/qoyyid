import React from 'react'

import { useForm } from '@/contexts/FormProvider'

import { FormValue } from '@/@types/form.d'

export default function UForm ({ children, id,  onSubmit }: { children: React.ReactNode, id?: string,  onSubmit: (formValue: FormValue) => void }) {
  const { formValue, formErrorAll } = useForm()
  
  const handlerSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    
    if (formErrorAll) return
    
    onSubmit(formValue)
  }
  
  return (
    <form id={id} onSubmit={handlerSubmit}>
      {children}
    </form>
  )
}