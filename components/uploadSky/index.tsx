'use client'

import { getClientPocketBase } from '@/lib/pocketBase'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Upload } from '../upload'

export function UploadSky() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">New Image</Button>
      </DialogTrigger>
      <DialogContent className="lg:w-[50vw] w-screen overflow-auto max-h-screen ">
        <DialogHeader>
          <DialogTitle>Upload Sky/Image</DialogTitle>
        </DialogHeader>
        <Separator className="my-4" />
        <form
          onSubmit={(evt) => {
            evt.preventDefault()
            const pb = getClientPocketBase()
            const name = evt.currentTarget.imageName.value as string
            const file = evt.currentTarget.file.files[0]
            const owner = pb.authStore.model?.id as string
            const formData = new FormData()
            formData.append('name', name)
            formData.append('file', file)
            formData.append('owner', owner)

            pb.collection('images').create(formData)
          }}
          className="grid gap-4"
        >
          <Label className="font-bold >">Image name</Label>
          <Input name="imageName" required placeholder="Model name" className="p-3 bg-background" />

          <Label className="font-bold">Image</Label>
          <Upload required name="file" onChange={console.log} className="bg-background" />
          <Separator className="my-4" />
          <Button variant="secondary" className="" type="submit">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
