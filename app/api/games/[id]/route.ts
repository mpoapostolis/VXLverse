import { getPocketBase } from '@/lib/pocketBase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = url.pathname.split('/')[3]
  const pb = await getPocketBase()
  const data = await pb.collection('games').getOne(id)
  return NextResponse.json({
    id: data.id,
    nodes: data.store.nodes,
    scenes: data.store.scenes,
    quests: data.store.quests,
    createdBy: data.createdBy,
    name: data.name,
    genre: data.genre,
    preview: data.preview,
    description: data.description,
    public: data.public,
  })
}

export async function PUT(req: NextRequest) {
  const cookie = req.headers?.get('cookie')
  const url = new URL(req.url)
  const id = url.pathname.split('/')[3]
  if (!cookie) return NextResponse.error()

  const pb = await getPocketBase()

  const body = await req.formData()
  // const auth = await currentUser()
  // const email = auth?.emailAddresses?.at(0)?.emailAddress
  // if (email) body.append('createdBy', email)

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
