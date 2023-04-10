import { Node } from '@/store'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { Gltf } from '../gltf'
import { MeshGeometry } from '../meshGeometry'

export function GameNode(props: Partial<Node>) {
  useFrame(() => {
    if (!props.animation || props.gameType !== 'hero') return
    if (!ref.current) return
    if (props.animation === 'Walking') ref.current.position.z += 0.1
    if (props.animation === 'Running') ref.current.position.z += 0.25
    if (props.animation === 'WalkingBackward') ref.current.position.z -= 0.1
    if (props.animation === 'RunningBackward') ref.current.position.z -= 0.25
    if (props.animation === 'WalkingLeftTurn') ref.current.position.x += 0.1
    if (props.animation === 'LeftStrafe') ref.current.position.x += 0.2
    if (props.animation === 'RightStrafeWalking') ref.current.position.x -= 0.1
    if (props.animation === 'RightStrafe') ref.current.position.x -= 0.2
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
