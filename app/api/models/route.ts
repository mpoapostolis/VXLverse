import { getPocketBase } from '@/lib/pocketBase'
import { NextResponse } from 'next/server'
import { Model } from './types'

export async function GET() {
  const pb = await getPocketBase()
  const records = await pb.collection('models').getFullList<Model>(200 /* batch size */, {
    sort: '-created',
  })

  return NextResponse.json(
    records.map((obj) => ({
      ...obj,
      url: `${process.env.PB_URL}api/files/${obj?.collectionId}/${obj?.id}/${obj?.file}`,
      img: `${process.env.PB_URL}api/files/${obj?.collectionId}/${obj?.id}/${obj?.img}`,
    })),
  )
}
