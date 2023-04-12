import clsx from 'clsx'
import { useState } from 'react'

export function Upload(props: { onChange: (e: Blob, equirect: string) => void; value?: string; className?: string }) {
  const [file, setFile] = useState<string | null>(props.value ?? null)
  return (
    <div className={clsx('relative', props.className)}>
      <input
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return

          const reader = new FileReader()
          reader.onload = (e) => {
            const buffer = reader.result as ArrayBuffer
            const blob = new Blob([buffer], { type: 'application/octet-stream' })
            const url = URL.createObjectURL(blob)
            setFile(url)
            props.onChange(blob, url)
          }
          reader.readAsArrayBuffer(file)
          e.target.value = ''
        }}
        className="absolute left-0 top-0 h-full w-full opacity-0"
        type="file"
      />
      {file && <img className="h-full w-full object-fill" src={file} alt="" />}
    </div>
  )
}
