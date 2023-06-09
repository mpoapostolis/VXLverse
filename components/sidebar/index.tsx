'use client'
import { cn } from '@/lib/utils'
import { AlertOctagonIcon, FilterIcon, GamepadIcon, HeartIcon, SmileIcon, TrendingUpIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'

export const storyThemes = [
  'All',
  'Horror',
  'Comedy',
  'Fantasy',
  'Science Fiction',
  'Mystery',
  'Drama',
  'Thriller',
  'Romance',
  'Historical',
  'Crime',
  'Adventure',
  'Supernatural',
  'Paranormal',
  'Action',
  'War',
  'Biographical',
  'Political',
  'Espionage',
  'Fairy Tale',
  'Dystopian',
  'Post-Apocalyptic',
  'Survival',
  'Steampunk',
  'Cyberpunk',
  'Western',
  'Space Opera',
  'Superhero',
  'Noir',
  'Mythology',
  'Lovecraftian',
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const params = useSearchParams()
  const sort = params.get('sort')
  const genre = params.get('genre')
  return (
    <div
      className={cn('pb-4 transition duration-150 lg:h-full overflow-hidden  ', {
        'h-full': isOpen,
        'h-9': !isOpen,
      })}
    >
      <div className="px-4 py-2">
        <h1
          onClick={() => setIsOpen(!isOpen)}
          className={'mb-2 flex text-lg  items-center font-semibold tracking-tight w-full'}
        >
          Filters
          <FilterIcon className="w-4 h-4  ml-auto" />
        </h1>
        <div>
          <Label className="mb-2 block  text-sm">Sort By</Label>
          <Link
            href={{
              pathname: '/',
              query: {
                genre,
                sort: 'new',
              },
            }}
          >
            <Button
              className={cn('w-full border-secondary bg-transparent hover:bg-card  text-left truncate justify-start', {
                'text-secondary font-bold': sort === 'new' || !sort,
              })}
            >
              <AlertOctagonIcon className="mr-3  w-4 h-4" />
              New Releases
            </Button>
          </Link>

          <Link
            href={{
              pathname: '/',
              query: {
                genre,
                sort: 'rate',
              },
            }}
          >
            <Button
              className={cn('w-full border-secondary bg-transparent hover:bg-card  text-left truncate justify-start', {
                'text-secondary font-bold': sort === 'rate',
              })}
            >
              <TrendingUpIcon className="mr-3  w-4 h-4" /> Top Rated
            </Button>
          </Link>
          <Link
            href={{
              pathname: '/',
              query: {
                genre,
                sort: 'plays',
              },
            }}
          >
            <Button
              className={cn('w-full border-secondary bg-transparent hover:bg-card  text-left truncate justify-start', {
                'text-secondary font-bold': sort === 'plays',
              })}
            >
              <SmileIcon className="mr-3  w-4 h-4" />
              Most Played
            </Button>
          </Link>
          <Link
            href={{
              pathname: '/',
              query: {
                genre,
                sort: 'favorites',
              },
            }}
          >
            <Button
              className={cn('w-full border-secondary bg-transparent hover:bg-card  text-left truncate justify-start', {
                'text-secondary font-bold': sort === 'favorites',
              })}
            >
              <HeartIcon className="mr-3  w-4 h-4" />
              Most Liked
            </Button>
          </Link>
        </div>
      </div>
      <div className="px-4 py-2">
        <Label className="mb-2 block text-sm">Genres</Label>
        <div>
          {storyThemes.map((format) => (
            <Link
              href={{
                pathname: '/',
                query: {
                  sort,
                  genre: format === 'All' ? null : format,
                },
              }}
              key={format}
            >
              <Button
                className={cn(
                  'w-full border-secondary bg-transparent hover:bg-card  text-left truncate justify-start',
                  {
                    'text-secondary font-bold': format === 'All' ? !genre : genre === format,
                  },
                )}
              >
                <GamepadIcon className="mr-3  w-4 h-4 " /> {format}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
