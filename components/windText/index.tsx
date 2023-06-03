import { useRef } from 'react'
import { useWindupString } from 'windups'

export function WindText(props: { text: string; onFinished?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [windText] = useWindupString(props.text, {
    pace: (char: string) => (char === ' ' ? 100 : 50),
    onFinished: () => {
      props.onFinished?.()
      ref.current?.classList.add('slowFadeOut')
    },
  })

  return (
    <div ref={ref} className="h-screen w-screen  bg-black absolute z-50 grid   place-items-center text-3xl font-bold">
      {windText}
    </div>
  )
}

export function TypeWritter(props: { text?: string; onFinished?: () => void }) {
  if (!props.text) return null
  else return <WindText text={props.text} onFinished={props.onFinished} />
}
