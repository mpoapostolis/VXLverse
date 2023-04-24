import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { useState } from 'react'
import { QuestModal } from '../questModal'
import { Label } from '../ui/label'

export function Quests() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const [open, setOpen] = useState(false)

  return selected?.gameType === 'npc' ? (
    <>
      <Separator className="my-4" />
      <Label className=" truncate w-full text-sm font-semibold mb-4 block text-secondary ">Quest</Label>
      <QuestModal />
    </>
  ) : null
}
