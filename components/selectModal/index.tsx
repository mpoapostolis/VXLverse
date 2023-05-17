'use client'

import { Badge } from '@/components/ui/badge'
import { Button, ButtonProps } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { MenubarShortcut } from '@/components/ui/menubar'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ContextMenu } from '@radix-ui/react-context-menu'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { Fragment, useState } from 'react'

export function SelectModal(props: {
  emptyMessage?: string
  children?: React.ReactNode
  size?: ButtonProps['size']
  filters?: string[]
  multiple?: boolean
  options?: {
    label: string
    value: string
    src: string
    type?: string
  }[]
  onChange: (id?: string) => void
  value?: string | string[]
}) {
  const Comp = props.multiple ? Fragment : DialogTrigger
  const label =
    typeof props.value === 'object'
      ? props.options
          ?.filter((opt) => props.value?.includes(opt.value))
          .map((opt) => opt.label)
          .join(', ')
      : props.options?.find((opt) => {
          if (!props.value) return false
          return opt.value === props.value || opt.src === props.value
        })?.label
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<string | undefined>()
  const emptyMessage = props.emptyMessage ?? `No ${filter ?? 'items'} found\\n🤷‍♂️ `
  const options = props.options
    ?.filter((opt) => {
      if (!filter) return true
      return opt.type === filter
    })

    ?.filter((opt) => {
      if (!searchTerm) return true
      return opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    })

  return (
    <Dialog onOpenChange={() => setSearchTerm('')}>
      <ContextMenu>
        <DialogTrigger asChild>
          {props.children ?? (
            <Button className="w-full truncate" size={props.size}>
              <span className="truncate">{label ?? 'Select'}</span>
              <MenubarShortcut>
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </MenubarShortcut>
            </Button>
          )}
        </DialogTrigger>
      </ContextMenu>
      <DialogContent className="lg:w-[80vw] z-50 w-screen ">
        <DialogHeader>
          <Input
            value={searchTerm}
            onChange={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setSearchTerm(e.target.value)
            }}
            type="search"
            className="  w-full  px-4 placeholder:text-muted  duration-100 py-4"
            placeholder="🔍 Search..."
          />
        </DialogHeader>
        <Separator className="my-4" />

        <div
          className={cn('grid   gap-4', {
            'lg:grid-cols-[200px_1fr]': props.filters,
          })}
        >
          <div
            className={cn('lg:grid inline-flex gap-2 lg:h-[75vh] overflow-auto pr-4  border-r', {
              'lg:hidden hidden': !props.filters,
            })}
          >
            <Button
              onClick={() => setFilter(undefined)}
              variant="outline"
              className={cn(
                'text-xs  w-fit lg:w-full text-left hover:bg-transparent hover:text-card-foreground hover:border-secondary ',
              )}
            >
              All
            </Button>
            {props.filters?.map((type, i) => (
              <Button
                onClick={() => setFilter(type)}
                variant="outline"
                className={cn(
                  'text-xs  w-fit lg:w-full text-left hover:bg-transparent hover:text-card-foreground hover:border-secondary ',
                  {
                    'border-secondary': type === filter,
                  },
                )}
                key={type}
              >
                {type}
              </Button>
            ))}
          </div>
          <div className="grid place-items-start  h-[75vh]  overflow-auto  bg-black bg-opacity-25  ">
            {options?.length === 0 ? (
              <div className="text-center  h-full   w-full grid place-items-center text-muted text-sm">
                <div>
                  {emptyMessage?.split('\\n').map((str, i) => (
                    <div key={i} className=" text-center ">
                      {str}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="grid p-3    h-full xl:grid-cols-4 w-full 2xl:grid-cols-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 overflow-auto">
                  {options?.map((obj, i) => (
                    <Comp key={obj.value}>
                      <div
                        onClick={() => {
                          props.onChange(obj.value)
                        }}
                        className={cn('relative cursor-pointer duration-200  h-48')}
                      >
                        <picture>
                          <img
                            loading="lazy"
                            src={obj.src ? `${obj.src}?thumb=190x190` : '/images/placeholder.png'}
                            alt="preview"
                            className="rounded-md w-full h-full object-scale-down bg-black "
                          />
                        </picture>
                        <Label
                          className={cn(
                            'px-2 bg-opacity-60 flex items-center justify-center  absolute text-xs top-0 py-2 left-0 w-full bg-black ',
                            {
                              'border-2 border-secondary bg-black items-start bg-opacity-70 h-full w-full ':
                                props.value?.includes(obj.value),
                            },
                          )}
                        >
                          <Badge variant="secondary" className="w-fit">
                            {obj.label}
                          </Badge>
                        </Label>
                      </div>
                    </Comp>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
