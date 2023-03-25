import { SceneType, useStore } from '@/store'
import clsx from 'clsx'
import { useState } from 'react'

export default function Editor() {
  const store = useStore()
  const [activeTab, setActiveTab] = useState(0)
  console.log(store.scene)
  return (
    <div className=' h-full w-full  border-l border-base-300 bg-base-200 '>
      <div className='tabs h-10 w-full bg-base-300'>
        <a
          className={clsx(' tab-lifted tab h-full  rounded-l  border-r border-black border-opacity-10', {
            'border-none bg-base-200': activeTab === 0,
            'rounded-none  bg-base-300': activeTab !== 0,
          })}
          onClick={() => setActiveTab(0)}>
          Scene
        </a>
        <a
          className={clsx(' tab-lifted tab h-full  border-r border-black border-opacity-10 ', {
            'border-none bg-base-200': activeTab === 1,
            'rounded-none  bg-base-300': activeTab !== 1,
          })}
          onClick={() => setActiveTab(1)}>
          Project
        </a>
        <a
          className={clsx(' tab-lifted tab h-full  rounded-r border-r   border-black border-opacity-10', {
            'border-none bg-base-200': activeTab === 2,
            'rounded-none  bg-base-300': activeTab !== 2,
          })}
          onClick={() => setActiveTab(2)}>
          Settings
        </a>
      </div>

      <div className='p-2'>
        <div className='label  mt-3 text-xs font-bold'>Scene Nodes</div>
        <div className='min-h-16 relative grid max-h-40  overflow-auto border bg-white'>
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
              className='label-text flex items-center px-4 py-1 text-left text-xs text-base-content  hover:bg-slate-100'
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

        <div className='label-text mt-3 grid items-center gap-4'>
          {store.scene?.type === 'color' ? (
            <input
              onChange={(evt) => {
                store.setScene({
                  ...store.scene,
                  color: evt.target.value,
                })
              }}
              type='color'
              className=' p-0 '
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
              className='p-0 file:rounded-none file:border '
            />
          )}
        </div>
      </div>
    </div>
  )
}
