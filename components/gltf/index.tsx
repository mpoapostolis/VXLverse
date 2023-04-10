import { useStore } from '@/store'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export function Gltf(props: { animation?: string; uuid: string; url: string }) {
  const { scene, animations } = useGLTF(props.url)
  const { actions } = useAnimations(animations, scene)
  const store = useStore()

  useEffect(() => {
    store.updateNode(props.uuid, { actions })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, props.uuid])

  useEffect(() => {
    if (!actions || !props.animation) return
    actions[props.animation]?.reset().fadeIn(0.5)?.play()
    return () => {
      if (!actions || !props.animation) return
      actions[props?.animation]?.fadeOut(0.5)
    }
  }, [actions, props.animation])

  return <primitive object={scene} dispose={null} />
}
