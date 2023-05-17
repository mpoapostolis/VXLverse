import { useStore } from '@/store'
import { Select } from '../select'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

export function QuestInfo() {
  const store = useStore()
  return (
    <div className=" text-left w-fit p-0 bg-card shadow-lg h-fit border ">
      <div className="p-1 text-muted-foreground text-center pl-2">
        <Label className="font-medium">Quest Info</Label>
      </div>
      <Separator />
      <div className="p-2 text-card-foreground grid grid-cols-2 gap-2">
        <Label className="text-xs">Quest Name</Label>
        <Input className="bg-background" placeholder="Quest name" />
        <div />
        <Label className="text-xs">Required item</Label>
        <Select
          className="bg-background"
          onChange={console.log}
          options={store.nodes?.map((node) => ({
            value: `${node.uuid}`,
            label: `${node.name}`,
          }))}
        />
      </div>
    </div>
  )
}
