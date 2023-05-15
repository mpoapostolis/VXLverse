'use client'

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { Avatar } from '../ui/avatar'

type Checked = DropdownMenuCheckboxItemProps['checked']

export function Dropdown(props: {
  data: {
    value: string
    src: string
    type: string
    label: string
  }[]
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" className="w-full border flex hover:bg-none" variant="default">
          <span>Open</span>
          <ChevronDownIcon className="h-4 w-4 ml-auto opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 h-[50vh] overflow-auto">
        {props.data.map((item) => (
          <DropdownMenuItem className="text-xs grid grid-cols-[50px_1fr]" key={item.value}>
            <Avatar className="border mr-3 rounded-none">
              <picture>
                <img className="scale-150" src={item.src} alt={item.label} />
              </picture>
            </Avatar>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
