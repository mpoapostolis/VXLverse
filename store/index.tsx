import { NodeType } from '@/components/menu'
import { Euler, Mesh, Vector3 } from 'three'
import { create } from 'zustand'

export const PLANE_GEOMETRY = new Vector3(5, 0.5, 5)
export const CUBE_GEOMETRY = new Vector3(5, 5, 5)
export const GRID_SIZE = 80

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

export type Node = Partial<Mesh> & {
  type: NodeType
  object?: string
}
export type SceneType = 'color' | 'equirect'

type Scene = {
  type?: SceneType
  color?: string
  equirect?: string
}

export type Mode = 'translate' | 'rotate' | 'scale'
export type Store = {
  nodes: Partial<Node>[]
  scene?: Scene
  setScene: (scene: Scene) => void
  addNode: (node: Partial<Node>) => void
  mode: Mode
  setMode: (mode: Mode) => void
  selectedNode?: string
  selectNode: (uuid?: string) => void
}

export const useStore = create<Store>((set) => ({
  mode: 'translate',
  nodes: [],
  selectNode: (uuid) => set({ selectedNode: uuid }),
  setScene: (scene) => set({ scene: scene }),
  addNode(node) {
    set((state) => ({
      selectedNode: node.uuid,
      nodes: [...state.nodes, node],
    }))
  },
  scene: {
    type: 'color',
    color: '#999',
  },
  setMode: (mode) => set({ mode }),
}))
