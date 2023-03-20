import Editor from '@/components/editor'
import { Ghost } from '@/components/ghost'
import Menu from '@/components/menu'
import { Tile } from '@/components/tiles'
import { GRID_SIZE, useStore } from '@/store'
import { OrbitControls, Preload } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { Group, MOUSE, Vector3 } from 'three'

const EditRoom = () => {
  const [p2, setP2] = useState<Vector3>()
  const store = useStore()
  const t = useThree()
  const router = useRouter()
  const { mode = 'create' } = router.query

  return (
    <>
      {p2 && mode === 'create' && <Ghost position={p2} />}{' '}
      <gridHelper
        position={[-0, 0, -0]}
        onPointerDown={(e) => {
          e.stopPropagation()

          // @ts-ignore
          if (mode !== 'create') return (t.controls.enabled = true)
          if (e.button !== 0 || !p2 || !store.material) return
          // @ts-ignore
          t.controls.enabled = false
          const v3 = new Vector3().copy(p2)
          v3.y += store.geometry.y / 2
          store.addTile(v3)
          router.push({
            query: {
              mode: undefined,
            },
          })
          setP2(undefined)
        }}
        onPointerUp={(e) => {
          e.stopPropagation()
          // @ts-ignore
          t.controls.enabled = true
        }}
        onPointerMove={(e) => {
          if (mode !== 'create') return

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

  const ref = useRef<Group>(null)
  return (
    <main className='grid h-screen w-screen grid-cols-[15vw_1fr_15vw]'>
      <Menu />
      <Canvas>
        <color attach='background' args={['black']} />
        <directionalLight position={[0, 40, 2]} />
        <ambientLight intensity={0.5} />
        <group ref={ref}>
          {store.tiles.map((tile, i) => (
            <Tile idx={i} key={i} {...tile} />
          ))}
        </group>

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
      <Editor />

      {/* <Stats className='fixed right-0' /> */}
    </main>
  )
}
