import { createContext,useMemo, useState, useContext } from 'react'

import { FormValue,FormRules, FormMessage, FormError, Rule, FormContextType } from '@/@types/form.d'

const FormContext = createContext<FormContextType | null>(null)
FormContext.displayName = 'FormContext'

export const useForm = () => {
 const context = useContext(FormContext) as FormContextType
 if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider')       }
  return context
}

const FormProvider = ({ children }: { children: React.ReactNode }) => {
 const [formValue, setFormValue] = useState<FormValue>({})
 const [formRules, setFormRules] = useState<FormRules>({})
 const [formMessage, setFormMessage] = useState<FormMessage>({})
 const [formError, setFormError] = useState<FormError>({})
 const [formErrorAll, setFormErrorAll] = useState<boolean>(true)
 
 const initForm = (form: { value: FormValue, rules: FormRules }) => {
   setFormValue(form.value)
   setFormError(createFormSection(form.value, false))
   setFormMessage(createFormSection(form.value, ''))
   setFormRules(form.rules)

   if (!Object.values(form.rules).find(r => r.length > 0)) {
     setFormErrorAll(false)
   }
 }
 
 const createFormSection = (form: object, initValue: any) => {
   return Object.fromEntries(Object.keys(form).map(name => [name, initValue]))
 }
 
 const setForm = (name: string, value: any) => {
   const newFormValue = { ...formValue, [name]: value }
  
   setFormValue(newFormValue)
   
   const rules = formRules[name as keyof FormRules] as Rule[]
  
   const message = rules?.reduce((currentMsg: string, rule: Rule) => {
     if (currentMsg && typeof currentMsg === 'string') return currentMsg
     
     const msg = rule(value, newFormValue)
     
     if (msg && typeof msg === 'string') return msg
     
     return ''
   }, '') || ''
   
   setFormMessage({ ...formMessage, [name]: message })
   
   const currentError = { ...formError, [name]: !!message }
   
   setFormError(currentError)
   setFormErrorAll(getFormErrorAll(currentError))
 }
 
 const getFormErrorAll = (error: object) => {
   for (const err of Object.values(error)) {
     if (err) return err
   }
   
   return false
 }
 
 const getInput = (name: string) => {
  const error = formError[name as keyof FormError]

  return ({
    value: formValue[name as keyof FormValue],
    message: formMessage[name as keyof FormMessage],
    error,
  })
}
 
 const formObject = useMemo(() => {
   return {
     formValue,
     setFormValue,
     formMessage,
     setFormMessage,
     formError,
     setFormError,
     formErrorAll,
     setFormErrorAll,
     formRules,
     setFormRules,
     initForm,
     setForm,
     getInput,
     getFormErrorAll,
   }
 }, [
   formValue,
   setFormValue,
   formMessage,
   setFormMessage,
   formError,
   setFormError,
   formErrorAll,
   setFormErrorAll,
   formRules,
   setFormRules,
   initForm,
   setForm,
   getInput,
   getFormErrorAll,
  ])
 
return <FormContext.Provider value={formObject}>{children}  </FormContext.Provider>
}
export default FormProvider