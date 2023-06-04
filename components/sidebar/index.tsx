import { FilterIcon } from 'lucide-react'
import { Button } from '../ui/button'

export const storyThemes = [
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
  return (
    <div className="pb-4  h-full ">
      <div className="px-4 py-2">
        <h1 className="mb-2 flex px-2 text-lg  items-center font-semibold tracking-tight w-full">
          Discover
          <FilterIcon className="w-4 h-4  ml-auto" />
        </h1>
        <div className="space-y-1">
          <Button variant="secondary" size="sm" className="w-full justify-start">
            New Releases
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            Top Rated
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            Trending
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            My Games
          </Button>
        </div>
      </div>
      <div className="px-4 py-2">
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Genres</h2>
        <div className="space-y-1">
          {storyThemes.map((format) => (
            <Button variant="ghost" size="default" className="w-full text-left truncate justify-start" key={format}>
              {format}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
