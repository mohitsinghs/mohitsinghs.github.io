import Card from './Card'
import Link from 'next/link'
import { ChevronRight } from 'react-feather'

function Section({ name, children }) {
  return (
    <section>
      <h2>{name}</h2>
      <ul>{children}</ul>
      <Link href={`/${name.toLowerCase()}`}>
        <a>
          More
          <ChevronRight size={16} />
        </a>
      </Link>
    </section>
  )
}

Section.Card = Card

export default Section
