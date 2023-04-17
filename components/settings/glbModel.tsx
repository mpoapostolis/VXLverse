import { useStore } from '@/store'
import * as Label from '@radix-ui/react-label'
import { Separator } from '@radix-ui/react-menubar'
import { Euler, Mesh } from 'three'

export function GlbModel() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const rot = selected?.rotation ?? new Euler(0, 0, 0)
  return ['hero', 'enemy', 'npc'].includes(selected?.gameType ?? '') ? (
    <>
      <Separator className="my-4  h-[1px] bg-blackA5" />
      <Label.Root className="text-black11 truncate w-full text-sm font-semibold mb-3 block ">3d Model</Label.Root>
      <div className="grid grid-cols-[1fr_2fr] xs place-items-center">
        <Label.Root className="text-blackA9 w-full text-xs font-medium">Glb / Gltf</Label.Root>
        <input
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            const reader = new FileReader()
            reader.onload = (e) => {
              if (!selected?.uuid) return
              const buffer = reader.result as ArrayBuffer
              const blob = new Blob([buffer], { type: 'application/octet-stream' })
              const mesh = new Mesh()
              store.updateNode(selected.uuid, {
                ...mesh,
                url: URL.createObjectURL(blob),
                blob,
                name: file.name,
                type: 'GLTF',
              })
            }
            reader.readAsArrayBuffer(file)

            e.target.value = ''
          }}
          type="file"
          accept=".gltf, .glb"
          className="text-blackA11  flex   rounded-none  h-6 w-full flex-1 items-center justify-center border p-1 border-blackA7  text-xs leading-none outline-none mb-2"
        />
      </div>
    </>
  ) : null
}
