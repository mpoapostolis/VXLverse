import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { SelectHero } from '../selectHero'

export function GlbModel() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)

  return selected?.type === 'GLTF' ? (
    <>
      <Separator className="my-4 " />
      <Label className="  w-full text-sm font-semibold mb-4 block text-secondary">3d Model</Label>
      <div className="grid  grid-cols-[1fr_2fr] xs place-items-center gap-4">
        <Label className=" w-full">3d Model</Label>
        <SelectHero />
      </div>
    </>
  ) : null
}
