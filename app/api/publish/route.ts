import { getPocketBase } from '@/lib/pocketBase'
import { currentUser } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const auth = await currentUser()
  const email = auth?.emailAddresses?.at(0)?.emailAddress
  const body = await req.json()
  const pb = await getPocketBase()
  const { id } = await pb.collection('games').create({
    store: body,
    createdBy: email,
  })
  return NextResponse.json({ id })
}
