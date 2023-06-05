import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ContextMenu, ContextMenuTrigger } from '@radix-ui/react-context-menu'
import { GearIcon } from '@radix-ui/react-icons'
import { Select } from '../select'
import { Button } from '../ui/button'
import { MenubarShortcut } from '../ui/menubar'
import { Upload } from '../upload'

export function GameModal() {
  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <DialogTrigger asChild>
            <div className="relative flex cursor-default hover:bg-secondary hover:text-secondary-foreground bg-opacity-10 select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Settings
              <MenubarShortcut>
                <GearIcon />
              </MenubarShortcut>
            </div>
          </DialogTrigger>
        </ContextMenuTrigger>
      </ContextMenu>
      <DialogContent className="lg:w-[50vw] bg-input w-screen overflow-auto max-h-screen ">
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <DialogHeader>
            <DialogTitle>Game Settings</DialogTitle>
            <DialogDescription className="text-xs">Customize your game settings here.</DialogDescription>
          </DialogHeader>
          <Separator className="my-2" />

          <div className="grid  items-center gap-2 ">
            <Label className=" w-full text-sm font-medium">Name</Label>
            <input
              name="name"
              onChange={(evt) => {}}
              className="rounded-none w-full  bg-background  p-2 text-xs leading-none outline-none"
            />
            <Label className=" w-full text-sm font-medium">Description</Label>
            <textarea
              onChange={(evt) => {}}
              rows={5}
              className="rounded-none w-full  bg-background  p-2 text-xs leading-none outline-none"
            />
            <Label className=" w-full text-sm font-medium">Genre</Label>
            <Select
              name="genre"
              onChange={(evt) => {}}
              className="rounded-none border-none py-1 w-full  bg-background text-xs leading-none outline-none"
              options={[]}
            />

            <Label className=" w-full text-sm font-medium">
              Thumbnail <span className="text-xs text-muted">(Optional)</span>
            </Label>
            <Upload accept="image/*" className="h-60 w-full bg-background" onChange={console.log} />
          </div>
          <Separator className="my-4" />
          <DialogFooter>
            <Button type="submit" variant="default" className="bg-background w-40">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
