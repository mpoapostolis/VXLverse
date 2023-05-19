import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import type { Quest as QuestType } from '@/store'
import { useStore } from '@/store'
import { QuestModal } from '../questModal'

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

  return selected ? (
    <>
      <Separator className="my-4" />
      <Label className=" truncate w-full text-sm font-semibold mb-4 block text-secondary ">Quests</Label>
      <QuestModal />
    </>
  ) : null
}
