import React from 'react'

import { useForm } from '@/contexts/FormProvider'

import UInputWrapper from '@/components/UInputWrapper'

import UClass from '@/utils/UClass'

type UInputDivEditableProps = {
  label?: string;
  name: string;
  block: string;
  hideMessage?: boolean;
  labelStyle: string;
  inputStyle: string;
  placeholder: (string) => string
};

const id = `uinputdieditable-${name}`

export default function UInputDivEditable({ label, name, block, hideMessage, labelStyle, inputStyle, placeholder = () => '', ...props }: UInputTextareaProps) {
  const divEditableRef = React.useRef(null)
  
  const { getInput, setForm } = useForm()
  
  const { value, message, error } = getInput(name)
  
  const handlerInput = (e) => {
    setForm(name, e.currentTarget.innerHTML)
  }
  
  React.useEffect(() => {
    divEditableRef.current.setAttribute("style", "height:" + (divEditableRef.current.scrollHeight) + "px;overflow-y:hidden;");
    divEditableRef.current.addEventListener("input", onInput, false);

    function onInput() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + "px";
    }
    
    () => {
      divEditableRef.current.removeEventListener('input', onInput)
    }
  }, [divEditableRef])
  
  return (
    <UInputWrapper message={message} hideMessage={hideMessage} error={error}>
      <label htmlFor={id} className={labelStyle || UClass.label(error && !hideMessage)}>{label}</label>
      <div contentEditable ref={divEditableRef} id={id} value={value} name={name} onBlur={handlerInput} className={inputStyle || UClass.input(error && !hideMessage, block)} dir="auto" placeholder={placeholder(value)} 
      dangerouslySetInnerHTML={{__html: value}}{...props} />
    </UInputWrapper>
  )
}