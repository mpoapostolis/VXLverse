import { BoxGeometryProps } from '@react-three/fiber'
import { Vector3 } from 'three'
import { create } from 'zustand'

export const GRID_SIZE = 80
const WALL_HEIGHT = 40

type Instructions = {
  position: Vector3
  args: BoxGeometryProps['args']
}

export function createWalls(floor: Instructions) {
  if (!floor) return []
  const [planeWidth, planeDepth] = floor.args as Array<number>
  const cubeWidth = planeWidth / 4
  const cubeDepth = planeDepth / 4
  const halfPlaneX = planeWidth / 2
  const halfPlaneZ = planeDepth / 2

  const offsetX = (planeWidth - cubeWidth) / 2
  const offsetZ = (planeDepth - cubeDepth) / 2

  const [x, y, z] = floor.position.toArray().map((v) => v)

  const wallSide = Array(Math.ceil(planeWidth / cubeWidth)).fill(0)

  const wallsX = wallSide
    .map((_, i) => {
      const offX = i * cubeWidth
      return [
        {
          position: new Vector3().fromArray([offX + x - offsetX, WALL_HEIGHT / 4, z + halfPlaneZ]),
          args: [cubeWidth, WALL_HEIGHT / 2, 1] as BoxGeometryProps['args'],
        },
        {
          position: new Vector3().fromArray([offX + x - offsetX, WALL_HEIGHT / 4, z - halfPlaneZ]),
          args: [cubeWidth, WALL_HEIGHT / 2, 1] as BoxGeometryProps['args'],
        },
      ]
    })
    .flat()

  const wallsZ = wallSide
    .map((_, i) => {
      const offZ = i * cubeDepth
      return [
        {
          position: new Vector3().fromArray([
            x + planeWidth / 2,
            WALL_HEIGHT / 4,
            offZ + z - (planeDepth - cubeDepth) / 2,
          ]),
          args: [1, WALL_HEIGHT / 2, cubeDepth] as BoxGeometryProps['args'],
        },
        {
          position: new Vector3().fromArray([
            x - planeWidth / 2,
            WALL_HEIGHT / 4,
            offZ + z - (planeDepth - cubeDepth) / 2,
          ]),
          args: [1, WALL_HEIGHT / 2, cubeDepth] as BoxGeometryProps['args'],
        },
      ]
    })
    .flat()

  return [...wallsX, ...wallsZ]
}

export function createFloor(p1?: Vector3, p2?: Vector3) {
  const x1 = p1?.x ?? 0
  const x2 = p2?.x ?? 0
  const z1 = p1?.z ?? 0
  const z2 = p2?.z ?? 0

  return {
    position: new Vector3().fromArray([x1 + (x2 - x1) / 2, 0, z1 + (z2 - z1) / 2]),
    args: [Math.abs(x2 - x1), Math.abs(z2 - z1), 1] as BoxGeometryProps['args'],
  }
}

export function createRoom(p1?: Vector3, p2?: Vector3) {}

export type Room = {
  p1?: Vector3
  p2?: Vector3
}
export type Store = {
  walls: Instructions[]
  floors: Instructions[]
  addRoom: (room: Room) => void
}

export const useStore = create<Store>((set) => ({
  walls: [],
  floors: [],
  addRoom: (room) => {
    const floor = createFloor(room.p1, room.p2)
    const walls = createWalls(floor)
    set((state) => ({
      floors: [...state.floors, floor],
      walls: [...state.walls, ...walls],
    }))
  },
}))
