import { NextApiRequest, NextApiResponse } from 'next'
import { getPocketBase } from '../pocketBase'
import { Model } from './types'

export async function getModels(_req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase()
  const records = await pb.collection('models').getFullList<Model>(200 /* batch size */, {
    sort: '-created',
  })
  res.status(200).json(
    records.map((obj) => ({
      ...obj,
      src: `${process.env.PB_URL}/api/files/${obj?.collectionId}/${obj?.id}/${obj?.file}`,
    })),
  )
}
