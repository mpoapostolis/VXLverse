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
import { Node, useStore } from '@/store'
import { exportGame, geometries, getUuid, importGameZip, lights } from '@/store/utils'

import { Model } from '@/app/api/models/types'
import { Indicator } from '@/components/indicator'
import { SceneModal } from '@/components/sceneModal'
import { SelectModel } from '@/components/selectModal/selectModel'
import { useModels } from '@/lib/models/queries'
import { ContextMenu } from '@radix-ui/react-context-menu'
import {
  CheckCircledIcon,
  DownloadIcon,
  EraserIcon,
  Pencil1Icon,
  PlayIcon,
  QuestionMarkCircledIcon,
  ReloadIcon,
  TrashIcon,
  UploadIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { Account } from '../account'
import { GameModal } from '../gameModal'

export function Menu() {
  const store = useStore()

  function addMesh(type: Node['type'], gameType?: Node['gameType']) {
    store.addNode({
      uuid: getUuid(),
      gameType,
      scale: [1, 1, 1],
      scene: store.currentScene,
      position: [0, 0, 0],
      name: type,
      type: type,
    })
  }
  const { data: models } = useModels()
  function addGLTF(node?: Model) {
    if (!node) return

    const defaultPosition = node?.defaultPosition ?? [0, 0, 0]
    const scale = node?.scale ?? 1
    store.addNode({
      uuid: getUuid(),
      img: node.img,
      gameType: node.type,
      scene: store.currentScene,
      position: defaultPosition,
      url: node.url,
      type: 'GLTF',
      physics: 'fixed',
      animation: node.defaultAnimation,
      name: node.name,
      statusToAnimation: node.statusToAnimation,
      scale: [scale, scale, scale],
    })
  }

  const sceneName = store.scenes.find((s) => s.uuid === store.currentScene)?.name

  function isInPWA() {
    if (typeof window === 'undefined') return false
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches
    const isMinimalUI = window.matchMedia('(display-mode: minimal-ui)').matches

    return isStandalone || isFullscreen || isMinimalUI
  }

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

          <Link href={'/game'} target={isInPWA() ? '_self' : '_blank'}>
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
          {/* AUTH HERE */}
          <>
            <MenubarSeparator />
            <GameModal />
          </>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Nodes</MenubarTrigger>
        <MenubarContent>
          <ContextMenu>
            <SelectModel
              onChange={(id) => {
                addGLTF(models?.find((m) => m.id === id))
              }}
            >
              <div className="relative w-full   cursor-default hover:bg-secondary hover:text-secondary-foreground bg-opacity-10 select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none ">
                RPG Entity
              </div>
            </SelectModel>
          </ContextMenu>
          <MenubarSub>
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
              store.addScene({
                uuid: getUuid(),
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
        <div role="none" className="flex w-full pr-4 items-center  justify-end  hover:bg-none h-full ">
          <Account />
        </div>
      </MenubarMenu>
    </Menubar>
  )
}
