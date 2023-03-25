import Editor from '@/components/editor'
import { Ghost } from '@/components/ghost'
import Menu from '@/components/menu'
import { MeshGeometry } from '@/components/meshGeometry'
import { GRID_SIZE, Tile as TileType, useStore } from '@/store'
import { Environment, OrbitControls, Preload, TransformControls, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'
import { useRef } from 'react'
import { EquirectangularReflectionMapping, Group, Vector3, sRGBEncoding } from 'three'

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

          if (store.mode !== 'add' || !store?.ghostTile?.position) return
          const x = Math.ceil(e.point.x)
          const y = store.ghostTile.position.y
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

function Env() {
  const store = useStore()
  const texture = useTexture(store.scene?.equirect ?? '')
  // texture equriectangular
  texture.mapping = EquirectangularReflectionMapping
  texture.encoding = sRGBEncoding

  return <Environment background map={texture} />
}

export default function Home() {
  const store = useStore()
  const ref = useRef<Group>(null)
  console.log(store.nodes)
  return (
    <main>
      <Menu />
      <div className={clsx('grid h-full w-screen grid-cols-[1fr_15.5vw]')}>
        <Canvas>
          {store.scene?.equirect ? <Env /> : <color attach='background' args={[store.scene?.color ?? '#999']} />}
          <directionalLight position={[0, 40, 2]} />
          <ambientLight intensity={0.5} position={[0, 5, 0]} />
          <group ref={ref}>
            {store.nodes.map((node, idx) =>
              node.type ? (
                <TransformControls key={idx}>
                  <mesh onClick={(e) => console.log(e.object)}>
                    <MeshGeometry type={node.type} />
                  </mesh>
                </TransformControls>
              ) : null,
            )}
          </group>

          <EditRoom />

          <OrbitControls maxDistance={1000} position={[0, -5, 0]} makeDefault enablePan={false} enableDamping={false} />
          <Preload all />
        </Canvas>
        <Editor />
      </div>

      {/* <Stats className='fixed right-0' /> */}
    </main>
  )
}
