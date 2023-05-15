import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'

export function QuestName() {
  return (
    <div className="w-full text-left">
      <Label className="text-left  mb-2 block text-muted-foreground w-full ">Quest Name</Label>
      <Input className="border-muted placeholder:text-muted" placeholder="Quest name" />
    </div>
  )
}
