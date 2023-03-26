import { useGLTF } from '@react-three/drei'

export function Gltf(props: { url: string }) {
  const gltf = useGLTF(props.url)
  return <primitive object={gltf.scene} dispose={null} />
}
