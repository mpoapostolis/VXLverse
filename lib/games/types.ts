import { Node, QuestType, Scene } from '@/store'

export type Game = {
  id?: string
  nodes?: Node[]
  scenes?: Scene[]
  quests?: QuestType[]
  owner?: {
    id?: string
    name?: string
    email?: string
  }
  name?: string
  genre?: string
  preview?: string
  description?: string
  public?: boolean
}
