import { useStore } from '@/store'
import * as Label from '@radix-ui/react-label'
import * as Menubar from '@radix-ui/react-menubar'
import clsx from 'clsx'

export function Animations() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  return selected ? (
    <div>
      <Menubar.Separator className="my-4  h-[1px] bg-violet6" />

      {Object.keys(selected?.actions ?? {}).map((animation) => (
        <div key={animation} className="mb-2 gap-2 grid grid-cols-3 ">
          <Label.Root className="text-black11 truncate w-full text-sm font-medium">{animation}</Label.Root>

          <button
            onClick={() => {
              if (!selected?.uuid) return

              store.updateNode(selected.uuid, {
                animation: selected.animation === animation ? undefined : animation,
              })
            }}
            className={clsx('text-xs w-fit mx-auto px-3  bg-mauve6 rounded font-bold text-blackA11  py-1', {
              'bg-green-200 ': selected.animation === animation,
            })}
          >
            {selected.animation === animation ? 'Stop' : 'Play'}
          </button>

          <input
            value={selected.keyBindings?.[animation] ?? ''}
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
                keyBindings: {
                  ...selected.keyBindings,
                  [animation]: key,
                },
              })
            }}
          />
        </div>
      ))}

      <div className="flex mb-2">
        <Label.Root className="text-black11 w-full text-sm font-medium">Default Animation</Label.Root>
        <select
          value={selected.keyBindings?.default ?? ''}
          onChange={(evt) =>
            store.updateNode(selected.uuid ?? '', {
              keyBindings: {
                ...selected.keyBindings,
                default: evt.target.value,
              },
            })
          }
          className="rounded-none w-full  bg-white border-blackA7 border text-xs leading-none outline-none"
        >
          <option selected>-</option>

          {Object.keys(selected?.actions ?? {}).map((animation) => (
            <option key={animation} value={animation}>
              {animation}
            </option>
          ))}
        </select>
      </div>

      <div className="flex mb-2">
        <Label.Root className="text-black11 w-full text-sm font-medium">On Click Animation</Label.Root>
        <select
          value={selected.keyBindings?.onClick ?? ''}
          onChange={(evt) =>
            store.updateNode(selected.uuid ?? '', {
              keyBindings: {
                ...selected.keyBindings,
                onClick: evt.target.value,
              },
            })
          }
          className="rounded-none w-full  bg-white border-blackA7 border text-xs leading-none outline-none"
        >
          <option selected>-</option>

          {Object.keys(selected?.actions ?? {}).map((animation) => (
            <option key={animation} value={animation}>
              {animation}
            </option>
          ))}
        </select>
      </div>
    </div>
  ) : null
}
