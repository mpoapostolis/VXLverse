import { EditorCanvas } from '@/components/canvas/editor'
import Editor from '@/components/editor'
import { Menu } from '@/components/menu'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'VXLverse',
  description:
    'VXLverse is a revolutionary online platform designed to empower users to both create and play a wide variety of RPG games. Our mission is to provide an interactive and engaging space for game enthusiasts, offering them the opportunity to showcase their creativity and be rewarded for it.',
  keywords: 'Game Development, RPG, VXLverse, 3D Modeling, Game Design, IndieDev, Gaming',
}

export default function Page() {
  return (
    <>
      <header>
        <Menu />
      </header>

      <div
        className={cn(
          'grid h-full w-screen transition duration-150 lg:grid-cols-[1fr_25vw] xl:grid-cols-[1fr_20vw]  grid-rows-2 gap-4 lg:gap-0 lg:grid-rows-1',
        )}
      >
        <EditorCanvas />
        <Editor />
        <picture className="hidden lg:block absolute bottom-4 left-4 z-50">
          <img className="w-16 h-16" src="/logo.svg" alt="" />
        </picture>
      </div>
    </>
  )
}
