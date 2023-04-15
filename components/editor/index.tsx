import { Animations } from '../settings/animations'
import { CharController } from '../settings/charController'
import { GlbModel } from '../settings/glbModel'
import { Material } from '../settings/material'
import { NodeList } from '../settings/nodeList'
import { TransformSettings } from '../settings/transform'

export default function Editor() {
  return (
    <div className=" border-base-300 h-screen w-full  border-l bg-mauve4 p-2 pb-12 overflow-auto ">
      <NodeList />
      <TransformSettings />
      <GlbModel />
      <Material />
      <Animations />
      <CharController />
    </div>
  )
}
