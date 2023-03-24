import { Box } from '@react-three/drei'
import { MeshProps } from '@react-three/fiber'
import { Geometry } from '../menu'

function Geom(props: MeshProps & { item: Geometry }) {
  switch (props.item) {
    case 'Box':
      return <boxGeometry args={[1, 1, 1]} />
    case 'Capsule':
      return <capsuleGeometry args={[1, 1, 1]} />
    case 'Circle':
      return <circleGeometry args={[1, 1, 1]} />
    case 'Cylinder':
      return <cylinderGeometry args={[1, 1, 1]} />
    case 'Dodecahedron':
      return <dodecahedronGeometry args={[1, 1]} />
    case 'Icosahedron':
      return <icosahedronGeometry args={[1, 1]} />
    case 'Octahedron':
      return <octahedronGeometry args={[1, 1]} />
    case 'Plane':
      return <planeGeometry args={[1, 1, 1]} />
    case 'Ring':
      return <ringGeometry args={[1, 1, 1]} />
    case 'Sphere':
      return <sphereGeometry args={[1, 1, 1]} />
    case 'Tetrahedron':
      return <tetrahedronGeometry args={[1, 1]} />
    case 'Torus':
      return <torusGeometry args={[1, 1, 1]} />
    case 'TorusKnot':
      return <torusKnotGeometry args={[1, 1, 1]} />
    default:
      break
  }
  return null
}

export function MeshGeometry(props: MeshProps & { item: Geometry }) {
  const X = Box
  return <X />
}
