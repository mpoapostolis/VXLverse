import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'

const storyThemes = [
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
    <ScrollArea
      style={{
        height: 'calc(100vh - 56px)',
      }}
    >
      <div className="space-y-4 py-4 border-r h-full">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Discover</h2>
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
    </ScrollArea>
  )
}
