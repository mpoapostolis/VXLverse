import { Box } from '@react-three/drei'
import { BoxGeometryProps, useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh, TextureLoader, Vector3 } from 'three'

export function Wall(props: { position: Vector3; args: BoxGeometryProps['args'] }) {
  const wallBaseColorMap = useLoader(TextureLoader, '/textures/woodPanel/baseColor.jpg').clone()
  const wallRoughnessMap = useLoader(TextureLoader, '/textures/woodPanel/roughness.jpg')
  const wallNormalMap = useLoader(TextureLoader, '/textures/woodPanel/normal.jpg')
  const wallAmbientOcclusionMap = useLoader(TextureLoader, '/textures/woodPanel/ambientOcclusion.jpg')
  const metallic = useLoader(TextureLoader, '/textures/woodPanel/metallic.jpg')
  const ref = useRef<Mesh>()

  useFrame(() => {
    if (!ref.current) return
    const { x, y, z } = ref.current.scale
    if (x > 0.99) return
    ref.current.scale.x += 0.05
    ref.current.scale.y += 0.05
    ref.current.scale.z += 0.05
  })

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation()
        e.object.visible = false
      }}
      scale={[0, 0, 0]}
      {...props}
      ref={ref}>
      <meshStandardMaterial
        metalnessMap={metallic}
        map={wallBaseColorMap}
        normalMap={wallNormalMap}
        roughnessMap={wallRoughnessMap}
        aoMap={wallAmbientOcclusionMap}
      />
    </Box>
  )
}
