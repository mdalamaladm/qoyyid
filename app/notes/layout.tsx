import DefaultLayout from '@/components/DefaultLayout'

export default function NotesLayout ({ children }: { children: React.ReactNode }) {
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  )
}