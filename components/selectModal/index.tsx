import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { ContextMenu } from '@radix-ui/react-context-menu'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { Button, ButtonProps } from '../ui/button'
import { Input } from '../ui/input'
import { MenubarShortcut } from '../ui/menubar'
import { Separator } from '../ui/separator'

export function SelectModal<T = string>(props: {
  size?: ButtonProps['size']
  children?: React.ReactNode
  options?: {
    src: string
    label: string
    value: string
  }[]
  onChange: (id?: T) => void
  value?: string
}) {
  const label = props.options?.find((opt) => opt.value === props.value)?.label
  return (
    <Dialog>
      <ContextMenu>
        <DialogTrigger asChild>
          <Button className="w-full truncate" size={props.size}>
            {label ?? 'Select'}
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
              <DialogTrigger asChild key={obj.value}>
                <div
                  onClick={() => {
                    props.onChange(obj.value as T)
                  }}
                  className="relative h-48 hover:border-2 border-secondary"
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
              </DialogTrigger>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
