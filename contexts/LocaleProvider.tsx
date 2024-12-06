import { createContext,useMemo, useState, useContext } from 'react'

import { localeMap } from '@/utils/locale'

import { LocaleContextType, LocaleMap } from '@/@types/locale.d'

const LocaleContext = createContext<LocaleContextType | null>(null)
LocaleContext.displayName = 'LocaleContext'

export const useLocale = () => {
 const context = useContext(LocaleContext) as LocaleContextType
 if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')       }
  return context
}

const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
 const [localeValue, setLocaleValue] = useState('id')
 
 function locale (text: string, params?: Array<Array<any> | string>): string {
   if (Array.isArray(params)) {
     return params?.reduce((res: string, param: Array<any> | string, index: number) => {
       if (Array.isArray(param)) return res.replace(`$${index + 1}`, locale(param[0], param[1])) 
       else {
         const result: string = param.startsWith('#i-') ? param.replace('#i-', '') : locale(param)
         
         return res.replace(`$${index + 1}`, result)
       }
     }, localeMap[text as keyof LocaleMap]?.[localeValue] || 'Undefined') as string
   } else {
     return localeMap[text as keyof LocaleMap]?.[localeValue]
   }
 }
 
 const localeObject = useMemo(() => {
   return {
     localeValue,
     setLocaleValue,
     locale,
   }
 }, [
   localeValue,
   setLocaleValue,
   locale,
  ])
 
return <LocaleContext.Provider value={localeObject}>{children}  </LocaleContext.Provider>
}
export default LocaleProvider