import { useStore } from '@/store'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons'
import { Separator } from '@radix-ui/react-menubar'
import { useRouter } from 'next/router'
import { Mesh } from 'three'

export function BucketModal() {
  const store = useStore()

  const router = useRouter()
  const hash = router.asPath.split('#')[1]
  const open = hash === 'bucket'
  const close = () => router.replace('/')

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-10" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] z-20 max-h-[85vh] w-[75vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-mauve4 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className=" m-0 text-[17px] font-medium">Bucket Editor</Dialog.Title>
          <Separator className="my-1  h-[1px] bg-blackA5" />

          <Dialog.Description className=" mt-[10px] mb-5 text-[15px] leading-normal">
            You can use bucket to add Rewards or Required Items to Your Quests
          </Dialog.Description>

          <div className="flex flex-wrap gap-4">
            {store.bucket.map((item, idx) => {
              return (
                <div key={item.uuid} className="w-40 h-40  bg-black relative rounded">
                  <img className="h-full  w-full object-contain" alt="gallery" src={item.url} />
                  <input
                    onChange={(e) => {
                      store.updateBucket(item.uuid, { ...item, name: e.target.value })
                    }}
                    value={item.name}
                    type="text"
                    className="border absolute bottom-0 outline-none rounded-b w-full h-8 px-2  text-xs"
                  />
                </div>
              )
            })}

            <div className={'relative'}>
              <input
                onChange={(e) => {
                  if (!e.target.files) return

                  Array.from(e.target.files).map((file) => {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                      const buffer = reader.result as ArrayBuffer
                      const blob = new Blob([buffer], { type: 'application/octet-stream' })
                      const mesh = new Mesh()
                      let f = file.name
                      const ext = f.split('.').pop()
                      const name = f.split('.').slice(0, -1).join('.')
                      store.addToBucket({
                        uuid: mesh.uuid,
                        blob: blob,
                        ext: ext,
                        name: name,
                        url: URL.createObjectURL(blob),
                      })
                    }
                    reader.readAsArrayBuffer(file)
                  }),
                    (e.target.value = '')
                }}
                multiple
                accept="image/*"
                className="absolute left-0 top-0 h-full w-full opacity-0"
                type="file"
              />
              <div className="border h-40 w-40 text-xs border-dashed   border-mauve8   grid place-items-center rounded ">
                <div className="flex flex-col items-center justify-center">
                  <UploadIcon />
                  <div className="mt-2">New Image</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-x-4 mt-4">
            <button
              onClick={() => {
                close()
              }}
              className=" hover:bg-blackA4  px-4 py-2 items-center justify-center rounded focus:outline-none"
            >
              Close
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
  )
}
