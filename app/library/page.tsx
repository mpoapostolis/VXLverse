import { Account } from '@/components/account'
import { DeleteAsset } from '@/components/deleteAsset'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UploadModel } from '@/components/uploadModel'
import { UploadMp3 } from '@/components/uploadMp3'
import { UploadSky } from '@/components/uploadSky'
import { getServerPocketBase } from '@/lib/pocketBase'
import { cn } from '@/lib/utils'
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type keys = 'Model' | 'mp3' | 'images'

export default async function Page(router: {
  params: {}
  searchParams: {
    type?: keys
    offset?: string
  }
}) {
  const pb = await getServerPocketBase()
  const offset = Number(router.searchParams.offset) || 0

  if (!(await pb).authStore?.model) return redirect('/')
  const type = router.searchParams.type || 'Model'
  const typeToCollection: Record<keys, string> = {
    Model: 'models',
    mp3: 'sounds',
    images: 'images',
  }
  const collection = typeToCollection[type]
  const data = await pb.collection(collection).getList(offset + 1, 10, {
    sort: '-created',
    filter: `owner.id="${pb.authStore.model?.id}"`,
  })

  const totalPages = data?.totalPages
  const start = Math.max(offset - 2, 0)
  const end = Math.min(offset + 2, totalPages)
  const pages = Array.from({ length: end - start }, (_, i) => start + i)

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
      <div className="px-4   mx-auto w-full flex-wrap">
        <div className="flex gap-4 flex-wrap">
          <Link className="w-full md:w-fit" href={`/library?type=Model`}>
            <Button className="truncate w-full" variant={type === 'Model' ? 'secondary' : 'default'}>
              Model
            </Button>
          </Link>
          <Link className="w-full md:w-fit" href={`/library?type=images`}>
            <Button className="truncate w-full" variant={type === 'images' ? 'secondary' : 'default'}>
              Sky / Images
            </Button>
          </Link>
          <Link className="w-full md:w-fit" href={`/library?type=mp3`}>
            <Button className="truncate w-full" variant={type === 'mp3' ? 'secondary' : 'default'}>
              mp3
            </Button>
          </Link>

          <div className="ml-auto" />
          {type === 'Model' && <UploadModel />}
          {type === 'mp3' && <UploadMp3 />}
          {type === 'images' && <UploadSky />}
        </div>
        <Separator className="my-8" />

        <div className="grid  gap-4 w-full h-full lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5">
          {data.items.map((item) => (
            <div key={item.id} className="w-full border bg-card ">
              <div className="h-52 bg-black">
                <picture>
                  <img
                    loading="lazy"
                    src={
                      type === 'Model'
                        ? pb.getFileUrl(item, item.img)
                        : type === 'mp3'
                        ? '/icons/mp3.png'
                        : pb.getFileUrl(item, item.file)
                    }
                    className="w-full p-4 h-full object-scale-down"
                    alt={item.name}
                  />
                </picture>
              </div>

              <div className="p-4  h-fit w-full">
                <div className="w-full  bg flex">
                  <h1 className="pl-2 capitalize text-secondary truncate w-full font-bold ">{item?.name ?? '-'}</h1>
                  <DeleteAsset collection={collection} id={item.id} />
                </div>

                {type === 'mp3' && (
                  <>
                    <Separator className="my-4" />
                    <audio className="h-8  w-full rounded-none " controls>
                      <source src={pb.getFileUrl(item, item.mp3)} type="audio/mpeg" />
                    </audio>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className={cn(' mt-8 w-full  justify-center', {
            hidden: totalPages <= 1,
          })}
        >
          <div className="flex gap-2 w-full justify-center border-t p-4">
            <Link
              className={cn({
                hidden: offset === 0,
              })}
              href={`/library?offset=${0}`}
            >
              <button className="bg-transparent border border-secondary text-secondary text-xs rounded-full w-8 h-8 flex items-center justify-center">
                <DoubleArrowLeftIcon className="w-4 h-4" />
              </button>
            </Link>

            {pages.map((i) => (
              <Link
                aria-label="first page"
                href={{
                  query: {
                    offset: i,
                  },
                }}
                key={i}
              >
                <button
                  aria-label="last page"
                  className={cn(
                    'border bg-transparent border-secondary text-secondary text-xs rounded-full w-8 h-8 flex items-center justify-center',
                    {
                      'bg-secondary text-secondary-foreground': i === offset,
                    },
                  )}
                >
                  {i + 1}
                </button>
              </Link>
            ))}

            <Link
              aria-label="last page"
              className={cn({
                hidden: totalPages === 0 && offset === totalPages - 1,
              })}
              href={`/library?offset=${totalPages - 1}`}
            >
              <button
                aria-label="last page"
                className="bg-transparent border border-secondary text-secondary text-xs rounded-full w-8 h-8 flex items-center justify-center"
              >
                <DoubleArrowRightIcon className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
