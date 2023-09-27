import { HeroIcon, ICONS, sideBarListNames } from '@/types'
import { Menu } from '@headlessui/react'
import { IconLinkItem } from '../IconLinkItem'

export interface MoreMenuProps extends React.ComponentPropsWithoutRef<'div'> {
  items: MoreMenuItem[]
}

export interface MoreMenuItem {
  title: string
  Icon: HeroIcon
}

export const MoreMenu = ({ items }: MoreMenuProps) => {
  return (
    <Menu as='div' className={'relative '}>
      <Menu.Button
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className='rounded-full flex justify-center items-center w-[25px] h-[25px]'>
          <ICONS.OUTLINE.MORE_HORIZONTAL />
        </div>
      </Menu.Button>
      <Menu.Items
        className={`absolute z-[9999] origin-top-right right-0 w-[350px] bg-white rounded-sm popover-shadow border border-border-secondary outline-border-primary`}
      >
        {items.map((item) => {
          return (
            <Menu.Item key={item.title}>
              <IconLinkItem
                title={item.title}
                Icon={item.Icon}
                SelectedIcon={item.Icon}
                iconStyle='w-[20px] h-[20px]'
                collapsed={false}
                selected={false}
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className='rounded-none w-full'
              />
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
}
