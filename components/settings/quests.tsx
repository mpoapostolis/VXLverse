import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import * as Label from '@radix-ui/react-label'
import { useState } from 'react'
import { Select } from '../select'

export function Quests() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const [open, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  return ['hero', 'monster', 'npc'].includes(selected?.gameType ?? '') ? (
    <>
      <Separator className="my-4" />
      <Label.Root className=" truncate w-full text-sm font-semibold mb-4 block text-secondary ">Quests</Label.Root>
      <button
        onClick={() => {
          setOpen(true)
        }}
        className="w-full border border-dashed border-black border-opacity-25 py-6 text-xs"
      >
        Dialogue Editor
      </button>{' '}
      <Dialog.Root open={open}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-10" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] z-20 max-h-[85vh] w-[75vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-mauve4 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <div className="grid grid-cols-5 gap-4">
              <Label.Root className=" w-full text-sm font-medium">Quest Name</Label.Root>
              <Label.Root className=" w-full text-sm font-medium">Required Item</Label.Root>
              <Label.Root className=" w-full text-sm font-medium">Quest Description</Label.Root>
              <Label.Root className=" w-full text-sm font-medium">Quest complete</Label.Root>
              <Label.Root className=" w-full text-sm font-medium">Reward</Label.Root>
              <input type="text" className="border outline-none w-full border-mauve7 h-8 px-2  text-xs" />
              <Select
                options={{
                  nodes:
                    store?.nodes.map((node) => ({
                      label: `${node.name}`,
                      value: `${node.uuid}`,
                    })) ?? [],

                  bucket:
                    store?.bucket.map((node) => ({
                      label: `${node.name}`,
                      value: `${node.uuid}`,
                    })) ?? [],
                }}
                onChange={console.log}
              />
              <input type="text" className="border outline-none w-full border-mauve7 h-8 px-2  text-xs" />
              <input type="text" className="border outline-none w-full border-mauve7 h-8 px-2  text-xs" />
              <Select
                options={{
                  nodes:
                    store?.nodes.map((node) => ({
                      label: `${node.name}`,
                      value: `${node.uuid}`,
                    })) ?? [],

                  bucket:
                    store?.bucket.map((node) => ({
                      label: `${node.name}`,
                      value: `${node.uuid}`,
                    })) ?? [],
                }}
                onChange={console.log}
              />
            </div>
            <div className="flex justify-end gap-x-4 mt-4">
              <button
                onClick={() => {
                  close()
                }}
                className=" hover:bg-blackA4  px-4 py-2 items-center justify-center rounded focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={close}
                className=" hover:bg-blackA4  px-4 py-2 items-center justify-center rounded focus:outline-none"
              >
                Save
              </button>
            </div>

            <Dialog.Close asChild>
              <button
                onClick={close}
                className=" hover:bg-blackA4  px-4 py-2 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded focus:outline-none"
                aria-label="Close"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  ) : null
}
