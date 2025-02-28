'use client'

import React from 'react'

const colors = {
  main: 'bg-qoyyid-main text-qoyyid-accent',
  secondary: 'bg-qoyyid-secondary text-qoyyid-accent',
  accent: 'bg-qoyyid-accent text-qoyyid-main',
}

const List = ({ items }: { items: React.ReactElement[] }) => {
  return items.map((i, index) => <React.Fragment key={index}>{i}</React.Fragment>)
}

const id = `${Date.now()}`

export default function UPopover (
  { children, content, items, color, stopPropagation = false, style }:
  {
    children: React.ReactElement;
    content: React.ReactElement;
    items: React.ReactElement[];
    color?: string;
    stopPropagation?: boolean;
    style?: string;
  }
) {
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  
  const onClickPopover = (e: React.SyntheticEvent) => {
    if (contentRef.current) {
      contentRef.current.classList.toggle('invisible')
      contentRef.current.classList.toggle('z-[-1]')
      
      const open = contentRef.current.classList.contains('invisible') && contentRef.current.classList.contains('z-[-1]')
    
      if (open) {
        setContainPosition()
      }
    }
  }
  
  const setContainPosition = () => {
    if (contentRef.current && triggerRef.current) {
      const t = triggerRef.current.getBoundingClientRect()
      const c = contentRef.current.getBoundingClientRect()
    
      contentRef.current.style.top = t.bottom + 'px'
      contentRef.current.style.left = t.left + t.width - c.width + 'px'
    }
  }
  
  React.useEffect(() => {
    setContainPosition()
  }, [triggerRef, contentRef])

  return (
    <div id={id} className={`upopover ${style}`} suppressHydrationWarning>
      <div ref={triggerRef} onMouseDown={onClickPopover}>
        {children}
      </div>
      <div ref={contentRef} className={`fixed ${colors[color]} z-[100] text-qoyyid-main w-15 h-15 shadow invisible z-[-1]`}>
          {
            items?.length > 0
              ? <List items={items} />
              : content
          }
      </div>
    </div>
  )
}