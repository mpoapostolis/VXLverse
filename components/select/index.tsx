import clsx from 'clsx'

import { Label } from '@/components/ui/label'
import {
  Select as RSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SelectDemo() {
  return (
    <RSelect>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </RSelect>
  )
}

type Option = { label: string; value?: string }

export function Select<T = string | null>(props: {
  options: Option[]
  label?: string
  className?: string
  value?: string
  name?: string
  disabled?: string[]
  onChange: (value: T) => void
  defaultValue?: string
  controlled?: boolean
  required?: boolean
}) {
  return (
    <div>
      {props.label && <Label className={clsx(' w-full text-sm font-medium mb-1')}>{props.label}</Label>}

      <RSelect
        required={props.required}
        name={props.name}
        defaultValue={props.defaultValue}
        value={props.controlled ? props?.value ?? '-' : undefined}
        onValueChange={(e) => props.onChange((e === '-' ? undefined : e) as T)}
      >
        <SelectTrigger className={props.className}>
          <SelectValue placeholder={props.value} />
        </SelectTrigger>
        <SelectContent className="h-fit max-h-[240px] overflow-auto">
          <SelectItem value="-">-</SelectItem>
          {props.options.map((option, idx) => (
            <SelectItem
              disabled={props.disabled?.includes(option.value ?? '')}
              key={`${option?.value}${idx}`}
              value={option?.value ?? '-'}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </RSelect>
    </div>
  )
}
