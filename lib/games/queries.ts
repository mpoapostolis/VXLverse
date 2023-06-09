'use client'

import { fetcher } from '@/lib/utils'
import { AxiosError } from 'axios'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { Game } from './types'

export function useGame(id?: string) {
  const { data, error } = useSWR<Game, AxiosError>(id && `/api/games/${id}`, fetcher)
  return {
    data: data,
    isLoading: !data && !error,
    isError: error,
  }
}

export function useGames() {
  const params = useSearchParams()
  const sort = params.get('sort')
  const genre = params.get('genre')
  const { data, error } = useSWR<Game[], AxiosError>(`/api/games?sort${sort}&genre=${genre}`, fetcher)

  return {
    data: data ?? ([] as Game[]),
    isLoading: !data && !error,
    isError: error,
  }
}
