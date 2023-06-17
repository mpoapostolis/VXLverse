import { getClientPocketBase } from '@/lib/pocketBase'
import PocketBase from 'pocketbase'
import { useEffect, useState } from 'react'

export function usePb() {
  const [pb, setPb] = useState<PocketBase | null>(null)
  useEffect(() => {
    const pb = getClientPocketBase()
    setPb(pb)
  }, [])

  return pb
}
