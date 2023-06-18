import { Account } from '@/components/account'
import { GameCard } from '@/components/gameCard'
import { Search } from '@/components/search'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Game } from '@/lib/games/types'
import { getServerPocketBase } from '@/lib/pocketBase'
import { cn } from '@/lib/utils'
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { BaseModel } from 'pocketbase'

export default async function Page(router: {
  params: {}
  searchParams: {
    offset?: string
    searchTerm?: string
    sort?: string
    genre?: string
  }
}) {
  const offset = Number(router.searchParams.offset) || 0
  const pb = getServerPocketBase()

  const genreFilter = router.searchParams.genre ? `genre="${router.searchParams.genre}"` : null
  const searchFilter = router.searchParams.searchTerm ? `name~"${router.searchParams.searchTerm}"` : null
  const filters = [genreFilter, searchFilter].filter(Boolean).join(' && ')
  const data = await pb.collection('games').getList<Game & BaseModel>(offset + 1, 10, {
    sort: `-${router?.searchParams?.sort ?? 'created'}`,
    filter: `${filters}`,
    expand: 'owner',
  })

  const totalPages = data?.totalPages
  const totalItems = data?.totalItems
  const start = Math.max(offset - 2, 0)
  const end = Math.min(offset + 2, totalPages)
  const pages = Array.from({ length: end - start }, (_, i) => start + i)
  const items = data.items.map((data) => ({
    id: data?.id,
    name: data?.name,
    description: data?.description,
    genre: data?.genre,
    owner: data.owner,
    public: data?.public,
    ...data?.store,
    cratedBy: data?.expand?.owner?.name,
    preview: data?.preview
      ? pb.getFileUrl(
          {
            collectionId: data?.collectionId,
            id: data?.id,
            collectionName: data?.collectionName,
          },
          data?.preview,
        )
      : null,
  }))
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

        <Button role="menuitem" variant="secondary" className="ml-auto rounded-full" size="sm">
          <Link href="/editor">Create your own story</Link>
        </Button>

        <Account />
      </nav>
      <div className="grid  lg:grid-cols-[15vw_1fr] grid-cols-1 gap-4">
        <Sidebar />
        <div className="p-4  h-full w-full">
          <div className="flex items-center w-full">
            <div className="flex text-xs font-bold">{totalItems} results found</div>
            <Search />
          </div>
          <div className="relative">
            <div className="mt-4 grid sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-5 gap-4 ">
              {items?.map((game) => (
                <GameCard
                  ownership={Boolean(pb.authStore?.model?.id && pb.authStore?.model?.id === game.owner)}
                  {...(game as Game)}
                  key={game.id}
                />
              ))}
            </div>

            <div
              className={cn('absolute -bottom-20  left-0 w-full  justify-center', {
                hidden: totalPages <= 1,
              })}
            >
              <div className="flex gap-2 w-full justify-center border-t p-4">
                <Link
                  className={cn({
                    hidden: offset === 0,
                  })}
                  href={`/?offset=${0}`}
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
                        sort: router.searchParams.sort,
                        genre: router.searchParams.genre,
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
                  href={`/?offset=${totalPages - 1}`}
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
      </div>
    </div>
  )
}
