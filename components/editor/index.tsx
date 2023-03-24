import { useStore } from '@/store'
import clsx from 'clsx'
import { useState } from 'react'

export default function Editor() {
  const store = useStore()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className=' h-full w-full  border-l border-base-300 bg-base-200 '>
      <div className='tabs h-10 w-full bg-base-300'>
        <a
          className={clsx(' tab-lifted tab h-full  border-r  border-black border-opacity-10', {
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
          className={clsx(' tab-lifted tab h-full  border-r   border-black border-opacity-10', {
            'border-none bg-base-200': activeTab === 2,
            'rounded-none  bg-base-300': activeTab !== 2,
          })}
          onClick={() => setActiveTab(2)}>
          Settings
        </a>
      </div>
    </div>
  )
}
