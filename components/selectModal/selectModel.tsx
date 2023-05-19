import { useModels } from '@/lib/models/queries'
import { gameTypes, useStore } from '@/store'
import { SelectModal } from '.'

export function SelectModel(props: { children?: React.ReactNode; onChange?: (e?: string) => void }) {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const rot = selected?.rotation ?? [0, 0, 0]
  const { data: models } = useModels()
  return (
    <SelectModal
      filters={gameTypes}
      value={`${selected?.img}`}
      options={
        models?.map((model) => ({
          value: model.id,
          src: `${model.img}?thumb=190x190`,
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
          scale: [model?.scale ?? 1, model?.scale ?? 1, model?.scale ?? 1],
          rotation: rot,
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
