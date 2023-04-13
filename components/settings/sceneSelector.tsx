import { useStore } from '@/store'
import * as Menubar from '@radix-ui/react-menubar'
import Link from 'next/link'
import { Mesh } from 'three'
import { Select } from '../select'

export function SceneSelector() {
  const store = useStore()
  return (
    <>
      <div className="grid grid-cols-[1fr_36px_36px] gap-1 items-end">
        <Select
          label="Select Scene..."
          onChange={(val) => {
            store.setCurrentScene(val)
          }}
          value={store?.currentScene}
          options={store.scenes?.map((s) => ({
            label: s?.name ?? '-',
            value: s?.uuid ?? '-',
          }))}
        />
        <Link
          href={{
            hash: 'scene-modal',
          }}
        >
          <button className="w-full rounded grid items-center bg-mauve1 px-2 py-1   text-blackA10 text-xs border border-blackA6">
            ✏️
          </button>
        </Link>

        <button
          disabled={store.currentScene === 'default'}
          onClick={() => store.deleteScene()}
          className="w-full disabled:opacity-50 disabled:cursor-not-allowed rounded grid items-center bg-mauve1 px-2 py-1   text-blackA10 text-xs border border-blackA6"
        >
          🗑️
        </button>
      </div>
      <Link
        href={{
          hash: 'scene-modal',
        }}
      >
        <button
          onClick={() => {
            const mesh = new Mesh()
            store.addScene({
              uuid: mesh.uuid,
              type: 'color',
              name: 'New Scene',
              color: '#999',
            })
          }}
          className="w-full grid items-center bg-mauve7 px-2 py-1 text-blackA10 text-xs border border-blackA4 font-bold mt-2"
        >
          New Scene
        </button>
      </Link>
      <Menubar.Separator className="my-4  h-[1px] bg-blackA5" />
    </>
  )
}
