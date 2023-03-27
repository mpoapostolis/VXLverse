import { SceneType, useStore } from '@/store'
import clsx from 'clsx'

export function SceneSettings() {
  const store = useStore()
  return (
    <div className='p-2'>
      <div className='label  text-xs font-bold'>Scene Nodes</div>
      <div className='relative h-40  overflow-auto border bg-white'>
        <div
          className={clsx('absolute  h-full w-full text-xs', {
            hidden: store.nodes.length > 0,
          })}>
          <label className='flex h-full w-full items-center justify-center text-slate-400'>
            Nodes will display here
          </label>
        </div>
        {store.nodes.map((node, idx) => (
          <button
            onClick={() => store.selectNode(node.uuid)}
            className={clsx(
              'label-text flex w-full items-center border-b px-4 py-1 text-left text-xs text-base-content  hover:bg-slate-100',
              {
                'bg-yellow-100': `${node?.uuid}` === store.selectedNode,
              },
            )}
            key={idx}>
            <span className='mr-2 inline-block h-1.5 w-1.5 rounded-full bg-red-300' />
            <span>{node?.name === '' ? node.type : node?.name} </span>
          </button>
        ))}
      </div>

      <div className='label  mt-3 text-xs font-bold'>Scene background type</div>
      <select
        onChange={(evt) => {
          const type = evt.target.value as SceneType
          store.setScene({
            ...store.scene,
            equirect: type === 'equirect' ? store.scene?.equirect : undefined,
            color: type === 'color' ? '#999' : undefined,
            type,
          })
        }}
        className='label-text select select-xs w-full'>
        <option value='color'>Color</option>
        <option value='equirect'>Equirect</option>
      </select>

      {/* <div className='label-text mt-3 grid items-center gap-4'>
        {store.scene?.type === 'color' ? (
          <input
            onChange={(evt) => {
              store.setScene({
                ...store.scene,
                color: evt.target.value,
              })
            }}
            type='color'
            className=' p-0'
          />
        ) : (
          <input
            onChange={(evt) => {
              const file = evt.target?.files?.[0]
              store.setScene({
                ...store.scene,
                equirect: file ? URL.createObjectURL(file) : undefined,
              })
            }}
            type='file'
            className='p-0 file:rounded-none file:border'
          />
        )}
      </div> */}
    </div>
  )
}
