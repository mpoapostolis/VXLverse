import { Controls } from '@/components/controls'
import Editor from '@/components/editor'
import { Menu } from '@/components/menu'
import { Node } from '@/components/node'
import { SceneModal } from '@/components/sceneModal'
import { GRID_SIZE, useStore } from '@/store'
import { Environment, GizmoHelper, GizmoViewport, OrbitControls, Preload, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import clsx from 'clsx'
import { useEffect } from 'react'
import { EquirectangularReflectionMapping, sRGBEncoding } from 'three'

function Env(props: { equirect: string }) {
  const texture = useTexture(props.equirect ?? '')
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
  const selectedScene = store.scenes?.find((scene) => scene.uuid === store.currentScene)
  return (
    <main className="h-screen overflow-hidden">
      <SceneModal />
      <Menu />
      <div className={clsx('grid h-full w-screen grid-cols-[1fr_16vw]')}>
        {/* The button to open modal */}
        <div className="relative">
          <Controls />
          <Canvas>
            <gridHelper position={[-0.5, 0, -0.5]} args={[GRID_SIZE, GRID_SIZE]} />
            <GizmoHelper alignment="top-right" margin={[80, 80]}>
              <GizmoViewport axisColors={['#FF7F9A', '#C2EE00', '#73C5FF']} />
            </GizmoHelper>

            {selectedScene?.equirect ? (
              <Env equirect={selectedScene.equirect} />
            ) : (
              <color attach="background" args={[selectedScene?.color ?? '#999']} />
            )}

            {store.nodes.map((node, idx) => (
              <Node selected={store.selectedNode === node.uuid} key={idx} {...node} />
            ))}
            <OrbitControls maxDistance={1000} position={[0, -5, 0]} makeDefault enableDamping={false} />
            <Preload all />
          </Canvas>
        </div>
        <Editor />
      </div>
      {/* <Stats className='fixed right-0' /> */}
    </main>
  )
}
