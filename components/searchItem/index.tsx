'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useStore } from '@/store'

const groups = [
  {
    label: 'Scene items',
    teams: [
      {
        label: 'Alicia Koch',
        value: 'personal',
      },
    ],
  },
  {
    label: 'All item',
    teams: [
      {
        label: 'Acme Inc.',
        value: 'acme-inc',
      },
      {
        label: 'Monsters Inc.',
        value: 'monsters',
      },
    ],
  },
]

type Team = (typeof groups)[number]['teams'][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface SearchSelectProps extends PopoverTriggerProps {
  groups?: typeof groups
}

export function SearchItem({ className }: SearchSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
  const [selectedTeam, setSelectedTeam] = React.useState({
    label: '-',
    value: '',
  })

  const store = useStore()
  const groups = [
    {
      label: 'Scene items',
      teams: store.nodes.map((node) => ({
        label: node.name ?? '',
        value: node.id ?? '',
      })),
    },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select Item"
          className={cn('w-full bg-input  justify-between', className)}
        >
          {selectedTeam.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Item..." />
            <CommandEmpty>No item found.</CommandEmpty>
            {store.nodes?.map((node, idx) => (
              <CommandItem
                key={node.uuid}
                onSelect={() => {
                  setOpen(false)
                }}
              >
                {node.name}
                <Check
                  className={cn('ml-auto h-4 w-4', selectedTeam.value === node.uuid ? 'opacity-100' : 'opacity-0')}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
