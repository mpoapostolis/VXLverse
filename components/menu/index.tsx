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
import { Node, useStore } from '@/store'
import { exportGame, importGameZip } from '@/store/utils'
import { DownloadIcon, GearIcon, Pencil1Icon, PlayIcon, ResetIcon, TrashIcon, UploadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import { Mesh, Vector3 } from 'three'

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
  const doIHaveHero = store.nodes?.some((n) => n.gameType === 'hero')
  const router = useRouter()
  const sceneName = store.scenes.find((s) => s.uuid === store.currentScene)?.name
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Import{' '}
            <input
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
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Nodes</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>RPG Entity</MenubarSubTrigger>
            <MenubarSubContent>
              {['Hero', 'Npc', 'Enemy'].map((item) => (
                <MenubarItem
                  disabled={item === 'Hero' && doIHaveHero}
                  key={item}
                  onClick={() => {
                    addMesh('Capsule', item.toLocaleLowerCase() as Node['gameType'])
                  }}
                  className="data-[highlighted]::to-mauve10 group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-mauve4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-mauve9 data-[highlighted]:to-mauve10 data-[disabled]:text-mauve8 data-[highlighted]:text-mauve1 data-[state=open]: data-[state=open]:text-mauve12"
                >
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
                    className="data-[highlighted]::to-mauve10 group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none  outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-mauve4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-mauve9 data-[highlighted]:to-mauve10 data-[disabled]:text-mauve8 data-[highlighted]:text-mauve1 data-[state=open]: data-[state=open]:text-mauve12"
                  >
                    {(node?.name || node?.gameType) ?? node.type}{' '}
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

          <MenubarItem
            onClick={() => {
              router.push({
                hash: `edit-scene`,
              })
            }}
          >
            Edit
            <MenubarShortcut>
              <Pencil1Icon />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled={store.scenes.length === 1} onClick={() => store.deleteScene()}>
            Delete
            <MenubarShortcut>
              <TrashIcon />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
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
          >
            New Scene...
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Game</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Play{' '}
            <MenubarShortcut>
              <PlayIcon />
            </MenubarShortcut>
          </MenubarItem>
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
        <MenubarTrigger>Help</MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  )
}
