'use client'

import { Animations } from '@/components/settings/animations'
import { GameProperties } from '@/components/settings/gameProperties'
import { GlbModel } from '@/components/settings/glbModel'
import { Material } from '@/components/settings/material'
import { NodeList } from '@/components/settings/nodeList'
import { Quests } from '@/components/settings/quests'
import { TransformSettings } from '@/components/settings/transform'

export default function Editor() {
  return (
    <>
      <NodeList />
      <TransformSettings />
      <GlbModel />
      <Material />
      <Animations />
      <GameProperties />
      <Quests />
      <div className="pb-12" />
    </>
  )
}
