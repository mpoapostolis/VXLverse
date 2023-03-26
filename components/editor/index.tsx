import { useState } from 'react'
import { ObjectSettings } from '../settings/object'
import { SceneSettings } from '../settings/scene'
import { Tabs } from '../tabs'

export default function Editor() {
  const [activeTab, setActiveTab] = useState(0)
  const [objectTab, setObjectTab] = useState(0)
  return (
    <div className=' h-full  w-full  border-l border-base-300 bg-base-200 '>
      <Tabs activeTab={activeTab} tabs={['Scene', 'Project', 'Settings']} onChange={setActiveTab} />
      <SceneSettings />
      <Tabs
        className='my-3 border-t border-black border-opacity-10'
        activeTab={objectTab}
        tabs={['Object', 'Material', 'Properties']}
        onChange={setObjectTab}
      />

      <ObjectSettings />
    </div>
  )
}
