'use client'

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
import { Node, User, useStore } from '@/store'
import { exportGame, importGameZip, meshToJson } from '@/store/utils'

import {
  CheckCircledIcon,
  DownloadIcon,
  EraserIcon,
  GearIcon,
  Pencil1Icon,
  PlayIcon,
  QuestionMarkCircledIcon,
  ReloadIcon,
  Share1Icon,
  TrashIcon,
  UploadIcon,
} from '@radix-ui/react-icons'
import axios from 'axios'
import Link from 'next/link'
import PocketBase from 'pocketbase'
import { useEffect } from 'react'
import { Mesh, Vector3 } from 'three'
import { Account } from '../account'
import { Indicator } from '../indicator'
import { SceneModal } from '../sceneModal'
import { Label } from '../ui/label'
import { useToast } from '../ui/use-toast'
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

export interface UserInfo {
  id: string
  email: string
  name: string
  picture: string
}

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
    const defaultPosition = node?.defaultPosition ?? [0, 0, 0]
    store.addNode({
      ...mesh,
      img: node.img,
      gameType: node.type,
      scene: store.currentScene,
      position: new Vector3(...defaultPosition),
      url: node.url,
      type: 'GLTF',
      physics: 'fixed',
      animation: node.defaultAnimation,
      name: node.name,
      statusToAnimation: node.statusToAnimation,
      scale: new Vector3(node?.scale ?? 1, node?.scale ?? 1, node?.scale ?? 1),
    })
  }

  const doIHaveHero = store.nodes?.some((n) => n.gameType === 'hero')

  useEffect(() => {
    if (!doIHaveHero) {
      addGLTF(models?.find((m) => m.type === 'hero'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doIHaveHero, models])

  const sceneName = store.scenes.find((s) => s.uuid === store.currentScene)?.name

  const login = async () => {
    const pb = new PocketBase('https://admin.vxlverse.com')
    const authData = await pb.collection('users').authWithOAuth2({
      provider: 'google',
    })
    store.setUser(authData?.meta?.rawUser as User)
  }
  const { toast } = useToast()

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Game</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={store.reset}>
            New Project
            <MenubarShortcut>
              <EraserIcon />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />

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

          <MenubarItem
            onClick={async () => {
              const id = await axios
                .post('/api/publish', {
                  nodes: store.nodes.filter((e) => !e.blob).map(meshToJson),
                  scenes: store.scenes,
                })
                .then((d) => {
                  toast({
                    title: 'You have successfully published your game! ',
                    description: (
                      <Label className="text-base ">
                        Click
                        <Link
                          className="mx-2 font-bold text-secondary"
                          href={`https://vxlverse.com/game?id=${d.data.id}`}
                          target="_blank"
                        >
                          here
                        </Link>
                        to play it!
                      </Label>
                    ),
                  })
                })
            }}
          >
            Publish
            <MenubarShortcut>
              <Share1Icon />
            </MenubarShortcut>
          </MenubarItem>

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
              {['Npc', 'Monster', 'Item', 'portal'].map((item) => (
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
                {store.nodes.map((node, idx) => (
                  <MenubarItem
                    key={`${node.uuid}${idx}`}
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
                color: '#000',
              })
            }}
            new
          >
            <div className="w-full ">New Scene...</div>
          </SceneModal>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <Link href={'https://docs.vxlverse.com/'} target="__blank">
            <MenubarItem>
              Documentation
              <MenubarShortcut>
                <QuestionMarkCircledIcon />
              </MenubarShortcut>
            </MenubarItem>
          </Link>
          <MenubarSeparator />
          <Link href={'https://github.com/users/mpoapostolis/projects/2/views/1'} target="__blank">
            <MenubarItem>
              RoadMap
              <MenubarShortcut>
                <CheckCircledIcon />
              </MenubarShortcut>
            </MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <div className="flex w-full items-center  hover:bg-none h-full ">
          {store.user ? (
            <Account />
          ) : (
            <button
              onClick={login}
              type="button"
              className="ml-auto h-full flex items-center font-semibold bg-card px-4"
            >
              <picture>
                <img className="h-full w-4  mr-2" src="/icons/google.svg" alt="" />
              </picture>
              <span className="hidden lg:block">Login with google</span>
            </button>
          )}
        </div>
      </MenubarMenu>
    </Menubar>
  )
}
