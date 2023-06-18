'use client'

import { Controls } from '@/components/controls'
import { Node } from '@/components/node'
import { useInitGame } from '@/hooks/useInitGame'
import { GRID_SIZE, useStore } from '@/store'
import { Environment, GizmoHelper, GizmoViewport, OrbitControls, Preload, useTexture } from '@react-three/drei'
import { PresetsType } from '@react-three/drei/helpers/environment-assets'
import { Canvas } from '@react-three/fiber'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
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
    const target = e.target as HTMLElement
    if (target?.tagName !== 'BODY') return
    if (e.key.toLocaleLowerCase() === 'w') store.setMode('translate')
    if (e.key.toLocaleLowerCase() === 'e') store.setMode('rotate')
    if (e.key.toLocaleLowerCase() === 'r') store.setMode('scale')
    if (e.key.toLocaleLowerCase() === 'delete') store.deleteNode()
    if (e.key.toLocaleLowerCase() === 'escape') store.selectNode(undefined)
    if (e.key.toLocaleLowerCase() === 'd' && e.shiftKey) store.duplicateNode()
  }
  useEffect(() => {
    window?.addEventListener('keydown', onKeyDown)
    return () => window?.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedScene = store.scenes?.find((scene) => scene.uuid === store.currentScene)
  const router = useRouter()

  useEffect(() => {
    router.replace('/editor')
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useInitGame()
  const cameraMoving = useRef<boolean>(false)
  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const ref = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!selectedScene?.backgroundMusic) return
    ref.current?.setAttribute('src', selectedScene?.backgroundMusic)
    ref.current?.play()
  }, [selectedScene])

  return (
    <>
      <div className="relative  canvas-editor ">
        <Controls />

        <Canvas camera={{ position: [10, 10, 10] }}>
          <OrbitControls
            onChange={() => {
              cameraMoving.current = true
            }}
            maxDistance={1000}
            makeDefault
            enableDamping={false}
          />
          <gridHelper position={[-0.5, 0, -0.5]} args={[GRID_SIZE, GRID_SIZE]} />
          <GizmoHelper alignment="top-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['#FF7F9A', '#C2EE00', '#73C5FF']} />
          </GizmoHelper>

          {selectedScene?.equirect ? (
            <Env equirect={selectedScene.equirect} />
          ) : (
            <color attach="background" args={[selectedScene?.color ?? '#000']} />
          )}
          {selectedScene?.skyBox && <Environment background preset={selectedScene.skyBox as PresetsType} />}
          <group
            onClick={(e) => {
              if (isMobile) return
              if (cameraMoving.current) {
                e.stopPropagation()
                return (cameraMoving.current = false)
              }
            }}
          >
            {store.nodes
              ?.filter((e) => {
                return e.scene === store.currentScene || e.gameType === 'hero'
              })
              .map((node, idx) => (
                <Node selected={store.selectedNode === node.uuid} key={idx} {...node} />
              ))}
          </group>
          <Preload all />
        </Canvas>
        <picture className="absolute pointer-events-none  bottom-4 flex w-full left-4 z-50">
          {selectedScene?.backgroundMusic && (
            <div className="flex w-full absolute justify-center">
              <audio
                ref={ref}
                autoPlay
                loop
                controls
                className=" z-50 w-48 md:w-96 select-auto  pointer-events-auto "
              />
            </div>
          )}
          <img className="w-16 h-16" src="/logo.webp" alt="" />
        </picture>
      </div>
    </>
  )
}
