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

      <DialogContent className="z-50 relative   lg:w-[90vw] lg:h-[90vh] overflow-auto w-screen h-screen ">
        <div className="w-full h-full bg-black  p-4 border  overflow-auto grid 2xl:grid-cols-4 xl:lg:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-4">
          {selectedNode?.quests?.map((quest) => (
            <Quest key={quest.uuid} {...quest} />
          ))}
          <div className=" grid place-items-center h-[480px]">
            <Button
              onClick={() => {
                store.updateNode(`${selectedNode?.uuid}`, {
                  quests: [...quests, newQuest(quests?.length ?? 0)],
                })
              }}
              className="w-full  h-full border bg-transparent border-dashed shadow-lg "
            >
              <PlusIcon className="w-4 mr-2 h-4" />
              New Quest
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
