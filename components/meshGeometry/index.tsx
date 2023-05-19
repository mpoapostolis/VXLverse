import { NodeType } from '@/store'
import {
  BoxGeometryProps,
  CapsuleGeometryProps,
  CircleGeometryProps,
  CylinderGeometryProps,
  DodecahedronGeometryProps,
  IcosahedronGeometryProps,
  MeshProps,
  Object3DNode,
  OctahedronGeometryProps,
  PlaneGeometryProps,
  RingGeometryProps,
  SphereGeometryProps,
  TetrahedronGeometryProps,
  TorusGeometryProps,
  TorusKnotGeometryProps,
} from '@react-three/fiber'

type x = Object3DNode<MeshProps, BoxGeometryProps>

export function MeshGeometry(
  props:
    | (BoxGeometryProps & { type: NodeType })
    | (CapsuleGeometryProps & { type: NodeType })
    | (CircleGeometryProps & { type: NodeType })
    | (CylinderGeometryProps & { type: NodeType })
    | (DodecahedronGeometryProps & { type: NodeType })
    | (IcosahedronGeometryProps & { type: NodeType })
    | (OctahedronGeometryProps & { type: NodeType })
    | (PlaneGeometryProps & { type: NodeType })
    | (RingGeometryProps & { type: NodeType })
    | (SphereGeometryProps & { type: NodeType })
    | (TetrahedronGeometryProps & { type: NodeType })
    | (TorusGeometryProps & { type: NodeType })
    | (TorusKnotGeometryProps & { type: NodeType }),
) {
  const { type, ...rest } = props

  // Metal046B_1K_Color.jpg
  // Metal046B_1K_Displacement.jpg
  // Metal046B_1K_Metalness.jpg
  // Metal046B_1K_NormalDX.jpg
  // Metal046B_1K_NormalGL.jpg
  // Metal046B_1K_Roughness.jpg
  // load all as textures

  switch (props.type) {
    case 'Box':
      return <boxGeometry {...(rest as BoxGeometryProps)}></boxGeometry>
    case 'Capsule':
      return <capsuleGeometry {...(rest as CapsuleGeometryProps)}></capsuleGeometry>
    case 'Circle':
      return <circleGeometry {...(rest as CircleGeometryProps)}></circleGeometry>
    case 'Cylinder':
      return <cylinderGeometry {...(rest as CylinderGeometryProps)}></cylinderGeometry>
    case 'Dodecahedron':
      return <dodecahedronGeometry {...(rest as DodecahedronGeometryProps)}></dodecahedronGeometry>
    case 'Icosahedron':
      return <icosahedronGeometry {...(rest as IcosahedronGeometryProps)}></icosahedronGeometry>
    case 'Octahedron':
      return <octahedronGeometry {...(rest as OctahedronGeometryProps)}></octahedronGeometry>
    case 'Plane':
      return <planeGeometry {...(rest as PlaneGeometryProps)}></planeGeometry>
    case 'Ring':
      return <ringGeometry {...(rest as RingGeometryProps)}></ringGeometry>
    case 'Sphere':
      return <sphereGeometry {...(rest as SphereGeometryProps)}></sphereGeometry>

    case 'Tetrahedron':
      return <tetrahedronGeometry {...(rest as TetrahedronGeometryProps)}></tetrahedronGeometry>
    case 'Torus':
      return <torusGeometry {...(rest as TorusGeometryProps)}></torusGeometry>
    case 'TorusKnot':
      return <torusKnotGeometry {...(rest as TorusKnotGeometryProps)}></torusKnotGeometry>

    default:
      return null
  }
}
