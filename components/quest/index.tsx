import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { OptionQuestType, useStore } from '@/store'
import { ChevronDownIcon } from 'lucide-react'
import { useRef } from 'react'
import { Select } from '../select'
import { SelectModel } from '../selectModal/selectModel'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export function Quest(props: {
  parrent?: boolean
  optionId?: string
  selected?: boolean
  options?: OptionQuestType[]
}) {
  const store = useStore()
  const quest = store.quests?.find((q) => q.uuid === store.selectedQuest)
  const option = quest?.options?.find((o) => o.uuid === props.optionId)
  const name = props.optionId ? option?.name : quest?.name
  const npcText = props.optionId ? option?.npcText : quest?.npcText
  const imgUrl = props.optionId ? option?.imgUrl : quest?.imgUrl
  const videoUrl = props.optionId ? option?.videoUrl : quest?.videoUrl
  const url = props.optionId ? option?.url : quest?.url
  const goToScene = props.optionId ? option?.goToScene : quest?.goToScene
  const action = props.optionId ? option?.action : quest?.action

  const requiredItem = props.optionId ? option?.requiredItem : quest?.requiredItem
  const reward = props.optionId ? option?.reward : quest?.reward

  function updateOption(option: Partial<OptionQuestType>) {
    store.updateQuest({
      options: quest?.options?.map((o) => (o.uuid === props.optionId ? { ...o, ...option } : o)),
    })
  }

  const ref = useRef<HTMLInputElement>(null)
  const heroNode = store.nodes?.find((n) => n.gameType === 'hero')
  const uuidToName = (uuid: string) => store.nodes?.find((n) => n.uuid === uuid)?.name

  return (
    <form
      className={cn('p-4 w-96 bg-card shadow-lg grid gap-2 h-fit border', {
        'border border-secondary': props.selected,
      })}
    >
      {!props.parrent && (
        <div>
          <Label className=" w-full text-xs font-medium">Option name</Label>
          <Input
            disabled={Boolean(props.optionId) && option?.saidBy === heroNode?.uuid}
            ref={ref}
            defaultValue={name ?? ''}
            onBlur={(e) => {
              if (props.optionId) updateOption({ name: e.target.value })
              else store.updateQuest({ name: e.target.value })
            }}
            type="text"
            className="bg-background"
          />
        </div>
      )}
      <Label className=" w-full text-xs flex items-center font-medium gap-2">
        <Select
          className="bg-background text-xs w-fit "
          options={
            store.nodes?.filter((n) => n.type === 'GLTF')?.map((n) => ({ value: n.uuid!, label: n.name! })) ?? []
          }
          onChange={(e) => {
            const isHero = e === heroNode?.uuid
            if (isHero && ref?.current?.value) ref.current.value = ''
            if (props.optionId && e) updateOption({ saidBy: e, name: isHero ? '' : option?.name })
          }}
          value={option?.saidBy ?? store.selectedNode}
        />
        <span>{option?.saidBy === heroNode?.uuid ? 'Thinking...' : 'Say'}</span>
      </Label>
      <textarea
        defaultValue={npcText ?? ''}
        onBlur={(e) => {
          if (props.optionId) updateOption({ npcText: e.target.value })
          else store.updateQuest({ npcText: e.target.value })
        }}
        rows={4}
        className="flex w-full     py-2.5 pl-2.5 bg-background  text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Separator className="my-2" />
      {props.options?.length === 0 && (
        <>
          <div>
            <Label className=" w-full text-xs font-medium">Required item</Label>
            <Select className="bg-background text-xs" options={[]} onChange={(val) => {}} />
          </div>

          <Label className=" w-fulltext-xs font-medium">Action</Label>
          <Select
            className="bg-background text-xs"
            options={[
              { value: 'showImage', label: 'Show image' },
              { value: 'showVideo', label: 'Show video' },
              { value: 'giveReward', label: 'Give reward' },
              { value: 'goToScene', label: 'Go to scene' },
              { value: 'openWebsite', label: 'Open website' },
            ]}
            value={action}
            onChange={(action) => {
              if (props.optionId)
                updateOption({
                  action: action ?? undefined,
                })
              else store.updateQuest({ action: action ?? undefined })
            }}
          />
          {action === 'giveReward' && (
            <>
              <Label className=" w-full  text-xs font-medium">Reward</Label>
              <SelectModel>
                <Button size={'sm'} className="flex w-full py-2.5 pl-2.5 bg-background  text-xs">
                  <div>Select reward</div>
                  <ChevronDownIcon className="w-4 h-4 ml-auto" />
                </Button>
              </SelectModel>
            </>
          )}
          {action === 'goToScene' && (
            <>
              <Label className=" w-full  text-xs font-medium">Go to Scene</Label>
              <Select
                className="bg-background text-xs"
                options={store.scenes?.map((e) => ({
                  value: e.uuid!,
                  label: e.name!,
                }))}
                value={goToScene}
                onChange={(goToScene) => {
                  if (!goToScene) return
                  if (props.optionId) updateOption({ goToScene })
                  else store.updateQuest({ goToScene })
                }}
              />
            </>
          )}
          {action === 'showImage' && (
            <>
              <Label className=" w-full  text-xs font-medium">Image url</Label>
              <Input
                placeholder="https://www.example.com"
                onBlur={(e) => {
                  if (props.optionId) updateOption({ imgUrl: e.target.value })
                  else store.updateQuest({ imgUrl: e.target.value })
                }}
                defaultValue={imgUrl ?? ''}
                type="text"
                className="bg-background"
              />
            </>
          )}
          {action === 'openWebsite' && (
            <>
              <Label className=" w-full  text-xs font-medium">Open Website</Label>
              <Input
                onBlur={(e) => {
                  console.log(e.target.value)
                  if (props.optionId) updateOption({ url: e.target.value })
                  else store.updateQuest({ url: e.target.value })
                }}
                defaultValue={url ?? ''}
                placeholder="https://www.example.com"
                type="url"
                className="bg-background"
              />
            </>
          )}
          {action === 'showVideo' && (
            <>
              <Label className=" w-full  text-xs font-medium">Video url</Label>
              <Input
                onBlur={(e) => {
                  if (props.optionId) updateOption({ videoUrl: e.target.value })
                  else store.updateQuest({ videoUrl: e.target.value })
                }}
                defaultValue={videoUrl ?? ''}
                placeholder="https://www.example.com"
                type="text"
                className="bg-background"
              />
            </>
          )}
        </>
      )}
      {props.options?.map((e, idx) => {
        return (
          <div key={e.name + idx} className="flex  w-full relative  items-center justify-between">
            <div className="flex text items-center w-full h-full">
              <div className="text-xs w-full text-right font-medium">{e.name}</div>
              <div className="ml-auto z-50 w-4 h-4 -mr-6 bg-primary border rounded-full" />
            </div>
          </div>
        )
      })}
      <div />
    </form>
  )
}
