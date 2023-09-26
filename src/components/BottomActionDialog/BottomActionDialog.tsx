import React, { useState } from 'react'
import { BottomActionDialogItem } from './BottomActionDialogItem'
import { BottomActionDialogListNames, ICONS } from '@/types'
import { useNavigate } from 'react-router-dom'

export const BottomActionDialog = () => {
  const [selected, setSelected] = useState(BottomActionDialogListNames.NOTHING)

  const navigate = useNavigate()

  return (
    <div
      className={
        'z-40 fixed h-full top-0 right-0 left-0 bg-opacity-50 bg-black m-0 p-0 '
      }
    >
      <div
        className='bg-bg-primary absolute bottom-0 left-0 right-0 top-1/3 overflow-auto z-50 flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='pt-4 pb-1'>
          <ul>
            <li>
              {/** TODO: ADD THE NAVIGATION */}
              <BottomActionDialogItem
                title={BottomActionDialogListNames.EDIT}
                Icon={ICONS.OUTLINE.EDIT}
                SelectedIcon={ICONS.SOLID.EDIT}
                selected={selected === BottomActionDialogListNames.EDIT}
                onClick={() => {
                  setSelected(BottomActionDialogListNames.EDIT)
                }}
              />
            </li>
            <li>
              <BottomActionDialogItem
                title={BottomActionDialogListNames.DELETE}
                Icon={ICONS.OUTLINE.DELETE}
                SelectedIcon={ICONS.SOLID.DELETE}
                selected={selected === BottomActionDialogListNames.DELETE}
                onClick={() => {
                  setSelected(BottomActionDialogListNames.DELETE)
                }}
              />
            </li>
          </ul>
        </div>
        <div className='flex-1 flex items-end justify-center px-4 pb-8'>
          <BottomActionDialogItem
            title={BottomActionDialogListNames.CANCEL}
            Icon={ICONS.OUTLINE.CANCEL}
            SelectedIcon={ICONS.SOLID.CANCEL}
            selected={selected === BottomActionDialogListNames.CANCEL}
            onClick={() => {
              setSelected(BottomActionDialogListNames.CANCEL)
            }}
          />
        </div>
      </div>
    </div>
  )
}
