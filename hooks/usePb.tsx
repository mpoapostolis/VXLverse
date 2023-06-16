import PocketBase from 'pocketbase'
import { useEffect, useState } from 'react'
export const PB_URL = 'https://admin.vxlverse.com'

export function usePb() {
  const [pb, setPb] = useState<PocketBase | null>(null)
  useEffect(() => {
    const pb = new PocketBase(PB_URL)
    setPb(pb)
  }, [])

  return pb
}
