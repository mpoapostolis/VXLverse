import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../utils'
import { Game } from './types'

export function useGame() {
  const router = useRouter()
  const { data, error } = useSWR<Game, AxiosError>(`/api/games/${router.query.id}`, fetcher)
  return {
    data: data,
    isLoading: !data && !error,
    isError: error,
  }
}
