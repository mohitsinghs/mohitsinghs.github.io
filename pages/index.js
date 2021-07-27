import Layout from '@/components/Layout'
import Section from '@/components/home/Section'
import { postsForHome } from 'lib/page'
import useTyped from '@/hooks/useTyped'

export default function IndexPage({ posts }) {
  const el = useTyped()
  return (
    <Layout
      type='home'
      header={
        <header>
          <h1>Mohit Singh</h1>
          <p>
            <span ref={el}>A Human and Dreamer</span>
          </p>
        </header>
      }
    >
      {Object.keys(posts).map((postType) => (
        <Section name={postType} key={postType}>
          {posts[postType]?.map((post) => (
            <Section.Card key={post.title} post={post} />
          ))}
        </Section>
      ))}
    </Layout>
  )
}
export async function getStaticProps() {
  return {
    props: {
      posts: await postsForHome(),
    },
  }
}
