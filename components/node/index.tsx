import { Node, NodeType, useStore } from '@/store'
import { TransformControls, useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { BoxHelper, Euler } from 'three'
import { Gltf } from '../gltf'
import { Light } from '../lights'
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
  // rotation degrees to rad
  const rotation = props.rotation
    ? new Euler(
        (props.rotation.x * Math.PI) / 180,
        (props.rotation.y * Math.PI) / 180,
        (props.rotation.z * Math.PI) / 180,
      )
    : new Euler(0, 0, 0)
  return (
    <TransformControls
      mode={store.mode}
      position={props.position ?? [0, 0, 0]}
      rotation={rotation}
      scale={props.scale ?? [0, 0, 0]}
      onMouseUp={(e) => {
        const obj = e?.target.object
        if (obj && props.uuid) {
          if (store.mode === 'translate')
            store.updateNode(props.uuid, {
              position: obj.position,
            })

          if (store.mode === 'rotate') {
            // rad to degress
            const rotation = new Euler(
              (obj.rotation.x * 180) / Math.PI,
              (obj.rotation.y * 180) / Math.PI,
              (obj.rotation.z * 180) / Math.PI,
            )
            store.updateNode(props.uuid, {
              rotation,
            })
          }

          if (store.mode === 'scale')
            store.updateNode(props.uuid, {
              scale: obj.scale,
            })
        }
      }}
      enabled={props.selected}
      showX={props.selected}
      showY={props.selected}
      showZ={props.selected}
    >
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
            }}
          >
            {props.url && props.uuid && props.type === 'GLTF' && (
              <Gltf key={props.url} animation={props.animation} uuid={props.uuid} url={props.url} />
            )}
            {props.type && props.type !== 'GLTF' && <MeshGeometry type={props.type} />}
            <meshStandardMaterial color={props.color} />
          </mesh>
        )}
      </>
    </TransformControls>
  )
}
