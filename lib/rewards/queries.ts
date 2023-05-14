'use client'
import { Reward } from '@/lib/rewards/types'
import { fetcher } from '@/lib/utils'
import { AxiosError } from 'axios'
import useSWR from 'swr'

export function useRewards() {
  const { data, error } = useSWR<Reward[], AxiosError>(`/api/rewards`, fetcher)
  return {
    data: data ?? ([] as Reward[]),
    isLoading: !data && !error,
    isError: error,
  }
}
