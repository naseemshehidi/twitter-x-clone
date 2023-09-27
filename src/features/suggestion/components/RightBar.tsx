import { SuggestionContainer } from '@/features/suggestion/components/SuggestionContainer'
import { TrendItem } from '@/features/suggestion/components/TrendItem'
import React from 'react'
import { Button } from '../../../components/Button'
import { FollowItem } from '@/features/suggestion/components'

interface RightBarProps extends React.ComponentPropsWithoutRef<'aside'> {}

export const RightBar = (props: RightBarProps) => {
  return (
    <aside>
      <div className='sticky -top-1/4 flex flex-col gap-4 pt-4 w-[350px] grow-0 ml-6'>
        <div className='sticky top-0 py-2 bg-bg-primary'>
          <input
            type='text'
            placeholder='Search'
            className=' px-4 py-2 outline-none border border-border-secondary focus:border-primary-main focus:bg-bg-primary rounded-3xl bg-bg-secondary/50 min-w-0 w-full'
          />
        </div>
        <SuggestionContainer className='gap-2'>
          <h1 className='text-lg px-4'>Subscribe to Premium</h1>
          <p className='px-4'>
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <Button variant='primary' className='mx-4 bg-black font-bold w-fit'>
            Subscribe
          </Button>
        </SuggestionContainer>

        <SuggestionContainer>
          <h1 className='text-lg px-4 mb-2'>Trends for you</h1>
          <TrendItem
            location='Trending in Tunisia'
            title='#crypto'
            postCount='541k posts'
          />
          <TrendItem
            location='Trending in Tunisia'
            title='#crypto'
            postCount='541k posts'
          />
          <TrendItem
            location='Trending in Tunisia'
            title='#crypto'
            postCount='541k posts'
          />
          <TrendItem
            location='Trending in Tunisia'
            title='#crypto'
            postCount='541k posts'
          />
          <TrendItem
            location='Trending in Tunisia'
            title='#crypto'
            postCount='541k posts'
          />
        </SuggestionContainer>

        <SuggestionContainer>
          <h1 className='text-lg px-4 mb-2'>Who To Follow</h1>
          <FollowItem username='bobby' />
          <FollowItem username='bobby' />
          <FollowItem username='bobby' />
        </SuggestionContainer>

        <footer className='text-xs w-full px-2'>
          <a href='#' className='hover:underline pr-2'>
            Terms of service
          </a>
          <a href='#' className='hover:underline pr-2'>
            Privacy policy
          </a>
          <a href='#' className='hover:underline pr-2'>
            Cookie policy
          </a>
          <a href='#' className='hover:underline pr-2'>
            Accessibility
          </a>
          <a href='#' className='hover:underline pr-2'>
            Ads info
          </a>
          <a href='#' className='hover:underline pr-2'>
            More
          </a>
        </footer>
      </div>
    </aside>
  )
}
