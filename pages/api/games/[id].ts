// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getGame from '@/lib/games/api'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getGame(req, res)

    default:
      return res.status(405).send('Method not allowed')
  }
}
