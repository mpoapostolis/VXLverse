import { GameType } from '@/store'
import { CharStatus } from '@/store/utils'

export type Model = {
  collectionId: string
  collectionName: string
  created: string
  type: GameType
  id: string
  file: string
  img: string
  url: string
  name: string
  updated: string
  scale: number
  statusToAnimation: Record<string, CharStatus>
  defaultAnimation: string
  defaultPosition: number[]
}
