import { Gltf } from '@/components/gltf'
import { MeshGeometry } from '@/components/meshGeometry'
import { Node, useStore } from '@/store'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier'
import { Suspense, useEffect, useRef } from 'react'
import { Euler, Mesh, Quaternion, Vector3 } from 'three'
import { Loader } from '../loader'
import { Material } from '../material'

export function GameNode(props: Partial<Node>) {
  const store = useStore()
  const ref = useRef<Mesh>(null)
  const [x, y, z] = props.goTo ?? [0, 0, 0]
  const targetPosition = new Vector3(x, ref?.current?.position.y, z)

  const rotation = new Euler(...(props.rotation?.map((r) => (r * Math.PI) / 180) ?? [0, 0, 0]))
  const position = new Vector3(...(props.position ?? [0, 0, 0]))
  const scale = new Vector3(...(props.scale ?? [0, 0, 0]))

  useFrame(() => {
    const rb = rigidBody.current
    if (!rb || !props.goTo) return
    const currentPosition = vec3(rb.translation())
    const distance = currentPosition.distanceTo(targetPosition)
    if (distance < 5) {
      if (rb.isMoving()) store.updateNode(props.uuid ?? '', { status: 'idle' })
      return rb.setNextKinematicTranslation({ x: currentPosition.x, y: currentPosition.y, z: currentPosition.z })
    }
    const direction = targetPosition.clone().sub(currentPosition).normalize()
    const yaw = Math.atan2(direction.x, direction.z)
    const quaternion = new Quaternion().setFromEuler(new Euler(0, yaw, 0, 'YXZ'))

    rb?.setRotation(quaternion, true)

    const velocity = targetPosition
      .clone()
      .sub(currentPosition)
      .normalize()
      .multiplyScalar(props.status === 'run' ? 0.4 : 0.2)
    const newPosition = currentPosition.clone().add(velocity)

    rigidBody?.current?.setNextKinematicTranslation({
      x: newPosition.x,
      y: position?.y ?? 0,
      z: newPosition.z,
    })
  })

  useEffect(() => {
    if (!ref.current) return
    const rotation = new Euler(...(props.rotation?.map((r) => (r * Math.PI) / 180) ?? [0, 0, 0]))

    ref.current.rotation.set(rotation.x, rotation.y, rotation.z)
  }, [props.rotation])

  const invHas = (item: string) => store.inventory.includes(item)
  const isCollected = store.inventory.includes(props.uuid ?? '')
  const doIHaveTheReqItems = props.showWhenInventoryHas?.every(invHas) ?? true
  const isVisible = doIHaveTheReqItems && !isCollected
  const rigidBody = useRef<RapierRigidBody>(null)

  return (
    <Suspense fallback={null}>
      <RigidBody
        ref={rigidBody}
        rotation={rotation}
        scale={scale}
        position={position}
        type={props.gameType === 'hero' ? 'kinematicPosition' : props.physics ?? 'fixed'}
      >
        <mesh
          onClick={() => {
            if (!props.uuid || !isVisible) return
            const doIHaveInteract = Object.entries(props.statusToAnimation ?? {}).find(
              ([, status]) => status === 'interact',
            )

            if (doIHaveInteract) store.updateNode(props.uuid, { status: 'interact' })
            if (props.collectable) store.addToInventory(props.uuid)
            if (props.quests) {
              const firstActiveQuest = props.quests.find((quest) => quest.status === 'incomplete')
              if (firstActiveQuest) {
                const isItCompleted = firstActiveQuest.requiredItemToComplete
                  ? invHas(firstActiveQuest.requiredItemToComplete ?? '')
                  : true

                if (isItCompleted && firstActiveQuest.reward) store.addToInventory(firstActiveQuest.reward)

                store.setDialogue({
                  src: props.img,
                  dialogue:
                    isItCompleted && firstActiveQuest.questCompleteDialog
                      ? firstActiveQuest.questCompleteDialog
                      : firstActiveQuest.initialDialog,
                })
              }
            }
          }}
          type={props.gameType}
          visible={isVisible}
          ref={ref}
        >
          <meshStandardMaterial color={'green'} wireframe />
          {props.url && props.uuid && props.type === 'GLTF' && (
            <Gltf statusToAnimation={props.statusToAnimation} status={props.status} uuid={props.uuid} url={props.url} />
          )}
          {props.type && props.type !== 'GLTF' && <MeshGeometry type={props.type} />}

          <Suspense fallback={<Loader />}>
            <Material material={props.material} color={props.color} />
          </Suspense>
        </mesh>
      </RigidBody>
    </Suspense>
  )
}
