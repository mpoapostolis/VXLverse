import { useStore } from '@/store'
import { Select } from '../select'
import { Label } from '../ui/label'

export function RequiredItemNode() {
  const store = useStore()
  return (
    <div className="w-full text-left">
      <Label className="text-left  mb-4 block text-muted-foreground w-full ">Required items</Label>
      <Select
        className="border-muted"
        onChange={console.log}
        options={store.nodes?.map((node) => ({
          value: `${node.uuid}`,
          label: `${node.name}`,
        }))}
      />
    </div>
  )
}
