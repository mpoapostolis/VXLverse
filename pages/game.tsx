import { Dialogue } from '@/components/dialogue'
import { GameNode } from '@/components/gameNode'
import { Light } from '@/components/lights'
import { lights } from '@/components/node'
import { GRID_SIZE, useStore } from '@/store'
import { Environment, OrbitControls, Preload, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { EquirectangularReflectionMapping, Vector3, sRGBEncoding } from 'three'

function Env(props: { equirect: string }) {
  const texture = useTexture(props.equirect ?? '')
  // texture equriectangular
  texture.mapping = EquirectangularReflectionMapping
  texture.encoding = sRGBEncoding
  return <Environment background map={texture} />
}

function Orbit() {
  const t = useThree()
  const hero = t.scene.children.find((node) => node?.type === 'hero')

  const v3 = new Vector3()
  useFrame((t) => {
    if (!hero) return
    // @ts-ignore
    t.controls.target = hero.position
  })
  return (
    <OrbitControls
      target={hero?.position}
      maxDistance={10.1}
      minDistance={4}
      position={[0, -5, 0]}
      makeDefault
      enableDamping={false}
    />
  )
}

export default function Home() {
  const store = useStore()

  const hero = store.nodes.find((node) => node.gameType === 'hero')
  const keyBindings = Object.entries(hero?.keyBindings ?? {})
  const defaultAnimation = hero?.keyBindings?.default
  const heroUUid = hero?.uuid

  useEffect(() => {
    if (!heroUUid) return
    document.addEventListener('keydown', (e) => {
      if (e.repeat) return
      let keyPress = e.key === ' ' ? 'Space' : e.key
      const action = keyBindings.find(([_, key]) => key === keyPress)?.[0]
      if (!action || !heroUUid) return
      store.updateNode(heroUUid, { animation: action })
    })
    document.addEventListener('keyup', (e) => {
      if (e.repeat) return
      store.updateNode(heroUUid, { animation: defaultAnimation })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroUUid, defaultAnimation])
  const selectedScene = store.scenes?.find((scene) => scene.uuid === store.currentScene)

  return (
    <main className="relative h-screen overflow-hidden">
      <Canvas>
        <gridHelper position={[-0.5, 0, -0.5]} args={[GRID_SIZE, GRID_SIZE]} />
        {selectedScene?.equirect ? (
          <Env equirect={selectedScene.equirect} />
        ) : (
          <color attach="background" args={[selectedScene?.color ?? '#999']} />
        )}

        {store.nodes.map((node, idx) =>
          lights.includes(node.type) ? (
            <mesh key={node.uuid} position={node.position}>
              <Light type={node?.type ?? 'DirectionalLight'} />
            </mesh>
          ) : (
            <GameNode key={idx} {...node} />
          ),
        )}
        <Orbit />
        <Preload all />
      </Canvas>
      <Dialogue />
    </main>
  )
}
