import { useStore } from '@/store'
import { Euler, Vector3 } from 'three'
import { Xyz } from '../xyz'

export function ObjectSettings() {
  const store = useStore()
  const selected = store.nodes.find((node) => node.uuid === store.selectedNode)
  const rot = selected?.rotation ?? new Euler(0, 0, 0)

  return !selected ? null : (
    <div className='grid gap-4 p-2'>
      <div className='divider'>Transform</div>

      <div className='grid grid-cols-[1fr_3fr] '>
        <label className='label-text'>Type</label>
        <label className='text-xs font-bold'>{selected.type}</label>
      </div>

      <div className='grid grid-cols-[1fr_3fr] '>
        <div className='label-text w-full  '>Name</div>
        <input
          value={selected?.name ?? selected?.type}
          className='input-bordered input input-xs w-full focus:outline-none'
        />
      </div>

      <Xyz
        onChange={(val) => {
          const [x, y, z] = val
          const position = new Vector3(x, y, z)
          if (!selected?.uuid || !position) return
          console.log('position', position)
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
          {Object.keys(selected?.actions ?? {}).map((key) => (
            <div key={key} className='grid grid-cols-2 '>
              <label className='label-text'>{key}</label>
              <button
                onClick={() => {
                  if (!selected?.uuid) return

                  store.updateNode(selected.uuid, { animation: selected.animation === key ? undefined : key })
                }}
                className='btn-xs btn'>
                {selected.animation === key ? 'Stop' : 'Play'}
              </button>
            </div>
          ))}
        </div>
      )}
      <div>
        <div className='divider'>Game Properties</div>

        <div className='form-control grid w-full max-w-xs grid-cols-[1fr_3fr] items-center'>
          <label className='label'>
            <span className='label-text'>On click</span>
          </label>
          <select className='select-bordered select select-xs focus:outline-none'>
            <option selected>-</option>
            <option>Add to inventory</option>
            <option>Show Dialogue</option>
            <option>Hit</option>
          </select>
        </div>
      </div>
    </div>
  )
}
