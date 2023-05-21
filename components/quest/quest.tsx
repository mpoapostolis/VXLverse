import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useStore } from '@/store'
import { ChevronDownIcon } from 'lucide-react'
import { Select } from '../select'
import { SelectModel } from '../selectModal/selectModel'
import { Button } from '../ui/button'

export function QuestOption(props: { selected?: boolean }) {
  const store = useStore()
  const selectedNode = store?.nodes?.find((node) => node.uuid === store.selectedNode)

  return (
    <div
      className={cn('p-4 w-80 bg-card shadow-lg grid gap-2 h-fit border', {
        'border-secondary border-dashed': props.selected,
      })}
    >
      <Label className=" w-full text-xs font-medium">Option name</Label>
      <Input type="text" className="bg-background" />

      <Label className=" w-full text-xs font-medium">NPC Text</Label>
      <textarea
        rows={4}
        className="flex w-full     py-2.5 pl-2.5 bg-background  text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />

      <Label className=" w-full text-xs font-medium">Required item to complete</Label>
      <Select className="bg-background" options={[]} onChange={(val) => {}} />

      <Label className=" w-full text-xs font-medium">Reward</Label>
      <SelectModel>
        <Button size={'sm'} className="flex w-full py-2.5 pl-2.5 bg-background  text-xs">
          <div>Select reward</div>
          <ChevronDownIcon className="w-4 h-4 ml-auto" />
        </Button>
      </SelectModel>
      <div />
    </div>
  )
}
