import { Dialogue } from '@/components/dialogue'
import { GameNode } from '@/components/gameNode'
import { HelpModal } from '@/components/helpModal'
import { Light } from '@/components/lights'
import { lights } from '@/components/node'
import { useGame } from '@/lib/games/queries'
import { GRID_SIZE, useStore } from '@/store'
import { Environment, OrbitControls, Plane, Preload, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { EquirectangularReflectionMapping, sRGBEncoding } from 'three'

function Env(props: { equirect: string }) {
  const texture = useTexture(props.equirect ?? '')
  // texture equriectangular
  texture.mapping = EquirectangularReflectionMapping
  texture.encoding = sRGBEncoding
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
    if (intersects?.at(0)?.point)
      store.updateNode(hero?.uuid ?? '', {
        goTo: intersects?.at(0)?.point,
        status: 'walk',
      })
  }
  const { data: game } = useGame()

  useEffect(() => {
    if (game) store.setGame(game)
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

  useFrame((t) => {
    try {
      // @ts-ignore
      t.controls.target = pos.position
    } catch (error) {}
  })

  return (
    <OrbitControls
      target={hero?.position}
      enablePan={false}
      maxDistance={30.1}
      minDistance={4}
      position={[0, -5, 0]}
      makeDefault
      enableDamping={false}
    />
  )
}

export default function Home() {
  const store = useStore()

  function cb(shiftKey: boolean) {
    const state = useStore.getState()
    const hero = state?.nodes?.find((node) => node.gameType === 'hero')
    if (!hero?.uuid || hero?.status === 'idle') return
    store.updateNode(hero.uuid, { status: shiftKey ? 'run' : 'walk' })
  }

  const router = useRouter()
  const id = router.query.id

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
  const selectedScene = store.scenes?.find((scene) => scene.uuid === store.currentScene)

  return (
    <main className="relative h-screen overflow-hidden">
      <Head>
        <title>VXLverse</title>
      </Head>
      <HelpModal />
      <Canvas>
        <fog attach="fog" args={[selectedScene?.color ?? '#000', 0, 120]} />
        <gridHelper position={[-0.5, 0, -0.5]} args={[GRID_SIZE * 4, GRID_SIZE * 4]} />
        {selectedScene?.equirect ? (
          <Env equirect={selectedScene.equirect} />
        ) : (
          <color attach="background" args={[selectedScene?.color ?? '#999']} />
        )}

        {store.nodes.map((node, idx) =>
          lights.includes(node.type) ? (
            <mesh key={idx} position={node.position}>
              <Light type={node?.type ?? 'DirectionalLight'} />
            </mesh>
          ) : (
            <GameNode key={idx} {...node} />
          ),
        )}
        <Plane args={[GRID_SIZE * 4, GRID_SIZE * 4]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} />
        <Orbit />
        <Preload all />
      </Canvas>
      <picture className="fixed top-4 left-4 z-50">
        <img className="w-16 h-16" src="/logo.svg" alt="" />
      </picture>
      <Dialogue />
    </main>
  )
}
