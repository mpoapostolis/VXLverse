import { Game } from '@/lib/games/types'
import { AnimationAction, Mesh, Vector3 } from 'three'
import { create } from 'zustand'
import { CharStatus, defaultGameConf, initDb, jsonToMesh, meshToJson } from './utils'

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

export type User = {
  email: string
  given_name: string
  id: string
  locale: string
  name: string
  picture: string
  verified_email: boolean
}

export type KeyBindings = {
  onClick?: string
  default?: string
} & Record<string, string>

export type Quest = {
  uuid: string
  name: string
  initialDialog: string
  requiredItemToComplete?: string
  questCompleteDialog?: string
  reward?: string
  status: 'incomplete' | 'completed'
}

export type GameType = 'hero' | 'monster' | 'npc' | 'item'
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
  img?: string
  actions?: {
    [x: string]: AnimationAction | null
  }
  quests?: Quest[]
  type: NodeType
}
export type SceneType = 'color' | 'equirect'

export type Scene = {
  uuid?: string
  name?: string
  type?: SceneType
  color?: string
  equirect?: string
  blob?: Blob
}

export type Mode = 'translate' | 'rotate' | 'scale'
export type Store = {
  reset: () => void

  user?: User
  setUser: (user?: User) => void

  setMode: (mode: Mode) => void
  mode: Mode

  scenes: Scene[]
  currentScene?: string
  setCurrentScene: (currentScene?: string) => void
  addScene: (scene: Scene) => void
  deleteScene: () => void
  updateScene: (uuid?: string, scene?: Partial<Scene>) => void
  resetScene: () => void
  nodes: Partial<Node>[]
  selectedNode?: string
  addNode: (node: Partial<Node>) => void
  deleteNode: () => void
  selectNode: (uuid?: string) => void
  updateNode: (uuid: string, node: Partial<Node>) => void

  setGame: (game: Game) => void
}

export const useStore = create<Store>((set) => ({
  setUser: (user) => set({ user }),

  mode: 'translate',
  nodes: [],

  resetScene: () =>
    set((s) => {
      return {
        scenes: s.scenes.map((scene) =>
          scene.uuid === s.currentScene
            ? {
                ...scene,
                color: '#000',
                type: 'color',
              }
            : scene,
        ),

        nodes: s.nodes.filter((n) => n.scene !== s.currentScene),
      }
    }),

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
      const firstSceneAfterDelete = state.scenes[idx + 1] || state.scenes[idx - 1]
      return {
        currentScene: firstSceneAfterDelete?.uuid,
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

  setGame: (game) =>
    set({
      nodes: game.nodes.map(jsonToMesh),
      scenes: game.scenes,
    }),
}))

useStore?.subscribe(async (state) => {
  const db = await initDb()
  const nodes = state.nodes.map(meshToJson)
  db.put('store', { user: state.user, nodes, scenes: state.scenes }, 0)
})
