import React, { Fragment } from 'react'
import { Tab } from '@headlessui/react'

interface TabListProps extends React.ComponentPropsWithoutRef<'div'> {}

export const TabList = (props: TabListProps) => {
  return (
    <Tab.Group as='div' className='w-full'>
      <Tab.List className='w-full flex justify-between border-b'>
        <Tab
          as={'div'}
          className='flex-1 flex justify-center items-end focus:outline-none text-sm font-medium'
        >
          {({ selected }) => (
            <button
              className={
                (selected ? 'border-b-4 border-primary-main font-bold' : '') +
                ' pb-3'
              }
            >
              For you
            </button>
          )}
        </Tab>

        <Tab
          as={'div'}
          className='flex-1 flex justify-center items-end focus:outline-none'
        >
          {({ selected }) => (
            <button
              className={
                (selected ? 'border-b-4 border-primary-main font-bold' : '') +
                ' pb-3'
              }
            >
              Following
            </button>
          )}
        </Tab>
      </Tab.List>
    </Tab.Group>
  )
}
