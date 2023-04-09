import { GameType, useStore } from '@/store'
import { Euler, Vector3 } from 'three'
import { DailogueEditor } from '../dialogueEditor'
import { Xyz } from '../xyz'

export function ObjectSettings() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const rot = selected?.rotation ?? new Euler(0, 0, 0)
  return !selected ? null : (
    <div className='grid gap-4 p-2 pb-12'>
      <div className='divider'>Transform</div>

      <div className='grid grid-cols-[1fr_3fr] '>
        <label className='label-text'>Type</label>
        <label className='text-xs font-bold'>{selected.type}</label>
      </div>

      <div className='grid grid-cols-[1fr_3fr] '>
        <div className='label-text w-full  '>Name</div>
        <input
          onChange={(evt) => {
            if (!selected?.uuid) return
            store.updateNode(selected.uuid, { name: evt.target.value })
          }}
          value={selected?.name ?? selected?.type}
          className='input-bordered input input-xs w-full focus:outline-none'
        />
      </div>

      <Xyz
        onChange={(val) => {
          const [x, y, z] = val
          const position = new Vector3(x, y, z)
          if (!selected?.uuid || !position) return
          store.updateNode(selected.uuid, { position })
        }}
        label='Position'
        values={selected?.position?.toArray() ?? [0, 0, 0]}
      />
      <Xyz
        onChange={(val) => {
          const [x, y, z] = val
          const rotation = new Euler(x, y, z)
          if (!selected?.uuid || !rotation) return
          store.updateNode(selected.uuid, { rotation })
        }}
        label='Rotation'
        values={[rot.x, rot.y, rot.z]}
      />
      <Xyz
        onChange={(val) => {
          const [x, y, z] = val
          const scale = new Vector3(x, y, z)
          if (!selected?.uuid || !scale) return
          store.updateNode(selected.uuid, { scale })
        }}
        label='Scale'
        values={selected?.scale?.toArray() ?? [0, 0, 0]}
      />
      {selected.type !== 'GLTF' && (
        <>
          <div className='divider'>Material</div>
          <div className='grid grid-cols-[1fr_3fr]'>
            <div className='label-text'>Color:</div>
            <input
              onChange={(evt) => {
                if (!selected?.uuid) return
                store.updateNode(selected.uuid, { color: evt.target.value })
              }}
              value={selected?.color ?? '#999'}
              type='color'
              className='ml-auto h-10 w-10'
            />
          </div>
        </>
      )}
      {selected.type === 'GLTF' && (
        <div>
          <div className='divider'>Animations</div>

          {Object.keys(selected?.actions ?? {}).map((animation) => (
            <div key={animation} className='mb-1 grid grid-cols-3 '>
              <label className='label-text truncate'>{animation}</label>
              <button
                onClick={() => {
                  if (!selected?.uuid) return

                  store.updateNode(selected.uuid, {
                    animation: selected.animation === animation ? undefined : animation,
                  })
                }}
                className='btn-xs btn'>
                {selected.animation === animation ? 'Stop' : 'Play'}
              </button>

              <input
                value={selected.keyBindings?.[animation] ?? ''}
                className='input input-xs border border-base-300 bg-transparent focus:outline-none'
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
          <div className='form-control grid w-full max-w-xs grid-cols-[2fr_1fr] items-center'>
            <label className='label'>
              <span className='label-text'>Default:</span>
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
              className='select-bordered select select-xs   focus:outline-none'>
              <option selected>-</option>

              {Object.keys(selected?.actions ?? {}).map((animation) => (
                <option key={animation} value={animation}>
                  {animation}
                </option>
              ))}
            </select>
          </div>

          <div className='form-control grid w-full max-w-xs grid-cols-[2fr_1fr] items-center'>
            <label className='label'>
              <span className='label-text'>on Click:</span>
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
              className='select-bordered select select-xs   focus:outline-none'>
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
      <div>
        <div className='divider'>Game Properties</div>

        <div className='form-control grid w-full max-w-xs grid-cols-[1fr_3fr] items-center'>
          <label className='label'>
            <span className='label-text'>Type:</span>
          </label>
          <select
            value={selected.gameType}
            onChange={(evt) =>
              store.updateNode(selected.uuid ?? '', {
                gameType: evt.target.value as GameType,
              })
            }
            className='select-bordered select select-xs focus:outline-none'>
            <option selected>-</option>
            <option value='hero'>Hero</option>
            <option value='npc'>Npc</option>
            <option value='enemy'>Enemy</option>
          </select>
        </div>

        <DailogueEditor />
      </div>
    </div>
  )
}
