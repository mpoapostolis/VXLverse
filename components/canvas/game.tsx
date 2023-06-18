'use client'

import { Dialogue } from '@/components/dialogue'
import { GameNode } from '@/components/gameNode'
import { HelpModal } from '@/components/helpModal'
import { Light } from '@/components/lights'
import { lights } from '@/components/node'
import { useInitGame } from '@/hooks/useInitGame'
import { useStore } from '@/store'
import { Circle, Environment, Loader, OrbitControls, Preload, useProgress, useTexture } from '@react-three/drei'
import { PresetsType } from '@react-three/drei/helpers/environment-assets'
import { Canvas, useThree } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { Suspense, useEffect, useRef, useState } from 'react'
import { EquirectangularReflectionMapping, SRGBColorSpace, Vector3 } from 'three'
import { Hero } from '../gameNode/hero'
import { TypeWritter } from '../windText'

function Env(props: { equirect: string }) {
  const texture = useTexture(props.equirect ?? '')
  // texture equriectangular
  texture.mapping = EquirectangularReflectionMapping
  texture.colorSpace = SRGBColorSpace
  return <Environment background map={texture} />
}

function Orbit() {
  const t = useThree()
  const store = useStore()
  const hero = store.nodes.find((node) => node.gameType === 'hero')

  function goTo() {
    const raycaster = t.raycaster
    raycaster.setFromCamera(t.pointer, t.camera)
    const intersects = raycaster.intersectObjects(t.scene.children)
    if (intersects?.at(0)?.point) {
      store.updateNode(hero?.uuid ?? '', { status: 'walk' })
      store.setGoTo(intersects?.at(0)?.point!)
    }
  }

  useEffect(() => {
    document.addEventListener('pointerdown', (e) => {
      if (e.button !== 2) return
      goTo()
    })

    document.addEventListener('click', (e) => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile) return goTo()
    })

    return () => {
      document.removeEventListener('pointerdown', (e) => {
        if (e.button !== 2) return
        goTo()
      })
      document.removeEventListener('click', () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        if (isMobile) return goTo()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hero?.uuid])

  return (
    <OrbitControls
      enablePan={false}
      maxDistance={8.1}
      maxPolarAngle={Math.PI / 2}
      minDistance={4}
      position={[0, -5, 0]}
      makeDefault
      enableDamping={false}
    />
  )
}

export function GameCanvas(props: { id?: string }) {
  const store = useStore()
  const [videoEnded, setVideoEnded] = useState(!props.id)
  const [interacted, setInteracted] = useState(false)
  const selectedScene = store.scenes?.find((scene) => scene.uuid === store.currentScene)
  const hero = store.nodes?.find((node) => node.gameType === 'hero')
  const progress = useProgress()
  useInitGame()

  const ref = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!selectedScene?.backgroundMusic || !interacted) return
    if (progress.progress !== 100) return
    ref.current?.setAttribute('src', selectedScene?.backgroundMusic)
    ref.current?.play()
  }, [selectedScene, progress, interacted])

  return (
    <main onClick={() => setInteracted(true)} className="relative h-screen z-50 overflow-hidden">
      <HelpModal />
      <Loader
        containerStyles={{
          zIndex: 10,
        }}
      />
      {progress.progress === 100 && videoEnded && <TypeWritter text={selectedScene?.intro} />}
      {props.id && (
        <video
          autoPlay
          muted
          onEnded={(e) => {
            e.currentTarget.className = 'hidden'
            setVideoEnded(true)
          }}
          className="absolute top-0 left-0 w-full h-full object-cover z-50 pointer-events-none"
        >
          <source
            src="https://admin.vxlverse.com/api/files/0n6p62xtlxvyuk8/fcrguwi3qkpn8ie/untitled_design_510UNrpbGB.webm?token="
            type="video/webm"
          />
        </video>
      )}

      <Canvas className="w-full h-full" camera={{ position: [0, 15, -15] }}>
        <Suspense>
          <fog attach="fog" args={[selectedScene?.color ?? '#000', 0, 120]} />
          {selectedScene?.equirect ? (
            <Env equirect={selectedScene.equirect} />
          ) : (
            <color attach="background" args={[selectedScene?.color ?? '#999999']} />
          )}
          {selectedScene?.skyBox && <Environment background preset={selectedScene.skyBox as PresetsType} />}
          <Physics timeStep="vary">
            {hero && <Hero {...hero} />}

            {store.nodes
              ?.filter((node) => node.scene === store.currentScene && node.gameType !== 'hero')
              .map((node, idx) =>
                lights.includes(node.type) ? (
                  <mesh key={idx} position={new Vector3(...(node?.position ?? [0, 0, 0]))}>
                    <Light type={node?.type ?? 'DirectionalLight'} />
                  </mesh>
                ) : (
                  <GameNode key={idx} {...node} />
                ),
              )}

            {/* <CuboidCollider friction={0} position={[0, 0, 0]} args={[GRID_SIZE * 4, 0.1, GRID_SIZE * 4]} /> */}
            {store?.goTo && hero?.uuid && (
              <RigidBody
                type="dynamic"
                solverGroups={0}
                onCollisionEnter={(t) => {
                  if (t.target.rigidBodyObject?.name !== 'hero') return
                  store.updateNode(hero?.uuid!, { status: 'idle' })
                  store.setGoTo(undefined)
                }}
                name="goTo"
                position={[store.goTo.x, 0.2, store.goTo.z]}
                restitution={0}
              >
                <Circle rotation={[-Math.PI / 2, 0, 0]} args={[1, 32]}>
                  <meshBasicMaterial color="blue" attach="material" transparent opacity={0.5} />
                </Circle>
              </RigidBody>
            )}

            <Orbit />
          </Physics>
          <Preload all />
        </Suspense>
      </Canvas>
      <audio ref={ref} autoPlay loop controls className=" z-50 w-48 md:w-96 select-auto  pointer-events-auto " />
      <picture className="fixed top-4 left-4 z-50">
        <img loading="lazy" className="w-16 h-16" src="/logo.webp" alt="" />
      </picture>
      <Dialogue />
    </main>
  )
}
