import { getPocketBase } from '@/lib/pocketBase'
import axios from 'axios'
import { readdirSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase()
  // delete all
  // const all = await pb.collection('models').getFullList()
  // all.map(async (model) => {
  //   await pb.collection('models').delete(model.id, {
  //     $autoCancel: false,
  //   })
  // })
  // res.status(200).json({})
  try {
    const files = await readdirSync('/home/tolis/Desktop/projects/vxlverse/public/models')
    files.map(async (file, idx) => {
      await sleep(idx * 200)
      console.log(file + ' started')
      const formData = new FormData()
      // ls file
      const x = await readdirSync(`/home/tolis/Desktop/projects/vxlverse/public/models/${file}`)
      const thumb = x[2]
      // console.log(files[0], thumb)

      const model = await axios.get(`http://localhost:3000/models/${file}/model.gltf`, {
        responseEncoding: 'binary',
        headers: {
          'Content-Type': 'model/gltf+json',
        },
      })
      const thumbnail = await axios.get(`http://localhost:3000/models/${file}/${thumb}`, {
        responseType: 'arraybuffer',
      })

      const fileBlob = new Blob([thumbnail.data], { type: 'image/png' })
      const modelBlob = new Blob([JSON.stringify(model.data)], { type: 'model/gltf-json' })

      const info = await axios.get(`http://localhost:3000/models/${file}/info.json`)

      formData.append('file', modelBlob, 'model.gltf')
      formData.append('img', fileBlob)
      formData.append('name', info.data.name)
      formData.append('type', info.data.category)
      formData.append('scale', '1')

      return await sleep(idx * 200).then(() => {
        pb.collection('models').create(formData, {
          $autoCancel: false,
        })
      })
    }),
      res.status(200).json(files)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
