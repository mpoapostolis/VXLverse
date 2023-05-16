'use client'

import { useStore } from '@/store'
import { ContextMenu } from '@radix-ui/react-context-menu'
import { Trash2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import ReactFlow, {
  Background,
  ControlButton,
  Controls,
  DefaultEdgeOptions,
  Edge,
  FitViewOptions,
  Node,
  NodeTypes,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  Panel,
  Position,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Select } from '../select'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { QuestDialogue } from './questDialogue'
import { QuestName } from './questName'
import { RequiredItemNode } from './requiredItemNode'
import { SelectRequiredItem } from './selectRequiredItem'

const groupStyle = {
  border: '1px solid var(--border)',
  width: 820,
  height: 320,
  color: 'var(--text-primary)',
  background: '#fff2',
}

const DY = 330
const generateNodes = (idx: number) => {
  const q = Math.floor(idx / 5)
  return [
    {
      id: `group-${q}`,
      type: 'group',
      data: { label: null },
      position: { x: 150, y: DY * q + 20 },

      style: groupStyle,
    },
    {
      id: `horizontal-${idx + 1}`,
      style: nodeStyle,
      sourcePosition: Position.Right,
      type: 'input',
      data: { label: <QuestName /> },
      position: { x: 40, y: 20 },
      parentNode: `group-${q}`,
      extent: 'parent',
    },
    {
      id: `horizontal-${idx + 2}`,
      style: nodeStyle,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      data: { label: <RequiredItemNode /> },
      position: { x: 40, y: 200 },
      parentNode: `group-${q}`,
      extent: 'parent',
    },
    {
      id: `horizontal-${idx + 3}`,
      style: nodeStyle,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      data: {
        label: (
          <QuestDialogue
            placeholder="Dialogue appears if player or quest lacks required item."
            label="Initial dialogue"
          />
        ),
      },
      position: { x: 350, y: 20 },
      parentNode: `group-${q}`,
      extent: 'parent',
    },
    {
      id: `horizontal-${idx + 4}`,
      style: nodeStyle,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      data: {
        label: (
          <QuestDialogue placeholder="Dialogue appears after player has required item" label="Have Required Item" />
        ),
      },
      position: { x: 350, y: 173 },
      parentNode: `group-${q}`,
      extent: 'parent',
    },
    {
      id: `horizontal-${idx + 5}`,
      style: nodeStyle,
      targetPosition: Position.Left,
      type: 'output',
      data: { label: <SelectRequiredItem /> },
      position: { x: 650, y: 120 },
      parentNode: `group-${q}`,
      extent: 'parent',
      deletable: true,
    },
  ] as Node[]
}

function generateEdges(idx: number) {
  return [
    {
      id: `horizontal-${idx + 1}-${idx + 2}`,
      source: `horizontal-${idx + 1}`,
      target: `horizontal-${idx + 2}`,
      animated: true,
      type: 'smoothstep',
    },

    {
      id: `horizontal-${idx + 2}-${idx + 3}`,
      source: `horizontal-${idx + 2}`,
      target: `horizontal-${idx + 3}`,
      animated: true,
      type: 'smoothstep',
    },
    {
      id: `horizontal-${idx + 2}-${idx + 4}`,
      source: `horizontal-${idx + 2}`,
      target: `horizontal-${idx + 4}`,
      animated: true,
      type: 'smoothstep',
    },
    {
      id: `horizontal-${idx + 4}-${idx + 5}`,
      source: `horizontal-${idx + 4}`,
      target: `horizontal-${idx + 5}`,
      animated: true,
      type: 'smoothstep',
    },
    {
      id: `horizontal-${idx + 3}-${idx + 5}`,
      source: `horizontal-${idx + 3}`,
      target: `horizontal-${idx + 5}`,
      animated: true,
      type: 'smoothstep',
    },
  ] as Edge[]
}

const nodeStyle = {
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  background: 'var(--card)',
}

const initialEdges = []

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
}

const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
}

const nodeTypes: NodeTypes = {}

export function QuestModal() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  )
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  )
  const onConnect: OnConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges])
  const store = useStore()
  const [selected, setSelected] = useState<string>()

  function selectQuest(groupId: string) {
    const _nodes = nodes.map((node) => {
      if (node.type !== 'group') return node
      const style = {
        ...groupStyle,
      }
      if (node.id === groupId) style.border = '1px dashed goldenrod'
      return { ...node, style }
    }) as Node[]
    setNodes(_nodes)
    setSelected(groupId)
  }
  return (
    <Dialog>
      <ContextMenu>
        <DialogTrigger asChild>
          <div className="relative   cursor-default select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none ">
            Quest
          </div>
        </DialogTrigger>
      </ContextMenu>
      <DialogContent className="z-50 lg:w-[90vw] lg:h-[90vh] w-screen h-screen ">
        <div className="lg:w-[85vw] lg:h-[85vh] w-full h-full">
          <ReactFlow
            className="bg-black"
            nodes={nodes}
            edges={edges}
            onNodeClick={(e, node) => {
              const groupId = node.parentNode ?? node.id
              selectQuest(groupId)
            }}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            // fitView
            defaultEdgeOptions={defaultEdgeOptions}
            nodeTypes={nodeTypes}
          >
            <Panel position="top-left">
              <Select
                value={store.selectedNode}
                label="Select node"
                options={
                  store.nodes
                    ?.filter((e) => e.type === 'GLTF')
                    .map((node) => ({
                      label: `${node.name}`,
                      value: `${node.uuid}`,
                    })) ?? []
                }
                onChange={(val) => val && store.selectNode(val)}
              />
            </Panel>
            <Panel position="top-right">
              <Button
                onClick={() => {
                  setNodes([])
                  setEdges([])
                  setSelected(undefined)
                }}
              >
                Clear
              </Button>
              {selected && (
                <Button
                  className="border-l"
                  onClick={() => {
                    setSelected(undefined)
                    setNodes(
                      nodes
                        .filter((node) => (node?.parentNode ?? node.id) !== selected)
                        .map((node, idx) => {
                          if (node.type !== 'group') return node
                          return {
                            ...node,
                            position: { x: 150, y: DY * Math.floor(idx / 5) + 20 },
                          }
                        }),
                    )
                    const groupIdx = nodes.findIndex((node) => node.id === selected)
                    setEdges(edges.filter((_, idx) => idx < groupIdx * 5 || idx >= groupIdx * 5 + 5))
                  }}
                >
                  Delete Quest
                </Button>
              )}
              <Button
                className="border-l"
                onClick={() => {
                  const newNode = generateNodes(nodes.length)
                  if (newNode?.length === 0) return
                  setNodes([...nodes, ...generateNodes(nodes.length)])
                  setEdges([...edges, ...generateEdges(nodes.length)])
                }}
              >
                New Quest
              </Button>
            </Panel>
            <Background />
            <Controls showInteractive={false}>
              <ControlButton onClick={(e) => console.log(e.target)}>
                <Trash2 className="text-black" color="#000" />
              </ControlButton>
            </Controls>
          </ReactFlow>
        </div>
      </DialogContent>
    </Dialog>
  )
}
