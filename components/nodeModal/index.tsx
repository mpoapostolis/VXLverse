import { Tile, useStore } from '@/store'
import { Vector3 } from 'three'

const type = ['floor', 'wall', 'spotLight']
const FLOOR_POSITION = new Vector3(0, 0.5, 0)
const WALL_POSITION = new Vector3(0, 2.5, 0)
export const FLOOR_GEOMETRY = new Vector3(5, 0.5, 5)
export const WALL_GEOMETRY = new Vector3(5, 5, 0.5)

const typeToTile = (type: string): Tile => {
  switch (type) {
    case 'wall':
      return {
        position: WALL_POSITION,
        scale: WALL_GEOMETRY,
        material: 'woodPanel',
      }
    default:
    case 'floor':
      return {
        position: FLOOR_POSITION,
        scale: FLOOR_GEOMETRY,
        material: 'marble',
      }
  }
}

export function NodeModal() {
  const store = useStore()
  return (
    <>
      <label htmlFor='my-modal' className='btn-sm btn' onClick={() => {}}>
        New node
      </label>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <label htmlFor='my-modal' className='modal cursor-pointer'>
        <div className='modal-box'>
          <h3 className='text-lg font-bold'>Node creation</h3>
          <div className='divider'></div>
          <ul className='menu h-full border border-base-300 bg-base-300 p-4'>
            {type.map((t) => (
              <li key={t} className='menu-item'>
                <label
                  onClick={() => {
                    store.createTile(typeToTile(t))
                  }}
                  htmlFor='my-modal'>
                  {t}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </label>
    </>
  )
}
