import React from 'react'

import { useForm } from '@/contexts/FormProvider'

import UInputWrapper from '@/components/UInputWrapper'

import UClass from '@/utils/UClass'

type UInputPasswordProps = {
  label?: string;
  name: string;
  block: boolean;
  hideMessage?: boolean;
  labelStyle: string;
  inputStyle: string;
};


export default function UInputPassword({ label, name, block, hideMessage, labelStyle, inputStyle }: UInputPasswordProps) {
  const id = `uinputpassword-${name}`
  
  const { getInput, setForm } = useForm()
  
  const { value, message, error } = getInput(name)
  
  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(name, e.target.value)
  }
  
  return (
    <UInputWrapper message={message} hideMessage={hideMessage} error={error}>
      <label htmlFor={id} className={labelStyle || UClass.label(error && !hideMessage)}>{label}</label>
      <input id={id} value={value || ''} type="password" name={name} onInput={handlerInput} className={inputStyle || UClass.input(error && !hideMessage, block)}/>
    </UInputWrapper>
  )
}