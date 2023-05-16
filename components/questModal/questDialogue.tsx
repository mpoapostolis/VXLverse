import { Label } from '@radix-ui/react-label'

export function QuestDialogue(props: { label: string; placeholder?: string }) {
  return (
    <div className="w-full text-left">
      <Label className="text-left  mb-2 block text-muted-foreground w-full ">{props.label}</Label>
      <textarea
        rows={4}
        className="flex  w-full  border   bg-input p-2  border-muted  text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={props.placeholder ?? 'Hello adventurer! I have a quest for you.'}
      />
    </div>
  )
}
