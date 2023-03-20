import { BoxGeometryProps } from '@react-three/fiber'
import { Vector3 } from 'three'
import { create } from 'zustand'

export const PLANE_GEOMETRY = new Vector3(5, 1, 5)
export const CUBE_GEOMETRY = new Vector3(5, 5, 5)
export const GRID_SIZE = 80

type Tile = {
  position: Vector3
  args: BoxGeometryProps['args']
  material: string
}

export type Room = {
  p1?: Vector3
  p2?: Vector3
}
export type Store = {
  walls: Tile[]
  tiles: Tile[]
  addTile: (v3: Vector3) => void
  material?: string
  setMaterial: (material: string) => void
  geometry: Vector3
  setGeometry: (geometry: Vector3) => void
}

export const useStore = create<Store>((set) => ({
  walls: [],
  tiles: [],
  selected: undefined,
  geometry: new Vector3(10, 1, 10),
  setGeometry: (geometry) => set({ geometry }),
  addTile: (v3) => {
    set((state) => {
      return {
        tiles: [
          ...state.tiles,
          {
            position: v3,
            args: state.geometry.toArray() ?? [0, 0, 0],
            material: state.material ?? '',
          },
        ],
      }
    })
  },
  setMaterial: (material) => set({ material }),
  material: 'marble',
}))
