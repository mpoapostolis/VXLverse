import EditorLayout from '@/components/layout/editorLayout'
import { Menu } from '@/components/menu'

export default function Page() {
  return (
    <>
      <header>
        <Menu />
      </header>
      <EditorLayout />
    </>
  )
}
