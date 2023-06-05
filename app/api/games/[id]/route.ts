import { getPocketBase } from '@/lib/pocketBase'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split('/')[3]

  const pb = await getPocketBase()
  const body = await req.formData()
  const auth = await currentUser()
  const email = auth?.emailAddresses?.at(0)?.emailAddress
  if (email) body.append('createdBy', email)

  const data = await pb.collection('games').update(id, body)

  return NextResponse.json({
    id: data?.id,
    name: data?.name,
    description: data?.description,
    genre: data?.genre,
    createdBy: data?.createdBy,
    public: data?.public,
    preview: data?.preview,
  })
}
