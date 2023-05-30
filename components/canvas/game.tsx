'use client'

import { Dialogue } from '@/components/dialogue'
import { GameNode } from '@/components/gameNode'
import { HelpModal } from '@/components/helpModal'
import { Light } from '@/components/lights'
import { lights } from '@/components/node'
import { useGame } from '@/lib/games/queries'
import { GRID_SIZE, init, useStore } from '@/store'
import { Circle, Environment, Loader, OrbitControls, Preload, useTexture } from '@react-three/drei'
import { PresetsType } from '@react-three/drei/helpers/environment-assets'
import { Canvas, useThree } from '@react-three/fiber'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'
import { Suspense, useEffect } from 'react'
import { EquirectangularReflectionMapping, SRGBColorSpace, Vector3 } from 'three'
import { Hero } from '../gameNode/hero'

function Env(props: { equirect: string }) {
  const texture = useTexture(props.equirect ?? '')
  // texture equriectangular
  texture.mapping = EquirectangularReflectionMapping
  texture.colorSpace = SRGBColorSpace
  return <Environment background map={texture} />
}

function Orbit(props: { id?: string }) {
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
  const { data: game } = useGame(props.id)

  useEffect(() => {
    if (!game) return
    store.clearInventory()
    store.setGame(game)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])

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

  useEffect(init, [])

  const selectedScene = store.scenes?.find((scene) => scene.uuid === store.currentScene)
  const hero = store.nodes?.find((node) => node.gameType === 'hero')
  return (
    <main className="relative h-screen overflow-hidden">
      <HelpModal />
      <Loader />

      {props.id && (
        <video
          autoPlay
          muted
          onEnded={(e) => {
            e.currentTarget.className = 'hidden'
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

            <CuboidCollider name="WTF" position={[0, 0, 0]} args={[GRID_SIZE * 4, 0.5, GRID_SIZE * 4]} />
            {store?.goTo && hero?.uuid && (
              <RigidBody
                type="dynamic"
                onCollisionEnter={(t) => {
                  if (t.target.rigidBodyObject?.name !== 'hero') return
                  store.updateNode(hero?.uuid!, { status: 'idle' })
                  store.setGoTo(undefined)
                }}
                name="goTo"
                position={[store.goTo.x, 1, store.goTo.z]}
                restitution={0}
              >
                <Circle rotation={[-Math.PI / 2, 0, 0]} args={[1, 32]}>
                  <meshBasicMaterial color="blue" attach="material" transparent opacity={0.5} />
                </Circle>
              </RigidBody>
            )}

            <Orbit id={props.id} />
          </Physics>
          <Preload all />
        </Suspense>
      </Canvas>

      <picture className="fixed top-4 left-4 z-50">
        <img loading="lazy" className="w-16 h-16" src="/logo.webp" alt="" />
      </picture>
      <Dialogue />
    </main>
  )
}
