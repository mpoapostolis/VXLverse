import { useStore } from '@/store'
import { CharStatus } from '@/store/utils'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import { SkeletonUtils } from 'three-stdlib'

// same url multiple GLTF instances
function useGltfMemo(url: string) {
  const gltf = useGLTF(url)
  const scene = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene])
  return { ...gltf, animations: [...gltf.animations], scene: scene }
}

export function Gltf(props: {
  status?: CharStatus
  statusToAnimation?: Record<string, CharStatus>
  uuid: string
  url: string
  animation?: string
}) {
  const { scene, animations } = useGltfMemo(props.url)
  SkeletonUtils.clone(scene)
  const { actions } = useAnimations(animations, scene)

  const store = useStore()
  useEffect(() => {
    store.updateNode(props.uuid, {
      actions,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, props.uuid])

  useEffect(() => {
    if (props.status === 'interact') {
      const name = Object.entries(props.statusToAnimation ?? {}).find(([, status]) => status === 'interact')?.[0]
      if (!name) return
      // when animation end return to idle
      const animation = actions?.[name]
      if (!animation) return
      const duration = animation.getClip()?.duration
      if (!duration) return
      setTimeout(() => {
        store.updateNode(props.uuid, { status: 'idle' })
      }, duration * 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.status, actions])

  useEffect(() => {
    const animation = Object.entries(props.statusToAnimation ?? {}).find(
      ([, status]) => status === (props?.status || 'idle'),
    )?.[0]

    if (!actions || !animation || !actions[animation]) return
    actions[animation]?.reset().fadeIn(0.2)?.play()
    return () => {
      if (!actions || !animation) return
      actions[animation]?.fadeOut(0.2)
    }
  }, [actions, props.status, props.statusToAnimation])

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
