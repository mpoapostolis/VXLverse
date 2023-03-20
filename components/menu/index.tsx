import { PLANE_GEOMETRY, useStore } from '@/store'
import Link from 'next/link'

export default function Menu() {
  const store = useStore()
  return (
    <div className=' flex h-screen w-full flex-col  border-r-2 border-base-300 bg-base-100 p-4'>
      <label htmlFor=''>Menu</label>
      <div className='divider'></div>
      <Link
        className='btn mt-auto'
        onClick={() => {
          store.setGeometry(PLANE_GEOMETRY)
        }}
        href={{
          query: {
            mode: 'create',
          },
        }}>
        Add new
      </Link>
    </div>
  )
}
