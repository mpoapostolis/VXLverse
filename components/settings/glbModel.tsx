import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { Euler, Mesh } from 'three'

export function GlbModel() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const rot = selected?.rotation ?? new Euler(0, 0, 0)
  return ['hero', 'monster', 'npc'].includes(selected?.gameType ?? '') ? (
    <>
      <Separator className="my-4 " />
      <Label className="  w-full text-sm font-semibold mb-4 block text-secondary">3d Model</Label>
      <div className="grid grid-cols-[1fr_2fr] xs place-items-center">
        <Label className=" w-full">Glb / Gltf</Label>
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
        />
      </div>
    </>
  ) : null
}
