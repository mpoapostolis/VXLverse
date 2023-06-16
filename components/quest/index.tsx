import { cn } from '@/lib/utils'
import { OptionQuestType, useStore } from '@/store'
import { useRef } from 'react'
import { Select } from '../select'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

export function Quest(
  props: OptionQuestType & {
    selected?: boolean
    className?: string
    root?: boolean
  },
) {
  const store = useStore()

  const quest = store.quests?.find((q) => q.uuid === store.selectedQuest)
  function updateOption(option: Partial<OptionQuestType>) {
    if (!props?.uuid) return
    store.updateQuest({
      options: quest?.options?.map((o) => (o.uuid === props.uuid ? { ...o, ...option } : o)),
    })
  }
  const ref = useRef<HTMLInputElement>(null)
  const heroNode = store.nodes?.find((n) => n.gameType === 'hero')
  const nodes = store.nodes?.filter((n) => n.type === 'GLTF')
  const children = quest?.options?.filter((o) => o.parrentId === props.uuid) ?? []
  const haveChild = children?.length > 0
  const disabledOpts = haveChild ? ['showImage', 'showVideo', 'giveReward', 'goToScene', 'openWebsite'] : []
  const disabledOpts1 = children?.length > 1 ? ['think', 'say'] : []
  const parrent = quest?.options?.find((o) => o.uuid === props?.parrentId)
  const isParentThinkOrSay = ['say', 'think'].includes(`${parrent?.action}`)
  return (
    <form
      className={cn('p-4 w-96  flex bg-card shadow-lg min-w-[200px]  z-50 gap-2 border', props.className, {
        'border border-secondary': props.selected,
      })}
    >
      <div className="grid gap-2 h-fit  w-full">
        {!props.root && !isParentThinkOrSay && (
          <>
            <Label className=" w-fulltext-xs font-medium">Choice name</Label>
            <Input
              placeholder="Choice name"
              className="bg-background"
              onChange={(e) => updateOption({ name: e.target.value })}
              value={props.name}
            />
          </>
        )}
        <div className="grid gap-2 grid-cols-2">
          <Select
            className="bg-background text-xs "
            options={nodes?.map((n) => ({ value: n.uuid, label: `${n.name}` })) ?? []}
            onChange={(e) => {
              const isHero = e === heroNode?.uuid
              if (isHero && ref?.current?.value) ref.current.value = ''
              if (props.uuid && e) updateOption({ saidBy: e, name: isHero ? '' : props?.name })
            }}
            controlled
            value={props?.saidBy ?? store?.selectedNode}
          />
          <Select
            className="bg-background text-xs"
            disabled={[...disabledOpts, ...disabledOpts1]}
            options={[
              { value: 'ask', label: 'Ask question' },
              { value: 'say', label: 'say' },
              { value: 'think', label: 'inner thought' },
              { value: 'showImage', label: 'Show image' },
              { value: 'showVideo', label: 'Show video' },
              { value: 'giveReward', label: 'Give reward' },
              { value: 'goToScene', label: 'Go to scene' },
              { value: 'openWebsite', label: 'Open website' },
            ]}
            value={props?.action}
            onChange={(action) => {
              updateOption({
                action: action ?? undefined,
              })
            }}
          />
        </div>

        {['say', 'think', 'ask'].includes(`${props?.action}`) && (
          <textarea
            defaultValue={props?.npcText ?? ''}
            onBlur={(e) => {
              updateOption({ npcText: e.target.value })
            }}
            rows={2}
            className="flex w-full h-full p-2   bg-background  text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        )}

        {props?.action === 'goToScene' && (
          <Select
            className="bg-background text-xs"
            options={store.scenes?.map((e) => ({
              value: e.uuid!,
              label: e.name!,
            }))}
            value={props?.goToScene}
            onChange={(goToScene) => {
              if (!goToScene) return
              updateOption({ goToScene })
            }}
          />
        )}
        {props?.action === 'showImage' && (
          <Input
            placeholder="https://www.example.com"
            onBlur={(e) => {
              updateOption({ imgUrl: e.target.value })
            }}
            defaultValue={props?.imgUrl ?? ''}
            type="text"
            className="bg-background"
          />
        )}
        {props?.action === 'openWebsite' && (
          <Input
            onBlur={(e) => {
              updateOption({ url: e.target.value })
            }}
            defaultValue={props?.url ?? ''}
            placeholder="https://www.example.com"
            type="url"
            className="bg-background"
          />
        )}
        {props?.action === 'showVideo' && (
          <Input
            onBlur={(e) => {
              updateOption({ videoUrl: e.target.value })
            }}
            defaultValue={props?.videoUrl ?? ''}
            placeholder="https://www.example.com"
            type="text"
            className="bg-background"
          />
        )}

        {!haveChild && (
          <>
            <Separator className="my-2" />
            <Label className=" w-fulltext-xs font-medium">Required item:</Label>
            <Select
              controlled
              className="bg-background text-xs"
              options={store.nodes?.map((n) => ({ value: n.uuid, label: `${n.name}` })) ?? []}
              value={props?.requiredItem}
              onChange={(requiredItem) => {
                updateOption({
                  requiredItem: requiredItem ?? undefined,
                })
              }}
            />
          </>
        )}
      </div>
    </form>
  )
}
