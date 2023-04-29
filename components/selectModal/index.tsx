import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { ContextMenu } from '@radix-ui/react-context-menu'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { Fragment } from 'react'
import { Button, ButtonProps } from '../ui/button'
import { Input } from '../ui/input'
import { MenubarShortcut } from '../ui/menubar'
import { Separator } from '../ui/separator'

export function SelectModal<T = string>(props: {
  size?: ButtonProps['size']
  children?: React.ReactNode
  multiple?: boolean
  options?: {
    label: string
    value: string
    src: string
  }[]
  onChange: (id?: T) => void
  value?: string | string[]
}) {
  const Comp = props.multiple ? Fragment : DialogTrigger
  const label =
    typeof props.value === 'object'
      ? props.options
          ?.filter((opt) => props.value?.includes(opt.value))
          .map((opt) => opt.label)
          .join(', ')
      : props.options?.find((opt) => opt.value === props.value || opt.src === props.value)?.label
  return (
    <Dialog>
      <ContextMenu>
        <DialogTrigger asChild>
          <Button className="w-full truncate" size={props.size}>
            <span className="truncate">{label ?? 'Select'}</span>
            <MenubarShortcut>
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </MenubarShortcut>
          </Button>
        </DialogTrigger>
      </ContextMenu>
      <DialogContent className="lg:w-[80vw] z-50 w-screen ">
        <DialogHeader>
          <Input
            type="search"
            className="  w-full  px-4 placeholder:text-muted  duration-100 py-4"
            placeholder="🔍 Search..."
          />
        </DialogHeader>
        <Separator />
        <div className="grid ">
          <div className="grid xl:grid-cols-4 2xl:grid-cols-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 overflow-auto max-h-[75vh]">
            {props.options?.map((obj, i) => (
              <Comp key={i}>
                <div
                  onClick={() => {
                    props.onChange(obj.value as T)
                  }}
                  className={cn('relative h-48 hover:border-2 border-secondary', {
                    'border-2 border-dashed border-secondary': props.value?.includes(obj.value),
                  })}
                >
                  <picture>
                    <img
                      src={obj.src ? obj.src : '/images/placeholder.png'}
                      alt="preview"
                      className="rounded-md w-full h-full object-scale-down bg-black "
                    />
                  </picture>
                  <Label className="pl-2 bg-opacity-60 absolute text-xs top-0 py-2 left-0 w-full bg-black ">
                    {obj.label}
                  </Label>
                </div>
              </Comp>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
