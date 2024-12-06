import React from 'react'

import { useSnackbar } from '@/contexts/SnackbarProvider'

const Circle = ({ diameter, position }) => <div className={`absolute ${position} bg-qoyyid-secondary ${diameter} rounded-full`} />

const Clouds = () => (
  <div className="relative z-[1] bottom-[-6rem]">
    <Circle diameter="w-[20rem] h-[20rem]" position="bottom-[-1rem] left-[-10rem]" />
    <Circle diameter="w-30 h-30" position="bottom-0 left-[90%]" />
    <Circle diameter="w-52 h-52" position="bottom-10 left-[30%]" />
    <Circle diameter="w-52 h-52" position="bottom-[-30px] left-[50%]" />
    <Circle diameter="w-52 h-52" position="bottom-[-1rem] left-[2.5rem]" />
    <Circle diameter="w-80 h-80" position="bottom-[-2rem] right-[-10rem]" />
    <Circle diameter="w-40 h-40" position="bottom-20 left-[20%]" />
    <div className="absolute bottom-[-3rem] w-full h-20 bg-qoyyid-secondary" />
  </div>
)

export default function OutsideLayout ({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-hidden bg-qoyyid-main">
        <div className="relative h-full overflow-y-scroll overflow-hidden">
          <div className="relative z-[2] px-16 pt-5">{children}
          </div>
          <Clouds />
        </div>
    </div>
  )
}