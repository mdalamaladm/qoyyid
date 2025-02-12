import React from 'react'

import { useForm } from '@/contexts/FormProvider'

import UInputWrapper from '@/components/UInputWrapper'

import UClass from '@/utils/UClass'

type UInputTextProps = {
  label?: string;
  name: string;
  block: boolean;
  hideMessage?: boolean;
  labelStyle: string;
  inputStyle: string;
};

const id = `uinputtext-${name}`

export default function UInputText({ label, name, block, hideMessage, labelStyle, inputStyle }: UInputTextProps) {
  
  const { getInput, setForm } = useForm()
  
  const { value, message, error } = getInput(name)
  
  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(name, e.target.value)
  }
  
  return (
    <UInputWrapper message={message} hideMessage={hideMessage} error={error}>
      <label htmlFor={id} className={labelStyle || UClass.label(error && !hideMessage)}>{label}</label>
      <input id={id} value={value} type="text" name={name} onInput={handlerInput} className={inputStyle || UClass.input(error && !hideMessage, block)} dir="auto"/>
    </UInputWrapper>
  )
}