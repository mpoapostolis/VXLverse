import { useStore } from '@/store'
import clsx from 'clsx'
import { Geometry } from '../geometry'

export default function Editor() {
  const store = useStore()
  const materials = ['marble', 'woodPanel', 'wall']
  return (
    <div className=' h-screen w-full  border-r-2 border-base-300 bg-base-100 p-4'>
      <section>
        <Geometry />
      </section>

      <div className='divider'></div>
      <section>
        <label className='label-text text-lg'>Material</label>
        <div className=' mt-4  flex flex-wrap gap-4'>
          {materials.map((material) => (
            <button key={material} onClick={() => store.setMaterial(material)}>
              <picture>
                <img
                  className={clsx('h-12 w-12 rounded-full', {
                    'ring-primary-500 ring-2 ring-offset-2 ring-offset-yellow-400': store.material === material,
                  })}
                  src={`/textures/${material}/baseColor.jpg`}
                  alt=''
                />
              </picture>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
