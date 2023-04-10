import { NodeType } from '@/components/menu'
import { openDB } from 'idb'
import { AnimationAction, HexColorString, Mesh, Vector3 } from 'three'
import { create } from 'zustand'

export const PLANE_GEOMETRY = new Vector3(5, 0.5, 5)
export const CUBE_GEOMETRY = new Vector3(5, 5, 5)
export const GRID_SIZE = 80

async function initDb() {
  return openDB('vxlverse', 1, {
    upgrade(db) {
      db.createObjectStore('store', {
        autoIncrement: true,
      })
    },
  })
}

export type KeyBindings = {
  onClick?: string
  default?: string
} & Record<string, string>
export type GameType = 'hero' | 'enemy' | 'npc'
export type Node = Partial<Mesh> & {
  type: NodeType
  url?: string
  blob?: Blob
  animation?: string
  color?: string
  keyBindings?: KeyBindings
  gameType?: GameType
  actions?: {
    [x: string]: AnimationAction | null
  }
}
export type SceneType = 'color' | 'equirect'

type Scene = {
  type?: SceneType
  color?: HexColorString
  equirect?: string
  blob?: Blob
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
  updateNode: (uuid: string, node: Partial<Node>) => void
  deleteNode: () => void
}

const light = new Mesh() as Node
light.position?.set(5, 10, 0)
light.type = 'DirectionalLight'

export const useStore = create<Store>((set) => ({
  mode: 'translate',
  nodes: [],
  selectNode: (uuid) => set({ selectedNode: uuid }),
  setScene: (scene) => set({ scene: scene }),
  deleteNode: () =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.uuid !== state.selectedNode),
    })),

  updateNode: (uuid, node) => {
    set((state) => ({
      nodes: state.nodes.map((n) => (n.uuid === uuid ? { ...n, ...node } : n)),
    }))
  },

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

function meshToJson(mesh: Partial<Node>) {
  return {
    name: mesh.name,
    position: mesh.position?.toArray(),
    rotation: mesh.rotation?.toArray(),
    scale: mesh.scale?.toArray(),
    type: mesh.type,
    blob: mesh.blob,
    animation: mesh.animation,
    color: mesh.color,
    gameType: mesh.gameType,
    keyBindings: mesh.keyBindings,
  }
}

function jsonToMesh(json: Node) {
  const v3 = (json?.position ?? [0, 0, 0]) as number[]
  const e3 = (json.rotation ?? [0, 0, 0]) as number[]
  const s3 = (json.scale ?? [0, 0, 0]) as number[]

  const mesh = new Mesh() as Node
  mesh.position?.set(v3[0], v3[1], v3[2]),
    mesh.rotation?.set(e3[0], e3[1], e3[2]),
    mesh.scale?.set(s3[0], s3[1], s3[2]),
    (mesh.type = json.type)
  mesh.blob = json.blob
  mesh.gameType = json.gameType
  mesh.name = json.name
  mesh.url = json.blob ? URL.createObjectURL(json.blob) : undefined
  mesh.animation = json.animation
  mesh.color = json.color
  mesh.actions = json.actions
  mesh.keyBindings = json.keyBindings
  // default animation
  if (mesh.keyBindings?.default) mesh.animation = mesh.keyBindings?.default
  return mesh
}

useStore.subscribe(async (state) => {
  const db = await initDb()
  const nodes = state.nodes.map(meshToJson)
  db.put('store', { nodes, scene: state.scene }, 0)
})

initDb().then(async (s) => {
  const [store] = await s.getAll('store')
  const equirect =
    store.scene.blob && store.scene?.type === 'equirect' ? URL.createObjectURL(store.scene.blob) : undefined

  useStore.setState({
    nodes: store?.nodes?.map(jsonToMesh) ?? [],
    scene: { ...store?.scene, equirect } ?? {
      type: 'color',
      color: '#999',
    },
  })
})
