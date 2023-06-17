import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { Selectmaterial } from '../selectModal/selectMaterial'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'

export function Material() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)

  return selected && selected.type !== 'GLTF' ? (
    <>
      <Separator className="my-4" />
      <Label className="truncate w-full text-sm font-semibold mb-4 block text-secondary">Material</Label>
      <div className="grid grid-cols-2 gap-4 items-center">
        <Label className=" w-full ">Color</Label>
        <input
          onChange={(evt) => {
            if (!selected?.uuid) return
            store.updateNode(selected.uuid, { color: evt.target.value })
          }}
          value={selected?.color ?? '#ffffff'}
          type="color"
          className="ml-auto "
        />
        <Label className=" w-full ">Material</Label>
        <Selectmaterial />
        <>
          <Label className=" w-fit ">Repeat</Label>
          <Input
            className="w-12 ml-auto"
            type="number"
            min={1}
            value={selected?.material?.repeat ?? 1}
            onChange={(evt) => {
              if (!selected?.uuid) return
              store.updateNode(selected.uuid, {
                material: {
                  ...selected.material,
                  repeat: Number(evt.target.value),
                },
              })
            }}
          />
        </>
        {selected.material?.metalness && (
          <>
            <Label className=" w-fit ">Metalness</Label>
            <Switch
              checked={selected?.material?.showMetalness}
              className="ml-auto"
              onCheckedChange={(e) => {
                if (!selected?.uuid) return
                store.updateNode(selected.uuid, {
                  material: {
                    ...selected.material,
                    showMetalness: e,
                  },
                })
              }}
            />
          </>
        )}
        {selected.material?.normal && (
          <>
            <Label className=" w-fit ">Normal</Label>
            <Switch
              checked={selected?.material?.showNormal}
              className="ml-auto"
              onCheckedChange={(e) => {
                if (!selected?.uuid) return
                store.updateNode(selected.uuid, {
                  material: {
                    ...selected.material,
                    showNormal: e,
                  },
                })
              }}
            />
          </>
        )}

        {selected.material?.roughness && (
          <>
            <Label className=" w-fit ">Roughness</Label>
            <Switch
              checked={selected?.material?.showRoughness}
              className="ml-auto"
              onCheckedChange={(e) => {
                if (!selected?.uuid) return
                store.updateNode(selected.uuid, {
                  material: {
                    ...selected.material,
                    showRoughness: e,
                  },
                })
              }}
            />
          </>
        )}
      </div>
    </>
  ) : null
}
