import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

export default function useTyped() {
  const el = useRef(null)
  const typed = useRef(null)
  useEffect(() => {
    const options = {
      strings: [
        'A Fitness Freak',
        'An Open Sourcerer',
        'A Physics Enthusiast',
        'A Full Stack Developer',
        'A DevOps Engineer',
        'A Human and Dreamer',
      ],
      typeSpeed: 50,
      backSpeed: 50,
      smartBackspace: true,
      loop: true,
    }
    typed.current = new Typed(el.current, options)
    return () => {
      typed.current.destroy()
    }
  }, [])
  return el
}
