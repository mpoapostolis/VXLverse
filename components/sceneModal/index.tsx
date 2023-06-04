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
import { getUuid } from '@/store/utils'
import { ContextMenu, ContextMenuTrigger } from '@radix-ui/react-context-menu'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { Select } from '../select'
import { Badge } from '../ui/badge'
import { ScrollArea } from '../ui/scroll-area'

export function SceneModal(props: { onClick?: () => void; new?: boolean; children?: React.ReactNode }) {
  const store = useStore()
  const verb = props.new ? 'Create' : 'Edit'
  const selectedScene = store.scenes?.find((scene) => scene.uuid === store.currentScene)
  const [scene, setScene] = useState<string | undefined>()
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
      <DialogContent className="lg:w-[50vw] w-screen overflow-auto max-h-screen ">
        <DialogHeader>
          <DialogTitle>
            {verb} {props.new ? 'new scene' : selectedScene?.name}
          </DialogTitle>

          <DialogDescription className="text-xs">
            Customize your scene by changing the name, sky, color and more.
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
          <Label className=" w-full text-sm font-medium">Sky</Label>
          <Select
            className="border"
            options={[
              'sunset',
              'dawn',
              'night',
              'warehouse',
              'forest',
              'apartment',
              'studio',
              'city',
              'park',
              'lobby',
            ].map((o) => ({
              label: o,
              value: o,
            }))}
            value={selectedScene?.skyBox}
            onChange={(val) => {
              selectedScene &&
                store.updateScene(selectedScene.uuid, {
                  skyBox: val ?? undefined,
                })
            }}
          />
          <Label className=" mr-auto w-full text-sm font-medium">Color</Label>
          <input
            onChange={(evt) => {
              selectedScene &&
                store.updateScene(selectedScene.uuid, {
                  color: evt.target.value,
                })
            }}
            value={selectedScene?.color}
            type="color"
            className="w-20 h-10 appearance-none    p-0 file:hidden   file:text-end"
          />

          <Separator />

          <Label className=" w-full text-sm font-medium">
            Nodes
            <span className="text-muted text-xs ml-1">
              ({store.nodes.filter((node) => node.scene === selectedScene?.uuid).length})
            </span>
          </Label>
          <div className="flex gap-4 flex-wrap">
            {store.nodes
              ?.filter((node) => node.scene === selectedScene?.uuid)
              ?.map((node) => (
                <Badge
                  onClick={(evt) => {
                    evt.stopPropagation()
                    store.removeNode(`${node.uuid}`)
                  }}
                  className="bg-secondary text-secondary-foreground"
                  role="button"
                  key={node.uuid}
                >
                  {node.name}
                  <Trash2Icon className="ml-4 w-4 h-4 " />
                </Badge>
              ))}
          </div>

          {store.scenes.length > 1 && (
            <>
              <Label className=" w-full text-sm font-medium">Import nodes from other scenes</Label>
              <Select
                className="border"
                options={store.scenes
                  ?.filter((scene) => scene.uuid !== store.currentScene)
                  .map((scene) => ({
                    label: `${scene.name}`,
                    value: `${scene.uuid}`,
                  }))}
                value={scene}
                onChange={(val) => {
                  setScene(val ?? undefined)
                }}
              />

              {scene && (
                <ScrollArea className="border h-48 w-full rounded-md bg-input p-4 ">
                  <div className="gap-4 flex w-full flex-wrap">
                    {store.nodes
                      ?.filter((node) => node.scene === scene && node.gameType !== 'hero')
                      ?.map((node) => (
                        <Badge
                          onClick={(evt) => {
                            evt.stopPropagation()
                            store.addNode({
                              ...node,
                              uuid: getUuid(),
                              scene: store.currentScene,
                            })
                          }}
                          className="bg-secondary text-secondary-foreground"
                          role="button"
                          key={node.uuid}
                        >
                          {node.name}
                        </Badge>
                      ))}
                  </div>
                </ScrollArea>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
