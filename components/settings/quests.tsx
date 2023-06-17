import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { EditIcon, SaveIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { QuestModal } from '../questModal'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function Quests() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const quest = store.quests?.filter((q) => q.nodeId === selected?.uuid)
  const [edit, setEdit] = useState<string>()
  return selected ? (
    <>
      <Separator className="my-4" />
      <Label className=" truncate w-full text-sm font-semibold mb-4 block text-secondary ">Quests</Label>
      <Button onClick={() => store.newQuest()} className="w-full">
        New Quest
      </Button>
      <div className="grid  mt-4  place-items-center ">
        {quest?.map((q) => (
          <div
            className="grid   border-opacity-10 border-white place-items-center  gap-4  grid-cols-[1fr_35px_35px] w-full"
            key={q.uuid}
          >
            {edit === q.uuid ? (
              <Input className="w-full " value={q.name} onChange={(e) => store.updateQuest({ name: e.target.value })} />
            ) : (
              <QuestModal>
                <Button
                  size="sm"
                  onClick={() => store.setSelectedQuest(q.uuid)}
                  variant="outline"
                  className=" px-4 py-1 w-full text-xs text-left"
                >
                  {q.name}
                </Button>
              </QuestModal>
            )}
            <Button
              size="sm"
              onClick={() => {
                if (!q.uuid) return
                store.setSelectedQuest(q.uuid)
                setEdit(edit ? undefined : q.uuid)
              }}
              variant="outline"
            >
              {edit === q.uuid ? (
                <SaveIcon role="button" className="w-4 h-4  " />
              ) : (
                <EditIcon role="button" className="w-4 h-4" />
              )}
            </Button>
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
