import { useRewards } from '@/lib/rewards/queries'
import { Quest, useStore } from '@/store'
import { Select } from '../select'
import { SelectModel } from '../selectModal/selectModel'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export function Quest() {
  const store = useStore()
  const selectedNode = store?.nodes.find((node) => node.uuid === store.selectedNode)
  const quests = selectedNode?.quests ?? []
  const { data: rewards } = useRewards()
  const updateQuest = (quest: Quest) => {
    store.updateNode(`${selectedNode?.uuid}`, {
      ...selectedNode,
      quests: selectedNode?.quests?.map((obj) => (obj.uuid === quest.uuid ? quest : obj)),
    })
  }
  return (
    <Accordion collapsible type="single" className="w-full mb-4 ">
      {quests.map((obj, idx) => (
        <AccordionItem
          className="px-4 mb-2 border  data-[state=open]:border-none data-[state=closed]:bg-card "
          value={obj.uuid}
          key={idx}
        >
          <AccordionTrigger>
            <Label className=" w-full text-xs font-medium">{obj.name}</Label>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-[1fr_2fr] gap-4">
              <Label className=" w-full text-xs font-medium">Name</Label>
              <Input
                onChange={(evt) => {
                  updateQuest({ ...obj, name: evt.target.value })
                }}
                value={obj.name}
                type="text"
                className="h-8"
              />

              <Label className=" w-full text-xs font-medium">Initial Dialogue</Label>
              <textarea
                onChange={(evt) => {
                  updateQuest({ ...obj, initialDialog: evt.target.value })
                }}
                rows={4}
                value={obj.initialDialog}
                className="flex w-full  border  bg-input py-2.5 pl-2.5 border-black border-opacity-20  text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />

              <Label className=" w-full text-xs font-medium">Required item to complete</Label>
              <Select
                value={obj.requiredItemToComplete}
                className="h-8"
                options={
                  store?.nodes.map((node) => ({
                    label: `${node.name}`,
                    value: `${node.uuid}`,
                  })) ?? []
                }
                onChange={(val) => {
                  updateQuest({ ...obj, requiredItemToComplete: val ? val : undefined })
                }}
              />

              <Label className=" w-full text-xs font-medium">Quest complete dialogue</Label>
              <textarea
                onChange={(evt) => {
                  updateQuest({ ...obj, questCompleteDialog: evt.target.value })
                }}
                disabled={!obj.requiredItemToComplete}
                value={obj.questCompleteDialog}
                rows={4}
                className="flex w-full  border  bg-input py-2.5 pl-2.5 border-black border-opacity-20  text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />

              <Label className=" w-full text-xs font-medium">Reward</Label>
              <SelectModel
                onChange={(val) => {
                  updateQuest({ ...obj, reward: val ? val : undefined })
                }}
              />
              <div />
              <Button
                onClick={() => {
                  store.updateNode(`${selectedNode?.uuid}`, {
                    ...selectedNode,
                    quests: selectedNode?.quests?.filter((q) => q.uuid !== obj.uuid),
                  })
                }}
                className="w-full text-xs border border-dashed border-red-400 text-red-400 bg-transparent"
              >
                Delete Quest
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
