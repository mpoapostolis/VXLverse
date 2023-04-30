import { cn } from '@/lib/utils'
import { useStore } from '@/store'
import { X } from 'lucide-react'

export function Dialogue() {
  const store = useStore()

  return (
    <div
      className={cn('fixed bottom-0 left-0 z-50 w-full  p-4', {
        hidden: !store.dialogue,
      })}
    >
      <div className=" w-full grid grid-cols-[100px_1fr] relative rounded  gap-4 bg-black bg-opacity-70 p-4 text-white">
        <picture className="h-24 border bg-black flex justify-center">
          <img className="object-contain h-full" src={store.dialogue?.src} alt="" />
        </picture>
        <div className="text-lg w-full">{store.dialogue?.dialogue}</div>
        <X onClick={() => store.setDialogue(undefined)} className="absolute top-4 right-4 h-4 w-4" />
      </div>
    </div>
  )
}
