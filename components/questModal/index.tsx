'use client'

import type { Quest as QuestType } from '@/store'
import { useStore } from '@/store'
import { PlusIcon } from 'lucide-react'
import { Quest } from '../quest'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

const newQuest = (num: number) =>
  ({
    uuid: Math.random().toString(36).substring(7),
    name: `Quest: ${num + 1}`,
    initialDialog: '',
    requiredItemToComplete: '',
    questCompleteDialog: '',
    reward: '',
    status: 'incomplete',
  } as QuestType)

export function QuestModal() {
  const store = useStore()
  const selectedNode = store.nodes?.find((node) => node.uuid === store.selectedNode)
  const quests = selectedNode?.quests ?? []

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-card w-full ">Quests Editor</Button>
      </DialogTrigger>
      <DialogContent className="z-50 lg:w-[90vw] lg:h-[90vh] overflow-auto w-screen h-screen ">
        <div className="bg-black w-full h-full grid grid-cols-4 p-3 gap-4">
          {selectedNode?.quests?.map((quest) => (
            <Quest key={quest.uuid} {...quest} />
          ))}
          <Button
            onClick={() => {
              store.updateNode(`${selectedNode?.uuid}`, {
                quests: [...quests, newQuest(quests?.length ?? 0)],
              })
            }}
            className="w-full h-full  bg-transparent border border-dashed "
          >
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
