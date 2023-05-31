import { cn } from '@/lib/utils'
import { useStore } from '@/store'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useWindupString } from 'windups'
import { Dialog, DialogContent } from '../ui/dialog'

export function Dialogue() {
  const store = useStore()
  const currentQuest = store.quests?.find((q) => q.uuid === store.selectedQuest)
  const currentNode = store.nodes?.find((o) => o.uuid === currentQuest?.nodeId)
  const [optionId, setOptionId] = useState<string | undefined>(undefined)

  useEffect(() => {
    setOptionId(undefined)
  }, [currentQuest?.uuid])
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
  function close() {
    setOptionId(undefined)
    store.setSelectedQuest(undefined)
  }

  const [text, { skip }] = useWindupString(npcDialogue ?? '', {
    pace: (char: string) => (char === ' ' ? 100 : 50),
  })
  return (
    <Dialog open={Boolean(store.selectedQuest)}>
      <DialogContent hideClose className="bg-transparent border-none fixed bottom-0">
        <div className=" w-full grid   relative rounded min-h-[200px] gap-4 bg-black bg-opacity-80 p-4  px-6 text-white">
          {saidByImg && (
            <picture className="h-28 w-28 absolute -top-28 overflow-hidden  border-none rounded-  border bg-black p-0.5 flex justify-center">
              <img className="object-contain  rounded-  h-full" src={saidByImg + '?thumb=190x190'} alt="" />
            </picture>
          )}
          <div className="text-lg h-full  flex flex-col w-full">
            <div className="text-xl font-bold text-secondary mb-1">{saidByName}</div>
            <div
              className={cn('font-medium   h-full py-2 mb-4 ', {
                'text-gray-500': currentOption?.saidBy === heroNode?.uuid,
              })}
            >
              {text}
            </div>

            <div className="mt-auto">
              {options
                ?.filter((o) => o.name !== '')
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

          <X role="button" onClick={close} className="absolute top-4 right-4 h-4 w-4" />
          {options?.filter((e) => e.name !== '').length === 0 && (
            <button
              onClick={() => {
                if (nextDialogue?.requiredItem) {
                  const doIHaveReqItem = store.inventory.includes(nextDialogue?.requiredItem)

                  if (!doIHaveReqItem) close()

                  if (doIHaveReqItem) {
                    setOptionId(nextDialogue?.uuid)
                    store.updateQuest({ status: 'completed' })
                  }
                } else {
                  setOptionId(nextDialogue?.uuid)
                  if (!nextDialogue) store.setSelectedQuest(undefined)
                }
              }}
              className="absolute animate-pulse bottom-4  right-4 font-bold text-xl w-fit"
            >
              {nextDialogue ? 'Next' : 'Close'}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
