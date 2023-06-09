'use client'

import { useGames } from '@/lib/games/queries'
import { cn } from '@/lib/utils'
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { GameCard } from '../gameCard'

export function Games() {
  const { data: games, isLoading } = useGames()
  const params = useSearchParams()
  const offset = Number(params.get('offset') ?? 0)
  const genre = params.get('genre')
  const search = params.get('search')
  const sort = params.get('sort')

  const length = 1000
  const start = Math.max(offset - 2, 0)
  const end = Math.min(offset + 2, length)
  const pages = Array.from({ length: end - start }, (_, i) => start + i)
  return (
    <div className="relative">
      <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-5 gap-4 ">
        {games?.map((game) => (
          <GameCard loading={isLoading} {...game} key={game.id} />
        ))}

        {isLoading && (
          <div className="animate-pulse flex">
            <Loader2 className="animate-spin mr-1" />
            Loading...
          </div>
        )}
      </div>

      <div className="absolute -bottom-20  left-0 w-full  justify-center">
        <div className="flex gap-2 w-full justify-center border-t p-4">
          {/* generate the buttons depends on length */}
          <Link href={`/?offset=${0}`}>
            <button className="bg-transparent border border-secondary text-secondary text-xs rounded-full w-8 h-8 flex items-center justify-center">
              <DoubleArrowLeftIcon className="w-4 h-4" />
            </button>
          </Link>

          {pages.map((i) => (
            <Link
              href={{
                query: {
                  offset: i,
                  search,
                  sort,
                  genre,
                },
              }}
              key={i}
            >
              <button
                className={cn(
                  'border bg-transparent border-secondary text-secondary text-xs rounded-full w-8 h-8 flex items-center justify-center',
                  {
                    'bg-secondary text-secondary-foreground': i === offset,
                  },
                )}
              >
                {i + 1}
              </button>
            </Link>
          ))}

          <Link href={`/?offset=${length}`}>
            <button className="bg-transparent border border-secondary text-secondary text-xs rounded-full w-8 h-8 flex items-center justify-center">
              <DoubleArrowRightIcon className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
