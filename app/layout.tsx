import { Analytics } from '@/components/analytics'
import { Menu } from '@/components/menu'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <header>
          <Menu />
        </header>
        <main>{props.children}</main>
        <Toaster />
      </body>
    </html>
  )
}
