export function Xyz(props: { label: string; values: number[] }) {
  return (
    <div className='grid w-full  grid-cols-4 gap-2 '>
      <div className='label-text'>{props.label}:</div>
      {props.values.map((value, idx) => (
        <div key={idx} className='label-text block   '>
          <input
            type='number'
            className='input input-xs w-full text-blue-400 focus:outline-none'
            defaultValue={value}
          />
        </div>
      ))}
    </div>
  )
}
