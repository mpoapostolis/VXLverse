import { Node, QuestType, Scene } from '@/store'

export type Game = {
  id: string
  nodes: Node[]
  scenes: Scene[]
  quests: QuestType[]
  createdBy: string
  name?: string
  genre?: string
  description?: string
}
