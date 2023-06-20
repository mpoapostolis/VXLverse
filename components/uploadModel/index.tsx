'use client'

import { getClientPocketBase } from '@/lib/pocketBase'
import { Select } from '../select'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Upload } from '../upload'

const type = [
  'hero',
  'npc',
  'monster',
  'item',
  'portal',
  'vehicles',
  'food',
  'misc',
  'architecture',
  'furniture',
  'animals',
  'plants',
  'health',
  'characters',
  'accessories',
  'nature',
  'instruments',
  'scenes',
]
export function UploadModel() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Model</Button>
      </DialogTrigger>
      <DialogContent className="lg:w-[50vw] w-screen overflow-auto max-h-screen ">
        <DialogHeader>
          <DialogTitle>Upload model</DialogTitle>
        </DialogHeader>
        <Separator className="my-4" />
        <form
          onSubmit={(evt) => {
            evt.preventDefault()
            const pb = getClientPocketBase()
            const name = evt.currentTarget.modelName.value as string
            const type = evt.currentTarget.type.value as string
            const thumbnail = evt.currentTarget.thumbnail.files[0]
            const file = evt.currentTarget.file.files[0]
            const owner = pb.authStore.model?.id as string
            const formData = new FormData()
            formData.append('name', name)
            formData.append('type', type)
            formData.append('file', file)
            formData.append('img', thumbnail)
            formData.append('owner', owner)

            pb.collection('models').create(formData)

            // formData.append('name', name)
            // formData.append('type', type)
            // formData.append('file', file)
            // formData.append('thumbnail', thumbnail)
            // formData.append('owner', owner)

            // pb.collection('models').create(formData)
          }}
          className="grid gap-4"
        >
          <Label className="font-bold >">Model name</Label>
          <Input name="modelName" required placeholder="Model name" className="p-3 bg-background" />
          <Label className="font-bold >">Model Type</Label>
          <Select
            name="type"
            required
            onChange={() => void 0}
            className="p-3 bg-background"
            options={type.map((t) => ({
              label: t,
              value: t,
            }))}
          />
          <Label className="font-bold">Model</Label>
          <input name="file" required accept=".glb" type="file" className="bg-background text-sm w-full" />
          <Label className="font-bold">Thumbnail</Label>
          <Upload required name="thumbnail" onChange={console.log} className="bg-background" />
          <Separator className="my-4" />
          <Button variant="secondary" className="" type="submit">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
