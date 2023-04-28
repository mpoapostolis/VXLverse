import { Separator } from '@/components/ui/separator'
import type { Quest as QuestType } from '@/store'
import { useStore } from '@/store'
import { PlusIcon } from 'lucide-react'
import { Quest } from '../quest'
import { Button } from '../ui/button'
import { Label } from '../ui/label'

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

export function Quests() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const quests = selected?.quests ?? []

  return selected?.gameType === 'npc' ? (
    <>
      <Separator className="my-4" />
      <Label className=" truncate w-full text-sm font-semibold mb-4 block text-secondary ">Quests</Label>
      <Quest />
      <Button
        onClick={() => {
          store.updateNode(`${selected?.uuid}`, {
            quests: [...quests, newQuest(quests?.length ?? 0)],
          })
        }}
        className="w-full "
      >
        <PlusIcon className="mr-2 w-4 h-4" />
        New Quest
      </Button>
    </>
  ) : null
}
