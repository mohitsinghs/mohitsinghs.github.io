import Link from 'next/link'
import Layout from '@/components/Layout'
import { ChevronRight } from 'react-feather'

export default function List({ title, posts }) {
  return (
    <Layout
      title={`${title} | Blog of Mohit Singh`}
      type='archive'
      header={
        <header>
          <h1>{title}</h1>
        </header>
      }
    >
      <ul>
        {posts.map((post) => (
          <Link key={post.title} href={post.link}>
            <li key={post.title}>
              <h2>{post.title}</h2>
              <p>{new Date(post.date).toDateString()}</p>
              <p>{post.excerpt}</p>
              <a className='continue' href={post.link}>
                Continue Reading
                <ChevronRight size={16} />
              </a>
            </li>
          </Link>
        ))}
      </ul>
    </Layout>
  )
}
