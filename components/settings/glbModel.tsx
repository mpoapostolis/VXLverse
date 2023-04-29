import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useModels } from '@/lib/models/queries'
import { useStore } from '@/store'
import { Euler, Vector3 } from 'three'
import { SelectModal } from '../selectModal'

export function GlbModel() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const rot = selected?.rotation ?? new Euler(0, 0, 0)
  const { data: models } = useModels()
  return ['hero', 'monster', 'npc', 'item', 'portal'].includes(selected?.gameType ?? '') ? (
    <>
      <Separator className="my-4 " />
      <Label className="  w-full text-sm font-semibold mb-4 block text-secondary">3d Model</Label>
      <div className="grid  grid-cols-[1fr_2fr] xs place-items-center gap-4">
        <Label className=" w-full">3d Model</Label>
        <SelectModal
          value={`${selected?.img}`}
          options={
            models?.map((model) => ({
              value: model.id,
              src: model.img,
              label: model.name,
            })) ?? []
          }
          size="sm"
          onChange={(val) => {
            if (!selected?.uuid || !val) return

            const model = models.find((model) => model.img === val)
            store.updateNode(selected.uuid, {
              ...selected,
              url: model?.url ?? '',
              name: model?.name ?? '',
              scale: new Vector3(model?.scale ?? 1, model?.scale ?? 1, model?.scale ?? 1),
              rotation: new Euler(rot.x, rot.y, rot.z),
              type: 'GLTF',
              animation: model?.defaultAnimation,
              statusToAnimation: model?.statusToAnimation,
            })
          }}
        />

        {/* <Label className=" w-full">Upload your Glb</Label>
        <Input
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (!file) return

            const reader = new FileReader()
            reader.onload = (e) => {
              if (!selected?.uuid) return
              const buffer = reader.result as ArrayBuffer
              const blob = new Blob([buffer], { type: 'application/octet-stream' })
              const mesh = new Mesh()
              store.updateNode(selected.uuid, {
                ...mesh,
                url: URL.createObjectURL(blob),
                blob,
                name: file.name,
                type: 'GLTF',
              })
            }
            reader.readAsArrayBuffer(file)

            e.target.value = ''
          }}
          type="file"
          accept=".gltf, .glb"
        /> */}
      </div>
    </>
  ) : null
}
