import { useStore } from '@/store'
import { Animations } from '../settings/animations'
import { Material } from '../settings/material'
import { NodeList } from '../settings/nodeList'
import { TransformSettings } from '../settings/transform'

export default function Editor() {
  const store = useStore()
  const currentScene = store.scenes.find((scene) => scene.uuid === store.currentScene)
  return (
    <div className=" border-base-300 h-screen w-full overflow-auto  border-l bg-mauve4 p-2 pb-12 ">
      <NodeList />
      <TransformSettings />
      <Material />
      <Animations />
    </div>
  )
}
