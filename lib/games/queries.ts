import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher } from '../utils'
import { Game } from './types'

export function useGame() {
  const router = useRouter()
  const id = router.query.id
  const { data, error } = useSWR<Game, AxiosError>(id && `/api/games/${id}`, fetcher)
  return {
    data: data,
    isLoading: !data && !error,
    isError: error,
  }
}
