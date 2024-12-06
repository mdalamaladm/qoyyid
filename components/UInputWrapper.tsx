import React from 'react'

import { useForm } from '@/contexts/FormProvider'

import objToClassName from '@/utils/objToClassName'

import UClass from '@/utils/UClass'

type UInputWrapperProps = {
  message: string | boolean;
  hideMessage: boolean;
  error: boolean;
  children: React.ReactNode;
};

export default function UInputWrapper({ message, hideMessage, error, children }: UInputWrapperProps) {
  
  return (
    <div className="group">
      {children}
      <div className={objToClassName({ 'min-h-[16px]': !hideMessage
      })}>
        <p className={UClass.message(error && !hideMessage)}>
          {hideMessage ? '' : message}
        </p>
      </div>
    </div>
  )
}