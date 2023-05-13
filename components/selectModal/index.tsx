'use client'

import { Badge } from '@/components/ui/badge'
import { Button, ButtonProps } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { MenubarShortcut } from '@/components/ui/menubar'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { GameType, gameTypes } from '@/store'
import { ContextMenu } from '@radix-ui/react-context-menu'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { Fragment, useState } from 'react'

export function SelectModal(props: {
  emptyMessage?: string
  children?: React.ReactNode
  size?: ButtonProps['size']

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
  const [filter, setFilter] = useState<GameType | undefined>()

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
        <Separator />

        <div className="grid lg:grid-cols-[200px_1fr]  gap-4">
          <div className="lg:grid inline-flex gap-2 lg:h-[75vh] overflow-auto pr-4  border-r">
            {gameTypes.map((type, i) => (
              <Button
                onClick={() => setFilter(filter === type ? undefined : type)}
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
          <div className="grid place-items-start bg-black bg-opacity-25  ">
            {props.options?.length === 0 && (
              <div className="text-center h-20 w-full grid place-items-center text-muted text-sm">
                <div>
                  {props.emptyMessage?.split('\\n').map((str, i) => (
                    <div key={i} className=" text-center ">
                      {str}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="grid   xl:grid-cols-4 h-[75vh] lg:h-full w-full 2xl:grid-cols-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 overflow-auto  max-h-[75vh]">
              {props.options
                ?.filter((opt) => {
                  if (!filter) return true
                  return opt.type === filter
                })

                ?.filter((opt) => {
                  if (!searchTerm) return true
                  return opt.label.toLowerCase().includes(searchTerm.toLowerCase())
                })
                ?.map((obj, i) => (
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
