import { Loader2 } from 'lucide-react'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="animate-pulse flex">
        <Loader2 className="animate-spin mr-1" />
        Please wait... <br />
      </div>
    </div>
  )
}
