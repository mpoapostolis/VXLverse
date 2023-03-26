import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei'
import { useMemo } from 'react'

export enum Controls {
  translate = 'translate',
  rotate = 'rotate',
  scale = 'scale',
  right = 'right',
  x = 'x',
}

export function KeyBoard(props: { children: React.ReactNode }) {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.translate, keys: ['KeyW'] },
      { name: Controls.rotate, keys: ['KeyE'] },
      { name: Controls.scale, keys: ['KeyR'] },
      { name: Controls.x, keys: ['KeyF'] },
    ],
    [],
  )
  return <KeyboardControls map={map}>{props.children}</KeyboardControls>
}
