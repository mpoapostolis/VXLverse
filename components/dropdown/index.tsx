import { useStore } from '@/store'
import { Mesh, Vector3 } from 'three'
import { NodeType } from '../menu'

export function DropDown(props: { items: string[]; label: string; onChange: (value: string) => void }) {
  const store = useStore()
  return (
    <button className='hover-trigger relative h-10  border'>
      {props.label}
      <div className='hover-target absolute top-9 -left-4 z-50  w-40 border border-base-300 bg-base-200 text-xs  '>
        {props.items.map((item, idx) =>
          item === '.' ? (
            <div key={idx} className=' w-full border-b border-base-300' />
          ) : (
            <div
              key={idx}
              className='relative cursor-pointer p-2 pl-4 text-left  hover:bg-base-300'
              onClick={() => item !== 'Import' && props.onChange(item as NodeType)}>
              {item === 'Import' && (
                <input
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    const reader = new FileReader()
                    reader.onload = (e) => {
                      const buffer = reader.result as ArrayBuffer
                      const blob = new Blob([buffer], { type: 'application/octet-stream' })
                      const mesh = new Mesh()
                      store.addNode({
                        ...mesh,
                        url: URL.createObjectURL(blob),
                        blob,
                        name: file.name,
                        position: new Vector3(2, 3, 4),
                        type: 'GLTF',
                      })
                    }
                    reader.readAsArrayBuffer(file)

                    e.target.value = ''
                  }}
                  type='file'
                  className='absolute top-0 left-0 h-full w-full opacity-0'
                />
              )}
              {item}
            </div>
          ),
        )}
      </div>
    </button>
  )
}
