import { Analytics } from '@/components/analytics'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import { Metadata } from 'next'
import Head from 'next/head'

const APP_NAME = 'VXLverse'
const APP_DEFAULT_TITLE = 'VXLverse'
const APP_TITLE_TEMPLATE = 'VXLverse'
const APP_DESCRIPTION =
  'VXLverse is a revolutionary online platform designed to empower users to both create and play a wide variety of RPG games. Our mission is to provide an interactive and engaging space for game enthusiasts, offering them the opportunity to showcase their creativity and be rewarded for it.'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  keywords: 'Game Development, RPG, VXLverse, 3D Modeling, Game Design, IndieDev, Gaming',

  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  themeColor: '#FFFFFF',
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
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
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
      </Head>

      <body className="overflow-hidden w-screen h-screen">
        <Analytics />
        {props.children}
        <Toaster />
      </body>
    </html>
  )
}
