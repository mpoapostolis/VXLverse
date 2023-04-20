import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'
import { CharStatus, CharStatuss } from '@/store/utils'
import clsx from 'clsx'
import { Fragment } from 'react'
import { Select } from '../select'

export function Animations() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const animationAvailable = Object.values(selected?.statusToAnimation ?? {})
  return selected && selected.type === 'GLTF' ? (
    <div>
      <Separator className="my-4" />
      <Label className=" truncate w-full text-sm font-semibold mb-4 block ">Animations</Label>

      <div className={'mb-2 gap-2 grid text-left borer grid-cols-[1fr_80px_1fr]'}>
        <Label className=" truncate text-sm text-slate-400 ">Name</Label>
        <Label className=" truncate text-sm text-slate-400 ">Preview</Label>
        <Label className=" truncate text-sm text-slate-400 ">Play if </Label>
        {Object.keys(selected?.actions ?? {}).map((animation) => (
          <Fragment key={animation}>
            <Label className=" truncate w-full ">{animation}</Label>
            <button
              onClick={() => {
                if (!selected?.uuid) return

                store.updateNode(selected.uuid, {
                  animation: selected.animation === animation ? undefined : animation,
                })
              }}
              className={clsx(
                'text-xs flex w-fit items-center  px-3  bg-muted text-muted-foreground  rounded    py-1',
                {},
              )}
            >
              <span className="text text-xs">{selected.animation === animation ? 'Stop' : 'Play'}</span>
            </button>

            <Select<CharStatus>
              value={selected?.statusToAnimation?.[animation]}
              options={{
                '': CharStatuss,
              }}
              disabled={animationAvailable}
              onChange={(val) =>
                store.updateNode(selected.uuid ?? '', {
                  statusToAnimation: {
                    ...selected?.statusToAnimation,
                    [animation]: val ?? undefined,
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
