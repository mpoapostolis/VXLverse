import { Select } from '@/components/select'
import { SelectModel } from '@/components/selectModal/selectModel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Quest, useStore } from '@/store'
import { ChevronDownIcon } from 'lucide-react'

export function Quest(props: Quest) {
  const store = useStore()
  const selectedNode = store?.nodes?.find((node) => node.uuid === store.selectedNode)

  const updateQuest = (quest: Quest) => {
    store.updateNode(`${selectedNode?.uuid}`, {
      ...selectedNode,
      quests: selectedNode?.quests?.map((obj) => (obj.uuid === quest.uuid ? quest : obj)),
    })
  }
  return (
    <div className=" p-4 w-ull bg-card shadow-lg grid gap-2 h-fit border ">
      <Label className=" w-full text-xs font-medium">Name</Label>
      <Input
        onChange={(evt) => {
          updateQuest({ ...props, name: evt.target.value })
        }}
        value={props.name}
        type="text"
        className="bg-background"
      />

      <Label className=" w-full text-xs font-medium">Initial Dialogue</Label>
      <textarea
        onChange={(evt) => {
          updateQuest({ ...props, initialDialog: evt.target.value })
        }}
        rows={4}
        value={props.initialDialog}
        className="flex w-full     py-2.5 pl-2.5 bg-background  text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />

      <Label className=" w-full text-xs font-medium">Required item to complete</Label>
      <Select
        value={props.requiredItemToComplete}
        className="bg-background"
        options={
          store?.nodes.map((node) => ({
            label: `${node.name}`,
            value: `${node.uuid}`,
          })) ?? []
        }
        onChange={(val) => {
          updateQuest({ ...props, requiredItemToComplete: val ? val : undefined })
        }}
      />

      <Label className=" w-full text-xs font-medium">Quest complete dialogue</Label>
      <textarea
        onBlur={(evt) => {
          updateQuest({ ...props, questCompleteDialog: evt.target.value })
        }}
        disabled={!props.requiredItemToComplete}
        value={props.questCompleteDialog}
        rows={4}
        className="flex w-full     py-2.5 pl-2.5 bg-background  text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />

      <Label className=" w-full text-xs font-medium">Reward</Label>
      <SelectModel
        onChange={(val) => {
          updateQuest({ ...props, reward: val ? val : undefined })
        }}
      >
        <Button className="flex w-full py-2.5 pl-2.5 bg-background  text-xs">
          <div>Select reward</div>
          <ChevronDownIcon className="w-4 h-4 ml-auto" />
        </Button>
      </SelectModel>
      <div />
      <Button
        onClick={() => {
          store.updateNode(`${selectedNode?.uuid}`, {
            ...selectedNode,
            quests: selectedNode?.quests?.filter((obj) => {
              return obj.uuid !== props.uuid
            }),
          })
        }}
        className="w-full text-xs border border-dashed border-red-400 text-red-400 bg-transparent"
      >
        Delete Quest
      </Button>
    </div>
  )
}
