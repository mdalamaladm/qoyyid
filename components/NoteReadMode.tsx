'use client'

import React from 'react'
import SubnoteWriteMode from '@/components/SubnoteWriteMode'
import SubnoteReadMode from '@/components/SubnoteReadMode'
import UButton from '@/components/UButton'

import objToClassName from '@/utils/objToClassName'

import { Subnote } from '@/@types/subnote.d'
import { Word } from '@/@types/word.d'

import Markdown from '@/utils/markdown/v1'

type NoteReadModeProps = {
  props: {
    title: string;
    contentRendered: object;
    words: Word[];
    selected: Word[];
    currentWordId: string;
    subnoteState: 'read' | 'write';
    multitextMode: boolean;
    onChangeSubnotePage: (number) => void;
    onSelectText: (payload: Word) => void;
    onCloseSubnote: () => void;
    onEditSubnote: () => void;
    subnoteReadProps: {
      subnote: string;
    };
    subnoteWriteProps: {
      onSaveSubnote: (payload: Subnote) => void;
    };
  }
}

export default function NoteReadMode ({ props: { title, contentRendered, words, currentWordId, selected, subnoteState, multitextMode, onChangeSubnotePage, onSelectText, onCloseSubnote, onEditSubnote, subnoteWriteProps, subnoteReadProps } }: NoteReadModeProps) {
  
  return (
    <div className={objToClassName({
      'flex-1': true,
      'overflow-y-auto': true,
      'pb-96': selected.length > 0,
      'pb-16': selected.length < 1,
    })}>
      <h1 className="px-2 pt-2 mb-[2.65rem] text-3xl text-center break-words select-none">{title}</h1>
      <div className="markdown mx-4" dir="auto">
        {contentRendered}
      </div>
      {
        selected.length > 0 &&
          (
            <div className={objToClassName({
            flex: true,
            'flex-col': true,
            fixed: true,
            'bottom-0': true,
            'h-80': subnoteState === 'read',
            'h-[calc(100%-2.5rem)]': subnoteState === 'write',
            'w-full': true,
            'bg-qoyyid-main': true,
            'rounded-t-xl': true,
            })}>
              <div className="flex-none flex items-center justify-between p-2">
                <UButton type="link" color="accent" icon="close" onClick={onCloseSubnote} />
                {
                  subnoteState === 'write'
                    ? (
                    <UButton key="save-subnote" type="link" color="accent" icon="save" submit="subnote-form" />
                    )
                    : (
                      <UButton key="edit-subnote" type="link" color="accent" icon="edit" onClick={onEditSubnote} />
                  )
                }
              </div>
              <div className="flex-1 flex">
                <UButton type="link" color="accent" icon="chevronLeft" onClick={() => onChangeSubnotePage(-1)} style={objToClassName({
                'flex-none': true,
                'self-center': true,
                'relative invisible z-[-1]': subnoteState === 'write'
                })} />
                <div className="flex-1">
                  {
                  subnoteState === 'write'
                    ? <SubnoteWriteMode props={subnoteWriteProps} />
                    : <SubnoteReadMode props={subnoteReadProps} />
                }
                </div>
                <UButton type="link" color="accent" icon="chevronRight" onClick={() => onChangeSubnotePage(1)} style={objToClassName({
                'flex-none': true,
                'self-center': true,
                'relative invisible z-[-1]': subnoteState === 'write'
                })} />
              </div>
            </div>
          )
      }
    </div>
  )
}