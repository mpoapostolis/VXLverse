import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { OptionQuestType, useStore } from '@/store'
import { ChevronDownIcon } from 'lucide-react'
import { Select } from '../select'
import { SelectModel } from '../selectModal/selectModel'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export function Quest(props: { optionId?: string; selected?: boolean; options?: OptionQuestType[] }) {
  const store = useStore()
  const quest = store.quests?.find((q) => q.uuid === store.selectedQuest)
  const option = quest?.options?.find((o) => o.uuid === props.optionId)
  const name = props.optionId ? option?.name : quest?.name
  const npcText = props.optionId ? option?.npcText : quest?.npcText
  const requiredItem = props.optionId ? option?.requiredItem : quest?.requiredItem
  const reward = props.optionId ? option?.reward : quest?.reward

  function updateOption(option: Partial<OptionQuestType>) {
    store.updateQuest({
      options: quest?.options?.map((o) => (o.uuid === props.optionId ? { ...o, ...option } : o)),
    })
  }

  return (
    <div
      className={cn('p-4 w-80 bg-card shadow-lg grid gap-2 h-fit border', {
        'border-secondary border-2 ': props.selected,
      })}
    >
      <Label className=" w-full text-xs font-medium">Option name</Label>
      <Input
        value={name ?? ''}
        onChange={(e) => {
          if (props.optionId) updateOption({ name: e.target.value })
          else store.updateQuest({ name: e.target.value })
        }}
        type="text"
        className="bg-background"
      />

      <Label className=" w-full text-xs font-medium">NPC Text</Label>
      <textarea
        value={npcText ?? ''}
        onChange={(e) => {
          if (props.optionId) updateOption({ npcText: e.target.value })
          else store.updateQuest({ npcText: e.target.value })
        }}
        rows={4}
        className="flex w-full     py-2.5 pl-2.5 bg-background  text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Separator className="my-2" />

      {props.options?.length === 0 && (
        <>
          <Label className=" w-full text-xs font-medium">Required item to complete</Label>
          <Select className="bg-background" options={[]} onChange={(val) => {}} />

          <Label className=" w-full text-xs font-medium">Reward</Label>
          <SelectModel>
            <Button size={'sm'} className="flex w-full py-2.5 pl-2.5 bg-background  text-xs">
              <div>Select reward</div>
              <ChevronDownIcon className="w-4 h-4 ml-auto" />
            </Button>
          </SelectModel>
        </>
      )}

      {props.options?.map((e, idx) => {
        return (
          <div key={e.name + idx} className="flex  w-full relative  items-center justify-between">
            <div className="flex text items-center w-full h-full">
              <div className="text-xs w-full text-right font-medium">{e.name}</div>
              <div className="ml-auto z-50 w-4 h-4 -mr-6 bg-primary border rounded-full" />
            </div>
          </div>
        )
      })}
      <div />
    </div>
  )
}
