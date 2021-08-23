import useTyped from '@/hooks/useTyped'

export default function Header() {
  const el = useTyped()
  return (
    <header className='flex flex-col items-center justify-center w-full py-16'>
      <h1 className='py-2 text-4xl font-bold text-gray-700'>Mohit Singh</h1>
      <p className='py-2 text-gray-600 whitespace-pre'>
        <span ref={el}>A Human and Dreamer</span>
      </p>
    </header>
  )
}
