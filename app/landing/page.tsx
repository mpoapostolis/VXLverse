import { Sidebar } from '@/components/sidebar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Game } from '@/lib/games/types'
import axios from 'axios'
import { HeartIcon, SearchIcon } from 'lucide-react'

function Card(props: Game) {
  return (
    <div className="w-full h-96 bg-card border relative">
      <div className="h-52">
        <picture>
          <img src="https://picsum.photos/id/237/536/354" className="w-full h-full object-cover" alt="" />
        </picture>
      </div>
      <Badge role="button" className=" flex justify-end items-center absolute top-0 right-0 rounded-none  z-50">
        <HeartIcon className="w-4 h-4" />
        <span className="ml-1 text-muted">
          x <span className="  text-xs">100</span>
        </span>
      </Badge>
      <div className="p-2 h-44 flex flex-col">
        <h3 className="text-lg font-semibold">{props?.name ?? '-'}</h3>
        <div className="flex items-center text-xs">{props?.createdBy ?? '-'}</div>
        <Separator className="my-2" />
        <p className="text-xs">{props?.description ?? '-'}</p>
        <Badge variant="outline" className="text-xs w-fit mb-2 mt-auto">
          Horror
        </Badge>
      </div>
    </div>
  )
}

export default async function Page() {
  const { data } = await axios.get<Game[]>('http://localhost:3000/api/games')
  return (
    <div className="h-screen w-screen  overflow-auto">
      <nav className="px-4 py-2 mb-2 flex items-center  z-50 bg-background">
        <picture>
          <img src="/logo.webp" className="w-10 h-10" alt="VXLverse Logo" />
        </picture>
        <div className="mx-auto flex items-center">
          <input
            placeholder="🔎 Search..."
            type="search"
            className=" rounded-l-full h-10 w-96 bg-input  px-4  outline-none  border text-foreground"
          />
          <Button variant="ghost" className="rounded-r-full h-10 bg-input border-l-0 border">
            <SearchIcon />
          </Button>
        </div>
      </nav>
      <div className="grid  lg:grid-cols-[15vw_1fr] grid-cols-1 gap-4">
        <div className="hidden lg:block sticky top-40">
          <Sidebar />
        </div>
        <div className="p-4">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-5 gap-4 ">
            {data.map((game) => (
              <Card {...game} key={game.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
