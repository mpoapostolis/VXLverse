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
    <div className=''>
      <label className='label-text'>Transform</label>
      <div className='grid grid-cols-3 gap-4'>
        <div className=''>
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
            type='number'
            className='input-bordered input  input-sm w-full'
          />
        </div>
        <div className=''>
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
            type='number'
            className='input-bordered input  input-sm w-full'
          />
        </div>
        <div className=''>
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
            type='number'
            className='input-bordered input  input-sm w-full'
          />
        </div>
      </div>
    </div>
  )
}
