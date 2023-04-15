import { useStore } from '@/store'
import { characterController } from '@/store/utils'
import * as Label from '@radix-ui/react-label'
import * as Menubar from '@radix-ui/react-menubar'
import { Fragment } from 'react'

export function CharController() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  console.log(selected?.controlls?.['moveForward'])
  return selected && selected.gameType === 'hero' ? (
    <div>
      <Menubar.Separator className="my-4  h-[1px] bg-blackA5" />
      <Label.Root className="text-black11 truncate w-full text-sm font-semibold mb-3 block ">
        Character Controller
      </Label.Root>

      <div className="mb-2 gap-2 grid grid-cols-2 ">
        <Label.Root className="text-blackA9 truncate w-full text-sm font-medium">Action Name</Label.Root>
        <Label.Root className="text-blackA9 truncate w-full text-sm font-medium">Key Binding</Label.Root>
        {characterController.map((action) => (
          <Fragment key={action.value}>
            <Label.Root className="text-black11 truncate w-full text-sm font-medium">{action.label}</Label.Root>

            <input
              value={selected.controlls?.[action.value] ?? ''}
              className="text-blackA11  rounded-none inline-flex h-6 w-full flex-1 items-center justify-center  pl-2.5 border-blackA7 border text-xs leading-none outline-none"
              onKeyDown={(evt) => {
                evt.preventDefault()
                evt.stopPropagation()
                let key = ''
                if (evt.key === 'Backspace') {
                  key = evt.currentTarget.value = ''
                } else if (evt.key === ' ') {
                  key = evt.currentTarget.value = 'Space'
                } else {
                  key = evt.currentTarget.value = evt.key
                }
                if (!selected?.uuid) return
                store.updateNode(selected.uuid, {
                  controlls: {
                    ...(selected.controlls ?? {}),
                    [action.value]: key,
                  },
                })
              }}
            />
          </Fragment>
        ))}
      </div>
    </div>
  ) : null
}
