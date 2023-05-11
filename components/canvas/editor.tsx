'use client'

import { Controls } from '@/components/controls'
import { Node } from '@/components/node'
import { GRID_SIZE, useStore } from '@/store'
import { Environment, GizmoHelper, GizmoViewport, OrbitControls, Preload, useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'
import { EquirectangularReflectionMapping, SRGBColorSpace } from 'three'

function Env(props: { equirect: string }) {
  const texture = useTexture(props.equirect ?? '')
  // texture equriectangular
  texture.mapping = EquirectangularReflectionMapping
  texture.colorSpace = SRGBColorSpace
  return <Environment background map={texture} />
}

export function EditorCanvas() {
  const store = useStore()
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key.toLocaleLowerCase() === 'w') store.setMode('translate')
    if (e.key.toLocaleLowerCase() === 'e') store.setMode('rotate')
    if (e.key.toLocaleLowerCase() === 'r') store.setMode('scale')
    if (e.key.toLocaleLowerCase() === 'delete') store.deleteNode()
    if (e.key.toLocaleLowerCase() === 'escape') store.selectNode(undefined)
  }
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedScene = store.scenes?.find((scene) => scene.uuid === store.currentScene)
  return (
    <>
      <div className="relative">
        <Controls />
        <Canvas camera={{ position: [10, 10, 10] }}>
          <gridHelper position={[-0.5, 0, -0.5]} args={[GRID_SIZE, GRID_SIZE]} />
          <GizmoHelper alignment="top-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['#FF7F9A', '#C2EE00', '#73C5FF']} />
          </GizmoHelper>

          {selectedScene?.equirect ? (
            <Env equirect={selectedScene.equirect} />
          ) : (
            <color attach="background" args={[selectedScene?.color ?? '#000']} />
          )}

          {store.nodes
            ?.filter((e) => {
              return e.scene === store.currentScene || e.gameType === 'hero'
            })
            .map((node, idx) => (
              <Node selected={store.selectedNode === node.uuid} key={idx} {...node} />
            ))}
          <OrbitControls maxDistance={1000} makeDefault enableDamping={false} />
          <Preload all />
        </Canvas>
        <picture className="absolute block lg:hidden   bottom-4 left-4 z-50">
          <img className="w-16 h-16" src="/logo.svg" alt="" />
        </picture>
      </div>
    </>
  )
}