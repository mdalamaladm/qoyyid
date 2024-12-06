'use client'

import FormProvider from '@/contexts/FormProvider'

import OutsideLayout from '@/components/OutsideLayout'

export default function RegisterLayout ({ children }: { children: React.ReactNode }) {
  return (
    <OutsideLayout>
      <FormProvider>{children}</FormProvider>
    </OutsideLayout>
  )
}