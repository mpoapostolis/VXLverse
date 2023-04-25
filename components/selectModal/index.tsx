import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { useItems } from '@/lib/items/queries'
import { useModels } from '@/lib/models/queries'
import { ContextMenu } from '@radix-ui/react-context-menu'
import { Label } from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { Button, ButtonProps } from '../ui/button'
import { Input } from '../ui/input'
import { MenubarShortcut } from '../ui/menubar'
import { Separator } from '../ui/separator'

export function SelectModal(props: {
  size?: ButtonProps['size']
  children?: React.ReactNode
  type: 'models' | 'items'
  onChange: (id?: string) => void
  value?: string
}) {
  const { data: models } = useModels()
  const { data: items } = useItems()
  const arr = props.type === 'models' ? models : items
  return (
    <Dialog>
      <ContextMenu>
        <DialogTrigger asChild>
          <Button className="w-full" size={props.size}>
            {props?.value ?? 'Select'}
            <MenubarShortcut>
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </MenubarShortcut>
          </Button>
        </DialogTrigger>
      </ContextMenu>
      <DialogContent className="lg:w-[80vw] w-screen ">
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
            {arr.map((obj, i) => (
              <DialogTrigger asChild key={obj.id}>
                <div
                  onClick={() => {
                    props.onChange(obj.id)
                  }}
                  className="relative h-48 hover:border-2 border-secondary"
                >
                  <picture>
                    <img
                      src={obj.img ? obj.img : '/images/placeholder.png'}
                      alt="preview"
                      className="rounded-md w-full h-full object-scale-down bg-black "
                    />
                  </picture>
                  <Label className="pl-2 bg-opacity-60 absolute text-xs top-0 py-2 left-0 w-full bg-black ">
                    {obj.name}
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
