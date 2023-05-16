'use client'

import { toast } from '@/components/ui/use-toast'
import { Game } from '@/lib/games/types'
import { RigidBodyTypeString } from '@react-three/rapier'
import { AnimationAction, Mesh, Vector3 } from 'three'
import { create } from 'zustand'
import {
  CharStatus,
  VXLverseVersion,
  defaultGameConf,
  defaultNodes,
  defaultScenes,
  getLocalStorage,
  jsonToMesh,
  meshToJson,
} from './utils'

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

export type GameType =
  | 'hero'
  | 'vehicles'
  | 'food'
  | 'misc'
  | 'architecture'
  | 'furniture'
  | 'animals'
  | 'plants'
  | 'health'
  | 'characters'
  | 'accessories'
  | 'nature'
  | 'instruments'
  | 'scenes'

export const gameTypes: GameType[] = [
  'hero',
  'vehicles',
  'food',
  'misc',
  'architecture',
  'furniture',
  'animals',
  'plants',
  'health',
  'characters',
  'accessories',
  'nature',
  'instruments',
  'scenes',
]

export type Node = Partial<Mesh> & {
  scene?: string
  url?: string
  collectable?: boolean
  goTo?: Vector3
  velocity?: number
  blob?: Blob
  animation?: string
  color?: string
  statusToAnimation?: Record<string, CharStatus>
  showWhenInventoryHas?: string[]
  status: CharStatus
  gameType?: GameType
  img?: string
  physics?: RigidBodyTypeString
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

export type InventoryItem = string
export type Inventory = InventoryItem[]

type Dialogue = {
  dialogue?: string
  src?: string
}

export type Mode = 'translate' | 'rotate' | 'scale'
export type Store = {
  reset: () => void

  user?: User
  setUser: (user?: User) => void

  setMode: (mode: Mode) => void
  mode: Mode

  inventory: Inventory
  addToInventory: (item: InventoryItem) => void
  removeFromInventory: (item: InventoryItem) => void
  clearInventory: () => void

  dialogue?: Dialogue
  setDialogue: (dialogue?: Dialogue) => void

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

  setDialogue: (dialogue) => set({ dialogue }),

  inventory: [],
  addToInventory: (item) =>
    set((state) => ({
      inventory: [...state.inventory, item],
    })),
  removeFromInventory: (item) =>
    set((state) => ({
      inventory: state.inventory.filter((i) => i !== item),
    })),

  clearInventory: () => set({ inventory: [] }),

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
  deleteNode: () => {
    const { nodes, selectedNode } = useStore.getState()
    const hero = nodes.find((n) => n.uuid === selectedNode)?.gameType === 'hero'
    if (hero)
      return toast({
        variant: 'destructive',
        title: 'Hero cannot be delete',
        description: 'You can change the hero 3d model in the settings tab',
      })
    set((state) => ({
      nodes: state.nodes.filter((node) => node.uuid !== state.selectedNode),
    }))
  },

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
  const localstorage = getLocalStorage()
  const nodes = state.nodes.map(meshToJson) ?? []
  localstorage?.setItem(
    VXLverseVersion,
    JSON.stringify({ user: state.user, nodes, inventory: state.inventory, scenes: state.scenes }),
  )
})

export function init() {
  const localStorage = getLocalStorage()
  const store = localStorage?.getItem(VXLverseVersion)
  const parsedStore = store
    ? JSON.parse(store)
    : {
        nodes: defaultNodes,
        scenes: defaultScenes,
      }

  useStore?.setState({
    user: parsedStore?.user,
    nodes: parsedStore?.nodes?.map(jsonToMesh) ?? defaultGameConf?.nodes,
    scenes: parsedStore.scenes ?? defaultGameConf?.scenes,
    inventory: parsedStore?.inventory ?? [],
    selectedNode: undefined,
    currentScene: parsedStore?.scenes?.at(0)?.uuid,
  })
}
