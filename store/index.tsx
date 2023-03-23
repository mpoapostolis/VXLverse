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
  rotation?: Euler
  scale?: Vector3
  material: string
  id?: string
  name?: string
}

export const defaultTile: Tile = {
  position: new Vector3(0, 0, 0),
  scale: PLANE_GEOMETRY,
  material: 'marble',
}

export type Mode = 'default' | 'add' | 'edit' | 'delete'
export type Store = {
  tiles: Tile[]
  mode: Mode
  setMode: (mode: Mode) => void
  addTile: (tile: Tile) => void
  setTiles: (tiles: Tile[]) => void
  ghostTile?: Partial<Tile>
  updateTile: (tile: Partial<Tile>) => void
  killGhostTile: () => void
  createTile: (tile: Tile) => void
  selectedTile?: string
  setSelectedTile: (id?: string) => void
}

export const useStore = create<Store>((set) => ({
  tiles: [],
  mode: 'default',
  setMode: (mode) => set({ mode }),
  setTiles: (tiles) => set({ tiles }),
  setSelectedTile: (id) =>
    set({
      mode: 'edit',
      selectedTile: id,
    }),
  killGhostTile: () =>
    set({
      ghostTile: undefined,
    }),
  createTile: (ghostTile) =>
    set({
      mode: 'add',
      ghostTile,
    }),

  updateTile: (ghostTile) =>
    set((s) => ({
      ghostTile: {
        ...s.ghostTile,
        ...ghostTile,
      },
    })),

  addTile: (tile: Tile) => {
    set((state) => {
      const id = uuid()
      return {
        tiles: [...state.tiles, { ...tile, id }],
        mode: 'edit',
        ghostTile: undefined,
        selectedTile: id,
      }
    })
  },
}))
