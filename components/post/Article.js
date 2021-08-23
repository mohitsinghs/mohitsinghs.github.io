import Layout from '@/components/Layout'
import useLF from '@/hooks/useLF'
import 'littlefoot/dist/littlefoot.css'

export default function Article({ post }) {
  useLF()
  return (
    <Layout
      title={`${post.title} | Blog of Mohit Singh`}
      description={post.excerpt}
      url={post.link}
    >
      <article
        className='w-full px-4 py-24'
        itemID='#'
        itemScope
        itemType='http://schema.org/BlogPosting'
      >
        <header className='w-full mx-auto mb-12 text-center md:w-2/3'>
          <h1
            className='mb-3 text-4xl font-bold text-gray-700 md:leading-tight md:text-5xl'
            itemProp='headline'
            title={post.title}
          >
            {post.title}
          </h1>
          <p className='text-xs text-gray-600 md:text-sm'>
            Written by
            <span
              className='font-medium text-gray-700'
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

        <section
          className='mx-auto prose'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Layout>
  )
}
