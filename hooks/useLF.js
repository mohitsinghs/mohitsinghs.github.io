import { useEffect, useState } from 'react'

//  A hook to use littlefoot for footnotes

export default function useLF() {
  const [lf, setLf] = useState(null)

  useEffect(() => {
    async function initLf() {
      const { default: lf } = await import('littlefoot')
      setLf(lf)
    }
    initLf()
    return (() => {
      if (lf) {
        lf.unmount()
      }
    })()
  }, [])
  return lf
}
