import { getPocketBase } from '@/lib/pocketBase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const pb = await getPocketBase()
  const data = await pb.collection('games').getFullList(200 /* batch size */, {
    sort: '-created',
  })
  return NextResponse.json(data)
}
