import { useMaterials } from '@/lib/materials/queries'
import { materialTypes, useStore } from '@/store'
import { SelectModal } from '.'

export function Selectmaterial() {
  const store = useStore()
  const selectedNode = store.nodes.find((node) => node.uuid === store.selectedNode)
  const { data: materials } = useMaterials()

  return (
    <SelectModal
      filters={materialTypes}
      options={
        materials?.map((material) => ({
          value: material.id,
          src: `${material?.preview}?thumb=190x190`,
          label: material.name,
          type: material.type,
        })) ?? []
      }
      value={`${selectedNode?.material?.preview}`}
      onChange={(e) => {
        const selectedMaterial = materials?.find((material) => material.id === e)
        if (!selectedNode?.uuid || !selectedMaterial) return
        store.updateNode(selectedNode.uuid, {
          ...selectedNode,
          material: {
            map: selectedMaterial?.map,
            displacement: selectedMaterial?.displacement,
            normal: selectedMaterial?.normal,
            preview: selectedMaterial?.preview,
            roughness: selectedMaterial?.roughness,
            metalness: selectedMaterial?.metalness,
            type: selectedMaterial?.type,
          },
        })
      }}
    >
      <button className="ml-auto w-12 h-12  border-card border">
        <picture>
          <img
            className="w-full h-full object-scale-down"
            src={selectedNode?.material?.preview ?? '/defaultMaterial.webp'}
            alt=""
          />
        </picture>
      </button>
    </SelectModal>
  )
}
