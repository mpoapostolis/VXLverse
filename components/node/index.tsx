import { Gltf } from '@/components/gltf'
import { Light } from '@/components/lights'
import { MeshGeometry } from '@/components/meshGeometry'
import { Node, NodeType, useStore } from '@/store'
import { TransformControls, useHelper } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { BoxHelper, Euler, Vector3 } from 'three'
import { Loader } from '../loader'
import { Material } from '../material'

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

  const rotation = new Euler(...(props.rotation?.map((r) => (r * Math.PI) / 180) ?? [0, 0, 0]))
  const position = new Vector3(...(props.position ?? [0, 0, 0]))
  const scale = new Vector3(...(props.scale ?? [0, 0, 0]))

  return (
    <TransformControls
      mode={store.mode}
      position={position}
      rotation={rotation}
      scale={scale}
      onMouseUp={(e) => {
        const obj = e?.target.object
        if (obj && props.uuid) {
          if (store.mode === 'translate') {
            const { x, y, z } = obj.position
            store.updateNode(props.uuid, {
              position: [x, y, z],
            })
          }

          if (store.mode === 'rotate') {
            const { x, y, z } = obj.rotation

            // rad to degress
            const rotation = [x, y, z].map((r) => (r * 180) / Math.PI)

            store.updateNode(props.uuid, {
              rotation,
            })
          }

          if (store.mode === 'scale') {
            const { x, y, z } = obj.scale

            store.updateNode(props.uuid, {
              scale: [x, y, z],
            })
          }
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
            onClick={(evt) => {
              evt.stopPropagation()
              props.uuid && store.selectNode(props.uuid)
            }}
          >
            <Suspense fallback={<Loader />}>
              {props.url && props.uuid && props.type === 'GLTF' && (
                <Gltf key={props.url} animation={props.animation} uuid={props.uuid} url={props.url} />
              )}
            </Suspense>
            {props.type && props.type !== 'GLTF' && <MeshGeometry type={props.type} />}
            <Suspense fallback={<Loader />}>
              <Material key={props.material?.map} material={props.material} color={props.color} />
            </Suspense>
          </mesh>
        )}
      </>
    </TransformControls>
  )
}
