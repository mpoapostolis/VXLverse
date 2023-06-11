import { getPocketBase } from '@/lib/pocketBase'
import { NextRequest, NextResponse } from 'next/server'
import { BaseModel } from 'pocketbase'

export async function GET(req: NextRequest) {
  const pb = await getPocketBase()
  const url = new URL(req.url)
  const page = Number(url.searchParams.get('offset') ?? 0)
  const data = await pb.collection('games').getList(page + 1, 10, {
    expand: 'owner',
  })
  return NextResponse.json({
    total: data.totalItems,
    items: data.items.map((data) => ({
      id: data?.id,
      name: data?.name,
      description: data?.description,
      genre: data?.genre,
      owner: {
        id: (data?.expand?.owner as BaseModel)?.id,
        name: (data?.expand?.owner as BaseModel)?.name,
        email: (data?.expand?.owner as BaseModel)?.email,
      },
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

  const data = await pb.collection('games').create(body)
  const _preview = data?.preview
    ? `${process.env.PB_URL}api/files/${data?.collectionId}/${data?.id}/${data?.preview}?thumb=190x190`
    : null

  return NextResponse.json({
    id: data?.id,
    name: data?.name,
    description: data?.description,
    genre: data?.genre,
    owner: pb.authStore?.model?.id,
    createdBy: data?.createdBy,
    public: data?.public,
    preview: _preview,
  })
}
