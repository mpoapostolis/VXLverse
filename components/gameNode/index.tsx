import { Node } from '@/store'
import { characterController } from '@/store/utils'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, vec3 } from '@react-three/rapier'
import { useRef } from 'react'
import { Gltf } from '../gltf'
import { MeshGeometry } from '../meshGeometry'

export function GameNode(props: Partial<Node>) {
  const controlls = characterController.map((key) => key.value)
  useFrame((t) => {
    if (props.gameType !== 'hero' || !ref.current) return

    // @ts-ignore
    const theta = t.controls?.getAzimuthalAngle()
    // @ts-ignore
    const phi = t.controls?.getPolarAngle()

    const position = vec3(ref.current?.translation())
    const y = position.y

    if (theta && phi) {
    }

    if (props.action === 'moveForward') {
      const x = position.x - 0.1 * Math.sin(theta)
      const z = position.z - 0.1 * Math.cos(theta)
    }
    if (props.action === 'runForward') {
      const x = position.x - 0.25 * Math.sin(theta)
      const z = position.z - 0.25 * Math.cos(theta)
    }
    if (props.action === 'moveBackward') {
      if (phi < 0.2) return
      const x = position.x + 0.1 * Math.sin(theta)
      const z = position.z + 0.1 * Math.cos(theta)
    }
    if (props.action === 'runBackward') {
      if (phi < 0.2) return

      const x = position.x + 0.25 * Math.sin(theta)
      const z = position.z + 0.25 * Math.cos(theta)
    }
    if (props.action === 'moveLeft') {
      const x = position.x - 0.1 * Math.cos(theta)
      const z = position.z + 0.1 * Math.sin(theta)
    }
    if (props.action === 'runLeft') {
      const x = position.x - 0.2 * Math.cos(theta)
      const z = position.z + 0.2 * Math.sin(theta)
    }
    if (props.action === 'moveRight') {
      const x = position.x + 0.1 * Math.cos(theta)
      const z = position.z - 0.1 * Math.sin(theta)
    }
    if (props.action === 'runRight') {
      const x = position.x + 0.2 * Math.cos(theta)
      const z = position.z - 0.2 * Math.sin(theta)
    }
  })
  const ref = useRef<RapierRigidBody>(null)

  return (
    <mesh
      type={props.gameType}
      position={props.position ?? [0, 0, 0]}
      rotation={props.rotation}
      scale={props.scale ?? [0, 0, 0]}
      castShadow
      receiveShadow
    >
      {props.url && props.uuid && props.type === 'GLTF' && (
        <Gltf animation={props.animation} uuid={props.uuid} url={props.url} />
      )}
      {props.type && props.type !== 'GLTF' && <MeshGeometry type={props.type} />}
      <meshStandardMaterial color={props.color} />
    </mesh>
  )
}
