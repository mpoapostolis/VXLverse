import { useStore } from '@/store'
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
  const selectedTile = store.tiles.find((tile) => tile.id === store.selectedTile)
  return (
    <div className='flex h-6  w-full  items-center border-b border-base-300  bg-base-200 p-4 text-sm text-base-content'>
      <DropDown label='File' items={['New', '.', 'Import', '.', 'Publish']} onChange={console.log} />
      <DropDown
        label='Add'
        items={geometries}
        onChange={(type) => {
          console.log(type)
          store.addNode({
            type,
          })
        }}
      />

      <button className='tab'>Play</button>
    </div>
  )
}
