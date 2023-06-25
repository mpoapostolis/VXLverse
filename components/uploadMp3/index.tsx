'use client'

import { getClientPocketBase } from '@/lib/pocketBase'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

export function UploadMp3() {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  return (
    <Dialog
      open={open}
      onOpenChange={(t) => {
        setOpen(t)
        router.refresh()
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary">New Mp3</Button>
      </DialogTrigger>
      <DialogContent className="lg:w-[50vw] w-screen overflow-auto max-h-screen ">
        <DialogHeader>
          <DialogTitle>Upload mp3</DialogTitle>
        </DialogHeader>
        <Separator className="my-4" />
        <form
          onSubmit={async (evt) => {
            evt.preventDefault()
            const pb = getClientPocketBase()
            const name = evt.currentTarget.mp3Name.value as string
            const file = evt.currentTarget.mp3.files[0]
            const owner = pb.authStore.model?.id as string
            const formData = new FormData()
            const sizeInMb = file.size / 1024 / 1024

            formData.append('name', name)
            formData.append('mp3', file)
            formData.append('owner', owner)
            formData.append('size', sizeInMb.toString())

            try {
              setLoading(true)
              await pb.collection('sounds').create(formData)
              await pb
                .collection('users')
                .update(owner, {
                  'usage+': sizeInMb,
                })
                .then(() => {
                  router.refresh()
                  setOpen(false)
                })
                .then(() => {
                  setLoading(false)
                })
            } catch (err) {
              setLoading(false)
            }
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
            {loading && <Loader2 className="animate-spin ml-1 h-4 w-4" />}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
