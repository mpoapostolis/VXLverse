'use client'

import { useStore } from '@/store'
import { ContextMenu } from '@radix-ui/react-context-menu'
import { useCallback, useEffect, useState } from 'react'
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
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Select } from '../select'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

const initialNodes: Node[] = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
]

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2', type: 'smoothstep' }]

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
}

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
}

const nodeTypes: NodeTypes = {}

export function QuestModal() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

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
  useEffect(() => {
    const nodes = store.nodes?.map((node, idx) => ({
      id: node.uuid,
      position: { x: 50, y: 50 * (idx + 1) },
      data: { label: node.name },
      type: 'input',
    })) as Node[]
    setNodes(nodes)
  }, [store.nodes])

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
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            fitViewOptions={fitViewOptions}
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
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </DialogContent>
    </Dialog>
  )
}
