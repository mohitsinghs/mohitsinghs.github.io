import Layout from '@/components/Layout'
import Link from 'next/link'
import { ChevronRight } from 'react-feather'

export default function List({ title, posts }) {
  return (
    <Layout
      title={`${title} | Blog of Mohit Singh`}
      type='archive'
      url={title.toLowerCase()}
      header={
        <header>
          <h1>{title}</h1>
        </header>
      }
    >
      <ul className='flex flex-col gap-4 mx-8 my-8 md:max-w-prose md:mx-auto'>
        {posts.map((post) => (
          <Link key={post.title} href={post.link}>
            <li
              className='flex flex-col w-full p-4 cursor-pointer'
              key={post.title}
            >
              <h2 className='mb-2 text-xl font-extrabold text-gray-700 md:text-2xl'>
                {post.title}
              </h2>
              <p className='mb-2 text-sm font-medium text-gray-600 md:text-xs'>
                {new Date(post.date).toDateString()}
              </p>
              <p className='leading-loose text-gray-700'>{post.excerpt}</p>
              <a
                className='px-4 py-2 mt-4 text-sm font-medium text-gray-600 rounded-lg cursor-pointer select-none justify-self-end bg-gray-50 max-w-max'
                href={post.link}
              >
                Continue Reading
                <ChevronRight className='inline w-auto h-4 ml-2' size={16} />
              </a>
            </li>
          </Link>
        ))}
      </ul>
    </Layout>
  )
}
