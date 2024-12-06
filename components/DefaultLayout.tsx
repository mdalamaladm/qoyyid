'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useModal } from '@/contexts/ModalProvider'
import { useApi } from '@/contexts/ApiProvider'

import UButton from '@/components/UButton'
import UNavbar from '@/components/UNavbar'

export default function DefaultLayout ({ children }) {
  const router = useRouter()
  const { logout } = useApi()
  const { modal } = useModal()

  const onLogout = () => {
    modal.open({
      content: (
        <div>
          <p>Apakah yakin ingin Logout ?</p>
        </div>
      ),
      actions: [
          <UButton type="solid" color="accent" onClick={async () => {
            await logout()
            
            modal.close()
    
            router.push('/login')
          }}>Ya</UButton>,
          <UButton type="outlined" color="accent" onClick={modal.close} style="ml-2">Tidak</UButton>
      ]
    })
  }
  
  const actions = [
    <UButton type="link" color="accent" icon="logout" prepend onClick={onLogout}>Logout</UButton>
  ]
  
  return (
    <div className="ignore-full flex flex-col overflow-x-hidden h-screen">
      <UNavbar color="main" icon="/assets/qoyyid.svg" actions={actions} style="flex-none"/>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}