import { getClientPocketBase } from '@/lib/pocketBase'
import { useEffect, useState } from 'react'

export function usePb() {
  const [initialized, setInitialized] = useState(false)
  const pb = getClientPocketBase()
  useEffect(() => {
    if (!initialized) setInitialized(true)
  }, [])
  // This hack is for useless hydration
  return initialized ? pb : null
}
