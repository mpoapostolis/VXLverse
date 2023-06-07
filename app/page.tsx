import { Account } from '@/components/account'
import { Games } from '@/components/games'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
  return (
    <div className="h-screen w-screen  overflow-auto relative">
      <nav className="px-4  w-full flex border-b sticky top-0 mb-2 h-10  items-center gap-4 z-50 bg-background">
        <picture>
          <img src="/logo.webp" className="w-6 h-6" alt="VXLverse Logo" />
        </picture>

        <Button variant="link" className="ml-auto  text-foreground  hover:text-secondary">
          <Link href="/editor">Editor</Link>
        </Button>

        <Account />
      </nav>
      <div className="grid  lg:grid-cols-[15vw_1fr] grid-cols-1 gap-4">
        <Sidebar />
        <div className="p-4  h-full w-full">
          <div className="flex ml-auto w-full items-center lg:w-96  justify-center">
            <input
              placeholder="🔎 Search..."
              type="search"
              className="  h-8 bg-input pl-4 outline-none w-full  border text-foreground"
            />
            <Button
              aria-label="search"
              variant="ghost"
              className=" grid place-items-center  p-0 px-4 h-8 bg-input border border-l-0 "
            >
              <SearchIcon className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-5 gap-4 ">
            <Games />
          </div>
        </div>
      </div>
    </div>
  )
}
