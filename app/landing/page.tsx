import { Games } from '@/components/games'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'

export default async function Page() {
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
            <Games />
          </div>
        </div>
      </div>
    </div>
  )
}
