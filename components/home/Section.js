import Link from 'next/link'
import { ChevronRight } from 'react-feather'
import Card from './Card'

function Section({ name, children }) {
  return (
    <section className='flex flex-col w-full max-w-5xl px-4 py-4 mx-auto'>
      <h2 className='py-4 text-xl font-bold tracking-wide text-gray-600'>
        {name}
      </h2>
      <ul className='grid grid-flow-row gap-4 md:grid-flow-col auto-rows-fr'>
        {children}
      </ul>
      <Link href={`/${name.toLowerCase()}`}>
        <a className='flex items-center self-end mt-8 text-sm font-bold text-gray-600 cursor-pointer select-none hover:text-gray-700'>
          More
          <ChevronRight size={16} />
        </a>
      </Link>
    </section>
  )
}

Section.Card = Card

export default Section
