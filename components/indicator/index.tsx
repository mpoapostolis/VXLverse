import { geometries, lights } from '@/components/menu'
import { cn } from '@/lib/utils'

export function Indicator(props: { type: string; gameType?: string; classname?: string }) {
  let color = '#000'
  if (props.gameType) color = '#FFA07A'
  else if (lights.includes(props.type)) color = '#00BFFF'
  else if (geometries.includes(props.type)) color = '#EE82EE'

  return (
    <span
      className={cn('inline-block border border-black border-opacity-50 h-2 w-2 rounded-full', props.classname)}
      style={{
        backgroundColor: color,
      }}
    />
  )
}
