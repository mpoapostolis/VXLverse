import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../utils'
import { Reward } from './types'

export function useRewards() {
  const router = useRouter()
  const { data, error } = useSWR<Reward[], AxiosError>(`/api/rewards`, fetcher)
  return {
    data: data ?? ([] as Reward[]),
    isLoading: !data && !error,
    isError: error,
  }
}
