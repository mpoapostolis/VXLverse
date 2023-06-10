'use client'

import dynamic from 'next/dynamic'
const GameCanvas = dynamic(() => import('@/components/canvas/game').then((mod) => mod.GameCanvas), { ssr: false })

export default function Page(props: { params: {}; searchParams: { id?: string } }) {
  return <GameCanvas id={props.searchParams.id} />
}
