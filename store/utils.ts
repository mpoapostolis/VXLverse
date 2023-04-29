import { saveAs } from 'file-saver'
import { openDB } from 'idb'
import JSZip from 'jszip'
import { Mesh } from 'three'
import { Node, Scene, Store, User, useStore } from '.'

const defaultNodes = (
  [
    {
      name: 'DirectionalLight',
      position: [2.3443115362954874, 0, 0.4895091354721197],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      type: 'DirectionalLight',
      scene: 'main',
    },
  ] as any[]
).map(jsonToMesh)

const defaultScenes: Scene[] = [
  {
    uuid: 'main',
    name: 'Main',
    type: 'color',
    color: '#000',
  },
]

export const defaultGameConf: Partial<Store> = {
  nodes: defaultNodes,
  scenes: defaultScenes,
  currentScene: defaultScenes?.at(0)?.uuid,
}

export async function initDb() {
  return openDB('vxlverse', 1, {
    upgrade(db) {
      db.createObjectStore('store', {
        autoIncrement: true,
      })
    },
  })
}

export function meshToJson(mesh: Partial<Node>) {
  return {
    name: mesh.name,
    position: mesh.position?.toArray(),
    rotation: mesh.rotation?.toArray(),
    scale: mesh.scale?.toArray(),
    blob: mesh.blob,
    gravity: mesh.gravity,
    modelId: mesh.modelId,
    url: mesh.blob ? undefined : mesh.url,
    animation: mesh.animation,
    color: mesh.color,
    scene: mesh.scene,
    gameType: mesh.gameType,
    statusToAnimation: mesh.statusToAnimation,
    type: mesh.type,
    quests: mesh.quests,
    img: mesh.img,
  }
}

export function jsonToMesh(json: Node) {
  const v3 = (json?.position ?? [0, 0, 0]) as number[]
  const e3 = (json.rotation ?? [0, 0, 0]) as number[]
  const s3 = (json.scale ?? [0, 0, 0]) as number[]

  const pair = Object.entries(json.statusToAnimation ?? {})
  const idleAnimation = pair.find(([_, key]) => key === 'idle')?.[0]
  const mesh = new Mesh() as Node
  mesh.position?.set(v3[0], v3[1], v3[2])
  mesh.rotation?.set(e3[0], e3[1], e3[2])
  mesh.scale?.set(s3[0], s3[1], s3[2])
  mesh.type = json.type
  mesh.gravity = json.gravity
  mesh.quests = json.quests
  mesh.blob = json.blob
  mesh.scene = json.scene
  mesh.gameType = json.gameType
  mesh.name = json.name
  mesh.url = json.blob ? URL.createObjectURL(json.blob) : json.url
  mesh.animation = idleAnimation
  mesh.color = json.color
  mesh.statusToAnimation = json.statusToAnimation
  mesh.type = json.type
  mesh.img = json.img
  mesh.modelId = json.modelId
  return mesh
}

export function exportGame() {
  const state = useStore.getState() ?? []
  const nodes = state.nodes.map(meshToJson) ?? []
  const scenes = state.scenes.map((scene) => ({
    ...scene,
  }))

  const zip = new JSZip()
  zip.file('gameConf.json', JSON.stringify({ nodes, scenes }))

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'VXLverse.zip')
  })
}

// take file from input type
export async function importGameZip(file: File) {
  const zip = await JSZip.loadAsync(file)
  const _gameConf = await zip.file('gameConf.json')?.async('string')
  const gameConfJson = JSON.parse(_gameConf ?? '{}')
  const assets = zip.folder('assets')
  const gltf = assets?.folder('gltf')

  // const nodes = gameConfJson?.nodes?.map(jsonToMesh) ?? []
  const scenes = await Promise.all(
    gameConfJson?.scenes?.map(async (scene: any) => {
      return {
        ...scene,
      }
    }) ?? [],
  )

  const _nodes = await Promise.all(
    gameConfJson?.nodes.map(async (node: Node) => {
      const blob = await gltf?.file(node?.name ?? '')?.async('blob')
      return {
        ...node,
        blob,
      }
    }),
  )

  const nodes = _nodes.map(jsonToMesh)
  useStore?.setState({
    nodes,
    scenes,
    selectedNode: undefined,
    currentScene: scenes?.at(0)?.uuid,
  })
}

initDb().then(async (s) => {
  const [store] = (await s.getAll('store')) as {
    user: User
    nodes: Node[]
    scenes: Scene[]
  }[]

  const scenes =
    store?.scenes?.map((obj) => ({
      ...obj,
      equirect: obj.blob ? URL.createObjectURL(obj.blob) : undefined,
    })) ?? defaultGameConf?.scenes
  useStore?.setState({
    user: store?.user,
    nodes: store?.nodes?.map(jsonToMesh) ?? defaultGameConf?.nodes,
    scenes,

    selectedNode: undefined,
    currentScene: scenes?.at(0)?.uuid,
  })
})

export type CharStatus = 'walk' | 'run' | 'attack' | 'jump' | 'die' | 'idle' | 'hit' | 'interact'

export const CharStatuss: {
  label: string
  value: CharStatus
}[] = [
  { label: 'Walk', value: 'walk' },
  { label: 'Run', value: 'run' },
  { label: 'Attack', value: 'attack' },
  { label: 'Jump', value: 'jump' },
  { label: 'Die', value: 'die' },
  { label: 'Idle', value: 'idle' },
  { label: 'Hit', value: 'hit' },
  { label: 'Interact', value: 'interact' },
]
