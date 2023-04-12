import { useStore } from '@/store'
import * as Label from '@radix-ui/react-label'
import clsx from 'clsx'
import { HexColorString } from 'three'
import { Upload } from '../upload'

export function SceneSettings() {
  const store = useStore()
  return (
    <div className="">
      <div className="flex mb-2">
        <Label.Root className="text-black11 w-full text-sm font-medium">Scene Background</Label.Root>
        <select
          onChange={(evt) => {
            store.setScene({
              type: evt.target.value as 'color' | 'equirect',
            })
          }}
          value={store?.scene?.type}
          className="rounded-none w-full  bg-white border-blackA7 border text-xs leading-none outline-none"
        >
          <option value="color">Color</option>
          <option value="equirect">Equirect</option>
        </select>
      </div>

      <div className="grid grid-cols-[80px_1fr] items-center gap-4 ">
        {store.scene?.type === 'color' && (
          <>
            <Label.Root className="text-black11 w-full text-sm font-medium">Color</Label.Root>

            <input
              onChange={(evt) => {
                store.setScene({
                  ...store.scene,
                  color: evt.target.value as HexColorString,
                })
              }}
              type="color"
              className={clsx(' ml-auto w-20  p-0 file:hidden   file:text-end', {})}
            />
          </>
        )}
        {store.scene?.type === 'equirect' && (
          <>
            <Label.Root className="text-black11 w-fit text-sm font-medium">Equirect</Label.Root>
            <Upload
              className={clsx('bg-base-300 ml-auto h-20 w-20 min-w-[40px] border border-dashed border-mauve8  ', {})}
              onChange={(blob, equirect) =>
                store.setScene({
                  ...store.scene,
                  blob,
                  equirect,
                })
              }
            />
          </>
        )}
      </div>
    </div>
  )
}
