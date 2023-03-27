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
import { NodeType } from '../menu'

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

  switch (props.type) {
    case 'Box':
      return <boxGeometry {...(rest as BoxGeometryProps)} />
    case 'Capsule':
      return <capsuleGeometry {...(rest as CapsuleGeometryProps)} />
    case 'Circle':
      return <circleGeometry {...(rest as CircleGeometryProps)} />
    case 'Cylinder':
      return <cylinderGeometry {...(rest as CylinderGeometryProps)} />
    case 'Dodecahedron':
      return <dodecahedronGeometry {...(rest as DodecahedronGeometryProps)} />
    case 'Icosahedron':
      return <icosahedronGeometry {...(rest as IcosahedronGeometryProps)} />
    case 'Octahedron':
      return <octahedronGeometry {...(rest as OctahedronGeometryProps)} />
    case 'Plane':
      return <planeGeometry {...(rest as PlaneGeometryProps)} />
    case 'Ring':
      return <ringGeometry {...(rest as RingGeometryProps)} />
    case 'Sphere':
      return <sphereGeometry {...(rest as SphereGeometryProps)} />

    case 'Tetrahedron':
      return <tetrahedronGeometry {...(rest as TetrahedronGeometryProps)} />
    case 'Torus':
      return <torusGeometry {...(rest as TorusGeometryProps)} />
    case 'TorusKnot':
      return <torusKnotGeometry {...(rest as TorusKnotGeometryProps)} />

    default:
      return null
  }
}
