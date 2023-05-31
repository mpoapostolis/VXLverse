// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPocketBase } from '@/lib/pocketBase'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  const pb = await getPocketBase()
  const { userId, ...rest } = body
  console.log(userId)
  const { id } = await pb.collection('games').create({
    store: rest,
    userId,
  })
  res.status(200).json({ id })
}
