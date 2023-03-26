import Editor from '@/components/editor'
import Menu from '@/components/menu'
import { Node } from '@/components/node'
import { GRID_SIZE, useStore } from '@/store'
import { Environment, GizmoHelper, GizmoViewport, OrbitControls, Preload, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'
import { useRef } from 'react'
import { EquirectangularReflectionMapping, Group, sRGBEncoding } from 'three'

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
  return (
    <main>
      <Menu />
      <div className={clsx('grid h-full w-screen  lg:grid-cols-[1fr_16vw]')}>
        <Canvas>
          <gridHelper position={[-0.5, 0, -0.5]} args={[GRID_SIZE, GRID_SIZE]} />
          <GizmoHelper alignment='bottom-right' margin={[80, 80]}>
            <GizmoViewport axisColors={['red', 'green', 'blue']} />
          </GizmoHelper>{' '}
          {store.scene?.equirect ? <Env /> : <color attach='background' args={[store.scene?.color ?? '#999']} />}
          <group ref={ref}>
            {store.nodes.map((node, idx) => (
              <Node selected={store.selectedNode === node.uuid} key={idx} {...node} />
            ))}
          </group>
          <OrbitControls maxDistance={1000} position={[0, -5, 0]} makeDefault enablePan={false} enableDamping={false} />
          <Preload all />
        </Canvas>
        <Editor />
      </div>

      {/* <Stats className='fixed right-0' /> */}
    </main>
  )
}
