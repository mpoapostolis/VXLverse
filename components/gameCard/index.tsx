'use client'

import { Game } from '@/lib/games/types'
import { cn } from '@/lib/utils'
import { useStore } from '@/store'
import { EditIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

export function GameCard(
  props: Game & {
    ownership?: boolean
    createdBy?: string
  },
) {
  const store = useStore()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn('w-full   h-fit  shadow-lg    relative')}>
            <div className="h-52  bg-black p-2">
              <Link
                aria-label="edit game"
                className={cn('absolute right-0 z-30 top-0 w-fit', {
                  hidden: !props.ownership,
                })}
                onClick={() => store.setGame(props)}
                href={`/editor`}
              >
                <Button aria-label="edit game" role="button" size="sm" variant="secondary" className="w-full">
                  <EditIcon className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </Link>
              <picture>
                <img
                  loading="eager"
                  src={props.preview ? `${props.preview}?thumb=190x190` : `/logo.webp`} // Placeholder image
                  data-src={props.preview ?? '/logo.webp'} // High-quality image
                  className="w-full object-scale-down  h-full "
                  alt="game preview"
                />
              </picture>
            </div>
            <div className="p-2 pb-4 h-fit bg-card flex flex-col">
              <div className="flex gap-4 items-center justify-end">
                <h1 className="text-lg capitalize text-secondary truncate w-full font-bold">{props?.name ?? '-'}</h1>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-thin">{props?.createdBy ?? '-'}</span>
                {/*
                  No likes yet :( please implement this feature if you want to see this icon :)
                <Button aria-label="favorite" className="w-fit ml-auto " size="sm" variant="ghost">
                  <HeartIcon className="w-4 h-4" />
                  <span className="text-xs font-thin ml-2">0 Likes</span>
                </Button> */}
              </div>
              <p className="text-xs text-foreground  my-3 line-clamp-1">{props?.description ?? '-'}</p>
              <div className="flex mt-3">
                <Button size="sm" className="w-fit rounded-full border " variant="default">
                  <Link href={`/?genre=${props.id}`}>{props.genre}</Link>
                </Button>

                <Link className="flex w-full" href={`/game?id=${props.id}`}>
                  <Button size="sm" className="w-fit rounded-full  ml-auto" variant="secondary">
                    Play
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="w-72 text-base text-foreground ">
          <h1 className="text-lg capitalize text-secondary font-bold flex text-justifys">{props?.name ?? '-'}</h1>
          <Separator className="my-2" />
          <p className="flex text-justify">{props?.description ?? '-'}</p>
          <br />
          <div className="grid grid-cols-2">
            <span className="font-thin">Genre:</span>
            <span className="font-semibold">{props?.genre ?? '-'}</span>
            <span className="font-thin">Created By:</span>
            <span className="font-semibold">{props?.owner?.name ?? '-'}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
