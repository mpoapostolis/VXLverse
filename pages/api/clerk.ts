import { NextApiRequest, NextApiResponse } from 'next'

import { getPocketBase } from '@/lib/pocketBase'
import { WebhookEvent } from '@clerk/nextjs/dist/types/server'
import { buffer } from 'micro'
import { Webhook } from 'svix'

export const config = {
  api: {
    bodyParser: false,
  },
}

const secret = process.env.SVIX_SECRET ?? ''

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const payload = (await buffer(req)).toString()
  const headers = req.headers
  const wh = new Webhook(secret)
  let evt: WebhookEvent | null = null
  try {
    evt = wh.verify(payload, {
      'svix-id': headers['svix-id'] as string,
      'svix-signature': headers['svix-signature'] as string,
      'svix-timestamp': headers['svix-timestamp'] as string,
    }) as WebhookEvent
    const pb = await getPocketBase()
    switch (evt.type) {
      case 'user.created':
        await pb.collection('users').create({
          username: evt.data.username,
          email: evt.data.email_addresses[0].email_address,
          emailVisibility: true,
          name: evt.data.first_name,
          avatar_url: evt.data.profile_image_url,
          userId: evt.data.id,
          // password will never be used for login but is required by pocketbase
          password: '123456789',
          passwordConfirm: '123456789',

          verified: evt.data.email_addresses?.at(0)?.verification?.status === 'verified',
        })

        return res.send('ok')

      case 'user.deleted':
        if (!evt.data.id) return res.status(400).send('No user id')
        let user = await pb.collection('users').getFirstListItem(`userId="${evt.data.id}"`)
        await pb.collection('users').delete(user.id)

        return res.send('ok')
      default:
        return res.status(405).send('Method not allowed')
    }
  } catch (_) {
    return res.status(400).json({ _ })
  }
}
