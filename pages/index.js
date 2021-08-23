import Header from '@/components/home/Header'
import Section from '@/components/home/Section'
import Layout from '@/components/Layout'
import { postsForHome } from 'lib/page'

export default function IndexPage({ posts }) {
  return (
    <Layout home header={<Header />}>
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
