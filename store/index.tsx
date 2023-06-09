'use client'

import { toast } from '@/components/ui/use-toast'
import { Game } from '@/lib/games/types'
import { RigidBodyTypeString } from '@react-three/rapier'
import { AnimationAction, Vector3 } from 'three'
import { create } from 'zustand'
import { CharStatus, VXLverseVersion, defaultGameConf, getLocalStorage, getUuid } from './utils'

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

export type GameInfo = {
  id?: string
  name?: string
  description?: string
  createdBy?: string
  genre?: string
  public?: boolean
  preview?: string
}

export type KeyBindings = {
  onClick?: string
  default?: string
} & Record<string, string>

export type OptionQuestType = {
  uuid: string
  name: string
  x?: number
  y?: number
  npcText?: string
  parrentId?: string
  saidBy?: string
  tree?: string[]
  reward?: string
  requiredItem?: string
  imgUrl?: string
  videoUrl?: string
  goToScene?: string
  url?: string
  action?: string
}
export type QuestType = {
  uuid: string
  x?: number
  y?: number
  name: string
  npcText?: string
  tree?: string[]
  nodeId?: string
  options?: OptionQuestType[]
  reward?: string
  requiredItem?: string
  imgUrl?: string
  videoUrl?: string
  goToScene?: string
  url?: string
  action?: string
  status?: 'incomplete' | 'completed'
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

export type MaterialType =
  | 'fabric'
  | 'concrete'
  | 'floors'
  | 'ground'
  | 'metals'
  | 'models'
  | 'organic'
  | 'roads'
  | 'stone'
  | 'synthetic'
  | 'trees'
  | 'walls'
  | 'wood'
  | 'mirror'

export const materialTypes: MaterialType[] = [
  'fabric',
  'concrete',
  'floors',
  'ground',
  'metals',
  'models',
  'organic',
  'roads',
  'stone',
  'synthetic',
  'trees',
  'walls',
  'wood',
  'mirror',
]

export type NodeMaterial = {
  map?: string
  displacement?: string
  metalness?: string
  normal?: string
  roughness?: string
  preview?: string
  type?: MaterialType
}

export type Node = {
  uuid?: string
  name?: string
  scene?: string
  url?: string
  position?: number[]
  rotation?: number[]
  scale?: number[]
  collectable?: boolean
  goTo?: number[]
  velocity?: number
  blob?: Blob
  animation?: string
  color?: string
  statusToAnimation?: Record<string, CharStatus>
  showWhenInventoryHas?: string[]
  status: CharStatus
  gameType?: GameType
  img?: string
  material?: NodeMaterial
  physics?: RigidBodyTypeString
  actions?: {
    [x: string]: AnimationAction | null
  }
  showImg?: string
  showVideo?: string
  type: NodeType
}
export type SceneType = 'color' | 'equirect'

export type Scene = {
  uuid?: string
  name?: string
  type?: SceneType
  skyBox?: string
  intro?: string
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
  gameInfo?: GameInfo
  setGameInfo: (game?: GameInfo) => void

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
  removeNode: (uuid: string) => void
  duplicateNode: () => void
  selectNode: (uuid?: string) => void
  updateNode: (uuid: string, node: Partial<Node>) => void

  setGame: (game: Game) => void

  quests?: QuestType[]
  newQuest: () => void
  updateQuest: (quest: Partial<QuestType>) => void
  deleteQuest: (uuid: string) => void
  selectedQuest?: string
  setSelectedQuest: (uuid?: string) => void
  goTo?: Vector3
  setGoTo: (goTo?: Vector3) => void
}

export const useStore = create<Store>((set) => ({
  setUser: (user) => set({ user }),
  mode: 'translate',
  nodes: [],
  gameInfo: {},
  setGameInfo: (gameInfo) => set({ gameInfo }),

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
      nodes: defaultGameConf?.nodes,
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
      selectedNode: undefined,
      nodes: state.nodes.filter((node) => node.uuid !== state.selectedNode),
    }))
  },
  removeNode: (uuid) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.uuid !== uuid),
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

  duplicateNode: () =>
    set((state) => {
      if (!state.selectedNode) return state
      const node = state.nodes.find((n) => n.uuid === state.selectedNode)
      const uuid = getUuid()
      const quests =
        state.quests
          ?.filter((q) => q.nodeId === state.selectedNode)
          ?.map((e) => ({
            ...e,
            uuid: getUuid(),
            nodeId: state.selectedNode,
          })) ?? []
      return {
        selectedNode: uuid,
        nodes: [{ ...node, uuid }, ...state.nodes],
        quests: [...(state?.quests ?? []), ...quests],
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
      nodes: [node, ...state.nodes],
    }))
  },
  scenes: [],
  setMode: (mode) => set({ mode }),

  setGame: (game) =>
    set({
      gameInfo: {
        id: game.id,
        name: game.name,
        description: game.description,
        genre: game.genre,
        preview: game.preview,
        public: game.public,
      },
      nodes: game.nodes,
      scenes: game.scenes,
      quests: game.quests,
    }),

  newQuest: () => {
    set((state) => {
      const uuid = getUuid()
      const quests = state.quests ?? []
      const newQuest = {
        uuid,
        name: 'New Quest',
        status: 'incomplete',
        nodeId: state.selectedNode,
        options: [],
      } as QuestType
      return {
        quests: [newQuest, ...quests],
      }
    })
  },
  deleteQuest: (uuid) => {
    set((state) => ({
      quests: state.quests?.filter((q) => q.uuid !== uuid),
    }))
  },
  updateQuest: (quest) => {
    set((state) => ({
      quests: state.quests?.map((q) => (q.uuid === state.selectedQuest ? { ...q, ...quest } : q)),
    }))
  },

  setSelectedQuest: (uuid) => set({ selectedQuest: uuid }),
  setGoTo: (goTo) => set({ goTo }),
}))

useStore?.subscribe(async (state) => {
  const localstorage = getLocalStorage()
  const nodes =
    state.nodes?.map((e) => ({
      ...e,
      actions: undefined,
    })) ?? []

  localstorage?.setItem(
    VXLverseVersion,
    JSON.stringify({
      gameInfo: state.gameInfo,
      user: state.user,
      nodes,
      quests: state.quests,
      inventory: state.inventory,
      scenes: state.scenes,
    }),
  )
})

export function init() {
  const localStorage = getLocalStorage()
  const store = localStorage?.getItem(VXLverseVersion)

  const parsedStore = store
    ? JSON.parse(store)
    : {
        nodes: defaultGameConf.nodes,
        quests: defaultGameConf.quests,
        scenes: defaultGameConf.scenes,
      }

  useStore?.setState({
    gameInfo: parsedStore?.gameInfo,
    user: parsedStore?.user,
    nodes: parsedStore?.nodes,
    scenes: parsedStore.scenes ?? defaultGameConf?.scenes,
    inventory: parsedStore?.inventory ?? [],
    selectedNode: undefined,
    quests: parsedStore?.quests ?? [],

    currentScene: parsedStore?.scenes?.at(0)?.uuid,
  })
}
