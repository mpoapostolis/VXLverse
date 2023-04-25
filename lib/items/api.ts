import { NextApiRequest, NextApiResponse } from 'next'
import { getPocketBase } from '../pocketBase'
import { Item } from './types'

export async function getItems(_req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase()
  const records = await pb.collection('items').getFullList<Item>(200 /* batch size */, {
    sort: '-created',
  })
  res.status(200).json(
    records.map((obj) => ({
      ...obj,
      url: `${process.env.PB_URL}api/files/${obj?.collectionId}/${obj?.id}/${obj?.url}`,
    })),
  )
}
