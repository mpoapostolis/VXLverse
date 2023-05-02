import { Node, useStore } from '@/store'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier'
import { Suspense, useEffect, useRef } from 'react'
import { Euler, Mesh, Vector3 } from 'three'
import { Gltf } from '../gltf'
import { MeshGeometry } from '../meshGeometry'

export function GameNode(props: Partial<Node>) {
  const store = useStore()
  const ref = useRef<Mesh>(null)

  const targetPosition = new Vector3(props.goTo?.x, ref?.current?.position.y, props?.goTo?.z)

  useFrame(() => {
    const rb = rigidBody.current
    if (!rb || !props.goTo) return
    const currentPosition = vec3(rb.translation())
    const distance = currentPosition.distanceTo(targetPosition)
    if (distance < 5) {
      if (rb.isMoving()) store.updateNode(props.uuid ?? '', { status: 'idle' })
      return rb.setNextKinematicTranslation({ x: currentPosition.x, y: currentPosition.y, z: currentPosition.z })
    }

    ref.current?.lookAt(targetPosition.x, props.position?.y ?? 0, targetPosition.z)
    const velocity = targetPosition
      .clone()
      .sub(currentPosition)
      .normalize()
      .multiplyScalar(props.status === 'run' ? 0.4 : 0.2)
    const newPosition = currentPosition.clone().add(velocity)

    rigidBody?.current?.setNextKinematicTranslation({
      x: newPosition.x,
      y: props.position?.y ?? 0,
      z: newPosition.z,
    })
    if (ref.current) ref.current.position.set(newPosition.x, props.position?.y ?? 0, newPosition.z)
  })

  useEffect(() => {
    if (!ref.current) return
    const rotation = props.rotation
      ? new Euler(
          (props.rotation.x * Math.PI) / 180,
          (props.rotation.y * Math.PI) / 180,
          (props.rotation.z * Math.PI) / 180,
        )
      : new Euler(0, 0, 0)
    ref.current.rotation.set(rotation.x, rotation.y, rotation.z)
  }, [props.rotation])

  const invHas = (item: string) => store.inventory.includes(item)
  const isCollected = props.gameType === 'item' && store.inventory.includes(props.uuid ?? '')
  const doIHaveTheReqItems = props.showWhenInventoryHas?.every(invHas) ?? true
  const isVisible = doIHaveTheReqItems && !isCollected
  const rigidBody = useRef<RapierRigidBody>(null)

  return (
    <Suspense fallback={null}>
      <RigidBody
        ref={rigidBody}
        rotation={props.rotation}
        scale={props.scale ?? [0, 0, 0]}
        position={props.position ?? [0, 0, 0]}
        type={props.gameType === 'hero' ? 'kinematicPosition' : props.physics ?? 'fixed'}
      >
        <mesh type={props.gameType} visible={isVisible} ref={ref}>
          <meshStandardMaterial color={'green'} wireframe />
          {props.url && props.uuid && props.type === 'GLTF' && (
            <Gltf statusToAnimation={props.statusToAnimation} status={props.status} uuid={props.uuid} url={props.url} />
          )}
          {props.type && props.type !== 'GLTF' && <MeshGeometry type={props.type} />}
          <meshStandardMaterial color={props.color} />
        </mesh>
      </RigidBody>
    </Suspense>
  )
}
