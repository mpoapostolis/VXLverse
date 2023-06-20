import { cn } from '@/lib/utils'
import clsx from 'clsx'
import { TrashIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '../ui/button'

export function Upload(props: {
  accept?: string
  onChange: (e?: Blob) => void
  value?: string
  className?: string
  name?: string
  required?: boolean
}) {
  const [file, setFile] = useState<string | null>(props.value ?? null)
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div
      tabIndex={-1}
      className={clsx('relative cursor-pointer w-full p-4 h-60', props.className, {
        'bg-black': file,
      })}
    >
      <input
        name={props.name}
        accept={props.accept}
        ref={ref}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          const size = file.size / 1024 / 1024
          // max 2mb
          if (size > 2) {
            alert('File size is too big')
            return
          }
          const reader = new FileReader()
          reader.onload = (e) => {
            const buffer = reader.result as ArrayBuffer
            const blob = new Blob([buffer], { type: 'application/octet-stream' })
            const url = URL.createObjectURL(blob)
            setFile(url)
            props.onChange(blob)
          }
          reader.readAsArrayBuffer(file)
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
              max 2MB
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
          type="button"
          size="sm"
          onClick={() => {
            if (!file) return
            setFile(null)
            props.onChange(undefined)
            ref.current?.value && (ref.current.value = '')
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
