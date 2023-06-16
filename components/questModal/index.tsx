'use client'

import { getUuid } from '@/store/utils'
import { ReactNode, useState } from 'react'

import { cn } from '@/lib/utils'
import { OptionQuestType, useStore } from '@/store'
import { ArrowDownIcon } from 'lucide-react'
import { Quest } from '../quest'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

export function QuestModal(props: { children?: ReactNode }) {
  const store = useStore()
  const quest = store.quests?.find((q) => q.uuid === store.selectedQuest)!

  const options = quest?.options ?? []
  const [selected, setSelected] = useState<OptionQuestType | undefined>(options?.at(0))

  const addOption = (i: number) => {
    if (!selected?.uuid) return
    const tree = selected?.tree ?? []
    const uuid = getUuid()
    const newOption = {
      uuid: uuid,
      name: 'New Option ' + Math.random(),
      npcText: 'New Option ' + i,
      reward: '',
      requiredItem: '',
      action: 'say',
      parrentId: selected?.uuid,
      tree: [...tree, selected?.uuid],
    } as OptionQuestType
    // add after selected
    const idx = options.findIndex((q) => q.uuid === selected?.uuid)
    const opts = [...options]
    opts.splice(idx + 1, 0, newOption)
    store.updateQuest({
      ...quest,
      options: opts,
    })
  }

  const deleteOption = () => {
    const parrent = options.find((q) => q.uuid === selected?.parrentId)
    setSelected(parrent ?? quest)
    store.updateQuest({
      ...quest,
      options: options
        .filter((q) => {
          return !q.tree?.includes(selected?.uuid ?? '')
        })
        .filter((q) => q.uuid !== selected?.uuid),
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>

      <DialogContent className="z-50   w-screen h-screen ">
        <div className="w-full border h-full bg-black overflow-auto  p-4">
          <div className="grid gap-4">
            {options.map((q, idx) => {
              const l = q?.tree?.length ?? 0
              const show = selected?.uuid === q.parrentId || selected?.uuid === q.uuid || idx === 0
              return (
                <div className="w-full relative flex gap-4 lg:w-fit" key={q.uuid}>
                  <div
                    className="relative overflow-hidden w-full lg:w-fit"
                    style={{
                      opacity: show ? 1 : 0.5,
                      marginLeft: `${l * 130}px`,
                    }}
                    onClick={() => {
                      setSelected(q)
                    }}
                  >
                    {show ? (
                      <Quest root={idx === 0} selected={selected?.uuid === q.uuid} {...q} />
                    ) : (
                      <Button className="text-xs w-96  flex font-bold bg-card p-2 h-6 border ">
                        <div className="ml-auto">{q.name}</div>
                        <ArrowDownIcon className="ml-auto w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div
                    className={cn('flex flex-col h-full gap-2 top-0 -right-24  z-50 text-xs w-24', {
                      'opacity-50': !show,
                    })}
                  >
                    <Button
                      size="sm"
                      type="button"
                      className={cn(
                        'w-20   text-xs z-50 border bg-transparent border-dashed border-red-400 text-red-400 ',
                        {
                          hidden: idx === 0 || selected?.uuid !== q.uuid,
                        },
                      )}
                      onClick={deleteOption}
                    >
                      Delete
                    </Button>
                    <Button
                      size="sm"
                      type="button"
                      disabled={Boolean(q.action === 'think' && options.find((q) => q.parrentId === selected?.uuid))}
                      onClick={() => addOption(idx)}
                      className={cn('border  text-xs z-50 w-20', {
                        hidden: selected?.uuid !== q.uuid,
                      })}
                    >
                      + New
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
