import PocketBase from 'pocketbase'

export async function getPocketBase() {
  const pb = new PocketBase(process.env.PB_URL ?? 'http://127.0.0.1:8090')
  if (pb.authStore.isValid) return pb
  else {
    await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL ?? '', process.env.PB_ADMIN_PASSWORD ?? '')

    return pb
  }
}
