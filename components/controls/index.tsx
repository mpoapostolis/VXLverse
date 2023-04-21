import { useStore } from '@/store'
import clsx from 'clsx'

export function Controls() {
  const store = useStore()
  return (
    <div className="absolute left-3 top-3  z-10 grid h-fit w-fit">
      <button
        onClick={() => store.setMode('translate')}
        className={clsx('border-b border-black border-opacity-10  p-2', {
          'bg-card ': store.mode !== 'translate',
          'bg-secondary ': store.mode === 'translate',
        })}
      >
        <picture>
          <img className="h-4 w-4" src="/icons/translate.svg" alt="translate" />
        </picture>
      </button>

      <button
        onClick={() => store.setMode('rotate')}
        className={clsx('border-b border-black border-opacity-10  p-2', {
          'bg-card ': store.mode !== 'rotate',
          'bg-secondary': store.mode === 'rotate',
        })}
      >
        <picture>
          <img className="h-4 w-4" src="/icons/rotate.svg" alt="rotate" />
        </picture>
      </button>
      <button
        onClick={() => store.setMode('scale')}
        className={clsx('border-b border-black border-opacity-10  p-2', {
          'bg-card ': store.mode !== 'scale',
          'bg-secondary': store.mode === 'scale',
        })}
      >
        <picture>
          <img className="h-4 w-4" src="/icons/scale.svg" alt="scale" />
        </picture>
      </button>
    </div>
  )
}
