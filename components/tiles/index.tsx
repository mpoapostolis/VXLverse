import { useStore } from '@/store'
import { PivotControls } from '@react-three/drei'
import { BoxGeometryProps, useLoader } from '@react-three/fiber'
import { useRouter } from 'next/router'
import { TextureLoader, Vector3 } from 'three'

export function Tile(props: { idx: number; material: string; position: Vector3; args: BoxGeometryProps['args'] }) {
  const floorBaseColorMap = useLoader(TextureLoader, `/textures/${props.material}/baseColor.jpg`)
  const floorRoughnessMap = useLoader(TextureLoader, `/textures/${props.material}/roughness.jpg`)
  const floorNormalMap = useLoader(TextureLoader, `/textures/${props.material}/normal.jpg`)
  const floorAmbientOcclusionMap = useLoader(TextureLoader, `/textures/${props.material}/ambientOcclusion.jpg`)
  const router = useRouter()
  const { selected } = router.query
  const store = useStore()
  return (
    <PivotControls scale={5} visible={props.idx.toString() === selected} autoTransform anchor={[0, 0, 0]}>
      <mesh
        position={props.position}
        onPointerDown={(e) => {
          if (e.button !== 0) return
          e.stopPropagation()
          const v3 = new Vector3().copy(props.position)
          store.setGeometry(v3)
          store.setMaterial(props.material)
          router.replace({
            query: {
              ...router.query,
              mode: undefined,
              selected: props.idx,
            },
          })
        }}>
        <boxBufferGeometry args={props.args} />
        <meshStandardMaterial
          map={floorBaseColorMap}
          normalMap={floorNormalMap}
          roughnessMap={floorRoughnessMap}
          aoMap={floorAmbientOcclusionMap}
        />
      </mesh>
    </PivotControls>
  )
}
