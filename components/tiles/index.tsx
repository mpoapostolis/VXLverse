import { useStore } from '@/store'
import { PivotControls } from '@react-three/drei'
import { BoxGeometryProps, useLoader } from '@react-three/fiber'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { Group, TextureLoader, Vector3 } from 'three'

export function Tile(props: { idx: number; material: string; position: Vector3; args: BoxGeometryProps['args'] }) {
  const floorBaseColorMap = useLoader(TextureLoader, `/textures/${props.material}/baseColor.jpg`)
  const floorRoughnessMap = useLoader(TextureLoader, `/textures/${props.material}/roughness.jpg`)
  const floorNormalMap = useLoader(TextureLoader, `/textures/${props.material}/normal.jpg`)
  const floorAmbientOcclusionMap = useLoader(TextureLoader, `/textures/${props.material}/ambientOcclusion.jpg`)
  const router = useRouter()
  const mode = router.query.mode
  const selected = router.query.selected === props.idx.toString()
  const ref = useRef<Group>(null)
  const store = useStore()
  return (
    <PivotControls ref={ref} visible={selected} scale={5}>
      <mesh
        position={props.position}
        onPointerDown={(e) => {
          e.stopPropagation()
          if (mode === 'create') return
          const v3 = new Vector3().copy(props.position)
          store.setGeometry(v3)
          store.setMaterial(props.material)
          router.replace({
            query: {
              ...router.query,
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
