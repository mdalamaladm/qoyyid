'use client'

import FormProvider from '@/contexts/FormProvider'

export default function DetailNotesLayout ({ children }: { children: React.ReactNode }) {
  return <FormProvider>{children}</FormProvider>
}