export function DropDown(props: { items: string[]; label: string; onChange: (value: string) => void }) {
  return (
    <button className='hover-trigger  relative  h-10'>
      {props.label}
      <div className='hover-target absolute top-9 -left-4 z-50  w-40 border border-base-300 bg-base-200 text-xs  '>
        {props.items.map((item) =>
          item === '.' ? (
            <div key={item} className='mb-1 w-full border-b border-base-300' />
          ) : (
            <div
              key={item}
              className='cursor-pointer p-2 pl-4 text-left  hover:bg-base-300'
              onClick={() => props.onChange(item)}>
              {item}
            </div>
          ),
        )}
      </div>
    </button>
  )
}
