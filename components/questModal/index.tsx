'use client'

import { Quest, useStore } from '@/store'
import { ContextMenu } from '@radix-ui/react-context-menu'
import { useCallback, useState } from 'react'
import ReactFlow, {
  Background,
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

const nodeStyle = {
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  background: 'var(--card)',
}

const initialNodes: Node[] = [
  {
    id: 'horizontal-1',
    style: nodeStyle,
    sourcePosition: Position.Right,
    type: 'input',
    data: { label: <QuestName /> },
    position: { x: 0, y: 80 },
  },
  {
    id: 'horizontal-2',
    style: nodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: <RequiredItemNode /> },
    position: { x: 250, y: 80 },
  },
  {
    id: 'horizontal-3',
    style: nodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: <SelectRequiredItem /> },
    position: { x: 500, y: 80 },
  },
  {
    id: 'horizontal-4',
    style: nodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: <SelectRequiredItem /> },
    position: { x: 500, y: 80 },
  },
  {
    id: 'horizontal-5',
    style: nodeStyle,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    data: { label: <SelectRequiredItem /> },
    position: { x: 500, y: 80 },
  },
]

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
  const selectedNode = store?.nodes.find((node) => node.uuid === store.selectedNode)

  const updateQuest = (quest: Quest) => {
    store.updateNode(`${selectedNode?.uuid}`, {
      ...selectedNode,
      quests: selectedNode?.quests?.map((obj) => (obj.uuid === quest.uuid ? quest : obj)),
    })
  }

  const q: Quest = {
    name: 'test',
    initialDialog: 'test',
    status: 'incomplete',
    uuid: 'test',
    questCompleteDialog: 'test',
    requiredItemToComplete: '',
    reward: '',
  }

  return (
    <Dialog>
      <ContextMenu>
        <DialogTrigger asChild>
          <div className="relative  cursor-default select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none ">
            Quest
          </div>
        </DialogTrigger>
      </ContextMenu>
      <DialogContent className="z-50 w-[90vw] h-[90vh] ">
        <div className="w-[85vw] h-[85vh]">
          <ReactFlow
            className="bg-black"
            nodes={nodes}
            edges={edges}
            onChange={console.log}
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
                onClick={() => [
                  setNodes([
                    ...nodes,

                    {
                      id: 'horizontal-1',
                      style: nodeStyle,
                      sourcePosition: Position.Right,
                      type: 'input',
                      data: { label: <QuestName /> },
                      position: { x: 0, y: 80 },
                    },
                    {
                      id: 'horizontal-2',
                      style: nodeStyle,
                      sourcePosition: Position.Right,
                      targetPosition: Position.Left,
                      data: { label: <RequiredItemNode /> },
                      position: { x: 200, y: 80 },
                    },
                    {
                      id: 'horizontal-4',
                      style: nodeStyle,
                      sourcePosition: Position.Right,
                      targetPosition: Position.Left,
                      data: { label: <QuestDialogue label="Initial / Fail dialogue" /> },
                      position: { x: 400, y: -20 },
                    },
                    {
                      id: 'horizontal-5',
                      style: nodeStyle,
                      sourcePosition: Position.Right,
                      targetPosition: Position.Left,
                      data: { label: <QuestDialogue label="Success dialogue" /> },
                      position: { x: 400, y: 140 },
                    },
                    {
                      id: 'horizontal-6',
                      style: nodeStyle,
                      targetPosition: Position.Left,
                      data: { label: <SelectRequiredItem /> },
                      position: { x: 600, y: 80 },
                    },
                  ]),
                ]}
              >
                New Quest
              </Button>
            </Panel>
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </DialogContent>
    </Dialog>
  )
}
