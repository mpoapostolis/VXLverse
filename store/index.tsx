import { AnimationAction, HexColorString, Mesh, Vector3 } from 'three'
import { create } from 'zustand'
import { CharStatus, defaultGameConf, initDb, meshToJson } from './utils'

export type NodeType =
  | 'GLTF'
  | 'Box'
  | 'Capsule'
  | 'Circle'
  | 'Cylinder'
  | 'Dodecahedron'
  | 'Icosahedron'
  | 'Lathe'
  | 'Octahedron'
  | 'Plane'
  | 'Ring'
  | 'Sphere'
  | 'Sprite'
  | 'Tetrahedron'
  | 'Torus'
  | 'TorusKnot'
  | 'Tube'
  | 'AmbientLight'
  | 'DirectionalLight'
  | 'HemisphereLight'
  | 'PointLight'
  | 'SpotLight'
  | 'OrthographicCamera'
  | 'PerspectiveCamera'
  | 'AmbientLight'
  | 'DirectionalLight'
  | 'HemisphereLight'
  | 'PointLight'
  | 'SpotLight'

export const PLANE_GEOMETRY = new Vector3(5, 0.5, 5)
export const CUBE_GEOMETRY = new Vector3(5, 5, 5)
export const GRID_SIZE = 80

export type KeyBindings = {
  onClick?: string
  default?: string
} & Record<string, string>
export type GameType = 'hero' | 'enemy' | 'npc'
export type Node = Partial<Mesh> & {
  scene?: string
  url?: string
  goTo?: Vector3
  velocity?: number
  blob?: Blob
  animation?: string
  color?: string
  statusToAnimation?: Record<string, CharStatus>
  status: CharStatus
  gameType?: GameType
  actions?: {
    [x: string]: AnimationAction | null
  }
  type: NodeType
}
export type SceneType = 'color' | 'equirect'

export type Scene = {
  uuid?: string
  name?: string
  type?: SceneType
  color?: HexColorString
  equirect?: string
  blob?: Blob
}

export type BucketItem = {
  uuid: string
  ext?: string
  name: string
  url?: string
  blob?: Blob
}

export type Mode = 'translate' | 'rotate' | 'scale'
export type Store = {
  reset: () => void

  bucket: BucketItem[]
  updateBucket: (uuid: string, node: BucketItem) => void
  deleteBucketItem: (uuid: string) => void
  addToBucket: (item: BucketItem) => void

  setMode: (mode: Mode) => void
  mode: Mode

  scenes: Scene[]
  currentScene?: string
  setCurrentScene: (currentScene?: string) => void
  addScene: (scene: Scene) => void
  deleteScene: (uuid?: string) => void
  updateScene: (uuid?: string, scene?: Partial<Scene>) => void

  nodes: Partial<Node>[]
  selectedNode?: string
  addNode: (node: Partial<Node>) => void
  deleteNode: () => void
  selectNode: (uuid?: string) => void
  updateNode: (uuid: string, node: Partial<Node>) => void
}

export const useStore = create<Store>((set) => ({
  mode: 'translate',
  nodes: [],
  bucket: [],
  addToBucket: (item) =>
    set((state) => ({
      bucket: [...state.bucket, item],
    })),
  deleteBucketItem: (uuid) =>
    set((state) => ({
      bucket: state.bucket.filter((item) => item.url !== uuid),
    })),

  updateBucket: (uuid, node) =>
    set((state) => ({
      bucket: state.bucket.map((item) => (item.uuid === uuid ? { ...item, ...node } : item)),
    })),

  setCurrentScene: (currentScene) => set({ currentScene }),
  selectNode: (uuid) => set({ selectedNode: uuid }),

  addScene: (scene) =>
    set((s) => {
      return {
        currentScene: scene.uuid,
        scenes: [...(s.scenes ?? []), scene],
      }
    }),

  reset: () =>
    set({
      ...defaultGameConf,
    }),
  deleteNode: () =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.uuid !== state.selectedNode),
    })),

  deleteScene: () =>
    set((state) => {
      const idx = state.scenes.findIndex((s) => s.uuid === state.currentScene)
      return {
        currentScene: state.scenes[idx - 1]?.uuid ?? undefined,
        scenes: state.scenes.filter((scene) => scene.uuid !== state.currentScene),
      }
    }),

  updateNode: (uuid, node) => {
    set((state) => ({
      nodes: state.nodes.map((n) => (n.uuid === uuid ? { ...n, ...node } : n)),
    }))
  },
  updateScene: (uuid, scene) => {
    set((state) => ({
      scenes: state.scenes?.map((s) => (s.uuid === uuid ? { ...s, ...scene } : s)),
    }))
  },

  addNode(node) {
    set((state) => ({
      selectedNode: node.uuid,
      nodes: [...state.nodes, node],
    }))
  },
  scenes: [],
  setMode: (mode) => set({ mode }),
}))

useStore?.subscribe(async (state) => {
  const db = await initDb()
  const nodes = state.nodes.map(meshToJson)
  db.put('store', { nodes, scenes: state.scenes, bucket: state.bucket }, 0)
})
