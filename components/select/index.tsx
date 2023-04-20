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
import { SelectSeparator } from '@radix-ui/react-select'

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
  options: Record<string, Option[]>
  label?: string
  className?: string
  value?: string
  disabled?: string[]
  onChange: (value: T) => void
}) {
  return (
    <div className={props.className}>
      {props.label && <Label className={clsx(' w-full text-sm font-medium mb-1')}>{props.label}</Label>}

      <RSelect value={props?.value ?? '-'} onValueChange={(e) => props.onChange((e === '-' ? undefined : e) as T)}>
        <SelectTrigger>
          <SelectValue placeholder={props.value} />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(props.options).map((group) => (
            <SelectGroup key={group}>
              <SelectLabel className="pl-2  text-xs leading-5 ">{group}</SelectLabel>
              <SelectItem value="-">-</SelectItem>
              {props.options[group].map((option, idx) => (
                <SelectItem
                  disabled={props.disabled?.includes(option.value ?? '')}
                  key={`${option?.value}${idx}`}
                  value={option?.value ?? '-'}
                >
                  {option.label}
                </SelectItem>
              ))}
              {/* except last one */}
              {group !== Object.keys(props.options)[Object.keys(props.options).length - 1] && (
                <SelectSeparator className="my-1 " />
              )}
            </SelectGroup>
          ))}
        </SelectContent>
      </RSelect>
      {/* <RSelect.Root value={props?.value} onValueChange={(e) => props.onChange(e as T)}>
        <RSelect.Trigger
          className="flex border truncate h-full border-mauve7 items-center justify-center  px-2 text-xs leading-none py-1 w-full  gap-1   focus:outline-none outline-none   bg-mauve1"
          aria-label="Label"
        >
          <RSelect.Value placeholder={props?.value ?? '-'} />

          <RSelect.Icon className=" ml-auto">
            <ChevronDownIcon />
          </RSelect.Icon>
        </RSelect.Trigger>
        <RSelect.Portal>
          <RSelect.Content className="overflow-hidden border border-mauve8 bg-mauve4  z-50 ">
            <RSelect.Viewport className="p-[5px]">
              {Object.keys(props.options).map((group) => (
                <RSelect.Group key={group}>
                  <RSelect.Label className="pl-2 text-xs leading-5 ">{group}</RSelect.Label>
                  {props.options[group].map((option, idx) => (
                    <SelectItem
                      disabled={props.disabled?.includes(option.value ?? '')}
                      className="data-[disabled]:"
                      key={`${option?.value}${idx}`}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                  {/* except last one */}
      {/* {group !== Object.keys(props.options)[Object.keys(props.options).length - 1] && (
                    <RSelect.Separator className="my-1 h-[1px] bg-mauve6" />
                  )}
                </RSelect.Group>
              ))}
            </RSelect.Viewport>
          </RSelect.Content>
        </RSelect.Portal>
      </RSelect.Root> */}
      {/* */}
    </div>
  )
}
