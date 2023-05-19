'use client'

import { Dialogue } from '@/components/dialogue'
import { GameNode } from '@/components/gameNode'
import { HelpModal } from '@/components/helpModal'
import { Light } from '@/components/lights'
import { lights } from '@/components/node'
import { useGame } from '@/lib/games/queries'
import { GRID_SIZE, init, useStore } from '@/store'
import { Environment, Loader, OrbitControls, Plane, Preload, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { CuboidCollider, Physics, useRapier } from '@react-three/rapier'
import { Suspense, useEffect } from 'react'
import { EquirectangularReflectionMapping, SRGBColorSpace, Vector3 } from 'three'

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
    if (intersects?.at(0)?.point)
      store.updateNode(hero?.uuid ?? '', {
        goTo: intersects?.at(0)?.point?.toArray(),
        status: 'walk',
      })
  }
  const { data: game } = useGame(props.id)

  useEffect(() => {
    if (game) {
      store.clearInventory()
      store.setGame(game)
    }
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

  const pos = t.scene.getObjectByProperty('type', 'hero')
  const r = useRapier()
  useFrame((t) => {
    try {
      // @ts-ignore
      t.controls.target = pos.position
    } catch (error) {}
  })

  return (
    <OrbitControls
      target={new Vector3(...(hero?.position, [0, 0, 0]))}
      enablePan={false}
      maxDistance={40.1}
      minDistance={4}
      position={[0, -5, 0]}
      makeDefault
      enableDamping={false}
    />
  )
}

export function GameCanvas(props: { id?: string }) {
  const store = useStore()

  function cb(shiftKey: boolean) {
    const state = useStore.getState()
    const hero = state?.nodes?.find((node) => node.gameType === 'hero')

    if (!hero?.uuid || hero.status === 'idle') return
    store.updateNode(hero.uuid, { status: shiftKey ? 'run' : 'walk' })
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.repeat) return
      cb(e.shiftKey)
    })
    document.addEventListener('keyup', (e) => {
      if (e.repeat) return
      cb(e.shiftKey)
    })
    return () => {
      document.removeEventListener('keydown', (e) => {
        if (e.repeat) return
        cb(e.shiftKey)
      })
      document.removeEventListener('keyup', (e) => {
        if (e.repeat) return
        cb(e.shiftKey)
      })
    }
  }, [])
  useEffect(init, [])

  const selectedScene = store.scenes?.find((scene) => scene.uuid === store.currentScene)
  return (
    <main className="relative h-screen overflow-hidden">
      <HelpModal />

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
          <gridHelper position={[-0.5, 0, -0.5]} args={[GRID_SIZE * 4, GRID_SIZE * 4]} />
          {selectedScene?.equirect ? (
            <Env equirect={selectedScene.equirect} />
          ) : (
            <color attach="background" args={[selectedScene?.color ?? '#999999']} />
          )}
          <Physics debug>
            {store.nodes.map((node, idx) =>
              lights.includes(node.type) ? (
                <mesh key={idx} position={new Vector3(...(node?.position ?? [0, 0, 0]))}>
                  <Light type={node?.type ?? 'DirectionalLight'} />
                </mesh>
              ) : (
                <GameNode key={idx} {...node} />
              ),
            )}
            <CuboidCollider position={[0, 0, 0]} args={[GRID_SIZE * 4, 0.5, GRID_SIZE * 4]} />

            <Plane args={[GRID_SIZE * 4, GRID_SIZE * 4]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} />
          </Physics>
          <Orbit id={props.id} />
          <Preload all />
        </Suspense>
      </Canvas>

      <picture className="fixed top-4 left-4 z-50">
        <img loading="lazy" className="w-16 h-16" src="/logo.webp" alt="" />
      </picture>
      <Dialogue />
      <Loader />
    </main>
  )
}
