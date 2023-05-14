'use client'

import { useStore } from '@/store'
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
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow'
import 'reactflow/dist/style.css'

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

export function Flow() {
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
    <div className="w-full lg:h-[90vh] h-[37vh] border">
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
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
