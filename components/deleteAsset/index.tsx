'use client'

import { getClientPocketBase } from '@/lib/pocketBase'
import { useRouter } from 'next/navigation'
import { Alert } from '../alert'
import { Button } from '../ui/button'

export function DeleteAsset(props: { id: string; collection: string }) {
  const router = useRouter()
  return (
    <Alert
      onConfirm={async () => {
        const pb = getClientPocketBase()
        await pb.collection(props.collection).delete(props.id)
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
