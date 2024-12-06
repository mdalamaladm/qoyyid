'use client'

import React from 'react'

const colors = {
  main: 'bg-qoyyid-main text-qoyyid-accent',
  secondary: 'bg-qoyyid-secondary text-qoyyid-accent',
  accent: 'bg-qoyyid-accent text-qoyyid-main',
}

const List = ({ items }) => {
  return items.map((i, index) => <div key={index}>{i}</div>)
}

const id = `${Date.now()}`

export default function UPopover ({ children, content, items, color, stopPropagation = false, style }) {
  const triggerRef = React.useRef(null)
  const contentRef = React.useRef(null)
  
  const onClickPopover = (e: React.SyntheticEvent) => {
    contentRef.current.classList.toggle('invisible')
    contentRef.current.classList.toggle('z-[-1]')
    
    const open = contentRef.current.classList.contains('invisible') && contentRef.current.classList.contains('z-[-1]')
  
    if (open) {
      setContainPosition()
    }
  }
  
  const setContainPosition = () => {
    const t = triggerRef.current.getBoundingClientRect()
    const c = contentRef.current.getBoundingClientRect()
  
    contentRef.current.style.top = t.bottom + 'px'
    contentRef.current.style.left = t.left + t.width - c.width + 'px'
  }
  
  React.useEffect(() => {
    setContainPosition()
  }, [triggerRef, contentRef])

  return (
    <div id={id} className={`upopover ${style}`}>
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