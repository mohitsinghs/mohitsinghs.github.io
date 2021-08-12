import Layout from '@/components/Layout'
import useLF from '@/hooks/useLF'
import 'littlefoot/dist/littlefoot.css'
import Comment from './Comment'

export default function Article({ post }) {
  useLF()
  return (
    <Layout
      title={`${post.title} | Blog of Mohit Singh`}
      description={post.excerpt}
      url={post.link}
    >
      <article itemID='#' itemScope itemType='http://schema.org/BlogPosting'>
        <header>
          <h1 itemProp='headline' title={post.title}>
            {post.title}
          </h1>
          <p>
            Written by
            <span
              itemProp='author'
              itemScope='itemscope'
              itemType='http://schema.org/Person'
            >
              <span itemProp='name'>&nbsp;{post.author}&nbsp;</span>
            </span>
            on&nbsp;
            <time
              itemProp='datePublished dateModified'
              dateTime={new Date(post.date).toDateString()}
              pubdate='true'
            >
              {new Date(post.date).toDateString()}
            </time>
          </p>
        </header>

        <section dangerouslySetInnerHTML={{ __html: post.content }} />

        <Comment />
      </article>
    </Layout>
  )
}
