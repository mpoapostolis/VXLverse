import { useStore } from '@/store'
import { Animations } from '../settings/animations'
import { Material } from '../settings/material'
import { NodeList } from '../settings/nodeList'
import { SceneSelector } from '../settings/sceneSelector'
import { TransformSettings } from '../settings/transform'

export default function Editor() {
  const store = useStore()
  return (
    <div className=" border-base-300 h-screen w-full overflow-auto  border-l bg-mauve4 p-2 pb-12 ">
      <SceneSelector />

      <NodeList />
      <TransformSettings />
      <Material />
      <Animations />
    </div>
  )
}
