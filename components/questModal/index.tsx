'use client'

import type { QuestOptionType } from '@/store'
import { useStore } from '@/store'
import { getUuid } from '@/store/utils'
import { select, zoom } from 'd3'
import { useEffect, useRef, useState } from 'react'
import { Quest } from '../quest'
import { QuestOption } from '../quest/quest'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

const WIDTH = 320
const HEIGHT = 240
const DX = 60
const DY = 60

const gUuid = getUuid()
function calcPos(nodes: QuestOptionType[]) {
  return nodes.map((q, idx) => {
    if (!q.parrentId) {
      q.x = 460
      q.y = DY + idx * 360
      return q
    } else {
      const parent = nodes.find((parent) => parent.uuid === q.parrentId)
      const siblings = nodes.filter((sibling) => sibling.parrentId === q.parrentId)
      const index = siblings.indexOf(q)
      const parrentX = parent?.x ?? 0
      const parrentY = parent?.y ?? 0
      q.x = parrentX + 420
      q.y = parrentY + index * 360
      return q
    }
  })
}
const X = 60
const Y = 60
const D3Component: React.FC = () => {
  const ref = useRef<SVGSVGElement>(null) // provide type to useRef

  useEffect(() => {
    if (!ref.current) return

    const svg = select(ref.current)
    const board = svg.select('g')

    const zoomBehavior = zoom().on('zoom', (event) => {
      board.attr('transform', event.transform)
    })

    // @ts-ignore
    svg.call(zoomBehavior)
  }, [])

  const store = useStore()
  const selectedNode = store.nodes?.find((node) => node.uuid === store.selectedNode)
  const [options, setOptions] = useState<QuestOptionType[]>([])
  const [selected, setSelected] = useState<QuestOptionType>()
  console.log(selected?.tree, selected?.parrentId)

  return (
    <div className="w-full border h-full bg-black">
      <div className="absolute top-12 lg:left-10 lg:w-fit w-full border h-fit ">
        <Button
          onClick={() => {
            const x = selected ? selected.x : 0
            const y = selected ? selected.y : 0
            const uuid = getUuid()
            const newOption = {
              uuid: uuid,
              x,
              y,
              optionName: 'New Option',
              npcText: 'New Option',
              reward: '',
              requiredItem: '',
              parrentId: selected?.uuid ?? gUuid,
              tree: selected?.tree ? [...selected.tree, selected?.uuid] : [],
            } as QuestOptionType
            setOptions([...options, newOption])
          }}
          className="border text-xs  w-fit m-2"
        >
          + Add Option
        </Button>
        <Button
          onClick={() => {
            setOptions(
              options.filter((q) => {
                return !q.tree?.includes(selected?.uuid ?? '')
              }),
            )
          }}
          className="w-fit m-2 text-xs border border-dashed border-red-400 text-red-400 bg-transparent"
        >
          Delete
        </Button>
      </div>
      <svg className="w-full h-full" ref={ref}>
        <g>
          <foreignObject onClick={() => setSelected(undefined)} x={X} y={Y} width="100%" height="100%">
            <Quest />
          </foreignObject>

          {calcPos(options)
            ?.filter((q) => {
              if (selected?.uuid)
                return (
                  q.uuid === selected.uuid || q.tree?.includes(selected.uuid) || !q.tree?.includes(q?.parrentId ?? '')
                )

              return true
            })
            ?.map((q, num) => {
              const parrent = calcPos(options)?.find((p) => p.uuid === q.parrentId)
              const x1 = parrent?.x ?? X
              const y1 = parrent?.y ?? Y
              return (
                <line
                  key={q.uuid}
                  x1={x1 + 320}
                  y1={y1 + 150}
                  x2={q.x!}
                  y2={q.y! + 150}
                  stroke="#fff"
                  strokeDasharray={5}
                  fill="transparent"
                />
              )
            })}

          {calcPos(options)
            ?.filter((q) => {
              if (selected?.uuid)
                return (
                  q.uuid === selected.uuid || q.tree?.includes(selected.uuid) || !q.tree?.includes(q?.parrentId ?? '')
                )

              return true
            })
            ?.map((q, num) => (
              <foreignObject
                onClick={() => {
                  setSelected(q)
                }}
                key={q.uuid}
                x={q.x}
                y={q.y}
                width="100%"
                height="100%"
              >
                <QuestOption selected={selected?.uuid === q.uuid} />
              </foreignObject>
            ))}
        </g>
      </svg>
    </div>
  )
}

export function QuestModal() {
  const store = useStore()
  const selectedNode = store.nodes?.find((node) => node.uuid === store.selectedNode)
  const quests = selectedNode?.quests ?? []

  const ref = useRef<HTMLCanvasElement>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-card w-full ">Quests Editor</Button>
      </DialogTrigger>

      <DialogContent className="z-50  lg:w-[90vw] lg:h-[90vh] w-screen h-screen ">
        <D3Component />
      </DialogContent>
    </Dialog>
  )
}
