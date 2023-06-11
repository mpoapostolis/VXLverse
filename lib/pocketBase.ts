import { cookies } from 'next/dist/client/components/headers'
import PocketBase from 'pocketbase'

export async function getPocketBase() {
  const pb = new PocketBase(process.env.PB_URL ?? 'http://127.0.0.1:8090')
  if (pb.authStore.isValid) return pb
  else {
    await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL ?? '', process.env.PB_ADMIN_PASSWORD ?? '')

    return pb
  }
}

export const PB_URL = 'https://admin.vxlverse.com'

export function getServerPocketBase() {
  const cookie = cookies().get('pb_auth')
  const pb = new PocketBase(PB_URL)
  if (cookie) pb.authStore.loadFromCookie(`${cookie.name}=${cookie.value}`)
  return pb
}

export function getClientPocketBase() {
  const pb = new PocketBase(PB_URL)
  pb.authStore.onChange(() => {
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
  })
  return pb
}
