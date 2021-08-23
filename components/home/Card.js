import Link from 'next/link'
import { ChevronRight } from 'react-feather'

export default function Card({ post }) {
  return (
    <Link href={post?.link}>
      <li className='flex flex-col w-full p-4 cursor-pointer'>
        <h3 className='mb-2 text-lg font-bold text-gray-600'>{post?.title}</h3>
        <p className='mb-2 text-xs font-medium text-gray-600 md:text-xs'>
          {new Date(post.date).toDateString()}
        </p>
        <p className='flex-grow flex-shrink-0 text-sm leading-loose text-gray-600'>
          {post?.excerpt}
        </p>
        <a
          className='self-end px-4 py-2 mt-4 text-sm font-medium text-gray-600 cursor-pointer select-none max-w-max hover:text-gray-700'
          href={post.link}
        >
          Continue Reading
          <ChevronRight className='inline w-auto h-4 ml-2' size={16} />
        </a>
      </li>
    </Link>
  )
}
