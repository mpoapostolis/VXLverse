'use client'

import { useGames } from '@/lib/games/queries'
import { Loader2 } from 'lucide-react'
import { GameCard } from '../gameCard'

export function Games() {
  const { data: games, isLoading } = useGames()
  return isLoading ? (
    <div className="animate-pulse flex">
      <Loader2 className="animate-spin mr-1" />
      Loading...
    </div>
  ) : (
    games?.map((game) => <GameCard loading={isLoading} {...game} key={game.id} />)
  )
}
