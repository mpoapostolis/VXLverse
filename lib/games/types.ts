import { Node, QuestType, Scene } from '@/store'

export type Game = {
  nodes: Node[]
  scenes: Scene[]
  quests: QuestType[]
}
