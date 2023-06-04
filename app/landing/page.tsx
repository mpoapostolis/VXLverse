import { Sidebar } from '@/components/sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { HeartIcon } from 'lucide-react'

function Card() {
  return (
    <div className="w-full h-80 bg-card border">
      <div className="h-52">
        <img src="https://picsum.photos/id/237/536/354" className="w-full h-full object-cover" alt="" />
      </div>
      <div className="h-full p-2">
        <h3 className="text-lg font-semibold">Title</h3>
        <p className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
        <Separator className="my-2" />

        <div className="flex justify-end items-center">
          <HeartIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}

export default async function Page() {
  return (
    <div>
      <nav className="px-4 py-2 border-b flex items-center">
        <picture>
          <img src="/logo.webp" className="w-10 h-10" alt="VXLverse Logo" />
        </picture>
        <input
          placeholder="🔎 Search..."
          type="search"
          className="mx-auto h-8 w-96 bg-input  px-4 outline-none text-foreground"
        />
      </nav>
      <div className="grid lg:grid-cols-[15vw_1fr] gap-4">
        <Sidebar />
        <ScrollArea
          style={{
            height: 'calc(100vh - 56px)',
          }}
        >
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-5 gap-4 p-4">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
