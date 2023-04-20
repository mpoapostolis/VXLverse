import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function Xyz(props: { onChange: (val: number[]) => void; label: string; values: number[] }) {
  const idxToLabel = ['x', 'y', 'z']
  return (
    <div className="mb-2 grid w-full  grid-cols-4 gap-2">
      <Label>{props.label}</Label>
      {props.values.map((value, idx) => (
        <Input
          placeholder={idxToLabel[idx]}
          key={idx}
          onChange={(e) => {
            const values = props.values
            values[idx] = parseFloat(e.target.value)
            props.onChange(values)
          }}
          type="number"
          value={Number(value.toFixed(2))}
        />
      ))}
    </div>
  )
}
