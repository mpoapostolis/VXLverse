import { BoxGeometryProps, useLoader } from '@react-three/fiber'
import { TextureLoader, Vector3 } from 'three'

export function Tile(props: { material: string; position: Vector3; args: BoxGeometryProps['args'] }) {
  const floorBaseColorMap = useLoader(TextureLoader, `/textures/${props.material}/baseColor.jpg`)
  const floorRoughnessMap = useLoader(TextureLoader, `/textures/${props.material}/roughness.jpg`)
  const floorNormalMap = useLoader(TextureLoader, `/textures/${props.material}/normal.jpg`)
  const floorAmbientOcclusionMap = useLoader(TextureLoader, `/textures/${props.material}/ambientOcclusion.jpg`)
  return (
    <mesh name='floor' type='floor' position={props.position}>
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
