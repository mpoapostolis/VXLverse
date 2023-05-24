import { cn } from '@/lib/utils'
import { useStore } from '@/store'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Separator } from '../ui/separator'

export function Dialogue() {
  const store = useStore()
  const currentQuest = store.quests?.find((q) => q.uuid === store.selectedQuest)
  const currentNode = store.nodes?.find((o) => o.uuid === currentQuest?.nodeId)
  const [optionId, setOptionId] = useState<string | undefined>(undefined)

  useEffect(() => {
    setOptionId(undefined)
  }, [currentQuest])

  const npcDialogue = optionId
    ? currentQuest?.options?.find((o) => o.uuid === optionId)?.npcText
    : currentQuest?.npcText
  const options = optionId
    ? currentQuest?.options?.filter((o) => o.parrentId === optionId)
    : currentQuest?.options?.filter((o) => currentQuest.uuid === o.parrentId)

  return (
    <div
      className={cn('fixed bottom-0 left-0 z-50 w-full  p-4', {
        hidden: !store.selectedQuest,
      })}
    >
      <div className=" w-full grid grid-cols-[100px_1fr] relative rounded  gap-4 bg-black bg-opacity-80 p-4 text-white">
        <picture className="h-24 border bg-black flex justify-center">
          <img className="object-contain h-full" src={currentNode?.img + '?thumb=190x190'} alt="" />
        </picture>
        <div className="text-lg h-full w-full">
          <div className="text-2xl mt-2 font-bold">{npcDialogue}</div>
          <Separator className="my-4" />
          {options?.map((option) => (
            <button
              key={option.uuid}
              onClick={() => {
                setOptionId(option.uuid)
                if (currentQuest?.nodeId)
                  switch (option?.action) {
                    case 'showImage':
                      store.updateNode(currentQuest?.nodeId, { showVideo: undefined, showImg: option.imgUrl })
                      break
                    case 'showVideo':
                      store.updateNode(currentQuest?.nodeId, { showVideo: option.videoUrl, showImg: undefined })
                      break

                    case 'openWebsite':
                      return window.open(option.url, '_blank')

                    case 'goToScene':
                      return store.setCurrentScene(option.goToScene)

                    default:
                      break
                  }
              }}
              className="w-full p-1 font-semibold text-xl  bg-white bg-opacity-10 border-none  mb-2 "
            >
              {option.name}
            </button>
          ))}
        </div>
        <X
          onClick={() => {
            setOptionId(undefined)
            store.setSelectedQuest(undefined)
          }}
          className="absolute top-4 right-4 h-4 w-4"
        />
      </div>
    </div>
  )
}
