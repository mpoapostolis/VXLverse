import { Tile, useStore } from '@/store'
import { Box } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { Select } from '@react-three/postprocessing'
import { TextureLoader } from 'three'

export function Tile(props: Tile) {
  const floorBaseColorMap = useLoader(TextureLoader, `/textures/${props.material}/baseColor.jpg`)
  const floorRoughnessMap = useLoader(TextureLoader, `/textures/${props.material}/roughness.jpg`)
  const floorNormalMap = useLoader(TextureLoader, `/textures/${props.material}/normal.jpg`)
  const floorAmbientOcclusionMap = useLoader(TextureLoader, `/textures/${props.material}/ambientOcclusion.jpg`)
  const store = useStore()
  const isSelected = props.id === store.selectedTile
  const rot = props.rotation
  if (rot) rot.x = (rot.x * Math.PI) / 180
  if (rot) rot.y = (rot.y * Math.PI) / 180
  if (rot) rot.z = (rot.z * Math.PI) / 180

  const t = useThree()

  return (
    <Select enabled={isSelected}>
      <Box
        name={props.id}
        position={props.position}
        // degress to radians
        rotation={rot}
        scale={props.scale}
        onClick={(e) => {
          if (e.button !== 0) return
          e.stopPropagation()
          if (props.id) store.setSelectedTile(props.id)
        }}>
        <meshStandardMaterial
          transparent
          map={floorBaseColorMap}
          normalMap={floorNormalMap}
          roughnessMap={floorRoughnessMap}
          aoMap={floorAmbientOcclusionMap}
        />
      </Box>
    </Select>
  )
}
