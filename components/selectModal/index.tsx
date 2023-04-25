import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { useItems } from '@/lib/items/queries'
import { useModels } from '@/lib/models/queries'
import { useStore } from '@/store'
import { ContextMenu, ContextMenuTrigger } from '@radix-ui/react-context-menu'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { MenubarShortcut } from '../ui/menubar'
import { Separator } from '../ui/separator'

export function SelectModal(props: { children?: React.ReactNode; type: 'models' | 'items' }) {
  const store = useStore()
  const { data: models } = useModels()
  const { data: items } = useItems()
  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <DialogTrigger asChild>
            <Button size="default">
              Select
              <MenubarShortcut>
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </MenubarShortcut>
            </Button>
          </DialogTrigger>
        </ContextMenuTrigger>
      </ContextMenu>
      <DialogContent className="lg:w-[80vw] w-screen ">
        <DialogHeader>
          <Input
            type="search"
            className="rounded-2xl  w-full  px-4 placeholder:text-muted  duration-100 py-4"
            placeholder="🔍 Search..."
          />
        </DialogHeader>
        <Separator />
        <div className="grid ">
          <div className="grid grid-cols-6 gap-4 overflow-auto max-h-[75vh]">
            {Array(30)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="relative">
                  <picture>
                    <img
                      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                      alt="Photo by Drew Beamer"
                      className="rounded-md object-cover hover:opacity-20 cursor-pointer border-secondary"
                    />
                  </picture>
                  <Label className="pl-2 bg-opacity-60 absolute text-xs top-0 py-2 left-0 w-full bg-black ">{i}</Label>
                </div>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
