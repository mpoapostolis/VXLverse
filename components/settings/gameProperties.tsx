import { SelectModal } from '@/components/selectModal'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

import { useStore } from '@/store'

export function GameProperties() {
  const store = useStore()

  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const items = store.nodes
    .filter((node) => node.collectable && node.uuid !== selected?.uuid)
    ?.map((item) => ({
      ...item,
      id: item.uuid,
    }))

  // const questItems = store.nodes
  //   // .filter((node) => node.gameType === 'npc')
  //   .map((node) => node.quests?.map((q) => q.reward))
  //   .flat()
  //   .filter((reward) => reward)

  // const r = rewards.filter((reward) => questItems.includes(reward.id))

  const options = [...items].map((item) => ({
    label: `${item.name}`,
    value: `${item.id}`,
    src: `${item.img}`,
  }))

  return selected && selected?.gameType !== 'hero' ? (
    <>
      <Separator className="my-4" />
      <Label className=" truncate w-full text-sm font-semibold mb-4 block text-secondary ">Game Properties</Label>
      <div className="gap-4 grid  grid-cols-2 items-center ">
        <Label className=" w-full">Show when inventory has</Label>
        <SelectModal
          multiple
          value={selected?.showWhenInventoryHas}
          size="sm"
          emptyMessage="There are currently no items or quest rewards available in the scene for selection. \n Please create some items or rewards first to proceed."
          onChange={(val) => {
            if (!selected?.uuid || !val) return
            store.updateNode(selected.uuid, {
              showWhenInventoryHas: selected?.showWhenInventoryHas?.includes(val)
                ? selected?.showWhenInventoryHas?.filter((item) => item !== val)
                : [...(selected?.showWhenInventoryHas ?? []), val],
            })
          }}
          options={options}
        />

        <Label className=" w-full">Collectable</Label>
        <Switch
          key={selected.uuid}
          checked={selected.collectable}
          onCheckedChange={(e) => {
            if (!selected?.uuid) return
            store.updateNode(selected.uuid, {
              collectable: e,
            })
          }}
        />
      </div>
    </>
  ) : null
}
