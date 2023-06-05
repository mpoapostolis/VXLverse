import { cn } from '@/lib/utils'
import clsx from 'clsx'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

export function Upload(props: {
  accept?: string
  onChange: (e?: Blob) => void
  value?: string
  className?: string
  name?: string
}) {
  const [file, setFile] = useState<string | null>(props.value ?? null)
  return (
    <div
      className={clsx('relative w-full h-full p-4  ', props.className, {
        'bg-black': file,
      })}
    >
      <input
        name={props.name}
        accept={props.accept}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          const reader = new FileReader()
          reader.onload = (e) => {
            const buffer = reader.result as ArrayBuffer
            const blob = new Blob([buffer], { type: 'application/octet-stream' })
            const url = URL.createObjectURL(blob)
            setFile(url)
            props.onChange(blob)
          }
          reader.readAsArrayBuffer(file)
          e.target.value = ''
        }}
        className="absolute left-0 top-0 h-full w-full opacity-0"
        type="file"
      />
      {!file && (
        <div className="absolute left-0 top-0 h-full w-full pointer-events-none flex items-center justify-center">
          <div className="text-center">
            <div className="text-sm font-medium ">Upload</div>
            <div className="text-xs ">
              .jpg, .png, .webp,
              <br />
              max 1mb
            </div>
          </div>
        </div>
      )}
      <div
        className={cn('absolute right-0 top-0  w-fit z-50 flex items-center justify-center', {
          hidden: !file,
        })}
      >
        <Button
          size="sm"
          onClick={() => {
            if (!file) return
            setFile(null)
            props.onChange(undefined)
          }}
          className=" text-xs"
          variant="destructive"
        >
          <TrashIcon className="mr-2 w-4 h-4" />
          <span>Delete</span>
        </Button>
      </div>
      {file && (
        <picture>
          <img className="h-full w-full object-scale-down" src={file} alt="" />
        </picture>
      )}
    </div>
  )
}
