import { useStore } from '@/store'
import { Mesh, Vector3 } from 'three'
import { DropDown } from '../dropdown'

export type Geometry =
  | 'Group'
  | 'Box'
  | 'Capsule'
  | 'Circle'
  | 'Cylinder'
  | 'Dodecahedron'
  | 'Icosahedron'
  | 'Lathe'
  | 'Octahedron'
  | 'Plane'
  | 'Ring'
  | 'Sphere'
  | 'Sprite'
  | 'Tetrahedron'
  | 'Torus'
  | 'TorusKnot'
  | 'Tube'
  | 'AmbientLight'
  | 'DirectionalLight'
  | 'HemisphereLight'
  | 'PointLight'
  | 'SpotLight'
  | 'OrthographicCamera'
  | 'PerspectiveCamera'

export const geometries = [
  'Group',
  '.', // separator
  'Box',
  'Capsule',
  'Circle',
  'Cylinder',
  'Dodecahedron',
  'Icosahedron',
  'Lathe',
  'Octahedron',
  'Plane',
  'Ring',
  'Sphere',
  'Sprite',
  'Tetrahedron',
  'Torus',
  'TorusKnot',
  'Tube',
  '.',
  'AmbientLight',
  'DirectionalLight',
  'HemisphereLight',
  'PointLight',
  'SpotLight',
  '.',
  'OrthographicCamera',
  'PerspectiveCamera',
]

export default function Menu() {
  const store = useStore()
  return (
    <div className='flex h-6 w-full  items-center  gap-4 border-b border-base-300  bg-base-200 p-4 text-sm text-base-content'>
      <DropDown label='File' items={['New', '.', 'Import', '.', 'Publish']} onChange={console.log} />
      <DropDown
        label='Add'
        items={geometries}
        onChange={(type) => {
          const mesh = new Mesh()
          store.addNode({
            ...mesh,
            position: new Vector3(2, 3, 4),
            type,
          })
        }}
      />

      <button>Play</button>
    </div>
  )
}
