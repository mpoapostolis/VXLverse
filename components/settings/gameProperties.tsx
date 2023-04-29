import { Separator } from '@/components/ui/separator'
import { useRewards } from '@/lib/rewards/queries'
import { useStore } from '@/store'
import { SelectModal } from '../selectModal'
import { Label } from '../ui/label'

export function GameProperties() {
  const store = useStore()
  const { data: rewards } = useRewards()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const items = store.nodes.filter((node) => node.gameType === 'item' && node.uuid !== selected?.uuid)
  const questItems = store.nodes
    .filter((node) => node.gameType === 'npc')
    .map((node) => node.quests?.map((q) => q.reward))
    .flat()
    .filter((reward) => reward)

  const r = rewards.filter((reward) => questItems.includes(reward.id))

  const options = [...items, ...r].map((item) => ({
    label: `${item.name}`,
    value: `${item.id}`,
    src: `${item.img}`,
  }))

  return selected?.gameType !== 'hero' ? (
    <>
      <Separator className="my-4" />
      <Label className=" truncate w-full text-sm font-semibold mb-4 block text-secondary ">Game Properties</Label>
      <div className="gap-3 grid  grid-cols-2 items-center ">
        <Label className=" w-full">Show when inventory has</Label>
        <SelectModal size="sm" onChange={console.log} options={options} />
      </div>
    </>
  ) : null
}
