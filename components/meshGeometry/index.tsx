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
import { Geometry } from '../menu'

type x = Object3DNode<MeshProps, BoxGeometryProps>

export function MeshGeometry(
  props:
    | (BoxGeometryProps & { type: Geometry })
    | (CapsuleGeometryProps & { type: Geometry })
    | (CircleGeometryProps & { type: Geometry })
    | (CylinderGeometryProps & { type: Geometry })
    | (DodecahedronGeometryProps & { type: Geometry })
    | (IcosahedronGeometryProps & { type: Geometry })
    | (OctahedronGeometryProps & { type: Geometry })
    | (PlaneGeometryProps & { type: Geometry })
    | (RingGeometryProps & { type: Geometry })
    | (SphereGeometryProps & { type: Geometry })
    | (TetrahedronGeometryProps & { type: Geometry })
    | (TorusGeometryProps & { type: Geometry })
    | (TorusKnotGeometryProps & { type: Geometry }),
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
