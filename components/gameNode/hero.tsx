import { Gltf } from '@/components/gltf'
import { Node, useStore } from '@/store'
import { useFrame } from '@react-three/fiber'
import { RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier'
import { Suspense, useEffect, useRef } from 'react'
import { Euler, Mesh, Quaternion, Vector3 } from 'three'

export function Hero(props: Partial<Node>) {
  const store = useStore()
  const ref = useRef<Mesh>(null)

  const rotation = new Euler(...(props.rotation?.map((r) => (r * Math.PI) / 180) ?? [0, 0, 0]))
  const position = new Vector3(...(props.position ?? [0, 0, 0]))
  const scale = new Vector3(...(props.scale ?? [0, 0, 0]))

  const rigidBody = useRef<RapierRigidBody>(null)

  const rb = rigidBody?.current

  const goTo = store.goTo
  const gameType = props.gameType
  const pos = vec3(rb?.translation())

  useFrame((t) => {
    const pos = vec3(rb?.translation())
    const newPos = new Vector3(pos.x, pos.y + 5, pos.z)
    // @ts-ignore
    t?.controls?.target?.copy(newPos)
  })

  useEffect(() => {
    if (!rb) return
    if (!goTo) {
      rb.setLinvel({ x: 0, y: 0, z: 0 }, true)
      return
    }
    const angle = Math.atan2(goTo.x - pos.x, goTo.z - pos.z)
    const q = new Quaternion()
    const quat = q.setFromAxisAngle(new Vector3(0, 1, 0), angle)

    rb.setRotation(quat, true)

    const distX = goTo.x - pos.x
    const distZ = goTo.z - pos.z
    // Calculate the distance
    const dist = Math.sqrt(distX * distX + distZ * distZ)

    // Calculate the normalized direction vector
    const dirX = distX / dist
    const dirZ = distZ / dist
    const speed = 5
    rb.setLinvel(
      {
        x: dirX * speed,
        y: 0,
        z: dirZ * speed,
      },
      true,
    )
  }, [goTo, rb, gameType, pos])

  const invHas = (item: string) => store.inventory.includes(item)
  const isCollected = store.inventory.includes(props.uuid ?? '')
  const doIHaveTheReqItems = props.showWhenInventoryHas?.every(invHas) ?? true
  const isVisible = doIHaveTheReqItems && !isCollected

  return (
    <Suspense fallback={null}>
      <RigidBody
        ref={rigidBody}
        rotation={rotation}
        scale={scale}
        name={props.gameType}
        position={position}
        colliders="cuboid"
        type={'kinematicVelocity'}
        onCollisionEnter={(t) => {
          rb?.setLinvel({ x: 0, y: 0, z: 0 }, true)
          store.updateNode(props.uuid!, { status: 'idle' })
          store.setGoTo(undefined)
        }}
      >
        <mesh name={props.gameType} type={props.gameType} visible={isVisible} ref={ref}>
          <Gltf statusToAnimation={props.statusToAnimation} status={props.status} uuid={props.uuid!} url={props.url!} />
        </mesh>
      </RigidBody>
    </Suspense>
  )
}
