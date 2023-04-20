import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { Euler, Vector3 } from 'three'
import { Xyz } from '../xyz'

export function TransformSettings() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const rot = selected?.rotation ?? new Euler(0, 0, 0)

  return !selected ? null : (
    <>
      <Separator className="my-4" />
      <Label className="w-full text-sm font-semibold mb-4 block ">Transform</Label>

      <div className="mb-2 grid grid-cols-[1fr_3fr] ">
        <Label>Type</Label>
        <Label className=" w-full text-sm font-medium">
          {selected.type}
          <span className="text-xs  text-gray-500  ml-1">- {selected?.gameType ?? selected.type}</span>
        </Label>
      </div>

      <div className="grid grid-cols-[1fr_3fr]  gap-0.5 mb-2 ">
        <Label>Name</Label>
        <Input
          onChange={(evt) => {
            if (!selected?.uuid) return
            store.updateNode(selected.uuid, { name: evt.target.value })
          }}
          value={selected?.name ?? selected?.type}
        />
      </div>

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
