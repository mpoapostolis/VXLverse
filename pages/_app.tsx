import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'

import { GoogleAnalytics } from 'nextjs-google-analytics'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics trackPageViews />
      <Analytics />
    </>
  )
}
