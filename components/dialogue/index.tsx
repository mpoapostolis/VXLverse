import { cn } from '@/lib/utils'
import { useStore } from '@/store'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Dialogue() {
  const store = useStore()
  const currentQuest = store.quests?.find((q) => q.uuid === store.selectedQuest)
  const currentNode = store.nodes?.find((o) => o.uuid === currentQuest?.nodeId)
  const [optionId, setOptionId] = useState<string | undefined>(undefined)

  useEffect(() => {
    setOptionId(undefined)
  }, [currentQuest])
  const heroNode = store.nodes?.find((n) => n.gameType === 'hero')

  const npcDialogue = optionId
    ? currentQuest?.options?.find((o) => o.uuid === optionId)?.npcText
    : currentQuest?.npcText

  const options = optionId
    ? currentQuest?.options?.filter((o) => o.parrentId === optionId)
    : currentQuest?.options?.filter((o) => currentQuest.uuid === o.parrentId)

  const currentOption = currentQuest?.options?.find((o) => o.uuid === optionId)
  const saidBy = currentOption?.saidBy
  const saidByNode = store.nodes?.find((n) => n.uuid === saidBy)
  const saidByImg = saidByNode?.img ?? currentNode?.img
  const saidByName = saidByNode?.name ?? currentNode?.name
  const nextDialogue = currentQuest?.options?.find((o) =>
    optionId ? o.parrentId === optionId : o.parrentId === currentQuest?.uuid,
  )

  return (
    <div
      className={cn('fixed bottom-0 left-0 z-50 w-full  p-4', {
        hidden: !store.selectedQuest,
      })}
    >
      <div className=" w-full grid   relative rounded min-h-[200px] gap-4 bg-black bg-opacity-80 p-4  px-6 text-white">
        {saidByImg && (
          <picture className="h-28 w-28 absolute -top-28 overflow-hidden  border-none rounded-  border bg-black p-0.5 flex justify-center">
            <img className="object-contain  rounded-  h-full" src={saidByImg + '?thumb=190x190'} alt="" />
          </picture>
        )}
        <div className="text-lg h-full  w-full">
          <div className="text-xl font-bold text-secondary mb-1">{saidByName}</div>
          <div
            className={cn('font-medium ', {
              'text-gray-500': currentOption?.saidBy === heroNode?.uuid,
            })}
          >
            {npcDialogue}
          </div>

          <div className="mt-8">
            {options
              ?.filter((o) => o.saidBy !== heroNode?.uuid)
              .map((option) => (
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
                  className="w-full p-1 text-secondary border font-medium  mb-2 "
                >
                  {option.name}
                </button>
              ))}
          </div>
        </div>

        <X
          role="button"
          onClick={() => {
            setOptionId(undefined)
            store.setSelectedQuest(undefined)
          }}
          className="absolute top-4 right-4 h-4 w-4"
        />
        {options?.filter((e) => e.saidBy !== heroNode?.uuid).length === 0 && (
          <button
            onClick={() => {
              setOptionId(nextDialogue?.uuid ?? undefined)
              if (!nextDialogue) store.setSelectedQuest(undefined)
            }}
            className="absolute animate-pulse bottom-4 right-4 font-bold text-xl w-fit"
          >
            {nextDialogue ? 'Next' : 'Close'}
          </button>
        )}
      </div>
    </div>
  )
}
