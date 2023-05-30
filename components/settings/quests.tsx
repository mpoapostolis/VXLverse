import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { TrashIcon } from 'lucide-react'
import { QuestModal } from '../questModal'
import { Button } from '../ui/button'

export function Quests() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const quest = store.quests?.filter((q) => q.nodeId === selected?.uuid)
  return selected ? (
    <>
      <Separator className="my-4" />
      <Label className=" truncate w-full text-sm font-semibold mb-4 block text-secondary ">Quests</Label>
      <Button onClick={() => store.newQuest()} className="w-full">
        New Quest
      </Button>
      <div className="grid gap-2 mt-4  place-items-center ">
        {quest?.map((q) => (
          <div
            className="grid   border-opacity-10 border-white place-items-center  gap-4  grid-cols-[1fr_35px] w-full"
            key={q.uuid}
          >
            <QuestModal>
              <Button
                onClick={() => store.setSelectedQuest(q.uuid)}
                variant="outline"
                className=" px-4 py-1 w-full text-xs text-left"
              >
                {q.name} Editor
              </Button>
            </QuestModal>
            <Button
              onClick={() => store.deleteQuest(q.uuid)}
              variant="outline"
              className="p-0 rounded w-full hover:text-secondary-foreground text-destructive"
            >
              <TrashIcon role="button" className="w-4 h-4  " />
            </Button>
          </div>
        ))}
      </div>
    </>
  ) : null
}
