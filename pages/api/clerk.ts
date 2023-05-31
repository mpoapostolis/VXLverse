import { getPocketBase } from '@/lib/pocketBase'
import { WebhookEvent } from '@clerk/nextjs/dist/types/server'
import { NextApiRequest, NextApiResponse } from 'next'

import { buffer } from 'micro'
import { Webhook } from 'svix'

export const config = {
  api: {
    bodyParser: false,
  },
}

const secret = process.env.SVIX_SECRET ?? ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('req.method', req.method)
  const payload = (await buffer(req)).toString()
  const headers = req.headers

  const wh = new Webhook(secret)
  let msg
  try {
    // @ts-ignore
    msg = wh.verify(payload, headers)

    const body = req.body as WebhookEvent
    const pb = await getPocketBase()
    switch (body.type) {
      case 'user.created':
        res.send('ok')
        break
      case 'user.updated':
        console.log('user.updated', body.data)
        res.send('ok')
        break
      case 'user.deleted':
        console.log('user.deleted', body.data)
        res.send('ok')
        break
      default:
        // return 405
        res.send('ok')
        res.status(405).send('Method not allowed')
        break
    }
  } catch (err) {
    res.status(400).json({
      err,
    })
  }
}
