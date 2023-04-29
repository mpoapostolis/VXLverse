import { AxiosError } from 'axios'
import useSWR from 'swr'
import { fetcher } from '../utils'
import { Reward } from './types'

export function useRewards() {
  const { data, error } = useSWR<Reward[], AxiosError>(`/api/rewards`, fetcher)
  return {
    data: data ?? ([] as Reward[]),
    isLoading: !data && !error,
    isError: error,
  }
}
