import React from 'react'
import { TPost } from '../types'
import { ItemList } from './ItemList'
import { useGetAllPostsQuery } from '../api/postApi'
import { useScreenSize } from '@/hooks/useScreenSize'
import { Loading } from '@/components/Loading'
import { TabList } from '@/components/TabList'

export interface FeedProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string
}

export const Feed = (props: FeedProps) => {
  const screenSize = useScreenSize()

  const { data: posts, isLoading, isError } = useGetAllPostsQuery()
  if (isLoading) return <Loading />
  if (isError) return <>Error Loading... </>

  console.log(posts)

  return (
    <>
      {screenSize !== 'SM' && (
        <div className='sticky top-0  font-bold text-xl h-16  backdrop-blur-md'>
          <h1 className='px-4 pt-5'>Home</h1>
        </div>
      )}
      <TabList />
      {posts && posts.length > 0 ? (
        <ItemList
          className={`grid md:mt-0 ${props.className}`}
          items={posts}
          placeholder='Nothing to see here'
          itemClassName='pointer-events-auto cursor-pointer pt-4 px-4 flex-0'
        />
      ) : (
        'Nothing to see here'
      )}
    </>
  )
}
