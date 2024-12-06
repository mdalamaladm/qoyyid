import { createContext,useMemo, useState, useContext } from 'react'

import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import db from '@/db'

import fetchJSON from '@/utils/fetchJSON'

import { Note } from '@/@types/note.d'
import { ApiContextType } from '@/@types/api.d'

const JWT_SECRET = process.env.NEXT_JWT_SECRET

const ApiContext = createContext<ApiContextType | null>(null)
ApiContext.displayName = 'ApiContext'

export const useApi = () => {
 const context = useContext(ApiContext) as ApiContextType
 if (context === undefined) {
    throw new Error('useApi must be used within a ApiProvider')       }
  return context
}

const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const login = async (payload: { username: string, password: string }) => await fetchJSON('/api/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    
  const logout = async (payload: { username: string, password: string }) => await fetchJSON('/api/logout', {
      method: 'POST',
    })

  const register = async (payload: { name: string, username: string, password: string, confirmPassword: string }) => await fetchJSON('/api/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  })

  const getAllNote = async () => await fetchJSON('/api/notes')
  
  const getNote = async (id: string) => await fetchJSON(`/api/notes/${id}`)
  
  const addNote = async () => await fetchJSON('/api/notes', {
    method: 'POST'
  })
  
  const editNote = async (id: string, payload: Note & { contents: string }) => await fetchJSON(`/api/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })
  
  const removeNote = async (id: string) => await fetchJSON(`/api/notes/${id}`, {
    method: 'DELETE'
  })
  
  const getSubnote = async (noteId: string, contentId: string) => await fetchJSON(`/api/notes/${noteId}/subnotes/${contentId}`)
  
  const addSubnote = async (noteId: string, contentId: string, payload: { text: string }) => await fetchJSON(`/api/notes/${noteId}/subnotes/${contentId}`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  
  const editSubnote = async (noteId: string, contentId: string, payload: { text: string }) => await fetchJSON(`/api/notes/${noteId}/subnotes/${contentId}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  })
  
  const getSubnoteOrder = async (noteId: string) => await fetchJSON(`/api/notes/${noteId}/subnotes/order`)
 
  const apiObject = useMemo(() => {
   return {
     login,
     logout,
     register,
     getAllNote,
     getNote,
     addNote,
     editNote,
     removeNote,
     getSubnote,
     addSubnote,
     editSubnote,
     getSubnoteOrder,
   }
  }, [
    login,
    logout,
    register,
    getAllNote,
    getNote,
    addNote,
    editNote,
    removeNote,
    getSubnote,
    addSubnote,
    editSubnote,
  ])
 
return <ApiContext.Provider value={apiObject}>{children}
</ApiContext.Provider>
}
export default ApiProvider