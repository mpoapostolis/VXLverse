import { useStore } from '@/store'
import { Vector3 } from 'three'

export function Geometry() {
  const store = useStore()
  const changeGeometry = (axis: 'x' | 'y' | 'z', value: number) => {
    const v = new Vector3().copy(store.geometry)
    v[axis] = value
    store.setGeometry(v)
  }
  return (
    <div>
      <div className='grid grid-cols-1  p-2'>
        <div className='w-ful4 mb-4'>
          <label className='label-text-alt'>
            Width <span className=''>{store.geometry.x.toFixed(2)}</span>
          </label>
          <input
            step={1}
            min={0}
            max={100}
            value={store.geometry.x}
            onChange={(evt) => {
              const value = parseFloat(evt.target.value)
              changeGeometry('x', value)
            }}
            type='range'
            className=' range   range-xs w-full focus:outline-none'
          />
        </div>
        <div className='w-ful4 mb-4'>
          <label className='label-text-alt'>
            height <span className=''>{store.geometry.y.toFixed(2)}</span>
          </label>
          <input
            step={1}
            min={0}
            max={100}
            onChange={(evt) => {
              const value = parseFloat(evt.target.value)
              changeGeometry('y', value)
            }}
            type='range'
            className=' range  range-xs w-full focus:outline-none'
          />
        </div>
        <div className='w-ful4 mb-4'>
          <label className='label-text-alt'>
            Depth <span className=''>{store.geometry.z.toFixed(2)}</span>
          </label>
          <input
            step={1}
            min={0}
            max={100}
            onChange={(evt) => {
              const value = parseFloat(evt.target.value)
              changeGeometry('z', value)
            }}
            type='range'
            className=' range  range-xs w-full focus:outline-none'
          />
        </div>
      </div>
    </div>
  )
}
