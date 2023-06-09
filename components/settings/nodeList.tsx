import { Indicator } from '@/components/indicator'
import { cn } from '@/lib/utils'
import { useStore } from '@/store'

export function NodeList() {
  const store = useStore()

  const currentScene = store.scenes.find((scene) => scene.uuid === store.currentScene)
  return (
    <div className="relative h-40 border-black border-opacity-0 overflow-auto border bg-card" id="nodeList">
      <div
        className={cn('absolute  h-full w-full text-xs', {
          hidden: store.nodes.length > 0,
        })}
      >
        <label className="flex h-full w-full items-center justify-center text-slate-400">Nodes will display here</label>
      </div>
      <div className="flex w-full items-center border-b pl-1 py-1 text-left text-xs ">
        <span className="text-xs  ml-1">{currentScene?.name ?? 'Select scene'}</span>
      </div>
      {store.nodes
        ?.filter((e) => {
          if (e.gameType === 'hero') return true
          else return e.scene === store.currentScene
        })
        .map((node, idx) => (
          <button
            data-uuid={node.uuid}
            onClick={() => store.selectNode(node.uuid)}
            className={cn(
              'flex w-full items-center  border-opacity-10  border-b border-black px-4 py-1 text-left text-xs  ',
              {
                'bg-secondary text-secondary-foreground': `${node?.uuid}` === store.selectedNode,
              },
            )}
            key={idx}
          >
            <Indicator classname="mr-2 " type={node.type ?? ''} gameType={node.gameType} />
            <span>
              {node?.name === '' ? node.type : node?.name}
              <span className="text-xs   ml-1"> - {node?.gameType ?? node.type}</span>
            </span>
          </button>
        ))}
    </div>
  )
}
