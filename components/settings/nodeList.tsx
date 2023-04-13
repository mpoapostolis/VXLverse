import { useStore } from '@/store'
import clsx from 'clsx'

export function NodeList() {
  const store = useStore()
  return (
    <div className="relative h-40 border-blackA6 overflow-auto border bg-white">
      <div
        className={clsx('absolute  h-full w-full text-xs', {
          hidden: store.nodes.length > 0,
        })}
      >
        <label className="flex h-full w-full items-center justify-center text-slate-400">Nodes will display here</label>
      </div>
      {store.nodes
        ?.filter((e) => {
          if (e.gameType === 'hero') return true
          if (e.scene === store.currentScene) return true
          return false
        })
        .map((node, idx) => (
          <button
            onClick={() => store.selectNode(node.uuid)}
            className={clsx(
              'label-text text-base-content flex w-full items-center border-b px-4 py-1 text-left text-xs  hover:bg-slate-100',
              {
                'bg-yellow-100': `${node?.uuid}` === store.selectedNode,
              },
            )}
            key={idx}
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-red-300" />
            <span>
              {node?.name === '' ? node.type : node?.name}
              <span className="text-xs text-blackA10 ml-1">- {node?.gameType ?? node.type}</span>
            </span>
          </button>
        ))}
    </div>
  )
}
