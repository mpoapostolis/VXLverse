import { useStore } from '@/store'
import { CharStatus } from '@/store/utils'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export function Gltf(props: {
  status?: CharStatus
  statusToAnimation?: Record<string, CharStatus>
  uuid: string
  url: string
}) {
  const { scene, animations } = useGLTF(props.url)
  const { actions } = useAnimations(animations, scene)
  const store = useStore()
  useEffect(() => {
    store.updateNode(props.uuid, { actions })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, props.uuid])

  useEffect(() => {
    const animation = Object.entries(props.statusToAnimation ?? {}).find(
      ([, status]) => status === (props?.status || 'idle'),
    )?.[0]

    if (!actions || !animation) return
    actions[animation]?.reset().fadeIn(0.2)?.play()
    return () => {
      if (!actions || !animation) return
      actions[animation]?.fadeOut(0.2)
    }
  }, [actions, props.status, props.statusToAnimation])

  return <primitive object={scene} dispose={null} />
}
