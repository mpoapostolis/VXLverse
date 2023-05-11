import { Analytics } from '@/components/analytics'
import '@/styles/globals.css'
import { Metadata } from 'next'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'VXLverse',
  description:
    'VXLverse is a revolutionary online platform designed to empower users to both create and play a wide variety of RPG games. Our mission is to provide an interactive and engaging space for game enthusiasts, offering them the opportunity to showcase their creativity and be rewarded for it.',
  keywords: 'Game Development, RPG, VXLverse, 3D Modeling, Game Design, IndieDev, Gaming',
}

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
