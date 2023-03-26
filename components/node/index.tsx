import { Node, useStore } from '@/store'
import { TransformControls, useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { BoxHelper } from 'three'
import { Gltf } from '../gltf'
import { MeshGeometry } from '../meshGeometry'

export function Node(
  props: Partial<Node> & {
    selected: boolean
  },
) {
  const store = useStore()
  const ref = useRef(null)
  useHelper(props.selected && ref.current && ref, BoxHelper, 'yellow')
  return (
    <TransformControls
      mode={store.mode}
      enabled={props.selected}
      showX={props.selected}
      showY={props.selected}
      showZ={props.selected}>
      <mesh
        ref={ref}
        onClick={() => {
          props.uuid && store.selectNode(props.uuid)
        }}>
        {props.type === 'GLTF' && props.object ? (
          <Gltf url={props.object} />
        ) : (
          props.type && <MeshGeometry type={props.type} />
        )}
      </mesh>
    </TransformControls>
  )
}
