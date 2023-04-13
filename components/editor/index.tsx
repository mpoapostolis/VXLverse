import { useStore } from '@/store'
import * as Menubar from '@radix-ui/react-menubar'
import { Select } from '../select'
import { Animations } from '../settings/animations'
import { Material } from '../settings/material'
import { NodeList } from '../settings/nodeList'
import { TransformSettings } from '../settings/transform'

export default function Editor() {
  const store = useStore()
  return (
    <div className=" border-base-300 h-screen w-full overflow-auto  border-l bg-mauve4 p-2 pb-12 ">
      <Select
        label="Select Scene..."
        onChange={(val) => {
          store.setCurrentScene(val)
        }}
        value={store.currentScene}
        options={store.scenes?.map((s) => ({
          label: s?.name ?? '-',
          value: s?.uuid ?? '-',
        }))}
      />
      <Menubar.Separator className="my-4  h-[1px] bg-blackA5" />

      <NodeList />
      <TransformSettings />
      <Material />
      <Animations />
    </div>
  )
}
