import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Xyz } from '@/components/xyz'
import { useStore } from '@/store'

export function TransformSettings() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  return !selected ? null : (
    <>
      <Separator className="my-4" />
      <Label className="w-full text-sm font-semibold mb-4 block text-secondary">Transform</Label>

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
          if (!selected?.uuid) return
          store.updateNode(selected.uuid, { position: [x, y, z] })
        }}
        label="Position"
        values={selected?.position ?? [0, 0, 0]}
      />
      <Xyz
        onChange={(val) => {
          const [x, y, z] = val
          if (!selected?.uuid) return
          store.updateNode(selected.uuid, { rotation: [x, y, z] })
        }}
        label="Rotation"
        values={selected?.rotation ?? [0, 0, 0]}
      />
      <Xyz
        onChange={(val) => {
          const [x, y, z] = val
          if (!selected?.uuid) return
          store.updateNode(selected.uuid, { scale: [x, y, z] })
        }}
        label="Scale"
        values={selected?.scale ?? [0, 0, 0]}
      />
    </>
  )
}
