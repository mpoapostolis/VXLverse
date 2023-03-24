import { Tile, useStore } from '@/store'
import { Box, TransformControls } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { useState } from 'react'
import { TextureLoader, Vector3 } from 'three'

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
  const [x, setX] = useState()

  const update = (key: string, value: any) => {
    const tiles = [...store.tiles]
    const idx = tiles.findIndex((tile) => tile.id === props.id)
    tiles[idx] = {
      ...tiles[idx],
      [key]: value,
    }
    store.setTiles(tiles)
  }
  return (
    // <Select enabled={isSelected}>
    <TransformControls
      mode='scale'
      position={props.position}
      enabled={isSelected}
      showX={isSelected}
      showY={isSelected}
      showZ={isSelected}
      onMouseUp={(e) => {
        const obj = e?.target.object
        const [x, y, z] = obj?.position?.toArray() ?? [0, 0, 0]
        console.log(obj.scale)
        update('position', new Vector3(x, y, z))
      }}>
      <Box
        name={props.id}
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
    </TransformControls>
    // </Select>
  )
}
