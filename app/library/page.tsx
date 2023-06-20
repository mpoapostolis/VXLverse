import { Account } from '@/components/account'
import { Button } from '@/components/ui/button'
import { UploadModel } from '@/components/uploadModel'
import Link from 'next/link'

export default async function Page(router: {
  params: {}
  searchParams: {
    selected?: string
  }
}) {
  const selected = router.searchParams.selected || 'Model'
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
          <Link href={`/library?selected=Model`}>
            <Button variant={selected === 'Model' ? 'secondary' : 'default'}>Model</Button>
          </Link>
          <Link href={`/library?selected=Background`}>
            <Button variant={selected === 'Background' ? 'secondary' : 'default'}>Background</Button>
          </Link>
          <Link href={`/library?selected=mp3`}>
            <Button variant={selected === 'mp3' ? 'secondary' : 'default'}>mp3</Button>
          </Link>
          <Link href={`/library?selected=Material`}>
            <Button variant={selected === 'Material' ? 'secondary' : 'default'}>Material</Button>
          </Link>
          <Button className="ml-auto">New</Button>
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
