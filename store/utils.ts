'use client'

export const VXLverseVersion = 'VXLverse_v0.6.0'

import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { Mesh } from 'three'
import { Scene, Store, useStore } from '.'

export const getUuid = () => {
  const mesh = new Mesh()
  const uuid = mesh.uuid
  mesh?.remove()
  return uuid
}
export const defaultNodes = [
  {
    uuid: getUuid(),
    scale: [80, 80, 1],
    scene: 'main',
    position: [0, 0, 0],
    name: 'Floor',
    type: 'Plane',
    rotation: [-90, 0, 0],
  },
  {
    uuid: getUuid(),
    name: 'DirectionalLight',
    position: [-40, 20, 40],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    scene: 'main',
    type: 'DirectionalLight',
  },
  {
    uuid: getUuid(),
    name: 'DirectionalLight',
    position: [40, 20, -40],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    scene: 'main',
    type: 'DirectionalLight',
  },
  {
    uuid: getUuid(),
    img: 'thumbnail.gif',
    gameType: 'hero',
    scene: 'main',
    position: [0, 0, 0],
    url: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-hat/model.gltf',
    type: 'GLTF',
    physics: 'fixed',
    animation: 'pose_chapeau',
    name: 'Hero',
    statusToAnimation: {
      course_chapeau: 'walk',
      pose_chapeau: 'idle',
    },
    scale: [4, 4, 4],
  },
  {
    uuid: "59ba755c-428e-42f6-935a-3d8022f997e7",
    img: 'thumbnail_1.gif',
    gameType: 'characters',
    scene: 'main',
    position: [0.09574299132549347, 0, 7.714465982228768],
    url: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ankou-with-cart/model.gltf',
    type: 'GLTF',
    physics: 'fixed',
    animation: '',
    name: 'Cart with Ankou',

    statusToAnimation: null,
    scale: [1, 1, 1],
    rotation: [0, 180, 0],
  },
] as any[]

export const defaultScenes: Scene[] = [
  {
    uuid: 'main',
    name: 'Main',
    type: 'color',
    color: '#000',
  },
]

export const defaultGameConf: Partial<Store> = {
  selectedNode: undefined,
  nodes: defaultNodes,
  scenes: defaultScenes,
  currentScene: defaultScenes?.at(0)?.uuid,
  quests: [
  {
    "uuid": "8e77453b-f90f-44dc-8798-a6e33caf23a1",
    "name": "Male Skater quest 1",
    "status": "incomplete",
    "nodeId": "59ba755c-428e-42f6-935a-3d8022f997e7",
    "options": [
      {
        "uuid": "852e3975-7a27-4eca-9d20-b4b0fd78bb04",
        "action": "ask",
        "saidBy": "59ba755c-428e-42f6-935a-3d8022f997e7",
        "name": "Quest 0",
        "npcText": "Hey how are you ?"
      },
      {
        "uuid": "d6a7fc44-7602-49a6-8199-3242d71da90f",
        "name": "Bad",
        "npcText": "😞😞",
        "reward": "",
        "requiredItem": "",
        "action": "say",
        "parrentId": "852e3975-7a27-4eca-9d20-b4b0fd78bb04",
        "tree": [
          "852e3975-7a27-4eca-9d20-b4b0fd78bb04"
        ]
      },
      {
        "uuid": "f173d024-33a0-43ab-9ae7-7e424c79804f",
        "name": "Good",
        "npcText": "😊",
        "reward": "",
        "requiredItem": "",
        "action": "say",
        "parrentId": "852e3975-7a27-4eca-9d20-b4b0fd78bb04",
        "tree": [
          "852e3975-7a27-4eca-9d20-b4b0fd78bb04"
        ]
      }
    ]
  }
],
}

export const lights = ['AmbientLight', 'DirectionalLight', 'HemisphereLight', 'PointLight', 'SpotLight']

export const geometries = [
  'Box',
  'Capsule',
  'Circle',
  'Cylinder',
  'Dodecahedron',
  'Icosahedron',
  'Lathe',
  'Octahedron',
  'Plane',
  'Ring',
  'Sphere',
  'Sprite',
  'Tetrahedron',
  'Torus',
  'TorusKnot',
  'Tube',
]

export function exportGame() {
  const state = useStore.getState() ?? []
  const nodes = state.nodes ?? []
  const scenes = state.scenes.map((scene) => ({
    ...scene,
  }))

  const zip = new JSZip()
  zip.file(
    'gameConf.json',
    JSON.stringify({
      nodes: nodes.map((e) => {
        const { actions, ...rest } = e
        return rest
      }),
      scenes,
      quests: state.quests,
    }),
  )

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'VXLverse.zip')
  })
}

// // take file from input type
export async function importGameZip(file: File) {
  const zip = await JSZip.loadAsync(file)
  const _gameConf = await zip.file('gameConf.json')?.async('string')
  const gameConfJson = JSON.parse(_gameConf ?? '{}')

  useStore?.setState({
    nodes: gameConfJson?.nodes ?? [],
    scenes: gameConfJson?.scenes ?? [],
    quests: gameConfJson?.quests ?? [],
    selectedNode: undefined,
    currentScene: gameConfJson?.scenes?.at(0)?.uuid,
  })
}

export function getLocalStorage() {
  if (typeof window === 'undefined') return
  return window.localStorage
}

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

// sleep
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
