import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useStore } from '@/store'
import { ContextMenu, ContextMenuTrigger } from '@radix-ui/react-context-menu'

export function SceneModal(props: { onClick?: () => void; new?: boolean; children?: React.ReactNode }) {
  const store = useStore()
  const verb = props.new ? 'Create' : 'Edit'
  const selectedScene = store.scenes?.find((scene) => scene.uuid === store.currentScene)
  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <DialogTrigger asChild>
            <div
              onClick={props?.onClick}
              className={cn(
                'relative flex cursor-default hover:bg-secondary hover:text-secondary-foreground bg-opacity-10 select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
              )}
            >
              {props.children}
            </div>
          </DialogTrigger>
        </ContextMenuTrigger>
      </ContextMenu>
      <DialogContent className="lg:w-96 w-screen ">
        <DialogHeader>
          <DialogTitle>
            {verb} {props.new ? 'new scene' : selectedScene?.name}
          </DialogTitle>

          <DialogDescription className="text-xs">
            You can add a background color or an equirectangular image.
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-2" />

        <div className="grid  items-center gap-4 ">
          <Label className=" w-full text-sm font-medium">Name</Label>
          <input
            onChange={(evt) => {
              store.updateScene(selectedScene?.uuid, {
                name: evt.target.value,
              })
            }}
            value={selectedScene?.name}
            className="rounded-none w-full  bg-input border-blackA7 border p-2 text-xs leading-none outline-none"
          />

          <Label className=" w-full text-sm font-medium">Scene intro</Label>
          <textarea
            onChange={(evt) => {
              store.updateScene(selectedScene?.uuid, {
                intro: evt.target.value,
              })
            }}
            value={selectedScene?.intro}
            rows={5}
            className="rounded-none w-full  bg-input border-blackA7 border p-2 text-xs leading-none outline-none"
          />
          <Label className=" w-full text-sm font-medium">Color</Label>
          <input
            onChange={(evt) => {
              selectedScene &&
                store.updateScene(selectedScene.uuid, {
                  color: evt.target.value,
                })
            }}
            value={selectedScene?.color}
            type="color"
            className="ml-auto  w-full h-20 p-0 file:hidden   file:text-end"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
