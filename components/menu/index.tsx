import { Tile, useStore } from '@/store'
import { Vector3 } from 'three'
import { NodeModal } from '../nodeModal'

export default function Menu() {
  const store = useStore()
  const selectedTile = store.tiles.find((tile) => tile.id === store.selectedTile)
  return (
    <div className=' flex h-screen w-full flex-col  border-r-2 border-base-300 bg-base-100 p-4'>
      <div className='grid grid-cols-2'>
        <label htmlFor=''>Menu</label>
        <NodeModal />
      </div>
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
            <button
              onClick={(e) => {
                e.stopPropagation()
                const tiles = [...store.tiles].filter((tile) => tile.id !== store.selectedTile)
                store.setTiles(tiles)
              }}>
              <picture>
                <img src='https://s2.svgbox.net/materialui.svg?ic=delete&color=888' alt='' />
              </picture>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (!selectedTile) return
                const { id, ...rest } = selectedTile as Tile
                store.addTile({ ...rest, position: rest.position?.clone().add(new Vector3(0, 0, 1)) })
              }}>
              <picture>
                <img src='https://s2.svgbox.net/hero-outline.svg?ic=duplicate&color=888' alt='' />
              </picture>
            </button>{' '}
          </li>
        ))}
      </ul>
    </div>
  )
}
