import { useStore } from '@/store'
import * as Menubar from '@radix-ui/react-menubar'
import { Select } from '../select'

export function SceneSelector() {
  const store = useStore()
  return (
    <>
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
    </>
  )
}
