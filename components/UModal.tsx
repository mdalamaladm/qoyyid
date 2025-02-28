import React from 'react'

import { UModalParams } from '@/@types/u.d'

export default function UModal ({ open, children, actions }: UModalParams) {
  return (
    open && (
      <div className="flex items-center justify-center fixed top-0 left-0 z-[998] w-full h-full bg-qoyyid-dark-gray-thin">
        <div className="p-5 bg-qoyyid-main rounded">
          <div>{children}</div>
          <div className="flex items-center justify-end pt-2">
            {
              actions.map(
                (action, index) => <React.Fragment key={index}>{action}</React.Fragment>
              )
            }
          </div>
        </div>
      </div>
    )
  )
}