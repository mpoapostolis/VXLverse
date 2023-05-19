import { getMaterials } from '@/lib/materials/api'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMaterials(req, res)

    default:
      // return 405
      res.status(405).send('Method not allowed')
  }
}
