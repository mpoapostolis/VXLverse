'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePb } from '@/hooks/usePb'
import { GamepadIcon, LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Account() {
  const router = useRouter()
  const pb = usePb()
  const user = pb?.authStore.model ?? null
  const userName = user?.name
  const email = user?.email

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger role="menuitem" asChild>
        <Button role="menuitem" className="relative  h-8 w-8 rounded-full">
          <Avatar role="img" className="h-8 w-8">
            <AvatarImage src={user?.avatar_url} alt={user?.email} />
            <AvatarFallback>{user?.email}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Profile</span>
            <DropdownMenuShortcut>
              <User className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <span>Games</span>
            <DropdownMenuShortcut>
              <GamepadIcon className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            pb?.authStore.clear()
            router.refresh()
          }}
        >
          <span>Log out</span>
          <DropdownMenuShortcut>
            <LogOut className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button
      className="p-0  focus:bg-transparent hover:bg-transparent hover:text-secondary"
      role="menuitem"
      aria-label="Sign in"
      variant="ghost"
      onClick={async () => {
        await pb
          ?.collection('users')
          .authWithOAuth2({
            provider: 'google',
          })
          .then(async (res) => {
            if (res.meta?.isNew)
              await pb?.collection('users').update(res?.record?.id, {
                name: res?.meta?.name,
                email: res?.meta?.email,
                avatar_url: res?.meta?.avatarUrl,
              })
            router.refresh()
          })
      }}
    >
      Sign in
    </Button>
  )
}
