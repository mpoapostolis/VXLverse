import { getPocketBase } from '@/lib/pocketBase'
import { Reward } from '@/lib/rewards/types'
import { NextApiRequest, NextApiResponse } from 'next'

export async function getRewards(_req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase()
  const records = await pb.collection('rewards').getFullList<Reward>(200 /* batch size */, {
    sort: '-created',
  })
  res.status(200).json(
    records.map((obj) => ({
      ...obj,
      img: obj?.img && `${process.env.PB_URL}api/files/${obj?.collectionId}/${obj?.id}/${obj?.img}`,
    })),
  )
}
