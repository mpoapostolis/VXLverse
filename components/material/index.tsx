import { NodeMaterial, useStore } from '@/store'
import { MeshReflectorMaterial, useTexture } from '@react-three/drei'
import { useEffect } from 'react'

export function Material(props: { mirror?: boolean; material?: NodeMaterial; color?: string }) {
  let textureMap: NodeMaterial = {}

  if (props.material?.map) textureMap.map = props.material.map
  if (props.material?.displacement) textureMap.displacement = props.material.displacement
  if (props.material?.metalness) textureMap.metalness = props.material.metalness
  if (props.material?.normal) textureMap.normal = props.material.normal
  if (props.material?.roughness) textureMap.roughness = props.material.roughness
  if (props.material?.roughness) textureMap.roughness = props.material.roughness
  const repeat = Math.max(props.material?.repeat ?? 1, 1)

  const objMap = useTexture<{
    map?: string
    displacement?: string
    metalness?: string
    normal?: string
    roughness?: string
  }>(textureMap)
  const store = useStore()
  const selected = store.selectedNode

  const map = objMap?.map?.clone()

  if (map?.wrapS) map.wrapS = 1002
  if (map?.wrapT) map.wrapT = 1002
  if (map?.repeat) map.repeat.set(repeat, repeat)

  const metalness = objMap?.metalness?.clone()
  if (metalness?.wrapS) metalness.wrapS = 1002
  if (metalness?.wrapT) metalness.wrapT = 1002
  if (metalness?.repeat) metalness.repeat.set(repeat, repeat)

  const displacement = objMap?.displacement?.clone()
  if (displacement?.wrapS) displacement.wrapS = 1002
  if (displacement?.wrapT) displacement.wrapT = 1002
  if (displacement?.repeat) displacement.repeat.set(repeat, repeat)

  const normal = objMap?.displacement?.clone()
  if (normal?.wrapS) normal.wrapS = 1002
  if (normal?.wrapT) normal.wrapT = 1002
  if (normal?.repeat) normal.repeat.set(repeat, repeat)

  const roughness = objMap?.roughness?.clone()
  if (roughness?.wrapS) roughness.wrapS = 1002
  if (roughness?.wrapT) roughness.wrapT = 1002
  if (roughness?.repeat) roughness.repeat.set(repeat, repeat)

  useEffect(
    () => () => {
      map?.dispose()
      metalness?.dispose()
      normal?.dispose()
      roughness?.dispose()
    },
    [map, metalness, normal, roughness],
  )
  const { showMetalness, showNormal, showRoughness } = props.material ?? {}
  const key = `${selected}${showMetalness}${showNormal}${showRoughness}`
  return props.material?.type === 'mirror' ? (
    <MeshReflectorMaterial mirror={1} blur={0} depthToBlurRatioBias={0} distortion={0} />
  ) : (
    <meshStandardMaterial
      key={key}
      map={map}
      metalnessMap={props.material?.showMetalness ? metalness ?? undefined : undefined}
      normalMap={props.material?.showNormal ? normal ?? undefined : undefined}
      roughnessMap={props.material?.showRoughness ? roughness ?? undefined : undefined}
      color={props.color}
    />
  )
}
