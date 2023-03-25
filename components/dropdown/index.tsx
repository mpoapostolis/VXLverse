import { Geometry } from '../menu'

export function DropDown(props: { items: string[]; label: string; onChange: (value: Geometry) => void }) {
  return (
    <button className='hover-trigger    relative h-10  border'>
      {props.label}
      <div className='hover-target absolute top-9 -left-4 z-50  w-40 border border-base-300 bg-base-200 text-xs  '>
        {props.items.map((item, idx) =>
          item === '.' ? (
            <div key={idx} className='mb-1 w-full border-b border-base-300' />
          ) : (
            <div
              key={idx}
              className='cursor-pointer p-2 pl-4 text-left  hover:bg-base-300'
              onClick={() => props.onChange(item as Geometry)}>
              {item}
            </div>
          ),
        )}
      </div>
    </button>
  )
}
