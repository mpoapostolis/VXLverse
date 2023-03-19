import Editor from '@/components/editor'
import { Ghost } from '@/components/ghost'
import { Tile } from '@/components/tiles'
import { GRID_SIZE, useStore } from '@/store'
import { OrbitControls, Preload } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MOUSE, Vector3 } from 'three'

const EditRoom = () => {
  const [p2, setP2] = useState<Vector3>()
  const store = useStore()
  const t = useThree()
  const router = useRouter()
  const { mode } = router.query

  return (
    <>
      {p2 && mode === 'create' && <Ghost position={p2} />}{' '}
      <gridHelper
        position={[-0, 0, -0]}
        onPointerDown={(e) => {
          if (e.button !== 0 || !p2 || !store.material || mode !== 'create') return
          // @ts-ignore
          t.controls.enabled = false
          const v3 = new Vector3().copy(p2)
          v3.y += store.geometry.y / 2
          store.addTile(v3)
          setP2(undefined)
        }}
        onPointerUp={(e) => {
          e.stopPropagation()
          // @ts-ignore
          t.controls.enabled = true
        }}
        onPointerMove={(e) => {
          const x = Math.ceil(e.point.x)
          const y = Math.ceil(0)
          const z = Math.ceil(e.point.z)
          const v3 = new Vector3(x, y, z)
          setP2(v3)
        }}
        args={[GRID_SIZE, GRID_SIZE]}
      />
    </>
  )
}

export default function Home() {
  const store = useStore()
  const router = useRouter()
  const { mode } = router.query
  return (
    <main className='grid h-screen w-screen grid-cols-[20vw_1fr]'>
      <div className='fixed top-0 left-96 z-50 m-4  border border-base-300 bg-black'>
        <div className='grid grid-cols-2 '>
          <Link
            href='?mode=create'
            className={clsx(' grid w-full place-items-center ', {
              'bg-white p-2 underline  ': mode === 'create',
            })}>
            <Image src='/icons/create.png' alt='move' width={26} height={26} />
          </Link>

          <Link
            href='?mode=edit'
            className={clsx(' grid w-full place-items-center ', {
              'bg-white p-2 underline  ': mode === 'edit',
            })}>
            <Image src='/icons/edit.png' alt='move' width={26} height={26} />
          </Link>
        </div>
      </div>
      <Editor />

      <Canvas>
        <color attach='background' args={['black']} />
        <directionalLight position={[0, 40, 2]} />
        <ambientLight intensity={0.5} />

        {store.tiles.map((tile, i) => (
          <Tile idx={i} key={i} {...tile} />
        ))}

        <EditRoom />
        <OrbitControls
          maxDistance={1000}
          position={[0, -5, 0]}
          makeDefault
          mouseButtons={{
            RIGHT: MOUSE.ROTATE,
            LEFT: MOUSE.PAN,
            MIDDLE: MOUSE.DOLLY,
          }}
        />
        <Preload all />
      </Canvas>
      {/* <Stats className='fixed right-0' /> */}
    </main>
  )
}
