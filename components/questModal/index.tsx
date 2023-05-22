'use client'

import { getUuid } from '@/store/utils'
import { select, zoom } from 'd3'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Quest } from '../quest'

import { OptionQuestType, useStore } from '@/store'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

const WIDTH = 580
const HEIGHT = 450
const DX = 60
const DY = 120

const X = 60
const Y = 120

function calcPos(nodes: OptionQuestType[]) {
  return nodes.map((q, idx) => {
    if (!q.parrentId) {
      q.x = 460
      q.y = DY + idx * 500
      return q
    } else {
      const parent = nodes.find((parent) => parent.uuid === q.parrentId)
      const siblings = nodes.filter((sibling) => sibling.parrentId === q.parrentId)
      const index = siblings.indexOf(q)
      const parrentX = parent?.x ?? 0
      const parrentY = parent?.y ?? 0
      q.x = parrentX + WIDTH
      q.y = parrentY + index * HEIGHT
      return q
    }
  })
}

function Paths(props: {
  selected?: OptionQuestType
  startingX: number
  startingY: number
  uuid: string
  options: OptionQuestType[]
}) {
  const children = props.options.filter((child) => child.parrentId === props.uuid)
  const shouldIshow = (q: OptionQuestType) => {
    const isSibling = q.parrentId === props.selected?.parrentId
    const isInTree = props?.selected?.tree?.includes(q.uuid)
    const isSelf = q.uuid === props.selected?.uuid
    const isChild = q.parrentId === props.selected?.uuid
    return isInTree || isSelf || isChild
  }
  return (
    <>
      {props.selected &&
        children.map((q, idx) =>
          !shouldIshow(q) ? null : (
            <path
              key={q.uuid}
              d={`
              M ${props.startingX + 390} ${props.startingY + 222 + idx * 25}
              l ${100 - idx * 15} 0
              l 0 ${q.y! - props.startingY - idx * 25}
              l ${q.x! - props.startingX - 325} 0
              `}
              fill="transparent"
              stroke="#ffbe3d"
              strokeWidth={2}
            />
          ),
        )}
    </>
  )
}

function D3Component() {
  const store = useStore()
  const quest = store.quests?.find((q) => q.uuid === store.selectedQuest)!

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

  const options = quest?.options ?? []
  const [selected, setSelected] = useState<OptionQuestType | undefined>({
    uuid: quest?.uuid,
    x: DX,
    y: DY,
    name: quest.name,
  })

  const siblings = options.filter((sibling) => sibling.parrentId === selected?.parrentId)

  const shouldIShow = (q: OptionQuestType) => {
    if (!selected) return true
    const isInTree = selected?.tree?.includes(q.uuid)
    const isSibling = siblings.includes(q)
    const isSelf = q.uuid === selected?.uuid
    const isChild = q.parrentId === selected?.uuid
    return isInTree || isSelf || isChild || isSibling
  }

  return (
    <div className="w-full border h-full bg-black">
      {store.selectedQuest && (
        <div className="absolute top-12 lg:left-10 lg:w-fit w-full   h-fit ">
          <Button
            onClick={() => {
              const tree = selected?.tree ?? []
              const x = selected ? selected.x : 0
              const y = selected ? selected.y : 0
              const uuid = getUuid()
              const newOption = {
                uuid: uuid,
                x,
                y,
                name: 'New Option',
                npcText: 'New Option',
                reward: '',
                requiredItem: '',
                parrentId: selected?.uuid,
                tree: [...tree, selected?.uuid],
              } as OptionQuestType
              store.updateQuest({
                ...quest,
                options: [...options, newOption],
              })
            }}
            className="border text-xs  w-fit m-2"
          >
            + Add Option
          </Button>
          <Button
            onClick={() => {
              const parrent = options.find((q) => q.uuid === selected?.parrentId)
              setSelected(parrent ?? quest)
              store.updateQuest({
                ...quest,
                options: options
                  .filter((q) => {
                    return !q.tree?.includes(selected?.uuid ?? '')
                  })
                  .filter((q) => q.uuid !== selected?.uuid),
              })
            }}
            className="w-fit m-2 text-xs border border-dashed border-red-400 text-red-400 bg-black"
          >
            Delete
          </Button>
        </div>
      )}
      <svg className="w-full h-full" ref={ref}>
        <g>
          <foreignObject
            onClick={() => {
              setSelected({
                uuid: quest.uuid,
                x: DX,
                y: DY,
                name: 'New Option',
                npcText: 'New Option',
              })
            }}
            x={X}
            y={Y}
            width="396px"
            height="100%"
          >
            <Quest
              selected={selected?.uuid === quest.uuid}
              options={options.filter((e) => e.parrentId === quest.uuid)}
            />
          </foreignObject>
          <Paths selected={selected} startingX={X} startingY={Y} uuid={quest.uuid} options={options} />

          {calcPos(quest?.options ?? [])
            ?.filter((q) => shouldIShow(q))
            ?.map((q) => (
              <g key={q.uuid}>
                <foreignObject
                  x={q.x}
                  y={q.y}
                  onClick={() => {
                    setSelected(q)
                  }}
                  width="396px"
                  height="100%"
                >
                  <Quest
                    optionId={q.uuid}
                    options={options.filter((e) => e.parrentId === q.uuid)}
                    selected={selected?.uuid === q.uuid}
                  />
                </foreignObject>
                <Paths selected={selected} startingX={q.x!} startingY={q.y!} uuid={q.uuid} options={options} />
              </g>
            ))}
        </g>
      </svg>
    </div>
  )
}

export function QuestModal(props: { children?: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>

      <DialogContent className="z-50  lg:w-[90vw] lg:h-[90vh] w-screen h-screen ">
        <D3Component />
      </DialogContent>
    </Dialog>
  )
}
