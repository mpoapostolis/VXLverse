import { NextApiRequest, NextApiResponse } from 'next'

interface Props {
  content: string
}

interface File {
  name: string
  download_url: string
}

const downloadFile = async (): Promise<File> => {
  const url = 'https://api.github.com/repos/myusername/myrepository/contents/path/to/myfile.txt'
  const headers = { Authorization: `token ${process.env.GITHUB_TOKEN}` }
  const response = await fetch(url, { headers })
  const data = await response.json()
  return data
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const file = await downloadFile()
  const fileResponse = await fetch(file.download_url)
  const content = await fileResponse.text()
  res.status(200).json({ content })
}

// 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
