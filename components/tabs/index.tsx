import clsx from 'clsx'

export function Tabs(props: {
  className?: string
  activeTab: number
  tabs: string[]
  onChange: (idx: number) => void
}) {
  return (
    <div className={clsx('flex w-full bg-base-300', props.className)}>
      {props.tabs.map((tab, idx) => (
        <a
          key={idx}
          className={clsx('h-full  w-full rounded-l border-r  border-black  border-opacity-10 p-1 text-center', {
            'border-none bg-base-200': props.activeTab === idx,
            'rounded-none  bg-base-300': props.activeTab !== idx,
          })}
          onClick={() => {
            props.onChange(idx)
          }}>
          {tab}
        </a>
      ))}
    </div>
  )
}
