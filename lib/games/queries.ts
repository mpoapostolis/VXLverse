'use client'

import { AxiosError } from 'axios'
import { useSearchParams } from 'next/navigation'
import { BaseModel } from 'pocketbase'
import useSWR from 'swr'
import { PB_URL, getClientPocketBase } from '../pocketBase'
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

export function useGames() {
  const params = useSearchParams()
  const offset = Number(params.get('offset') ?? 0)
  const genre = params.get('genre')
  const search = params.get('search')
  const sort = params.get('sort')
  const pb = getClientPocketBase()

  const fetcher = async (_: string) => {
    const data = await pb.collection('games').getList(offset + 1, 10, {
      expand: 'owner',
    })
    return {
      total: data.totalItems,
      data: data.items.map((data) => ({
        id: data?.id,
        name: data?.name,
        description: data?.description,
        genre: data?.genre,
        owner: {
          id: (data?.expand?.owner as BaseModel)?.id,
          name: (data?.expand?.owner as BaseModel)?.name,
          email: (data?.expand?.owner as BaseModel)?.email,
        },
        public: data?.public,
        preview: data?.preview ? `${PB_URL}api/files/${data?.collectionId}/${data?.id}/${data?.preview}` : null,
      })),
    }
  }
  const { data, error } = useSWR(`/api/games?sort${sort}&genre=${genre}&search=${search}&offset=${offset}`, fetcher)

  return {
    total: 33,
    data: data?.data,
    isLoading: false,
    isError: false,
  }
}
