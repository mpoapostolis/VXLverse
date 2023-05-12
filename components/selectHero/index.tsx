import { useModels } from '@/lib/models/queries'
import { useStore } from '@/store'
import { Euler, Vector3 } from 'three'
import { SelectModal } from '../selectModal'

export function SelectHero(props: { children?: React.ReactNode; onChange?: (e?: string) => void }) {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const rot = selected?.rotation ?? new Euler(0, 0, 0)
  const { data: models } = useModels()
  return (
    <SelectModal
      value={`${selected?.img}`}
      options={
        models?.map((model) => ({
          value: model.id,
          src: model.img,
          type: model.type,
          label: model.name,
        })) ?? []
      }
      size={'sm'}
      onChange={(val) => {
        if (props.onChange) return props.onChange(val)
        if (!selected?.uuid || !val) return

        const model = models.find((model) => model.id === val)
        store.updateNode(selected.uuid, {
          ...selected,
          url: model?.url ?? '',
          name: model?.name ?? '',
          img: model?.img,
          scale: new Vector3(model?.scale ?? 1, model?.scale ?? 1, model?.scale ?? 1),
          rotation: new Euler(rot.x, rot.y, rot.z),
          type: 'GLTF',
          animation: model?.defaultAnimation,
          statusToAnimation: model?.statusToAnimation,
        })
      }}
    >
      {props.children}
    </SelectModal>
  )
}
