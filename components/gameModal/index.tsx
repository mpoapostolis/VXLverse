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
import { useStore } from '@/store'
import { ContextMenu, ContextMenuTrigger } from '@radix-ui/react-context-menu'
import { Share1Icon } from '@radix-ui/react-icons'
import axios from 'axios'
import Link from 'next/link'
import { Select } from '../select'
import { storyThemes } from '../sidebar'
import { Button } from '../ui/button'
import { MenubarShortcut } from '../ui/menubar'
import { Switch } from '../ui/switch'
import { toast } from '../ui/use-toast'
import { Upload } from '../upload'

export function GameModal() {
  const store = useStore()
  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <DialogTrigger asChild>
            <div className="relative flex cursor-default hover:bg-secondary hover:text-secondary-foreground bg-opacity-10 select-none items-center rounded-sm px-2 py-1.5 text-xs focus:outline-secondary outline-1 outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              {store.gameInfo?.id ? 'Edit' : 'Publish'}
              <MenubarShortcut>
                <Share1Icon />
              </MenubarShortcut>
            </div>
          </DialogTrigger>
        </ContextMenuTrigger>
      </ContextMenu>
      <DialogContent className="lg:w-[50vw] bg-input w-screen overflow-auto max-h-screen ">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const preview = e.currentTarget.preview.files[0]
            const formData = new FormData(e.currentTarget as HTMLFormElement)
            if (!preview) formData.delete('preview')

            const _public = formData.get('public')
            formData.delete('public')
            formData.append('public', _public === 'on' ? 'True' : 'False')

            const storeOjb = {
              nodes:
                store.nodes?.map((e) => ({
                  ...e,
                  actions: undefined,
                })) ?? [],
              quests: store.quests,
              scenes: store.scenes,
            }
            formData.append('store', JSON.stringify(storeOjb))
            let data
            if (store.gameInfo?.id) {
              data = (await axios.put(`/api/games/${store.gameInfo?.id}`, formData)).data
            } else {
              data = (await axios.post('/api/games', formData)).data
            }
            store.setGameInfo(data)

            toast({
              title: `You have successfully ${store.gameInfo?.id ? 'update' : 'published'} your game!`,
              description: (
                <Label className="text-base ">
                  Click
                  <Link
                    className="mx-2 font-bold text-secondary"
                    href={`https://vxlverse.com/game?id=${data.id}`}
                    target="_blank"
                  >
                    here
                  </Link>
                  to play it!
                </Label>
              ),
            })
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
              defaultValue={store.gameInfo?.name}
              required
              name="name"
              onChange={(evt) => {}}
              className="rounded-none w-full  bg-background  p-2 text-xs leading-none focus:outline-secondary outline-1 outline-none"
            />
            <Label className=" w-full text-sm font-medium">Description</Label>
            <textarea
              required
              defaultValue={store.gameInfo?.description}
              name="description"
              onChange={(evt) => {}}
              rows={5}
              className="rounded-none w-full  bg-background  p-2 text-xs leading-none focus:outline-secondary outline-1 outline-none"
            />
            <Label className="w-full text-sm font-medium">Genre</Label>
            <Select
              required
              controlled={false}
              defaultValue={store.gameInfo?.genre}
              className="rounded-none w-full  bg-background  p-2 text-xs leading-none focus:outline-secondary focus:outline-1 focus:outline"
              name="genre"
              onChange={console.log}
              options={storyThemes.map((theme) => ({
                label: `${theme}`,
                value: `${theme}`,
              }))}
            />

            <Label className=" w-full text-sm font-medium">Thumbnail</Label>
            <Upload
              value={store.gameInfo?.preview}
              required
              accept="image/*"
              name="preview"
              className="h-60 w-full bg-background focus:outline-secondary outline-1 outline-none"
              onChange={console.log}
            />
            <div className=" gap-4 items-center flex">
              <Label className=" w-fit   text-sm font-medium">Public</Label>
              <Switch defaultChecked={Boolean(store.gameInfo?.public)} name="public" />
            </div>
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
