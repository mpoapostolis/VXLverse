import { useStore } from '@/store'
import { useLoader } from '@react-three/fiber'
import { TextureLoader, Vector3 } from 'three'

export function Ghost(props: { position: Vector3 }) {
  const store = useStore()
  const floorBaseColorMap = useLoader(TextureLoader, `/textures/${store.material}/baseColor.jpg`)
  const floorRoughnessMap = useLoader(TextureLoader, `/textures/${store.material}/roughness.jpg`)
  const floorNormalMap = useLoader(TextureLoader, `/textures/${store.material}/normal.jpg`)
  const floorAmbientOcclusionMap = useLoader(TextureLoader, `/textures/${store.material}/ambientOcclusion.jpg`)
  const v3 = new Vector3().copy(props.position)
  v3.y += store.geometry.y / 2
  return (
    <mesh name='floor' type='floor' position={v3}>
      <boxBufferGeometry args={store.geometry.toArray()} />
      <meshStandardMaterial
        opacity={0.5}
        transparent
        map={floorBaseColorMap}
        normalMap={floorNormalMap}
        roughnessMap={floorRoughnessMap}
        aoMap={floorAmbientOcclusionMap}
      />
    </mesh>
  )
}
