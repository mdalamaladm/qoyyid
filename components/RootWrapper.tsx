'use client'

import React from 'react'

import LocaleProvider from '../contexts/LocaleProvider'
import SnackbarProvider from '../contexts/SnackbarProvider'
import ModalProvider from '../contexts/ModalProvider'
import ApiProvider from '../contexts/ApiProvider'

export default function RootWrapper ({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    function close (e) {
      const popovers = document.getElementsByClassName('upopover')
      
      for (const po of popovers) {
        const isSelf = po.contains(e.target)
        const poContent = po.childNodes[1]
        
        if (!isSelf) poContent.classList.add('invisible', 'z-[-1]')
      }
    }
    
    window.addEventListener('mousedown', close)
    
    return () => {
      window.removeEventListener('mousedown', close)
    }
  }, [])

  return (
    <LocaleProvider>
      <SnackbarProvider>
        <ModalProvider>
          <ApiProvider>
            {children}
          </ApiProvider>
        </ModalProvider>
      </SnackbarProvider>
    </LocaleProvider>
  )
}