import { useStore } from '@/store'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import * as Label from '@radix-ui/react-label'
import * as Menubar from '@radix-ui/react-menu'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { HexColorString } from 'three'
import { Upload } from '../upload'

export function SceneModal() {
  const store = useStore()

  const verb = store.currentScene === 'new' ? 'Create' : 'Edit'
  const selectedScene = store.scenes?.find((scene) => scene.uuid === store.currentScene)
  const router = useRouter()
  const hash = router.asPath.split('#')[1]
  const open = hash === 'new-scene' || hash === 'edit-scene'
  const close = () => router.replace('/')

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-10" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] z-20 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-mauve4 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">{verb} Scene</Dialog.Title>
          <Menubar.Separator className="my-1  h-[1px] bg-blackA5" />

          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Add a new scene to your project. You can add a background color or an equirectangular image.
          </Dialog.Description>

          <div className="">
            <div className=" mb-2 ">
              <Label.Root className="text-black11 w-full text-sm font-medium">Name</Label.Root>
              <input
                onChange={(evt) => {
                  store.updateScene(selectedScene?.uuid, {
                    name: evt.target.value,
                  })
                }}
                value={selectedScene?.name}
                className="rounded-none w-full  bg-white border-blackA7 border p-2 text-xs leading-none outline-none"
              />
            </div>
            <div className=" mb-2 ">
              <Label.Root className="text-black11 w-full text-sm font-medium">Background</Label.Root>
              <select
                onChange={(evt) => {
                  store.updateScene(selectedScene?.uuid, {
                    type: evt.target.value as 'color' | 'equirect',
                  })
                }}
                value={selectedScene?.type}
                className="rounded-none w-full  bg-white border-blackA7 border p-2 text-xs leading-none outline-none"
              >
                <option value="color">Color</option>
                <option value="equirect">Equirect</option>
              </select>
            </div>

            <Menubar.Separator className="my-4  h-[1px] bg-blackA5" />

            <div className="grid grid-cols-[80px_1fr] items-center gap-4 ">
              {selectedScene?.type === 'color' && (
                <>
                  <Label.Root className="text-black11 w-full text-sm font-medium">Color</Label.Root>

                  <input
                    onChange={(evt) => {
                      store.updateScene(selectedScene.uuid, {
                        color: evt.target.value as HexColorString,
                      })
                    }}
                    value={selectedScene?.color}
                    type="color"
                    className={clsx(' ml-auto w-20 h-20  p-0 file:hidden   file:text-end', {})}
                  />
                </>
              )}
              {selectedScene?.type === 'equirect' && (
                <>
                  <Label.Root className="text-black11 w-fit text-sm font-medium">Equirect</Label.Root>
                  <Upload
                    className={clsx(
                      'bg-base-300 ml-auto h-20 w-20 min-w-[40px] border border-dashed border-mauve8  ',
                      {},
                    )}
                    value={selectedScene?.equirect}
                    onChange={(blob, equirect) =>
                      store.updateScene(selectedScene?.uuid, {
                        blob,
                        equirect,
                      })
                    }
                  />
                </>
              )}
            </div>
            <div className="flex justify-end gap-x-4 mt-4">
              <button
                onClick={() => {
                  close()
                }}
                className="text-blackA111 hover:bg-blackA4  px-4 py-2 items-center justify-center rounded focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={close}
                className="text-blackA111 hover:bg-blackA4  px-4 py-2 items-center justify-center rounded focus:outline-none"
              >
                Save
              </button>
            </div>
          </div>

          <Dialog.Close asChild>
            <button
              onClick={close}
              className="text-blackA11 hover:bg-blackA4  px-4 py-2 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
