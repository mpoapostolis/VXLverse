import { NextApiRequest, NextApiResponse } from 'next'
import { getPocketBase } from '../pocketBase'

export default async function getGame(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string
  const pb = await getPocketBase()
  const data = await pb.collection('games').getOne(id)
  res.status(200).json(data.store)
}
