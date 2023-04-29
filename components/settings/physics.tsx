import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { Select } from '../select'

export function Physics() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  return selected ? (
    <>
      <Separator className="my-4" />
      <Label className="truncate w-full text-sm font-semibold mb-4 block text-secondary">Physics</Label>
      <div className="grid grid-cols-2 items-center">
        <Label className=" w-full ">Gravity</Label>
        <Select<'on' | 'off'>
          onChange={(val) => {
            if (!selected?.uuid) return
            store.updateNode(selected.uuid, { gravity: val })
          }}
          value={selected?.gravity}
          options={[
            { label: 'On', value: 'on' },
            { label: 'Off', value: 'off' },
          ]}
        />
      </div>
    </>
  ) : null
}
