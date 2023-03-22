import { defaultTile, useStore } from '@/store'

export default function Menu() {
  const store = useStore()
  return (
    <div className=' flex h-screen w-full flex-col  border-r-2 border-base-300 bg-base-100 p-4'>
      <label htmlFor=''>Menu</label>
      <div className='divider'></div>
      <button
        className='btn mt-auto'
        onClick={() => {
          store.setMode('add')
          store.setGhostTile(defaultTile)
        }}>
        Add new
      </button>
    </div>
  )
}
