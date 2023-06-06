import { Game } from '@/lib/games/types'
import { HeartIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export function GameCard(props: Game) {
  return (
    <div className="w-full h-fit  shadow-lg     relative">
      <div className="h-52  bg-black p-2 relative ">
        <Button className=" text-xs bg-black w-fit rounded-bl-full absolute top-0 right-0 border-b">
          ❤️ <span className="text-xs ml-1 text-muted ">x20 </span>
        </Button>
        <picture>
          <img loading="lazy" src={props.preview} className="w-full object-scale-down  h-full " alt="" />
        </picture>
      </div>
      <div className="p-2 pb-4 h-fit bg-card flex flex-col">
        <div className="flex gap-4 justify-end">
          <h3 className="text-lg capitalize text-secondary font-bold flex">{props?.name ?? '-'}</h3>
          <Button className="w-fit ml-auto " size="sm" variant="ghost">
            <HeartIcon className="w-4 h-4" />
          </Button>{' '}
        </div>
        <span className="text-xs text-muted">{props?.createdBy?.split('@')[0] ?? '-'}</span>
        <p className="text-xs text-foreground my-2 truncate">{props?.description ?? '-'}</p>
        <Separator className="my-2 " />
        <Link target="__blank" className="flex   w-full" href={`/game?id=${props.id}`}>
          <Button className="w-fit ml-auto" variant="secondary">
            Play
          </Button>
        </Link>
      </div>
    </div>
  )
}
