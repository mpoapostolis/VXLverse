import { AxiosError } from 'axios'
import useSWR from 'swr'
import { fetcher } from '../utils'
import { Model } from './types'

export function useModels() {
  const { data, error } = useSWR<Model[], AxiosError>(`/api/models`, fetcher)
  return {
    data: data ?? ([] as Model[]),
    isLoading: !data && !error,
    isError: error,
  }
}
