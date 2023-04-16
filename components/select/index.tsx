import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import * as Label from '@radix-ui/react-menubar'
import * as RSelect from '@radix-ui/react-select'
import clsx from 'clsx'

export function Select<T = string>(props: {
  options: { label: string; value: string }[]
  label?: string
  classname?: string
  value?: string
  onChange: (value: T) => void
}) {
  return (
    <div className={props.classname}>
      {props.label && (
        <Label.Root className={clsx('text-black11 w-full text-sm font-medium mb-1')}>{props.label}</Label.Root>
      )}
      <RSelect.Root value={props.value} onValueChange={(e) => props.onChange(e as T)}>
        <RSelect.Trigger
          className="flex border truncate border-mauve7 items-center justify-center  px-2 text-xs leading-none py-1 w-full h-fit gap-1   focus:outline-none outline-none text-blackA12  bg-mauve1"
          aria-label="Label"
        >
          <RSelect.Value placeholder={props.value} />
          <RSelect.Icon className="text-blackA11 ml-auto">
            <ChevronDownIcon />
          </RSelect.Icon>
        </RSelect.Trigger>
        <RSelect.Portal>
          <RSelect.Content className="overflow-hidden border border-mauve8 bg-mauve4  ">
            <RSelect.Viewport className="p-[5px]">
              <RSelect.Group>
                {props.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </RSelect.Group>
            </RSelect.Viewport>
          </RSelect.Content>
        </RSelect.Portal>
      </RSelect.Root>
    </div>
  )
}

function SelectItem({ children, className, ...props }: any) {
  return (
    <RSelect.Item
      className={clsx(
        'text-xs leading-none text-blackA12  flex items-center h-6 pr-9 pl-6   relative select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-mauve9 cursor-pointer data-[highlighted]:text-mauve1',
        className,
      )}
      {...props}
    >
      <RSelect.ItemText>{children}</RSelect.ItemText>
      <RSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </RSelect.ItemIndicator>
    </RSelect.Item>
  )
}
