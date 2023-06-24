import { Account } from '@/components/account'
import { Button } from '@/components/ui/button'
import { UploadModel } from '@/components/uploadModel'
import Link from 'next/link'

export default async function Page(router: {
  params: {}
  searchParams: {
    type?: string
  }
}) {
  const type = router.searchParams.type || 'Model'
  return (
    <div className="h-screen w-screen  overflow-auto relative">
      <nav
        role="menubar"
        data-orientation="horizontal"
        className="px-4  w-full flex border-b sticky top-0 mb-2 h-10  items-center gap-4 z-50 bg-background"
      >
        <picture>
          <img
            loading="lazy"
            role="menuitem"
            aria-label="logo"
            src="/logo.webp"
            className="w-6 h-6"
            alt="VXLverse Logo"
          />
        </picture>

        <Button role="menuitem" variant="link" className="ml-auto  text-foreground  hover:text-secondary">
          <Link href="/editor">Editor</Link>
        </Button>

        <Account />
      </nav>
      <br />
      <div className="container mx-auto w-full">
        <div className="flex gap-4">
          <Link href={`/library?type=Model`}>
            <Button variant={type === 'Model' ? 'secondary' : 'default'}>Model</Button>
          </Link>
          <Link href={`/library?type=Background`}>
            <Button variant={type === 'Background' ? 'secondary' : 'default'}>Background</Button>
          </Link>
          <Link href={`/library?type=mp3`}>
            <Button variant={type === 'mp3' ? 'secondary' : 'default'}>mp3</Button>
          </Link>
          <Link href={`/library?type=Material`}>
            <Button variant={type === 'Material' ? 'secondary' : 'default'}>Material</Button>
          </Link>
          <div className="ml-auto" />
          <UploadModel />
        </div>
        <br />
        <div className="grid gap-4 w-full h-full grid-cols-4">
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
          <div className="w-full bg-card h-60">a</div>
        </div>
      </div>
    </div>
  )
}
