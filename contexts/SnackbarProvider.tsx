import { createContext,useMemo, useState, useContext, useEffect } from 'react'

import USnackbar from '../components/USnackbar'

import { Snackbar, SnackbarContextType } from '@/@types/snackbar.d'

let timer: ReturnType<typeof setTimeout> | null = null

const SnackbarContext = createContext<SnackbarContextType | null>(null)
SnackbarContext.displayName = 'SnackbarContext'

export const useSnackbar = () => {
 const context = useContext(SnackbarContext) as SnackbarContextType
 if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')       }
  return context
}

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
 const [queue, setQueue] = useState<Snackbar[]>([])
 
 const success = (text: string, ms?: number) => {
    const id = Date.now()
    ms = ms || 3000
    setQueue([...queue, {
      id,
      text,
      ms,
      bg: 'bg-qoyyid-success',
    }])
    
    if (timer) clearTimeout(timer)
    
    timer = setTimeout(() => {
      setQueue([])
    }, ms)
 }
 
 const info = (text: string, ms?: number) => {
   const id = Date.now()
    ms = ms || 3000
    setQueue([...queue, {
      id,
      text,
      ms,
      bg: 'bg-qoyyid-info',
    }])
    
    if (timer) clearTimeout(timer)
    
    timer = setTimeout(() => {
      setQueue([])
    }, ms)
 }
 
 const error = (text: string, ms?: number) => {
   const id = Date.now()
    ms = ms || 3000
    setQueue([...queue, {
      id,
      text,
      ms,
      bg: 'bg-qoyyid-error',
    }])
    
    if (timer) clearTimeout(timer)
    
    timer = setTimeout(() => {
      setQueue([])
    }, ms)
 }
 
 const warning = (text: string, ms?: number) => {
   const id = Date.now()
    ms = ms || 3000
    setQueue([...queue, {
      id,
      text,
      ms,
      bg: 'bg-qoyyid-warning',
    }])
    
    if (timer) clearTimeout(timer)
    
    timer = setTimeout(() => {
      setQueue([])
    }, ms)
 }
 
 const snackbarObject = useMemo(() => {
   return {
     snackbar: {
       success,
       info,
       error,
       warning,
     },
     queue,
   }
 }, [
   success,
   info,
   error,
   queue,
  ])
 
return <SnackbarContext.Provider value={snackbarObject}>
    <div className="ignore-full absolute left-0 bottom-0 z-[999] m-1">
      {
        queue?.map?.(sb => (
          <USnackbar key={sb.id} text={sb.text} ms={sb.ms} bg={sb.bg} />
        ))
      }
    </div>
    {children}
  </SnackbarContext.Provider>
}
export default SnackbarProvider