import { SelectModel } from '../selectModal/selectModel'
import { Label } from '../ui/label'

export function SelectRequiredItem() {
  return (
    <div className="grid gap-4 place-items-center">
      <Label>Required Item</Label>
      <SelectModel />
    </div>
  )
}
