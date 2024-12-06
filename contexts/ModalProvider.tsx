import React from 'react'

import { createContext,useMemo, useState, useContext, useEffect } from 'react'

import UModal from '@/components/UModal'

const ModalContext = createContext<ModalContextType | null>(null)
ModalContext.displayName = 'ModalContext'

export const useModal = () => {
 const context = useContext(ModalContext) as ModalContextType
 if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')       }
  return context
}

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
 const [content, setContent] = React.useState(null)
 const [actions, setActions] = React.useState([])
 const [isOpen, setIsOpen] = React.useState(false)
 
 const open = ({ content, actions }) => {
   setContent(content)
   setActions(actions)
   setIsOpen(true)
 }
 
 const close = () => setIsOpen(false)
 
 const modalObject = useMemo(() => {
   return {
     modal: {
       open,
       close,
     },
   }
 }, [
   open,
   close,
  ])
 
return <ModalContext.Provider value={modalObject}>
    <UModal open={isOpen} actions={actions}>
      {content}
    </UModal>
    {children}
  </ModalContext.Provider>
}
export default ModalProvider