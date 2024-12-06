'use client'

import FormProvider from '@/contexts/FormProvider'

import OutsideLayout from '@/components/OutsideLayout'

export default function LoginLayout ({ children }: { children: React.ReactNode }) {
  return (
    <OutsideLayout>
      <FormProvider>{children}</FormProvider>
    </OutsideLayout>
  )
}