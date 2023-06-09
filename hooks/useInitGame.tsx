import { useGame } from '@/lib/games/queries'
import { init, useStore } from '@/store'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function useInitGame() {
  const store = useStore()
  const params = useSearchParams()
  const id = params.get('id')

  useEffect(init, [])
  const { data: game } = useGame(id ?? undefined)

  useEffect(() => {
    if (!game) return
    store.clearInventory()
    store.setGame(game)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])

  return null
}
