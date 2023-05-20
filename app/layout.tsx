import { Analytics } from '@/components/analytics'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import { Metadata } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const APP_NAME = 'VXLverse'
const APP_DEFAULT_TITLE = 'VXLverse'
const APP_TITLE_TEMPLATE = 'VXLverse'
const APP_CONTENT = '/logo-op.png'
const APP_DESCRIPTION = `Imagine you're playing with your favorite toy set, 
placing characters around, and creating fun stories with them. 
That's exactly what VXLverse does, but in a digital world.`

export const metadata: Metadata = {
  applicationName: APP_NAME,
  keywords: 'Game Development, RPG, VXLverse, 3D Modeling, Game Design, IndieDev, Gaming',
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    images: APP_CONTENT,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },

  twitter: {
    images: APP_CONTENT,
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  manifest: '/manifest.json',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>

      <body className="overflow-hidden w-screen h-screen">
        <Analytics />
        {props.children}
        <Toaster />
      </body>
    </html>
  )
}
