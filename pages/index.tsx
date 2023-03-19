import Editor from '@/components/editor'
import { Floor } from '@/components/floor'
import { Wall } from '@/components/wall'
import { GRID_SIZE, createFloor, useStore } from '@/store'
import { OrbitControls, Preload } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useState } from 'react'
import { MOUSE, Vector3 } from 'three'

const EditRoom = () => {
  const [p1, setP1] = useState<Vector3>()
  const [p2, setP2] = useState<Vector3>()
  const [drag, setDrag] = useState<boolean>(false)
  const store = useStore()
  const t = useThree()
  const floor = createFloor(p1, p2)

  return (
    <>
      {p1 && p2 && <Floor {...floor} />}
      <gridHelper
        name='grid'
        position={[-0, 0, -0]}
        onPointerDown={(e) => {
          if (e.button !== 0) return
          // @ts-ignore
          t.controls.enabled = false
          const x = Math.ceil(e.point.x)
          const y = Math.ceil(0)
          const z = Math.ceil(e.point.z)

          const v3 = new Vector3(x, y, z)
          setP2(undefined)
          setP1(v3)
          setDrag(true)
        }}
        onPointerUp={(e) => {
          e.stopPropagation()
          if (e.button !== 0 || !p1) return
          store.addRoom({
            p1,
            p2: e.point,
          })
          setP1(undefined)
          setP2(undefined)
          setDrag(false)
          // @ts-ignore
          t.controls.enabled = true
        }}
        onPointerMove={(e) => {
          if (!drag) return

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
  console.log(store)
  return (
    <main className='grid h-screen w-screen grid-cols-[20vw_1fr] '>
      <Editor />

      <Canvas>
        <ambientLight intensity={0.5} />
        <color attach='background' args={['black']} />
        <directionalLight position={[0, 40, 2]} />
        {/* {store.rooms.map((room, i) => (
          <Room key={i} p1={room.p1} p2={room.p2} />
        ))} */}
        {store.floors.map((floor, i) => (
          <group key={i}>
            <pointLight position={floor.position} intensity={0.2} />
            <Floor position={floor.position} args={floor.args} />
          </group>
        ))}
        {store.walls.map((wall, i) => (
          <Wall key={i} position={wall.position} args={wall.args} />
        ))}

        <ambientLight />
        <pointLight position={[40, 40, 40]} />

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
      </Canvas>
      <Preload all />
    </main>
  )
}
