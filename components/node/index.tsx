import { Gltf } from '@/components/gltf'
import { Light } from '@/components/lights'
import { MeshGeometry } from '@/components/meshGeometry'
import { Node, NodeMaterial, NodeType, useStore } from '@/store'
import { Html, TransformControls, useHelper, useTexture } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { BoxHelper, Euler, Vector3 } from 'three'

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

  let textureMap: NodeMaterial = {}
  if (props.material?.map) textureMap.map = props.material.map
  if (props.material?.displacement) textureMap.displacement = props.material.displacement
  if (props.material?.metalness) textureMap.metalness = props.material.metalness
  if (props.material?.normal) textureMap.normal = props.material.normal
  if (props.material?.roughness) textureMap.roughness = props.material.roughness

  const objMap = useTexture<{
    map?: string
    displacement?: string
    metalness?: string
    normal?: string
    roughness?: string
  }>(textureMap)

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
            onClick={() => {
              props.uuid && store.selectNode(props.uuid)
            }}
          >
            <Suspense
              fallback={
                <Html>
                  <div
                    className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-primary rounded-full"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </Html>
              }
            >
              {props.url && props.uuid && props.type === 'GLTF' && (
                <Gltf key={props.url} animation={props.animation} uuid={props.uuid} url={props.url} />
              )}
            </Suspense>
            {props.type && props.type !== 'GLTF' && <MeshGeometry type={props.type} />}

            <meshStandardMaterial
              map={objMap.map}
              metalnessMap={objMap?.metalness ?? undefined}
              normalMap={objMap?.normal ?? undefined}
              roughnessMap={objMap?.roughness ?? undefined}
              color={props.color}
            />
          </mesh>
        )}
      </>
    </TransformControls>
  )
}
