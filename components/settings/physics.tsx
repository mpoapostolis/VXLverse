import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { RigidBodyTypeString } from '@react-three/rapier'
import { Select } from '../select'

export function Physics() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  return selected && selected?.gameType !== 'hero' ? (
    <>
      <Separator className="my-4" />
      <Label className="truncate w-full text-sm font-semibold mb-4 block text-secondary">Physics</Label>
      <div className="grid grid-cols-2 gap-4 items-center">
        <Label className=" w-full ">type</Label>
        <Select<RigidBodyTypeString>
          onChange={(val) => {
            console.log(val)
            if (!selected?.uuid) return
            store.updateNode(selected.uuid, { physics: val })
          }}
          value={selected?.physics ?? 'fixed'}
          options={[
            { label: 'Fixed', value: 'fixed' },
            { label: 'Dynamic', value: 'dynamic' },
          ]}
        />
      </div>
      <Label className="mt-4 block  text-muted w-full ">
        {selected.physics === 'fixed'
          ? ` Indicates the body cannot move. It acts as if it has an infinite mass and will not be affected by any force. It will continue to collide with dynamic bodies but not with fixed nor with kinematic bodies. This is typically used for the ground or for temporarily freezing a body.`
          : `Indicates that the body is affected by external forces and contacts.
`}
      </Label>
    </>
  ) : null
}
