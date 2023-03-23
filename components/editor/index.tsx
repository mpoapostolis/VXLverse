import { useStore } from '@/store'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Euler, Vector3 } from 'three'

export default function Editor() {
  const store = useStore()
  const materials = ['marble', 'woodPanel', 'wall']
  const arr = ['x', 'y', 'z']
  const router = useRouter()
  const selected = store.selectedTile
  const [obj] = store.tiles.filter((tile) => tile.id === selected)

  const update = (key: string, value: any) => {
    const tiles = [...store.tiles]
    const idx = tiles.findIndex((tile) => tile.id === selected)
    tiles[idx] = {
      ...tiles[idx],
      [key]: value,
    }
    store.setTiles(tiles)
  }

  return (
    <div className=' h-screen w-full  border-l-2 border-base-300 bg-base-100 p-4'>
      <label htmlFor=''>Inspector</label>
      <div className='divider'></div>
      {obj && (
        <section>
          <label className='label-text'>Name</label>

          <input
            onChange={(e) => {
              const name = e.currentTarget.value
              update('name', name)
            }}
            value={obj?.name}
            className='input-bordered input  input-sm w-full'
          />
        </section>
      )}
      <div className='divider'></div>
      {obj && (
        <section>
          <label className='label-text text-lg'>Position</label>
          <div className='grid grid-cols-3 gap-1'>
            {arr.map((axis, idx) => (
              <div key={axis}>
                <label className='label-text'>{axis}</label>
                <input
                  onChange={(e) => {
                    const v3 = obj.position?.toArray() ?? [0, 0, 0]
                    v3[idx] = Number(e.target.value)
                    update('position', new Vector3(...v3))
                  }}
                  value={obj.position?.toArray()[idx]}
                  className='input-bordered input input-xs w-full'
                  type='number'
                />
              </div>
            ))}
          </div>
        </section>
      )}
      <br />

      {obj && (
        <section>
          <label className='label-text text-lg'>Rotation</label>
          <div className='grid grid-cols-3 gap-1'>
            {arr.map((axis, idx) => (
              <div key={axis}>
                <label className='label-text'>{axis}</label>
                <input
                  onChange={(e) => {
                    const rot = obj.rotation
                    const e3 = [rot?.x ?? 0, rot?.y ?? 0, rot?.z ?? 0]
                    e3[idx] = Number(e.target.value)
                    if (e3) update('rotation', new Euler(...e3))
                  }}
                  value={obj.rotation?.toArray()[idx]}
                  className='input-bordered input input-xs w-full'
                  type='number'
                />
              </div>
            ))}
          </div>
        </section>
      )}
      <br />
      {obj && (
        <section>
          <label className='label-text text-lg'>Scale</label>
          <div className='grid grid-cols-3 gap-1'>
            {arr.map((axis, idx) => (
              <div key={axis}>
                <label className='label-text'>{axis}</label>
                <input
                  onChange={(e) => {
                    const v3 = obj.scale?.toArray() ?? [0, 0, 0]
                    v3[idx] = Number(e.target.value)
                    update('scale', new Vector3(...v3))
                  }}
                  value={obj.scale?.toArray()?.at(idx)}
                  className='input-bordered input input-xs w-full'
                  type='number'
                />
              </div>
            ))}
          </div>
        </section>
      )}
      <div className='divider'></div>

      {obj && (
        <section>
          <label className='label-text text-lg'>Material</label>
          <div className=' mt-4  flex flex-wrap gap-4'>
            {materials.map((material) => (
              <button
                onClick={() => {
                  update('material', material)
                }}
                key={material}>
                <picture>
                  <img
                    className={clsx('h-12 w-12 rounded-full', {
                      // 'ring-primary-500 ring-2 ring-offset-2 ring-offset-yellow-400': store.material === material,
                    })}
                    src={`/textures/${material}/baseColor.jpg`}
                    alt=''
                  />
                </picture>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
