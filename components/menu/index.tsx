import { Node, useStore } from '@/store'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import * as Label from '@radix-ui/react-label'
import * as Menubar from '@radix-ui/react-menubar'

import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import Link from 'next/link'
import { HexColorString, Mesh, Vector3 } from 'three'
import { Upload } from '../upload'

function PopoverDemo() {
  const store = useStore()
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button aria-label="Scene Settings">Scene</button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded p-8 m-2 w-96 z-20 bg-mauve5    will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="">
            <div className="flex mb-2 ">
              <Label.Root className="text-black11 w-full text-sm font-medium">Scene Background</Label.Root>
              <select
                onChange={(evt) => {
                  store.setScene({
                    type: evt.target.value as 'color' | 'equirect',
                  })
                }}
                value={store?.scene?.type}
                className="rounded-none w-full  bg-white border-blackA7 border text-xs leading-none outline-none"
              >
                <option value="color">Color</option>
                <option value="equirect">Equirect</option>
              </select>
            </div>

            <div className="grid grid-cols-[80px_1fr] items-center gap-4 ">
              {store.scene?.type === 'color' && (
                <>
                  <Label.Root className="text-black11 w-full text-sm font-medium">Color</Label.Root>

                  <input
                    onChange={(evt) => {
                      store.setScene({
                        ...store.scene,
                        color: evt.target.value as HexColorString,
                      })
                    }}
                    type="color"
                    className={clsx(' ml-auto w-20  p-0 file:hidden   file:text-end', {})}
                  />
                </>
              )}
              {store.scene?.type === 'equirect' && (
                <>
                  <Label.Root className="text-black11 w-fit text-sm font-medium">Equirect</Label.Root>
                  <Upload
                    className={clsx(
                      'bg-base-300 ml-auto h-20 w-20 min-w-[40px] border border-dashed border-mauve8  ',
                      {},
                    )}
                    value={store.scene?.equirect}
                    onChange={(blob, equirect) =>
                      store.setScene({
                        ...store.scene,
                        blob,
                        equirect,
                      })
                    }
                  />
                </>
              )}
            </div>
          </div>

          <Popover.Arrow className="fill-mauve4" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

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
export const lights = ['AmbientLight', 'DirectionalLight', 'HemisphereLight', 'PointLight', 'SpotLight']

export function Menu() {
  const store = useStore()

  function addMesh(type: Node['type'], gameType?: Node['gameType']) {
    const mesh = new Mesh()
    store.addNode({
      ...mesh,
      gameType,
      position: new Vector3(0, 0, 0),
      type: type,
    })
  }

  return (
    <Menubar.Root className="flex  border-b border-blackA5 bg-mauve5 p-1">
      <Menubar.Menu>
        <Menubar.Trigger className="flex select-none items-center justify-between gap-[2px] rounded px-3 py-2 text-[13px] font-medium leading-none text-blackA12 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
          File
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className="z-20 min-w-[220px] rounded-md bg-mauve5 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item className="group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:text-blackA12">
              New Tab{' '}
              <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                ⌘ T
              </div>
            </Menubar.Item>
            <Menubar.Item className="group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:text-blackA12">
              New Window{' '}
              <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                ⌘ N
              </div>
            </Menubar.Item>
            <Menubar.Item
              className="relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:text-blackA12"
              disabled
            >
              New Incognito Window
            </Menubar.Item>
            {/* <Menubar.Separator className="m-[5px] h-[1px] bg-violet6" /> */}
            <Menubar.Sub>
              <Menubar.SubTrigger className="group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:text-blackA12">
                Share
                <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                  <ChevronRightIcon />
                </div>
              </Menubar.SubTrigger>
              <Menubar.Portal>
                <Menubar.SubContent
                  className="min-w-[220px] rounded-md bg-mauve5 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                  alignOffset={-5}
                >
                  <Menubar.Item className="data-[highlighted]::to-violet10 relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-blackA8 data-[state=open]:text-violet12">
                    Email Link
                  </Menubar.Item>
                  <Menubar.Item className="data-[highlighted]::to-violet10 relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-blackA8 data-[state=open]:text-violet12">
                    Messages
                  </Menubar.Item>
                  <Menubar.Item className="data-[highlighted]::to-violet10 relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-blackA8 data-[state=open]:text-violet12">
                    Notes
                  </Menubar.Item>
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <Menubar.Separator className="m-[5px] h-[1px] bg-violet6" />
            <Menubar.Item className="group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
              Print…
              <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                ⌘ P
              </div>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className=" flex select-none items-center justify-between gap-[2px] rounded px-3 py-2 text-[13px] font-medium leading-none text-blackA12 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
          New
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className=" min-w-[220px] rounded-md bg-mauve5 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Sub>
              <Menubar.SubTrigger className="group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:text-blackA12">
                RPG
                <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                  <ChevronRightIcon />
                </div>
              </Menubar.SubTrigger>

              <Menubar.Portal>
                <Menubar.SubContent
                  className="min-w-[220px] rounded-md bg-mauve5 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                  alignOffset={-5}
                >
                  {['Hero', 'Npc', 'Enemy'].map((item) => (
                    <Menubar.Item
                      key={item}
                      onClick={() => {
                        addMesh('Capsule', item.toLocaleLowerCase() as Node['gameType'])
                      }}
                      className="data-[highlighted]::to-violet10 group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-blackA8 data-[state=open]:text-violet12"
                    >
                      {item}
                    </Menubar.Item>
                  ))}
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            {/* <Menubar.Separator className="m-[5px] h-[1px] bg-violet6" /> */}

            <Menubar.Sub>
              <Menubar.SubTrigger className="group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:text-blackA12">
                Geometries
                <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                  <ChevronRightIcon />
                </div>
              </Menubar.SubTrigger>

              <Menubar.Portal>
                <Menubar.SubContent
                  className="min-w-[220px] rounded-md bg-mauve5 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                  alignOffset={-5}
                >
                  {geometries.map((geometry) => (
                    <Menubar.Item
                      key={geometry}
                      onClick={() => {
                        addMesh(geometry as Node['type'])
                      }}
                      className="data-[highlighted]::to-violet10 group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-blackA8 data-[state=open]:text-violet12"
                    >
                      {geometry}
                    </Menubar.Item>
                  ))}
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            {/* <Menubar.Separator className="m-[5px] h-[1px] bg-violet6" /> */}

            <Menubar.Sub>
              <Menubar.SubTrigger className="group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:text-blackA12">
                Lights
                <div className="ml-auto pl-5 text-mauve9 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
                  <ChevronRightIcon />
                </div>
              </Menubar.SubTrigger>

              <Menubar.Portal>
                <Menubar.SubContent
                  className="min-w-[220px] rounded-md bg-mauve5 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[transform,opacity] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)]"
                  alignOffset={-5}
                >
                  {lights.map((light) => (
                    <Menubar.Item
                      key={light}
                      onClick={() => {
                        addMesh(light as Node['type'])
                      }}
                      className="data-[highlighted]::to-violet10 group relative flex h-[25px] select-none items-center rounded px-[10px] text-[13px] leading-none text-blackA12 outline-none data-[disabled]:pointer-events-none data-[state=open]:bg-violet4 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[state=open]:text-blackA8 data-[state=open]:text-violet12"
                    >
                      {light}
                    </Menubar.Item>
                  ))}
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="flex select-none items-center justify-between gap-[2px] rounded px-3 py-2 text-[13px] font-medium leading-none text-blackA12 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
          <PopoverDemo />
        </Menubar.Trigger>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger className="flex select-none items-center justify-between gap-[2px] rounded px-3 py-2 text-[13px] font-medium leading-none text-blackA12 outline-none data-[highlighted]:bg-violet4 data-[state=open]:bg-violet4">
          <Link target="__blank" href="/game">
            Play
          </Link>
        </Menubar.Trigger>
      </Menubar.Menu>
    </Menubar.Root>
  )
}
