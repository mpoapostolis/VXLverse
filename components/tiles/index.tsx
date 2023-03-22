import { Tile, useStore } from '@/store'
import { Box } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useRouter } from 'next/router'
import { TextureLoader } from 'three'

export function Tile(props: Tile) {
  const floorBaseColorMap = useLoader(TextureLoader, `/textures/${props.material}/baseColor.jpg`)
  const floorRoughnessMap = useLoader(TextureLoader, `/textures/${props.material}/roughness.jpg`)
  const floorNormalMap = useLoader(TextureLoader, `/textures/${props.material}/normal.jpg`)
  const floorAmbientOcclusionMap = useLoader(TextureLoader, `/textures/${props.material}/ambientOcclusion.jpg`)
  const router = useRouter()
  const store = useStore()
  // rotation deg to radians
  console.log(props.args)
  const rot = props.rotation
  if (rot) rot.x = (rot.x * Math.PI) / 180
  if (rot) rot.y = (rot.y * Math.PI) / 180
  if (rot) rot.z = (rot.z * Math.PI) / 180
  return (
    <Box
      position={props.position}
      // degress to radians
      rotation={rot}
      args={props.scale?.toArray()}
      onClick={(e) => {
        if (e.button !== 0) return
        e.stopPropagation()
        store.setMode('edit')
        router.push({
          query: {
            ...router.query,
            selected: props.id,
          },
        })
      }}>
      <meshStandardMaterial
        map={floorBaseColorMap}
        normalMap={floorNormalMap}
        roughnessMap={floorRoughnessMap}
        aoMap={floorAmbientOcclusionMap}
      />
    </Box>
  )
}
