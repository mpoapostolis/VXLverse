import { Quest, useStore } from '@/store'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { Fragment } from 'react'
import { Select } from '../select'
import { SelectModal } from '../selectModal'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

const newQuest = () =>
  ({
    uuid: Math.random().toString(36).substring(7),
    name: 'New Quest',
    initialDialog: '',
    requiredItemToComplete: '',
    questCompleteDialog: '',
    reward: '',
  } as Quest)

export function QuestModal() {
  const store = useStore()
  const selectedNode = store?.nodes.find((node) => node.uuid === store.selectedNode)
  const quests = selectedNode?.quests ?? []

  const updateQuest = (quest: Quest) => {
    store.updateNode(`${selectedNode?.uuid}`, {
      ...selectedNode,
      quests: selectedNode?.quests?.map((obj) => (obj.uuid === quest.uuid ? quest : obj)),
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full bg-card  border border-dashed border-card-foreground border-opacity-25 py-6 text-xs">
          Quest Editor
        </button>
      </DialogTrigger>

      <DialogContent className="lg:w-[80vw] w-screen ">
        <DialogHeader>
          <DialogTitle>Quest Editor</DialogTitle>
          <DialogDescription className="text-xs">
            Create a new quest or edit an existing one. You can add a background color or an equirectangular image.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_50px] gap-4">
          <Label className=" w-full text-sm font-medium">Quest Name</Label>
          <Label className=" w-full text-sm font-medium">Initial Dialogue</Label>
          <Label className=" w-full text-sm font-medium">Required item to complete</Label>
          <Label className=" w-full text-sm font-medium">Quest complete dialogue</Label>
          <Label className=" w-full text-sm font-medium">Reward</Label>
          <Label className=" w-full text-sm font-medium">Actions</Label>

          {quests?.map((obj) => (
            <Fragment key={obj.uuid}>
              <Input
                onChange={(evt) => {
                  updateQuest({ ...obj, name: evt.target.value })
                }}
                value={obj.name}
                type="text"
                className="h-8"
              />
              <Input
                onChange={(evt) => {
                  updateQuest({ ...obj, initialDialog: evt.target.value })
                }}
                value={obj.initialDialog}
                className="h-8"
                type="text"
              />

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
              <Input
                onChange={(evt) => {
                  updateQuest({ ...obj, questCompleteDialog: evt.target.value })
                }}
                disabled={!obj.requiredItemToComplete}
                value={obj.questCompleteDialog}
                className="h-8"
                type="text"
              />
              <SelectModal
                onChange={(val) => {
                  updateQuest({ ...obj, reward: val ? val : undefined })
                }}
                value={obj.reward}
                type="items"
              />
              <Button
                onClick={() => {
                  console.log(obj.uuid)
                  store.updateNode(`${selectedNode?.uuid}`, {
                    ...selectedNode,
                    quests: selectedNode?.quests?.filter((q) => q.uuid !== obj.uuid),
                  })
                }}
                className="grid place-items-center"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </Fragment>
          ))}
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              store.updateNode(`${selectedNode?.uuid}`, {
                quests: [...quests, newQuest()],
              })
            }}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            New Quest
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
