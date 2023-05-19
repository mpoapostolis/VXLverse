'use client'
import { fetcher } from '@/lib/utils'
import { AxiosError } from 'axios'
import useSWR from 'swr'
import { Material } from './types'

export function useMaterials() {
  const { data, error } = useSWR<Material[], AxiosError>(`/api/materials`, fetcher)
  return {
    data: data ?? ([] as Material[]),
    isLoading: !data && !error,
    isError: error,
  }
}
