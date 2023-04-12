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
          className="text-black11 inline-flex h-6 w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
          value={Number(value.toFixed(2))}
        />
      ))}
    </div>
  )
}
