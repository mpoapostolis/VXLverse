import { BoxGeometryProps } from '@react-three/fiber'
import { Euler, Vector3 } from 'three'
import { create } from 'zustand'

export const PLANE_GEOMETRY = new Vector3(5, 0.5, 5)
export const CUBE_GEOMETRY = new Vector3(5, 5, 5)
export const GRID_SIZE = 80

// uuid-generator
export const uuid = () => {
  let dt = new Date().getTime()
  const uuid = 'xxxxx-xxxxx-xxxxx-xxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)

    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

export type Tile = {
  position: Vector3
  args: BoxGeometryProps['args']
  rotation?: Euler
  scale?: Vector3
  material: string
  id: string
}

export const defaultTile = {
  position: new Vector3(0, 0, 0),
  args: PLANE_GEOMETRY.toArray(),
  material: 'marble',
}
export type Mode = 'default' | 'add' | 'edit' | 'delete'
export type Store = {
  walls: Tile[]
  tiles: Tile[]
  mode: Mode
  setMode: (mode: Mode) => void
  addTile: (tile: Tile) => void
  setTiles: (tiles: Tile[]) => void
  ghostTile?: Partial<Tile>
  setGhostTile: (tile?: Partial<Tile>) => void
}

export const useStore = create<Store>((set) => ({
  walls: [],
  tiles: [],
  mode: 'default',
  setMode: (mode) => set({ mode }),
  setTiles: (tiles) => set({ tiles }),
  setGhostTile: (ghostTile) => {
    if (!ghostTile) {
      set(() => {
        return {
          ghostTile: undefined,
        }
      })
    } else
      set((s) => {
        return {
          ghostTile: {
            ...s.ghostTile,
            ...ghostTile,
          },
        }
      })
  },

  addTile: (tile: Tile) => {
    set((state) => {
      return {
        tiles: [...state.tiles, { ...tile, id: uuid() }],
      }
    })
  },
}))
