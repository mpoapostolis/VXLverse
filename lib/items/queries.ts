import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../utils'
import { Item } from './types'

export function useItems() {
  const router = useRouter()
  const { data, error } = useSWR<Item[], AxiosError>(`/api/items`, fetcher)
  return {
    data: data ?? ([] as Item[]),
    isLoading: !data && !error,
    isError: error,
  }
}
