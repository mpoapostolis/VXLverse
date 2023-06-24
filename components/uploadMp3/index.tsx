'use client'

import { getClientPocketBase } from '@/lib/pocketBase'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

export function UploadMp3() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">New Mp3</Button>
      </DialogTrigger>
      <DialogContent className="lg:w-[50vw] w-screen overflow-auto max-h-screen ">
        <DialogHeader>
          <DialogTitle>Upload mp3</DialogTitle>
        </DialogHeader>
        <Separator className="my-4" />
        <form
          onSubmit={(evt) => {
            evt.preventDefault()
            const pb = getClientPocketBase()
            const name = evt.currentTarget.mp3Name.value as string
            const file = evt.currentTarget.mp3.files[0]
            const owner = pb.authStore.model?.id as string
            const formData = new FormData()
            formData.append('name', name)
            formData.append('mp3', file)
            formData.append('owner', owner)
            pb.collection('sounds').create(formData)
          }}
          className="grid gap-4"
        >
          <Label className="font-bold >">Mp3 name</Label>
          <Input name="mp3Name" required placeholder="Model name" className="p-3 bg-background" />

          <Label className="font-bold">Mp3 file</Label>

          <input required name="mp3" accept="audio/mpeg" type="file" className="bg-background text-sm w-full" />

          <Separator className="my-4" />
          <Button variant="secondary" className="" type="submit">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
