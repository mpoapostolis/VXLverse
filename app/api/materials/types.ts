import { MaterialType } from '@/store'

export type Material = {
  collectionId?: string
  collectionName?: string
  created?: string
  id: string
  name: string
  map?: string
  displacement?: string
  metalness?: string
  normal?: string
  roughness?: string
  preview?: string
  type: MaterialType
}
