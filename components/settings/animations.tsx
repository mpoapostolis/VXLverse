import { useStore } from '@/store'
import { CharAction, charActions } from '@/store/utils'
import * as Label from '@radix-ui/react-label'
import * as Menubar from '@radix-ui/react-menubar'
import clsx from 'clsx'
import { Fragment } from 'react'
import { Select } from '../select'

export function Animations() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  return selected && selected.type === 'GLTF' ? (
    <div>
      <Menubar.Separator className="my-4  h-[1px] bg-blackA5" />
      <Label.Root className="text-black11 truncate w-full text-sm font-semibold mb-3 block ">Animations</Label.Root>

      <div className={'mb-2 gap-2 grid text-left borer grid-cols-[1fr_60px_1fr]'}>
        <Label.Root className="text-blackA9 truncate w-full text-sm font-medium">Name</Label.Root>
        <Label.Root className="text-blackA9 truncate w-full text-sm font-medium">Preview</Label.Root>
        <Label.Root className="text-blackA9 truncate w-full text-sm font-medium">Action </Label.Root>

        {Object.keys(selected?.actions ?? {}).map((animation) => (
          <Fragment key={animation}>
            <Label.Root className="text-black11 truncate w-full text-sm font-medium">{animation}</Label.Root>

            <button
              onClick={() => {
                if (!selected?.uuid) return

                store.updateNode(selected.uuid, {
                  animation: selected.animation === animation ? undefined : animation,
                })
              }}
              className={clsx(
                'text-xs flex w-fit items-center  px-3  bg-mauve6 rounded font-bold text-blackA11  py-1',
                {},
              )}
            >
              <span className="text text-xs">{selected.animation === animation ? 'Stop' : 'Play'}</span>
            </button>

            <Select<CharAction>
              value={selected?.actionToAnimation?.[animation]}
              options={charActions}
              onChange={(val) =>
                store.updateNode(selected.uuid ?? '', {
                  actionToAnimation: {
                    ...selected?.actionToAnimation,
                    [animation]: val,
                  },
                })
              }
            />
          </Fragment>
        ))}
      </div>
    </div>
  ) : null
}
