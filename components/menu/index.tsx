import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { useModels } from '@/lib/models/queries'
import { Model } from '@/lib/models/types'
import { Node, useStore } from '@/store'
import { exportGame, importGameZip } from '@/store/utils'
import {
  DownloadIcon,
  EraserIcon,
  GearIcon,
  Pencil1Icon,
  PlayIcon,
  ReloadIcon,
  ResetIcon,
  TrashIcon,
  UploadIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Mesh, Vector3 } from 'three'
import { Indicator } from '../indicator'
import { SceneModal } from '../sceneModal'

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

export function Menu() {
  const store = useStore()

  function addMesh(type: Node['type'], gameType?: Node['gameType']) {
    const mesh = new Mesh()
    store.addNode({
      ...mesh,
      gameType,
      scene: store.currentScene,
      position: new Vector3(0, 0, 0),
      type: type,
    })
  }
  const { data: models } = useModels()

  function addGLTF(node?: Model) {
    if (!node) return
    const mesh = new Mesh()

    store.addNode({
      ...mesh,
      name: node.name,
      gameType: node.type,
      scene: store.currentScene,
      position: new Vector3(0, 0, 0),
      url: node.url,
      type: 'GLTF',
      scale: new Vector3(node?.scale ?? 1, node?.scale ?? 1, node?.scale ?? 1),
    })
  }

  const doIHaveHero = store.nodes?.some((n) => n.gameType === 'hero')
  const router = useRouter()
  const sceneName = store.scenes.find((s) => s.uuid === store.currentScene)?.name
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={store.reset}>
            New Project
            <MenubarShortcut>
              <EraserIcon />
            </MenubarShortcut>
          </MenubarItem>

          <MenubarSeparator />
          <MenubarItem>
            Import
            <input
              onClick={(e) => {
                e.stopPropagation()
              }}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                importGameZip(file)
                e.target.value = ''
              }}
              accept=".zip"
              className="absolute left-0 top-0 h-full w-full opacity-0"
              type="file"
            />
            <MenubarShortcut>
              <UploadIcon />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={exportGame}>
            Export
            <MenubarShortcut>
              <DownloadIcon />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />

          <MenubarItem>
            Settings{' '}
            <MenubarShortcut>
              <GearIcon />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Nodes</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>RPG Entity</MenubarSubTrigger>
            <MenubarSubContent>
              {['Hero', 'Npc', 'Monster'].map((item) => (
                <MenubarItem
                  disabled={item === 'Hero' && doIHaveHero}
                  key={item}
                  onClick={() => {
                    const node = models?.find((m) => m.type === item.toLowerCase())
                    addGLTF(node)
                  }}
                  className="data-[highlighted]::to-mauve10 group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-mauve4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-mauve9 data-[highlighted]:to-mauve10 data-[disabled]:text-mauve8 data-[highlighted]:text-mauve1 data-[state=open]: data-[state=open]:text-mauve12"
                >
                  <Indicator classname="mr-2" type={item} gameType="hero" />
                  {item}
                </MenubarItem>
              ))}
            </MenubarSubContent>
            <MenubarSub>
              <MenubarSubTrigger>Geometry</MenubarSubTrigger>
              <MenubarSubContent>
                {geometries.map((geometry) => (
                  <MenubarItem
                    key={geometry}
                    onClick={() => {
                      addMesh(geometry as Node['type'])
                    }}
                    className="data-[highlighted]::to-mauve10 group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-mauve4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-mauve9 data-[highlighted]:to-mauve10 data-[disabled]:text-mauve8 data-[highlighted]:text-mauve1 data-[state=open]: data-[state=open]:text-mauve12"
                  >
                    <Indicator classname="mr-2" type={geometry} />
                    {geometry}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSub>
              <MenubarSubTrigger>Light</MenubarSubTrigger>
              <MenubarSubContent>
                {lights.map((light) => (
                  <MenubarItem
                    key={light}
                    onClick={() => {
                      addMesh(light as Node['type'])
                    }}
                    className="data-[highlighted]::to-mauve10 group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-mauve4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-mauve9 data-[highlighted]:to-mauve10 data-[disabled]:text-mauve8 data-[highlighted]:text-mauve1 data-[state=open]: data-[state=open]:text-mauve12"
                  >
                    <Indicator classname="mr-2" type={light} />
                    {light}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find Node</MenubarSubTrigger>
              <MenubarSubContent>
                {store.nodes.map((node) => (
                  <MenubarItem
                    key={node.uuid}
                    onClick={() => {
                      store.selectNode(node.uuid)
                    }}
                    className="data-[highlighted]::to-mauve10  group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-mauve4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-mauve9 data-[highlighted]:to-mauve10 data-[disabled]:text-mauve8 data-[highlighted]:text-mauve1 data-[state=open]: data-[state=open]:text-mauve12"
                  >
                    <Indicator classname="mr-2" gameType={node.gameType} type={node.type ?? 'hero'} />
                    <span className="truncate ">{(node?.name || node?.gameType) ?? node.type} </span>
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Scenes</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={store.currentScene ?? '-'}>
            {store.scenes?.map((scene) => (
              <MenubarRadioItem
                onClick={() => {
                  store.setCurrentScene(scene.uuid)
                  store.selectNode(undefined)
                }}
                key={scene.uuid ?? ''}
                value={scene?.uuid ?? '-'}
              >
                {scene.name}
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem disabled>{sceneName}</MenubarItem>

          <SceneModal>
            Edit
            <MenubarShortcut>
              <Pencil1Icon />
            </MenubarShortcut>
          </SceneModal>
          <MenubarItem
            disabled={store.scenes.length === 1}
            onClick={(e) => {
              e.preventDefault()
              store.deleteScene()
            }}
          >
            Delete
            <MenubarShortcut>
              <TrashIcon />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={store.resetScene}>
            Reset Scene
            <MenubarShortcut>
              <ReloadIcon />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <SceneModal
            onClick={() => {
              const mesh = new Mesh()
              store.addScene({
                uuid: mesh.uuid,
                type: 'color',
                name: 'Scene ' + Number(store.scenes.length + 1),
                color: '#999',
              })
              router.replace({
                hash: `new-scene`,
              })
            }}
            new
          >
            <div className="w-full ">New Scene...</div>
          </SceneModal>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Game</MenubarTrigger>
        <MenubarContent>
          <Link href={'/game'} target="__blank">
            <MenubarItem>
              Play{' '}
              <MenubarShortcut>
                <PlayIcon />
              </MenubarShortcut>
            </MenubarItem>
          </Link>
          <MenubarSeparator />
          <MenubarItem>
            Settings
            <MenubarShortcut>
              <GearIcon />
            </MenubarShortcut>
          </MenubarItem>

          <MenubarItem onClick={store.reset}>
            Reset
            <MenubarShortcut>
              <ResetIcon />
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          <Link href={'https://docs.vxlverse.com'} target="__blank">
            Help
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  )
}
