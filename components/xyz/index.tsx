import * as Label from '@radix-ui/react-label'

export function Xyz(props: { onChange: (val: number[]) => void; label: string; values: number[] }) {
  console.log(props.values)
  return (
    <div className="mb-2 grid w-full  grid-cols-4 gap-2">
      <Label.Root className="text-black11 w-full text-sm font-medium">{props.label}</Label.Root>
      {props.values.map((value, idx) => (
        <input
          key={idx}
          onChange={(e) => {
            const values = props.values
            values[idx] = parseFloat(e.target.value)
            props.onChange(values)
          }}
          type="number"
          className="text-blackA11  rounded-none inline-flex h-6 w-full flex-1 items-center justify-center  pl-2.5 border-blackA7 border text-xs leading-none outline-none"
          value={Number(value.toFixed(2))}
        />
      ))}
    </div>
  )
}
