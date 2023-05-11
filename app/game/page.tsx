import { GameCanvas } from '@/components/canvas/game'

export default function Page(props: { params: {}; searchParams: { id?: string } }) {
  return <GameCanvas id={props.searchParams.id} />
}
