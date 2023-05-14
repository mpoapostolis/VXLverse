'use client'

import { EditorCanvas } from '@/components/canvas/editor'
import Editor from '@/components/editor'
import { Flow } from '@/components/story'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function EditorLayout() {
  const [type, setType] = useState<'inspector' | 'story'>('story')
  const setInspector = () => setType('inspector')
  const setStory = () => setType('story')
  const isEditor = type === 'inspector'
  const isStory = type === 'story'

  return (
    <div
      className={cn(
        'grid h-full transition-all ease-in  duration-500 w-screen grid-rows-2  grid-flow-col lg:grid-rows-1',
        {
          ' lg:grid-cols-[1fr_25vw] xl:grid-cols-[1fr_20vw]': isEditor,
          ' lg:grid-cols-2 xl:grid-cols-2': isStory,
        },
      )}
    >
      <EditorCanvas />
      <div className="w-full border-l">
        <Tabs
          onChange={(e) => console.log(e)}
          defaultValue="inspector"
          className="lg:h-screen w-full bg-mauve4  overflow-auto relative "
        >
          <TabsList className="sticky border-t lg:border-t-0 border-b top-0 z-50 w-full">
            <TabsTrigger
              onClick={setInspector}
              className="w-full border-r data-[state=active]:bg-muted"
              value="inspector"
            >
              Inspector
            </TabsTrigger>
            <TabsTrigger onClick={setStory} className="w-full border-r data-[state=active]:bg-muted" value="story">
              Story
            </TabsTrigger>
          </TabsList>
          <TabsContent className="p-2 pb-12" value="inspector">
            <Editor />
          </TabsContent>
          <TabsContent className="p-2 pb-12" value="story">
            <Flow />
          </TabsContent>
        </Tabs>
      </div>
      <picture className="hidden lg:block absolute bottom-4 left-4 z-50">
        <img className="w-16 h-16" src="/logo.svg" alt="" />
      </picture>
    </div>
  )
}
