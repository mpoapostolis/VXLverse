import { useStore } from '@/store'
import { useKeyboardControls } from '@react-three/drei'
import clsx from 'clsx'
import Image from 'next/image'
import { useEffect } from 'react'

export function Controls() {
  const store = useStore()
  const translate = useKeyboardControls((state) => state.translate)
  const rotate = useKeyboardControls((state) => state.rotate)
  const scale = useKeyboardControls((state) => state.scale)
  useEffect(() => {
    console.log({
      translate,
      rotate,
      scale,
    })
    if (translate) return store.setMode('translate')
    if (rotate) return store.setMode('rotate')
    if (scale) return store.setMode('scale')
  }, [rotate, translate, scale])

  return (
    <div className='absolute top-4 left-4 z-40 grid h-fit w-fit'>
      <button
        onClick={() => store.setMode('translate')}
        className={clsx('rounded-t border-b border-black border-opacity-10 bg-base-300 p-2 hover:bg-base-200', {
          'bg-base-100 hover:bg-base-100': store.mode === 'translate',
        })}>
        <Image width={16} height={16} src='/icons/translate.svg' alt='translate' />
      </button>

      <button
        onClick={() => store.setMode('rotate')}
        className={clsx('border-b border-black border-opacity-10 bg-base-300 p-2 hover:bg-base-200', {
          'bg-base-100 hover:bg-base-100': store.mode === 'rotate',
        })}>
        <Image width={16} height={16} src='/icons/rotate.svg' alt='rotate' />
      </button>
      <button
        onClick={() => store.setMode('scale')}
        className={clsx('rounded-b bg-base-300 p-2 hover:bg-base-200', {
          'bg-base-100 hover:bg-base-100': store.mode === 'scale',
        })}>
        <Image width={16} height={16} src='/icons/scale.svg' alt='scale' />
      </button>
    </div>
  )
}
