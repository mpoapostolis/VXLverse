'use client'

import { getClientPocketBase } from '@/lib/pocketBase'
import { useRouter } from 'next/navigation'
import { Alert } from '../alert'
import { Button } from '../ui/button'

export function DeleteAsset(props: { id: string; collection: string }) {
  const router = useRouter()
  const pb = getClientPocketBase()

  return (
    <Alert
      onConfirm={async () => {
        const pb = getClientPocketBase()
        const item = await pb.collection(props.collection).getOne(props.id)
        console.log(item.size)
        await pb.collection(props.collection).delete(props.id)
        const owner = pb.authStore.model?.id as string
        await pb.collection('users').update(owner, {
          'usage-': item.size,
        })

        router.refresh()
      }}
      description="Are you sure you want to delete this asset? This action cannot be undone."
      title="Delete Asset"
    >
      <Button className="ml-auto" size="sm" variant="destructive">
        Delete
      </Button>
    </Alert>
  )
}
