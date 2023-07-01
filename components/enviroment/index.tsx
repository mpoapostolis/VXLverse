import { Environment, useTexture } from '@react-three/drei'
import { EquirectangularReflectionMapping, SRGBColorSpace } from 'three'

export function Env(props: { equirect: string }) {
  const texture = useTexture(props.equirect ?? '')
  // texture equriectangular
  texture.mapping = EquirectangularReflectionMapping
  texture.colorSpace = SRGBColorSpace
  return <Environment background map={texture} />
}
