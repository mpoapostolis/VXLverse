import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { GoogleAnalytics, event } from 'nextjs-google-analytics'

export function reportWebVitals(metric: NextWebVitalsMetric) {
  event(metric.name, {
    category: metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value), // values must be integers
    label: metric.id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  })
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Analytics />
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}
