import { Gltf } from '@/components/gltf'
import { MeshGeometry } from '@/components/meshGeometry'
import { Node, useStore } from '@/store'
import { RigidBody } from '@react-three/rapier'
import { Suspense, useRef } from 'react'
import { Euler, Mesh, Vector3 } from 'three'
import { Loader } from '../loader'
import { Material } from '../material'

export function GameNode(props: Partial<Node>) {
  const store = useStore()
  const ref = useRef<Mesh>(null)

  const rotation = new Euler(...(props.rotation?.map((r) => (r * Math.PI) / 180) ?? [0, 0, 0]))
  const position = new Vector3(...(props.position ?? [0, 0, 0]))
  const scale = new Vector3(...(props.scale ?? [0, 0, 0]))

  const invHas = (item: string) => store.inventory.includes(item)
  const isCollected = store.inventory.includes(props.uuid ?? '')
  const doIHaveTheReqItems = props.showWhenInventoryHas?.every(invHas) ?? true
  const isVisible = doIHaveTheReqItems && !isCollected

  return (
    <Suspense fallback={null}>
      <RigidBody rotation={rotation} scale={scale} position={position} type={props.physics}>
        <mesh
          onClick={() => {
            if (!props.uuid || !isVisible) return
            const doIHaveInteract = Object.entries(props.statusToAnimation ?? {}).find(
              ([, status]) => status === 'interact',
            )

            if (doIHaveInteract) store.updateNode(props.uuid, { status: 'interact' })
            if (props.collectable) store.addToInventory(props.uuid)
            const quest = store?.quests?.find((quest) => quest.nodeId === props.uuid && quest.status === 'incomplete')
            if (quest) store.setSelectedQuest(quest.uuid)
          }}
          type={props.gameType}
          visible={isVisible}
          ref={ref}
        >
          {props.url && props.uuid && props.type === 'GLTF' && (
            <Gltf statusToAnimation={props.statusToAnimation} status={props.status} uuid={props.uuid} url={props.url} />
          )}
          {props.type && props.type !== 'GLTF' && <MeshGeometry type={props.type} />}

          <Suspense fallback={<Loader />}>
            <Material material={props.material} color={props.color} />
          </Suspense>
        </mesh>
      </RigidBody>
    </Suspense>
  )
}
