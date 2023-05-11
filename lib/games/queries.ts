'use client'

import { AxiosError } from 'axios'
import useSWR from 'swr'
import { fetcher } from '../utils'
import { Game } from './types'

export function useGame(id?: string) {
  const { data, error } = useSWR<Game, AxiosError>(id && `/api/games/${id}`, fetcher)
  return {
    data: data,
    isLoading: !data && !error,
    isError: error,
  }
}
