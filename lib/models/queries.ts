'use client'

import { Model } from '@/app/api/models/types'
import { fetcher } from '@/lib/utils'
import { AxiosError } from 'axios'
import useSWR from 'swr'

export function useModels() {
  const { data, error } = useSWR<Model[], AxiosError>(`/api/models`, fetcher)
  return {
    data: data ?? ([] as Model[]),
    isLoading: !data && !error,
    isError: error,
  }
}
