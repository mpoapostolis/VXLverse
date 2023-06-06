'use client'

import { useGames } from '@/lib/games/queries'
import { GameCard } from '../gameCard'

export function Games() {
  const { data: games } = useGames()
  return games?.map((game) => <GameCard {...game} key={game.id} />)
}
