import { Tooltip as RadixTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function Tooltip(props: { children: React.ReactNode; title: string }) {
  return (
    <TooltipProvider>
      <RadixTooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent>{props.title}</TooltipContent>
      </RadixTooltip>
    </TooltipProvider>
  )
}
