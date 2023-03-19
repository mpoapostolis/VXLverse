import { BoxGeometryProps, useLoader } from '@react-three/fiber'
import { RepeatWrapping, TextureLoader, Vector3 } from 'three'

export function Floor(props: { position: Vector3; args: BoxGeometryProps['args'] }) {
  const floorBaseColorMap = useLoader(TextureLoader, '/textures/marble/baseColor.jpg')
  const floorRoughnessMap = useLoader(TextureLoader, '/textures/marble/roughness.jpg')
  const floorNormalMap = useLoader(TextureLoader, '/textures/marble/normal.jpg')
  const floorAmbientOcclusionMap = useLoader(TextureLoader, '/textures/marble/ambientOcclusion.jpg')

  floorBaseColorMap.wrapS = RepeatWrapping
  floorBaseColorMap.wrapT = RepeatWrapping

  return (
    <mesh name='floor' type='floor' position={props.position} rotation={[-Math.PI / 2, 0, 0]}>
      <boxBufferGeometry args={props.args} />
      <meshStandardMaterial
        map={floorBaseColorMap}
        normalMap={floorNormalMap}
        roughnessMap={floorRoughnessMap}
        aoMap={floorAmbientOcclusionMap}
      />
    </mesh>
  )
}
