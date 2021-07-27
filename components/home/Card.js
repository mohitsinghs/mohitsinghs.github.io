import Link from 'next/link'
import { ChevronRight } from 'react-feather'

export default function Card({ post }) {
  return (
    <Link href={post?.link}>
      <li>
        <h3>{post?.title}</h3>
        <p>{new Date(post.date).toDateString()}</p>
        <p>{post?.excerpt}</p>
        <a className='continue' href={post.link}>
          Continue Reading
          <ChevronRight size={16} />
        </a>
      </li>
    </Link>
  )
}
