import React from 'react'
import { ItemType } from '../types'
import { Item } from './Item'

export interface ItemListProps extends React.ComponentPropsWithoutRef<'ul'> {
  items: ItemType[]
  className?: string
  itemClassName?: string
  placeholder?: string
}

export const ItemList = ({
  items,
  className = '',
  itemClassName = '',
  placeholder = 'Nothing to see here',
}: ItemListProps) => {
  return (
    <ul className={className}>
      {items && items.length > 0 ? (
        items.map((item) => {
          return (
            <li key={item.id}>
              <Item item={item} className={itemClassName} />
            </li>
          )
        })
      ) : (
        <div className='flex justify-center mt-4 text-text-secondary'>
          {placeholder}
        </div>
      )}
    </ul>
  )
}
