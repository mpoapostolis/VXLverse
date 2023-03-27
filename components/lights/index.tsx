import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from 'three'

export function DirectionalLight() {
  const ref = useRef(null)
  useHelper(ref.current && ref, DirectionalLightHelper, 1)
  return <directionalLight ref={ref} />
}

export function HemisphereLight() {
  const ref = useRef(null)
  useHelper(ref.current && ref, HemisphereLightHelper, 1)
  return <hemisphereLight ref={ref} />
}

export function PointLight() {
  const ref = useRef(null)
  useHelper(ref.current && ref, PointLightHelper, 1)
  return <pointLight ref={ref} />
}

export function SpotLight() {
  const ref = useRef(null)
  useHelper(ref.current && ref, SpotLightHelper, 1)
  return <spotLight args={[0xffffff, 1, 5, 0.3, 100, 2]} ref={ref} />
}

export function Light(props: { type: string }) {
  switch (props.type) {
    case 'DirectionalLight':
      return <DirectionalLight />
    case 'HemisphereLight':
      return <HemisphereLight />
    case 'PointLight':
      return <PointLight />
    case 'SpotLight':
      return <SpotLight />
    case 'AmbientLight':
      return <ambientLight intensity={0.5} />

    default:
      return <></>
  }
}
