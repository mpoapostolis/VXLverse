import { EditorCanvas } from '@/components/canvas/editor'
import Editor from '@/components/editor'
import { Menu } from '@/components/menu'

export default function Page() {
  return (
    <>
      <header>
        <Menu />
      </header>
      <div className="grid h-full transition-all ease-in  duration-500 lg:grid-cols-[1fr_25vw] xl:grid-cols-[1fr_20vw] w-screen grid-rows-2  grid-flow-col lg:grid-rows-1">
        <EditorCanvas />
        <div className="w-full p-4 h-full overflow-auto pb-12 border-l ">
          <Editor />
        </div>
        <picture className="hidden lg:block absolute bottom-4 left-4 z-50">
          <img loading="lazy" className="w-16 h-16" src="/logo.png" alt="" />
        </picture>
      </div>
    </>
  )
}
