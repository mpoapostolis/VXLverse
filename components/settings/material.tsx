import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { Selectmaterial } from '../selectModal/selectMaterial'

export function Material() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  return selected && selected.type !== 'GLTF' ? (
    <>
      <Separator className="my-4" />
      <Label className="truncate w-full text-sm font-semibold mb-4 block text-secondary">Material</Label>
      <div className="grid grid-cols-2 gap-4 items-center">
        <Label className=" w-full ">Color</Label>
        <input
          onChange={(evt) => {
            if (!selected?.uuid) return
            store.updateNode(selected.uuid, { color: evt.target.value })
          }}
          value={selected?.color ?? '#ffffff'}
          type="color"
          className="ml-auto "
        />
        <Label className=" w-full ">Material</Label>
        <Selectmaterial />
      </div>
    </>
  ) : null
}
