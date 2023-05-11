import { Analytics } from '@/components/analytics'
import '@/styles/globals.css'
import Head from 'next/head'

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <body className="overflow-hidden w-screen h-screen">
        <Analytics />
        {props.children}
      </body>
    </html>
  )
}
