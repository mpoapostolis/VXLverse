import { Node } from '@/components/node'
import { GRID_SIZE, useStore } from '@/store'
import { Environment, GizmoHelper, GizmoViewport, OrbitControls, Preload, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'
import { EquirectangularReflectionMapping, sRGBEncoding } from 'three'

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
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key.toLocaleLowerCase() === 'w') store.setMode('translate')
    if (e.key.toLocaleLowerCase() === 'e') store.setMode('rotate')
    if (e.key.toLocaleLowerCase() === 'r') store.setMode('scale')
    if (e.key.toLocaleLowerCase() === 'delete') store.deleteNode()
  }
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
  return (
    <main className='relative h-screen overflow-hidden'>
      <Canvas>
        <gridHelper position={[-0.5, 0, -0.5]} args={[GRID_SIZE, GRID_SIZE]} />
        <GizmoHelper alignment='top-right' margin={[80, 80]}>
          <GizmoViewport axisColors={['#FF7F9A', '#C2EE00', '#73C5FF']} />
        </GizmoHelper>
        {store.scene?.equirect ? <Env /> : <color attach='background' args={[store.scene?.color ?? '#999']} />}

        {store.nodes.map((node, idx) => (
          <Node selected={store.selectedNode === node.uuid} key={idx} {...node} />
        ))}
        <OrbitControls maxDistance={1000} position={[0, -5, 0]} makeDefault enableDamping={false} />
        <Preload all />
      </Canvas>
    </main>
  )
}
