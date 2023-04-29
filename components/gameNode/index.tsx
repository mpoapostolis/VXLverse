import { Node, useStore } from '@/store'
import { Box } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Euler, Mesh, Vector3 } from 'three'
import { Gltf } from '../gltf'
import { MeshGeometry } from '../meshGeometry'

export function GameNode(props: Partial<Node>) {
  const store = useStore()
  const ref = useRef<Mesh>(null)

  const targetPosition = new Vector3(props.goTo?.x, ref?.current?.position.y, props?.goTo?.z)

  useFrame(() => {
    if (props.velocity === 0 || !ref.current || !props.uuid || !props.goTo) return
    const currentPosition = ref.current.position.clone()
    const distance = currentPosition.distanceTo(targetPosition)
    if (distance > 2) {
      ref.current.lookAt(targetPosition)
      const velocity = targetPosition
        .clone()
        .sub(currentPosition)
        .normalize()
        .multiplyScalar(props.status === 'run' ? 3 : 1.5)
      const newPosition = currentPosition.clone().add(velocity)
      ref.current.position.lerp(newPosition, 0.1)
    } else {
      store.updateNode(props.uuid, { goTo: undefined, status: 'idle' })
    }
  })

  const [size, setSize] = useState<{ x: number; y: number; z: number }>()
  useFrame(() => {
    if (!ref.current || !props.gravity) return
    // gravity
    if (ref.current.position.y > (size?.y ?? 1) / 2) {
      ref.current.position.y -= 0.1
    }
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

  return (
    <mesh
      ref={ref}
      type={props.gameType}
      position={props.position ?? [0, 0, 0]}
      rotation={props.rotation}
      scale={props.scale ?? [0, 0, 0]}
    >
      <Box
        onClick={() => {
          if (!props.uuid) return
          const doIHaveInteract = Object.entries(props.statusToAnimation ?? {}).find(
            ([, status]) => status === 'interact',
          )
          if (doIHaveInteract) store.updateNode(props.uuid, { status: 'interact' })
          store.selectNode(props.uuid)
        }}
        args={
          size
            ? [
                (size?.x ?? 1) / (props.scale?.x ?? 1),
                (size?.y ?? 1) / (props.scale?.y ?? 1),
                (size?.z ?? 1) / (props.scale?.z ?? 1),
              ]
            : undefined
        }
      >
        <meshStandardMaterial color={'green'} wireframe />
      </Box>
      {props.url && props.uuid && props.type === 'GLTF' && (
        <Gltf
          onLoad={setSize}
          statusToAnimation={props.statusToAnimation}
          status={props.status}
          uuid={props.uuid}
          url={props.url}
        />
      )}
      {props.type && props.type !== 'GLTF' && <MeshGeometry type={props.type} />}
      <meshStandardMaterial color={props.color} />
    </mesh>
  )
}
