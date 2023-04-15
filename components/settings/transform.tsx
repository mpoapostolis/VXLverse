import { useStore } from '@/store'
import * as Label from '@radix-ui/react-label'
import * as Menubar from '@radix-ui/react-menubar'
import { Euler, Mesh, Vector3 } from 'three'
import { Xyz } from '../xyz'

export function TransformSettings() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const rot = selected?.rotation ?? new Euler(0, 0, 0)

  return !selected ? null : (
    <>
      <Menubar.Separator className="my-4  h-[1px] bg-blackA5" />
      <Label.Root className="text-black11 truncate w-full text-sm font-semibold mb-3 block ">Transform</Label.Root>
      <div className="mb-2 grid grid-cols-[1fr_3fr] ">
        <Label.Root className="text-black11 w-full text-sm font-medium">Type</Label.Root>
        <Label.Root className="text-black11 w-full text-sm font-medium">
          {selected.type}
          <span className="text-xs text-blackA10 ml-1">- {selected?.gameType ?? selected.type}</span>
        </Label.Root>
      </div>

      <div className="grid grid-cols-[1fr_3fr] ">
        <Label.Root className="text-black11 w-full text-sm font-medium">Name</Label.Root>
        <input
          onChange={(evt) => {
            if (!selected?.uuid) return
            store.updateNode(selected.uuid, { name: evt.target.value })
          }}
          value={selected?.name ?? selected?.type}
          className="text-blackA11  rounded-none inline-flex h-6 w-full flex-1 items-center justify-center  pl-2.5 border-blackA7 border text-xs leading-none outline-none mb-2"
        />
      </div>

      {['hero', 'enemy', 'npc'].includes(selected?.gameType ?? '') && (
        <div className="grid grid-cols-[1fr_3fr] ">
          <Label.Root className="text-black11 w-full text-sm font-medium">Gltf</Label.Root>
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
            accept=".gltf,.glb"
            className="text-blackA11  flex   rounded-none  h-6 w-full flex-1 items-center justify-center border p-1 border-blackA7  text-xs leading-none outline-none mb-2"
          />
        </div>
      )}

      <Xyz
        onChange={(val) => {
          const [x, y, z] = val
          const position = new Vector3(x, y, z)
          if (!selected?.uuid || !position) return
          store.updateNode(selected.uuid, { position })
        }}
        label="Position"
        values={selected?.position?.toArray() ?? [0, 0, 0]}
      />
      <Xyz
        onChange={(val) => {
          const [x, y, z] = val
          const rotation = new Euler(x, y, z)
          if (!selected?.uuid || !rotation) return
          store.updateNode(selected.uuid, { rotation })
        }}
        label="Rotation"
        values={[rot.x, rot.y, rot.z]}
      />
      <Xyz
        onChange={(val) => {
          const [x, y, z] = val
          const scale = new Vector3(x, y, z)
          if (!selected?.uuid || !scale) return
          store.updateNode(selected.uuid, { scale })
        }}
        label="Scale"
        values={selected?.scale?.toArray() ?? [0, 0, 0]}
      />
    </>
  )
}
