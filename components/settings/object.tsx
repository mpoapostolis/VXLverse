import { useStore } from '@/store'
import * as Label from '@radix-ui/react-label'
import * as Menubar from '@radix-ui/react-menubar'
import { Euler, Vector3 } from 'three'
import { Xyz } from '../xyz'

export function ObjectSettings() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const rot = selected?.rotation ?? new Euler(0, 0, 0)
  return !selected ? null : (
    <div className="p-2">
      <Label.Root className="w-full  text-xl">Transform</Label.Root>

      <div className="mb-2 mt-4 grid grid-cols-[1fr_3fr] ">
        <Label.Root className="text-black11 w-full text-sm font-medium">Type</Label.Root>
        <Label.Root className="text-black11 w-full text-sm font-medium">{selected.type}</Label.Root>
      </div>

      <div className="grid grid-cols-[1fr_3fr] ">
        <Label.Root className="text-black11 w-full text-sm font-medium">Name</Label.Root>
        <input
          onChange={(evt) => {
            if (!selected?.uuid) return
            store.updateNode(selected.uuid, { name: evt.target.value })
          }}
          value={selected?.name ?? selected?.type}
          className="text-black11 mb-2 inline-flex h-6 w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
        />
      </div>

      <Xyz
        onChange={(val) => {
          const [x, y, z] = val
          const position = new Vector3(x, y, z)
          if (!selected?.uuid || !position) return
          store.updateNode(selected.uuid, { position })
        }}
        label="Position"
        values={selected?.position?.toArray() ?? [0, 0, 0]}
      />
      <Xyz
        onChange={(val) => {
          const [x, y, z] = val
          const rotation = new Euler(x, y, z)
          if (!selected?.uuid || !rotation) return
          store.updateNode(selected.uuid, { rotation })
        }}
        label="Rotation"
        values={[rot.x, rot.y, rot.z]}
      />
      <Xyz
        onChange={(val) => {
          const [x, y, z] = val
          const scale = new Vector3(x, y, z)
          if (!selected?.uuid || !scale) return
          store.updateNode(selected.uuid, { scale })
        }}
        label="Scale"
        values={selected?.scale?.toArray() ?? [0, 0, 0]}
      />
      {selected.type !== 'GLTF' && (
        <>
          <Menubar.Separator className="m-[5px] h-[1px] bg-blackA5" />

          <div className="divider">Material</div>
          <div className="grid grid-cols-[1fr_3fr]">
            <div className="label-text">Color:</div>
            <input
              onChange={(evt) => {
                if (!selected?.uuid) return
                store.updateNode(selected.uuid, { color: evt.target.value })
              }}
              value={selected?.color ?? '#999'}
              type="color"
              className="ml-auto h-10 w-10"
            />
          </div>
        </>
      )}
      {selected.type === 'GLTF' && (
        <div>
          <Menubar.Separator className="m-[5px] h-[1px] bg-blackA5" />
          <div className="divider">Animations</div>
          {Object.keys(selected?.actions ?? {}).map((animation) => (
            <div key={animation} className="mb-1 grid grid-cols-3 ">
              <label className="label-text truncate">{animation}</label>
              <button
                onClick={() => {
                  if (!selected?.uuid) return

                  store.updateNode(selected.uuid, {
                    animation: selected.animation === animation ? undefined : animation,
                  })
                }}
                className="btn-xs btn"
              >
                {selected.animation === animation ? 'Stop' : 'Play'}
              </button>

              <input
                value={selected.keyBindings?.[animation] ?? ''}
                className="input input-xs border-base-300 border bg-transparent focus:outline-none"
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
          <div className="form-control grid w-full max-w-xs grid-cols-[2fr_1fr] items-center">
            <label className="label">
              <span className="label-text">Default:</span>
            </label>

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
              className="select-bordered select select-xs   focus:outline-none"
            >
              <option selected>-</option>

              {Object.keys(selected?.actions ?? {}).map((animation) => (
                <option key={animation} value={animation}>
                  {animation}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control grid w-full max-w-xs grid-cols-[2fr_1fr] items-center">
            <label className="label">
              <span className="label-text">on Click:</span>
            </label>

            <select
              value={selected.keyBindings?.onClick ?? ''}
              onChange={(evt) => {
                store.updateNode(selected.uuid ?? '', {
                  keyBindings: {
                    ...selected.keyBindings,
                    onClick: evt.target.value,
                  },
                })
              }}
              className="select-bordered select select-xs   focus:outline-none"
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
      )}

      {/* <DailogueEditor /> */}
    </div>
  )
}
