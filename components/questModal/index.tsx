'use client'

import type { QuestOptionType, Quest as QuestType } from '@/store'
import { useStore } from '@/store'
import { getUuid } from '@/store/utils'
import { select, zoom } from 'd3'
import { useEffect, useRef, useState } from 'react'
import { Quest } from '../quest'

import { EditIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

const WIDTH = 320
const HEIGHT = 240
const DX = 60
const DY = 60

const X = 60
const Y = 60

function calcPos(nodes: QuestOptionType[]) {
  return nodes.map((q, idx) => {
    if (!q.parrentId) {
      q.x = 460
      q.y = DY + idx * 400
      return q
    } else {
      const parent = nodes.find((parent) => parent.uuid === q.parrentId)
      const siblings = nodes.filter((sibling) => sibling.parrentId === q.parrentId)
      const index = siblings.indexOf(q)
      const parrentX = parent?.x ?? 0
      const parrentY = parent?.y ?? 0
      q.x = parrentX + 500
      q.y = parrentY + index * 400
      return q
    }
  })
}

function Paths(props: {
  selected?: QuestOptionType
  startingX: number
  startingY: number
  uuid: string
  options: QuestOptionType[]
}) {
  const children = props.options.filter((child) => child.parrentId === props.uuid)
  const shouldIshow = (q: QuestOptionType) => {
    const isSibling = q.parrentId === props.selected?.parrentId
    const isInTree = props?.selected?.tree?.includes(q.uuid)
    const isSelf = q.uuid === props.selected?.uuid
    const isChild = q.parrentId === props.selected?.uuid
    return isInTree || isSelf || isChild || isSibling
  }
  return (
    <>
      {props.selected &&
        children.map((q, idx) =>
          !shouldIshow(q) ? null : (
            <path
              key={q.uuid}
              d={`
              M ${props.startingX + 325} ${props.startingY + 220 + idx * 25}
              l ${80 - idx * 15} 0
              l 0 ${q.y! - props.startingY - idx * 25}
              l ${q.x! - props.startingX - 325} 0
              `}
              fill="transparent"
              stroke="goldenrod"
              strokeWidth={2}
            />
          ),
        )}
    </>
  )
}

function D3Component(props: QuestType) {
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
  const [options, setOptions] = useState<QuestOptionType[]>([])
  const [selected, setSelected] = useState<QuestOptionType | undefined>({
    uuid: props.uuid,
    x: DX,
    y: DY,
    optionName: 'New Option',
    npcText: 'New Option',
  })

  const siblings = options.filter((sibling) => sibling.parrentId === selected?.parrentId)

  const shouldIShow = (q: QuestOptionType) => {
    if (!selected) return true
    const isInTree = selected?.tree?.includes(q.uuid)
    const isSibling = siblings.includes(q)
    const isSelf = q.uuid === selected?.uuid
    const isChild = q.parrentId === selected?.uuid
    return isInTree || isSelf || isChild || isSibling
  }

  return (
    <div className="w-full border h-full bg-black">
      {selected && (
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
                optionName: 'New Option',
                npcText: 'New Option',
                reward: '',
                requiredItem: '',
                parrentId: selected?.uuid,
                tree: [...tree, selected?.uuid],
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
                options
                  .filter((q) => {
                    return !q.tree?.includes(selected?.uuid ?? '')
                  })
                  .filter((q) => q.uuid !== selected?.uuid),
              )
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
                uuid: props.uuid,
                x: DX,
                y: DY,
                optionName: 'New Option',
                npcText: 'New Option',
              })
            }}
            x={X}
            y={Y}
            width="100%"
            height="1000%"
          >
            <Quest
              name={props.name}
              options={options.filter((e) => e.parrentId === props.uuid)}
              selected={selected?.uuid === props.uuid}
            />
          </foreignObject>
          <Paths selected={selected} startingX={X} startingY={Y} uuid={props.uuid} options={options} />

          {calcPos(options)
            ?.filter((q) => shouldIShow(q))
            ?.map((q) => (
              <g key={q.uuid}>
                <foreignObject
                  x={q.x}
                  y={q.y}
                  onClick={() => {
                    setSelected(q)
                  }}
                  width="100%"
                  height="1000%"
                >
                  <Quest options={options.filter((e) => e.parrentId === q.uuid)} selected={selected?.uuid === q.uuid} />
                </foreignObject>
                <Paths selected={selected} startingX={q.x!} startingY={q.y!} uuid={q.uuid} options={options} />

                {/* {options
                  ?.filter((l) => l.parrentId === q.uuid)
                  ?.filter((l) => shouldIShow(l))
                  ?.map((l, idx) => (
                    <path
                      key={idx}
                      d={`
                      M${q.x! + 330} ${q.y! + 220 + idx * 25} 
                      L;${q.x! + +290 + 220 - idx * 25} ${q.y! + 220 + idx * 25}
                      l 0 ${(idx % 1) * q.y! + idx * 330} 
                      l ${idx * 30} 0
                      `}
                      fill="transparent"
                      stroke="goldenrod"
                      strokeWidth={2}
                    />
                  ))} */}
              </g>
            ))}
        </g>
      </svg>
    </div>
  )
}

export function QuestModal(props: QuestType) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0 w-full">
          <EditIcon className="w-4 bg-transparent  h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="z-50  lg:w-[90vw] lg:h-[90vh] w-screen h-screen ">
        <D3Component {...props} />
      </DialogContent>
    </Dialog>
  )
}
