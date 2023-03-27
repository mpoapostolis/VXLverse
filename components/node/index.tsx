import { Node, useStore } from '@/store'
import { TransformControls, useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { BoxHelper } from 'three'
import { Gltf } from '../gltf'
import { Light } from '../lights'
import { NodeType } from '../menu'
import { MeshGeometry } from '../meshGeometry'

export const lights: any[] = ['AmbientLight', 'DirectionalLight', 'HemisphereLight', 'PointLight', 'SpotLight']

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
      <>
        {lights.includes(props.type) ? (
          <Light type={props.type as NodeType} />
        ) : (
          <mesh
            castShadow
            receiveShadow
            ref={ref}
            onClick={() => {
              props.uuid && store.selectNode(props.uuid)
            }}>
            {props.object && props.type === 'GLTF' && <Gltf url={props.object} />}
            {props.type && props.type !== 'GLTF' && <MeshGeometry type={props.type} />}
            <meshStandardMaterial color={'red'} />
          </mesh>
        )}
      </>
    </TransformControls>
  )
}
