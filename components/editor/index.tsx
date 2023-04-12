import * as Menubar from '@radix-ui/react-menubar'
import { NodeList } from '../settings/nodeList'
import { SceneSettings } from '../settings/scene'
import { TransformSettings } from '../settings/transform'

export default function Editor() {
  return (
    <div className=" border-base-300 h-screen w-full overflow-auto  border-l bg-mauve4 p-4 ">
      <NodeList />
      <Menubar.Separator className="my-4  h-[1px] bg-violet6" />
      <SceneSettings />
      <Menubar.Separator className="my-4  h-[1px] bg-violet6" />
      <TransformSettings />
      {/* <ObjectSettings /> */}
    </div>
  )
}
