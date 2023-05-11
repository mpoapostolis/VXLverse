import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { DirectionalLightHelper, HemisphereLightHelper, PointLightHelper, SpotLightHelper } from 'three'

export function DirectionalLight(props: { helper?: boolean }) {
  const ref = useRef(null)
  useHelper(props.helper && ref.current && ref, DirectionalLightHelper, 1)
  return <directionalLight ref={ref} />
}

export function HemisphereLight(props: { helper?: boolean }) {
  const ref = useRef(null)
  useHelper(props.helper && ref.current && ref, HemisphereLightHelper, 1)
  return <hemisphereLight ref={ref} />
}

export function PointLight(props: { helper?: boolean }) {
  const ref = useRef(null)
  useHelper(props.helper && ref.current && ref, PointLightHelper, 1)
  return <pointLight ref={ref} />
}

export function SpotLight(props: { helper?: boolean }) {
  const ref = useRef(null)
  useHelper(props.helper && ref.current && ref, SpotLightHelper, 1)
  return <spotLight args={[0xffffff, 1, 5, 0.3, 100, 2]} ref={ref} />
}

export function Light(props: { type: string; helper?: boolean }) {
  switch (props.type) {
    case 'DirectionalLight':
      return <DirectionalLight helper={props.helper} />
    case 'HemisphereLight':
      return <HemisphereLight helper={props.helper} />
    case 'PointLight':
      return <PointLight helper={props.helper} />
    case 'SpotLight':
      return <SpotLight helper={props.helper} />
    case 'AmbientLight':
      return <ambientLight intensity={0.5} />

    default:
      return <></>
  }
}
