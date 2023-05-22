import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { getUuid } from '@/store/utils'
import { TrashIcon } from 'lucide-react'
import { QuestModal } from '../questModal'
import { Button } from '../ui/button'

export function Quests() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const quest = selected?.quests
  return selected ? (
    <>
      <Separator className="my-4" />
      <Label className=" truncate w-full text-sm font-semibold mb-4 block text-secondary ">Quests</Label>
      <div className="grid gap-2  place-items-center ">
        {quest?.map((q) => (
          <div
            className="grid last:mb-4 border-b border-opacity-10 border-white place-items-center  gap-3  grid-cols-[2fr_35px_35px] w-full"
            key={q.uuid}
          >
            <Label className=" w-full text-sm text-left">{q.name}</Label>

            <QuestModal {...q} />
            <Button
              onClick={() => {
                if (!selected?.uuid) return
                store.updateNode(selected.uuid, {
                  quests: selected?.quests?.filter((e) => e.uuid !== q.uuid),
                })
              }}
              variant="ghost"
              className="p-0 rounded w-full hover:text-secondary-foreground text-destructive"
            >
              <TrashIcon role="button" className="w-4 h-4  " />
            </Button>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          if (!selected?.uuid) return
          store.updateNode(selected.uuid, {
            quests: [
              ...(selected?.quests ?? []),
              { uuid: getUuid(), name: `Quest ${(quest?.length ?? 0) + 1}`, status: 'incomplete' },
            ],
          })
        }}
        className="w-full"
      >
        New Quest
      </Button>
    </>
  ) : null
}
