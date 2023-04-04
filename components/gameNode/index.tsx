import { Node } from '@/store'
import { Gltf } from '../gltf'
import { MeshGeometry } from '../meshGeometry'

export function GameNode(props: Partial<Node>) {
  return (
    <mesh
      position={props.position ?? [0, 0, 0]}
      rotation={props.rotation}
      scale={props.scale ?? [0, 0, 0]}
      castShadow
      receiveShadow>
      {props.url && props.uuid && props.type === 'GLTF' && (
        <Gltf animation={props.animation} uuid={props.uuid} url={props.url} />
      )}
      {props.type && props.type !== 'GLTF' && <MeshGeometry type={props.type} />}
      <meshStandardMaterial color={props.color} />
    </mesh>
  )
}
