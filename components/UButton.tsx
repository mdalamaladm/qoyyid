'use client'

import React from 'react'

import Icon from '@/components/Icon'

import UClass from '@/utils/UClass'

type UButtonProps = {
  type: string;
  color: string;
  block: boolean;
  disabled: boolean;
  extendStyle: string;
  submit: string | boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: string;
  prepend: boolean;
  append: boolean;
}

export default function UButton ({ type, color, block, disabled, style, submit, onClick, children, icon = '', prepend, append }: UButtonProps) {
  
  const [iconName, iconSize] = icon.split('-')

  return (
    <button type={submit ? 'submit' : 'button'} form={submit === true ? '' : submit} className={UClass.button({ type, color, block, style, icon }) + ' flex items-center justify-center box-border' + (icon && !children && !style ? ' aspect-square' : ' py-1.5 px-3')} disabled={disabled} onClick={onClick}>
      {(icon && children && prepend) && <Icon name={iconName} height={iconSize || 16} width={iconSize || 16} className={UClass.iconButton(type, color) + ' mr-2'} />}
      {
        icon && !children
          ? <Icon name={iconName} height={iconSize || 30} width={iconSize || 30} className={UClass.iconButton(type, color)} />
          : children
      }
      {(icon && children && append) && <Icon name={iconName} height={iconSize || 16} width={iconSize || 16} className={UClass.iconButton(type, color) + ' ml-2'} />}
    </button>
  )
}