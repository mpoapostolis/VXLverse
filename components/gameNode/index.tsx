import { Node } from '@/store'
import { characterController } from '@/store/utils'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
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

    if (theta && phi) {
      ref.current.rotation.y = theta + Math.PI
    }

    if (props.action === 'moveForward') {
      ref.current.position.x -= 0.1 * Math.sin(theta)
      ref.current.position.z -= 0.1 * Math.cos(theta)
    }
    if (props.action === 'runForward') {
      ref.current.position.x -= 0.25 * Math.sin(theta)
      ref.current.position.z -= 0.25 * Math.cos(theta)
    }
    if (props.action === 'moveBackward') {
      if (phi < 0.2) return
      ref.current.position.x += 0.1 * Math.sin(theta)
      ref.current.position.z += 0.1 * Math.cos(theta)
    }
    if (props.action === 'runBackward') {
      if (phi < 0.2) return

      ref.current.position.x += 0.25 * Math.sin(theta)
      ref.current.position.z += 0.25 * Math.cos(theta)
    }
    if (props.action === 'moveLeft') {
      ref.current.position.x -= 0.1 * Math.cos(theta)
      ref.current.position.z += 0.1 * Math.sin(theta)
    }
    if (props.action === 'runLeft') {
      ref.current.position.x -= 0.2 * Math.cos(theta)
      ref.current.position.z += 0.2 * Math.sin(theta)
    }
    if (props.action === 'moveRight') {
      ref.current.position.x += 0.1 * Math.cos(theta)
      ref.current.position.z -= 0.1 * Math.sin(theta)
    }
    if (props.action === 'runRight') {
      ref.current.position.x += 0.2 * Math.cos(theta)
      ref.current.position.z -= 0.2 * Math.sin(theta)
    }
  })
  const ref = useRef<Mesh>(null)

  return (
    <mesh
      type={props.gameType}
      ref={ref}
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
