import Editor from '@/components/editor'
import { Ghost } from '@/components/ghost'
import { Tile } from '@/components/tiles'
import { GRID_SIZE, useStore } from '@/store'
import { OrbitControls, Preload, Stats } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useState } from 'react'
import { MOUSE, Vector3 } from 'three'

const EditRoom = () => {
  const [p2, setP2] = useState<Vector3>()
  const store = useStore()
  const t = useThree()

  return (
    <>
      {p2 && <Ghost position={p2} />}{' '}
      <gridHelper
        position={[-0, 0, -0]}
        onPointerDown={(e) => {
          if (e.button !== 0 || !p2 || !store.material) return
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
  return (
    <main className='grid h-screen w-screen grid-cols-[20vw_1fr]'>
      <Editor />

      <Canvas>
        <color attach='background' args={['black']} />
        <directionalLight position={[0, 40, 2]} />
        <ambientLight intensity={0.5} />

        {store.tiles.map((tile, i) => (
          <Tile key={i} {...tile} />
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
      <Stats showPanel={0} className='stats' />
    </main>
  )
}
