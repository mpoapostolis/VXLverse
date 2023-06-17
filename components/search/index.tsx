'use client'

import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'

export function Search() {
  const params = useSearchParams()
  const router = useRouter()
  const searchTerm = params.get('searchTerm')
  const sort = params.get('sort')
  const genre = params.get('genre')
  const search = params.get('search')

  return (
    <form
      key={searchTerm}
      onSubmit={(evt) => {
        evt.preventDefault()
        const searchTerm = evt.currentTarget.searchTerm.value as string
        const qs = new URLSearchParams({
          ...(searchTerm ? { searchTerm } : {}),
          ...(sort ? { sort } : {}),
          ...(genre ? { genre } : {}),
          ...(search ? { search } : {}),
        })

        router.push(`/?${qs.toString()}`)
      }}
      defaultValue={searchTerm ?? undefined}
      className="flex ml-auto w-full items-center lg:w-96  justify-center"
    >
      <input
        defaultValue={searchTerm ?? undefined}
        name="searchTerm"
        placeholder="🔎 Search..."
        type="search"
        className="rounded-l-full  h-8 bg-input pl-4 outline-none w-full  border text-foreground"
      />
      <Button
        aria-label="search"
        variant="ghost"
        className=" grid rounded-r-full place-items-center  p-0 px-4 h-8 bg-input border border-l-0 "
      >
        <SearchIcon className="w-4 h-4" />
      </Button>
    </form>
  )
}
