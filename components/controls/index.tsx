import { useStore } from '@/store'
import clsx from 'clsx'
import Image from 'next/image'

export function Controls() {
  const store = useStore()
  return (
    <div className='absolute top-4 left-4 z-40 grid h-fit w-fit'>
      <button
        onClick={() => store.setMode('translate')}
        className={clsx('rounded-t border-b border-black border-opacity-10  p-2', {
          'bg-base-300 hover:bg-base-100': store.mode !== 'translate',
          'bg-base-100 hover:bg-base-100': store.mode === 'translate',
        })}>
        <Image width={16} height={16} src='/icons/translate.svg' alt='translate' />
      </button>

      <button
        onClick={() => store.setMode('rotate')}
        className={clsx('border-b border-black border-opacity-10  p-2', {
          'bg-base-300 hover:bg-base-100': store.mode !== 'rotate',
          'bg-base-100 hover:bg-base-100': store.mode === 'rotate',
        })}>
        <Image width={16} height={16} src='/icons/rotate.svg' alt='rotate' />
      </button>
      <button
        onClick={() => store.setMode('scale')}
        className={clsx('rounded-b border-b border-black border-opacity-10  p-2', {
          'bg-base-300 hover:bg-base-100': store.mode !== 'scale',
          'bg-base-100 hover:bg-base-100': store.mode === 'scale',
        })}>
        <Image width={16} height={16} src='/icons/scale.svg' alt='scale' />
      </button>
    </div>
  )
}
