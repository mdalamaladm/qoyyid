import React from 'react'

import { useForm } from '@/contexts/FormProvider'

import UInputWrapper from '@/components/UInputWrapper'

import UClass from '@/utils/UClass'

type UInputTextareaProps = {
  label?: string;
  name: string;
  block: string;
  hideMessage?: boolean;
  labelStyle: string;
  inputStyle: string;
  placeholder: (string) => string
};

const id = `uinputtextarea-${Date.now()}`

export default function UInputTextarea({ label, name, block, hideMessage, labelStyle, inputStyle, placeholder = () => '', ...props }: UInputTextareaProps) {
  const textareaRef = React.useRef(null)
  
  const { getInput, setForm } = useForm()
  
  const { value, message, error } = getInput(name)
  
  const handlerInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm(name, e.target.value)
  }
  
  React.useEffect(() => {
    textareaRef.current.setAttribute("style", "height:" + (textareaRef.current.scrollHeight) + "px;overflow-y:hidden;");
    textareaRef.current.addEventListener("input", onInput, false);

    function onInput() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + "px";
    }
    
    () => {
      textareaRef.current.removeEventListener('input', onInput)
    }
  }, [textareaRef])
  
  return (
    <UInputWrapper message={message} hideMessage={hideMessage} error={error}>
      <label htmlFor={id} className={labelStyle || UClass.label(error && !hideMessage)}>{label}</label>
      <textarea ref={textareaRef} id={id} value={value} name={name} onChange={handlerInput} className={inputStyle || UClass.input(error && !hideMessage, block)} dir="auto" placeholder={placeholder(value)} {...props} />
    </UInputWrapper>
  )
}