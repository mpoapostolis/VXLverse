import { getPocketBase } from '@/lib/pocketBase'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const pb = await getPocketBase()
  const url = new URL(req.url)
  const page = Number(url.searchParams.get('offset') ?? 0)
  const data = await pb.collection('games').getList(page + 1, 10, {})
  return NextResponse.json({
    total: data.totalItems,
    items: data.items.map((data) => ({
      id: data?.id,
      name: data?.name,
      description: data?.description,
      genre: data?.genre,
      createdBy: data?.createdBy,
      public: data?.public,
      preview: data?.preview
        ? `${process.env.PB_URL}api/files/${data?.collectionId}/${data?.id}/${data?.preview}`
        : null,
    })),
  })
}

export async function POST(req: NextRequest) {
  const pb = await getPocketBase()
  const body = await req.formData()
  const auth = await currentUser()
  const email = auth?.emailAddresses?.at(0)?.emailAddress
  if (email) body.append('createdBy', email)

  const data = await pb.collection('games').create(body)
  const _preview = data?.preview
    ? `${process.env.PB_URL}api/files/${data?.collectionId}/${data?.id}/${data?.preview}?thumb=190x190`
    : null

  return NextResponse.json({
    id: data?.id,
    name: data?.name,
    description: data?.description,
    genre: data?.genre,
    createdBy: data?.createdBy,
    public: data?.public,
    preview: _preview,
  })
}
