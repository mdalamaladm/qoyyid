import React from 'react'

export default function USnackbar ({ text, ms, bg = 'bg-black' }: { text: string, ms: number, bg: string }) {
  
  const [show, setShow] = React.useState(true)
  
  React.useEffect(() => {
    setTimeout(() => {
      setShow(false)
      
    }, ms)
  }, [ms, text])
  
  return (
    show && <div className={`inline-block box-content p-2 mt-1 rounded ${bg} text-qoyyid-main`} suppressHydrationWarning>{text}</div>
  )
}