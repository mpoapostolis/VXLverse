import { openDB } from 'idb'
import { Store } from '.'

export async function demo() {
  const db = await openDB<Store>('my-db', 1, {
    upgrade(db) {
      db.createObjectStore('store', { keyPath: 'id', autoIncrement: true })
    },
  })
}

const dialogue = {
  current: 'quest1',
  quest1: {
    status: 'TODO',
    title: 'quest1',
    description: 'quest1',
    requirements: 'quest1',
  },
}
