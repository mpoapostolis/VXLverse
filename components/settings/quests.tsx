import { useStore } from '@/store'
import * as Label from '@radix-ui/react-label'
import { Separator } from '@radix-ui/react-menubar'
import { Euler } from 'three'

export function Quests() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const rot = selected?.rotation ?? new Euler(0, 0, 0)
  return ['hero', 'enemy', 'npc'].includes(selected?.gameType ?? '') ? (
    <>
      <Separator className="my-4  h-[1px] bg-blackA5" />
      <Label.Root className="text-black11 truncate w-full text-sm font-semibold mb-3 block ">Quests</Label.Root>
      <button className=" w-full border border-dashed border-black border-opacity-25 py-6 text-xs">
        Dialogue Editor
      </button>{' '}
    </>
  ) : null
}
