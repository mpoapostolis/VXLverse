import { Gltf } from '@/components/gltf'
import { MeshGeometry } from '@/components/meshGeometry'
import { Node, useStore } from '@/store'
import { Html } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { XIcon } from 'lucide-react'
import { Suspense, useRef } from 'react'
import { Euler, Mesh, Vector3 } from 'three'
import { Material } from '../material'

export function GameNode(props: Partial<Node>) {
  const store = useStore()
  const ref = useRef<Mesh>(null)

  const rotation = new Euler(...(props.rotation?.map((r) => (r * Math.PI) / 180) ?? [0, 0, 0]))
  const position = new Vector3(...(props.position ?? [0, 0, 0]))
  const scale = new Vector3(...(props.scale ?? [0, 0, 0]))

  const invHas = (item: string) => store.inventory.includes(item)
  const isCollected = store.inventory.includes(props.uuid ?? '')
  const doIHaveTheReqItems = props.showWhenInventoryHas?.every(invHas) ?? true
  const isVisible = doIHaveTheReqItems && !isCollected
  const clear = () => {
    if (!props.uuid) return
    store.updateNode(props.uuid, {
      showVideo: undefined,
      showImg: undefined,
    })
  }
  return (
    <Suspense fallback={null}>
      <RigidBody
        friction={0}
        density={0}
        restitution={0}
        linearDamping={0}
        type={'fixed'}
        rotation={rotation}
        scale={scale}
        colliders="cuboid"
        position={position}
      >
        <mesh
          onClick={(evt) => {
            evt.stopPropagation()
            if (!props.uuid || !isVisible) return

            const doIHaveInteract = Object.entries(props.statusToAnimation ?? {}).find(
              ([, status]) => status === 'interact',
            )

            if (doIHaveInteract) store.updateNode(props.uuid, { status: 'interact' })
            if (props.collectable) store.addToInventory(props.uuid)
            const quest = store?.quests?.find((quest) => quest.nodeId === props.uuid && quest.status === 'incomplete')
            switch (quest?.action) {
              case 'showImage':
                store.updateNode(props.uuid, { showVideo: undefined, showImg: quest.imgUrl })
                break

              case 'showVideo':
                store.updateNode(props.uuid, { showVideo: quest.videoUrl, showImg: undefined })
                break

              case 'openWebsite':
                return window.open(quest.url, '_blank')

              case 'goToScene':
                return store.setCurrentScene(quest.goToScene)

              default:
                break
            }

            if (quest) store.setSelectedQuest(quest.uuid)
          }}
          type={props.gameType}
          visible={isVisible}
          ref={ref}
        >
          <Html transform position={[0, 8, 0]} onClick={clear}>
            {props.showImg && (
              <div onClick={clear} className=" w-96 h-96 inset-0 z-50 flex items-center justify-center select-none">
                <picture>
                  <img src={props.showImg} alt="quest" className="w-full h-full object-contain" />
                </picture>
              </div>
            )}
            {props.showVideo && (
              <div onClick={clear} className=" w-96 h-96 inset-0 z-50 flex items-center justify-center select-none">
                <XIcon className="w-20 h-20" />
                <iframe
                  width="960"
                  height="480"
                  src={`https://www.youtube.com/embed/${props.showVideo}`}
                  title="YouTube video player"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            )}
          </Html>
          {props.url && props.uuid && props.type === 'GLTF' && (
            <Gltf statusToAnimation={props.statusToAnimation} status={props.status} uuid={props.uuid} url={props.url} />
          )}
          {props.type && props.type !== 'GLTF' && <MeshGeometry type={props.type} />}

          <Suspense>
            <Material material={props.material} color={props.color} />
          </Suspense>
        </mesh>
      </RigidBody>
    </Suspense>
  )
}
