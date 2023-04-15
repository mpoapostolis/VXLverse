import { AnimationAction, HexColorString, Mesh, Vector3 } from 'three'
import { create } from 'zustand'
import { defaultGameConf, subStore } from './utils'

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
  blob?: Blob
  animation?: string
  color?: string
  keyBindings?: KeyBindings
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

export type Mode = 'translate' | 'rotate' | 'scale'
export type Store = {
  currentScene?: string
  setCurrentScene: (currentScene?: string) => void
  reset: () => void
  nodes: Partial<Node>[]
  scenes: Scene[]
  addScene: (scene: Scene) => void
  addNode: (node: Partial<Node>) => void
  mode: Mode
  setMode: (mode: Mode) => void
  selectedNode?: string
  selectNode: (uuid?: string) => void
  updateNode: (uuid: string, node: Partial<Node>) => void
  updateScene: (uuid?: string, scene?: Partial<Scene>) => void
  deleteNode: () => void
  deleteScene: (uuid?: string) => void
}

export const useStore = create<Store>((set) => ({
  mode: 'translate',
  nodes: [],
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

subStore()
