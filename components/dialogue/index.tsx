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
    const id = currentQuest?.options?.at(0)?.uuid
    if (id) setOptionId(id)
  }, [currentQuest])

  const heroNode = store.nodes?.find((n) => n.gameType === 'hero')

  const npcDialogue =
    optionId == 'false'
      ? 'Sorry you dont have requiredItem'
      : currentQuest?.options?.find((o) => o.uuid === optionId)?.npcText

  const options = currentQuest?.options?.filter((o) => o.parrentId === optionId)

  const currentOption = currentQuest?.options?.find((o) => o.uuid === optionId)
  const saidBy = currentOption?.saidBy
  const saidByNode = store.nodes?.find((n) => n.uuid === saidBy)
  const saidByName = saidByNode?.name ?? currentNode?.name
  const nextDialogue = currentQuest?.options?.find((o) =>
    optionId ? o.parrentId === optionId : o.parrentId === currentQuest?.uuid,
  )
  function close() {
    setOptionId(undefined)
    store.setSelectedQuest(undefined)
  }

  const [text, { skip, isFinished }] = useWindupString(npcDialogue ?? '', {
    pace: (char: string) => (char === ' ' ? 100 : 50),
  })

  return (
    <Dialog open={Boolean(store.selectedQuest)}>
      <DialogContent hideClose className="bg-transparent outline-none border-none fixed bottom-0">
        <div className=" w-full grid   relative rounded min-h-[200px] gap-4 bg-black bg-opacity-80 p-4  px-6 text-white">
          <div className="text-lg h-full  flex flex-col w-full">
            <div className="text-xl  font-bold text-secondary mb-1">{saidByName}</div>
            <div
              className={cn('font-medium   h-full py-2 mb-4 ', {
                'text-gray-500': currentOption?.action === 'think',
              })}
            >
              {text}
            </div>

            <div className="mt-auto">
              {options
                ?.filter((o) => o.name !== '' || o.name)
                .map((option) => (
                  <button
                    key={option.uuid}
                    onClick={() => {
                      if (option?.requiredItem) {
                        const doIHaveReqItem = store.inventory.includes(option?.requiredItem)
                        if (!doIHaveReqItem) {
                          return setOptionId('false')
                          // close()
                        }

                        if (doIHaveReqItem) {
                          setOptionId(option?.uuid)
                          // store.updateQuest({ status: 'completed' })
                        }
                        return
                      }

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
                            store.setSelectedQuest(undefined)
                            store.setDialogue(undefined)
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
                if (!isFinished) return skip()

                setOptionId(nextDialogue?.uuid)
                if (!nextDialogue) store.setSelectedQuest(undefined)
              }}
              className="absolute animate-pulse border-none outline-none focus:outline-none bottom-4  right-4 font-bold text-xl w-fit"
            >
              {!isFinished ? 'skip' : nextDialogue ? 'Next' : 'Close'}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
