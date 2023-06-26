'use client'

import { Model } from '@/app/api/models/types'
import { AxiosError } from 'axios'
import useSWR from 'swr'
import { getClientPocketBase } from '../pocketBase'

export function useModels() {
  const pb = getClientPocketBase()
  const { data, error } = useSWR<Model[], AxiosError>(`models`, () =>
    pb
      .collection('models')
      .getFullList<Model>(200 /* batch size */, {
        sort: '-created',
        filter: `owner="${pb.authStore.model?.id}"||owner=""`,
      })
      .then(
        (res) =>
          res?.map((model) => ({
            ...model,
            url: pb.getFileUrl(model, model.file),
            img: pb.getFileUrl(model, model.img),
          })) ?? ([] as Model[]),
      ),
  )

  return {
    data: data ?? ([] as Model[]),
    isLoading: !data && !error,
    isError: error,
  }
}
