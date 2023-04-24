import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { Select } from '../select'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

export function GameProperties() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)

  return selected ? (
    <>
      <Separator className="my-4" />
      <Label className=" truncate w-full text-sm font-semibold mb-4 block text-secondary ">Game Properties</Label>
      <div className="gap-3 grid  grid-cols-2 items-center ">
        <Label className=" w-full">Show when inventory has</Label>
        <Select
          className="w-full"
          onChange={(val) => {}}
          options={store.nodes.map((model) => ({
            label: model.name ?? '',
            value: model.url ?? '',
          }))}
        />
        <Label className="text-left" htmlFor={'collectToInventory'}>
          Collect to inventory
        </Label>
        <Switch className="ml-auto border" id={'collectToInventory'} />
        <Label className="text-left" htmlFor={'UseAsTool'}>
          Use as tool
        </Label>
        <Switch className="ml-auto border" id={'UseAsTool'} />
      </div>
    </>
  ) : null
}
