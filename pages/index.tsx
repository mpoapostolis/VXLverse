import Editor from '@/components/editor'
import { Ghost } from '@/components/ghost'
import Menu from '@/components/menu'
import { Tile } from '@/components/tiles'
import { GRID_SIZE, Tile as TileType, useStore } from '@/store'
import { OrbitControls, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Outline, Selection } from '@react-three/postprocessing'
import clsx from 'clsx'
import { useRef } from 'react'
import { Group, MOUSE, Vector3 } from 'three'

const EditRoom = () => {
  const store = useStore()

  return (
    <>
      {store.ghostTile && <Ghost />}
      <gridHelper
        position={[-0.5, 0, -0.5]}
        onPointerDown={(e) => {
          e.stopPropagation()
          if (e.button !== 0 || !store.ghostTile) return

          if (store.mode === 'add') {
            store.addTile(store.ghostTile as TileType)
          }
        }}
        onPointerMove={(e) => {
          e.stopPropagation()

          if (store.mode !== 'add') return
          const x = Math.ceil(e.point.x)
          const y = 0.25
          const z = Math.ceil(e.point.z)
          const v3 = new Vector3(x, y, z)
          store.updateTile({
            position: v3,
          })
        }}
        args={[GRID_SIZE, GRID_SIZE]}
      />
    </>
  )
}

export default function Home() {
  const store = useStore()
  const ref = useRef<Group>(null)
  return (
    <main className={clsx('grid h-screen w-screen grid-cols-[15vw_1fr_15vw]')}>
      <Menu />
      <Canvas>
        <color attach='background' args={['black']} />
        <directionalLight position={[0, 40, 2]} />
        <ambientLight intensity={0.5} />
        <group ref={ref}>
          <Selection>
            <EffectComposer multisampling={8} autoClear={false}>
              <Outline visibleEdgeColor={0xffff00} blur edgeStrength={1} />
            </EffectComposer>
            {store.tiles.map((tile, i) => (
              <Tile key={tile.id} {...tile} />
            ))}
          </Selection>
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
