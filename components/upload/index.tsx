import clsx from 'clsx'
import { useState } from 'react'

export function Upload(props: { onChange: (e: string) => void; className?: string }) {
  const [file, setFile] = useState<string | null>(null)
  return (
    <div className={clsx('relative', props.className)}>
      <input
        onChange={(evt) => {
          const file = evt?.target?.files?.[0]
          if (!file) return
          const url = URL.createObjectURL(file)
          setFile(url)
          props.onChange(url)
        }}
        className='absolute top-0 left-0 h-full w-full opacity-0'
        type='file'
      />
      {file && <img className='h-full w-full object-fill' src={file} alt='' />}
    </div>
  )
}
