import { useState } from 'react'
import { ObjectSettings } from '../settings/object'
import { SceneSettings } from '../settings/scene'

export default function Editor() {
  const [objectTab, setObjectTab] = useState(0)
  return (
    <div className=' h-screen w-full  overflow-auto  border-l border-base-300 bg-base-200 '>
      <SceneSettings />
      <ObjectSettings />
    </div>
  )
}
