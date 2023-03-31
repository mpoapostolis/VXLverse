export function Xyz(props: { onChange: (val: number[]) => void; label: string; values: number[] }) {
  return (
    <div className='grid w-full  grid-cols-4 gap-2 '>
      <div className='label-text'>{props.label}:</div>
      {props.values.map((value, idx) => (
        <div key={idx} className='label-text block'>
          <input
            onChange={(e) => {
              const values = props.values
              values[idx] = parseFloat(e.target.value)
              props.onChange(values)
            }}
            type='number'
            className='input-bordered input input-xs w-full text-blue-400 focus:outline-none'
            value={Number(value.toFixed(2))}
          />
        </div>
      ))}
    </div>
  )
}
