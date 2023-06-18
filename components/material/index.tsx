import { NodeMaterial, useStore } from '@/store'
import { MeshReflectorMaterial, useTexture } from '@react-three/drei'
import { useMemo } from 'react'

export function Material(props: { mirror?: boolean; material?: NodeMaterial; color?: string }) {
  const textureMap: NodeMaterial = useMemo(() => {
    let map: NodeMaterial = {}

    if (props.material?.map) map.map = props.material.map
    if (props.material?.displacement) map.displacement = props.material.displacement
    if (props.material?.metalness) map.metalness = props.material.metalness
    if (props.material?.normal) map.normal = props.material.normal
    if (props.material?.roughness) map.roughness = props.material.roughness

    return map
  }, [props.material])

  const repeat = useMemo(() => Math.max(props.material?.repeat ?? 1, 1), [props.material?.repeat])

  const objMap = useTexture<{
    map?: string
    displacement?: string
    metalness?: string
    normal?: string
    roughness?: string
  }>(textureMap)

  const store = useStore()
  const selected = store.selectedNode

  const { showMetalness, showNormal, showRoughness } = props.material ?? {}
  const key = `${selected}${showMetalness}${showNormal}${showRoughness}`

  return props.material?.type === 'mirror' ? (
    <MeshReflectorMaterial mirror={1} blur={0} depthToBlurRatioBias={0} distortion={0} />
  ) : (
    <meshStandardMaterial
      key={key}
      map={objMap?.map}
      metalnessMap={props.material?.showMetalness ? objMap?.metalness : undefined}
      normalMap={props.material?.showNormal ? objMap?.normal : undefined}
      roughnessMap={props.material?.showRoughness ? objMap?.roughness : undefined}
      color={props.color}
    />
  )
}
