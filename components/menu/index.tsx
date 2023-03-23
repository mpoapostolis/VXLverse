import { useStore } from '@/store'

export default function Menu() {
  const store = useStore()
  return (
    <div className=' flex h-screen w-full flex-col  border-r-2 border-base-300 bg-base-100 p-4'>
      <label htmlFor=''>Menu</label>
      <div className='divider'></div>
      <ul className='grid gap-4'>
        {store.tiles.map((tile, idx) => (
          <li
            key={tile.id}
            className=' grid w-full grid-cols-[1fr_30px_30px] gap-2'
            onClick={() => {
              if (tile.id) store.setSelectedTile(tile.id)
            }}>
            <button className='btn-sm btn truncate'>{tile?.name ?? 'mesh'}</button>
            <button>
              <picture>
                <img src='https://s2.svgbox.net/materialui.svg?ic=delete&color=888' alt='' />
              </picture>
            </button>
            <button>
              <picture>
                <img src='https://s2.svgbox.net/hero-outline.svg?ic=duplicate&color=888' alt='' />
              </picture>
            </button>{' '}
          </li>
        ))}
      </ul>
      <button
        className='btn mt-auto'
        onClick={() => {
          store.setMode('add')
          store.createTile()
        }}>
        Add new
      </button>
    </div>
  )
}
