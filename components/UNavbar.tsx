import React from 'react'

import UButton from '@/components/UButton'
import UPopover from '@/components/UPopover'

const bg = {
  main: 'bg-qoyyid-main',
  secondary: 'bg-qoyyid-secondary',
  accent: 'bg-qoyyid-accent',
}

const inverse = {
  main: 'accent',
  secondary: 'accent',
  accent: 'main',
}

export default function UNavbar ({ icon, color, actions, style }) {
  return (
    <div className={`flex justify-end relative box-content h-10 p-2 ${bg[color]} ${style}`}>
      <div className="flex justify-center items-center absolute top-0 left-0 z-[1] w-full h-10 box-content p-2">
        <img src={icon} className="h-full"/>
      </div>
      <div className="relative h-full flex justify-center items-center z-[99]">
        <UPopover color="main" items={actions}>
          <UButton type="link" color={inverse[color]} icon="menu"
          />
        </UPopover>
      </div>
    </div>
  )
}