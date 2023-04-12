import * as Menubar from '@radix-ui/react-menubar'
import { Animations } from '../settings/animations'
import { Material } from '../settings/material'
import { NodeList } from '../settings/nodeList'
import { SceneSettings } from '../settings/scene'
import { TransformSettings } from '../settings/transform'

export default function Editor() {
  return (
    <div className=" border-base-300 h-screen w-full overflow-auto  border-l bg-mauve4 p-2 pb-12 ">
      <NodeList />
      <Menubar.Separator className="my-4  h-[1px] bg-violet6" />
      <SceneSettings />
      <Menubar.Separator className="my-4  h-[1px] bg-violet6" />
      <TransformSettings />
      <Menubar.Separator className="my-4  h-[1px] bg-violet6" />
      <Material />
      <Menubar.Separator className="my-4  h-[1px] bg-violet6" />
      <Animations />
    </div>
  )
}
