'use client'

import { GamepadIcon, LogOut, User } from 'lucide-react'

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
import { useStore } from '@/store'
import { SignedIn, SignedOut, useClerk } from '@clerk/nextjs'

export function Account() {
  const store = useStore()
  const user = store.user
  const clerk = useClerk()
  const userName = clerk.user?.firstName
  const email = clerk.user?.emailAddresses?.at(0)?.emailAddress
  return (
    <>
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button role="menuitem" className="relative  h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={clerk?.user?.imageUrl} alt={user?.email} />
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
              <DropdownMenuItem onClick={() => clerk.openUserProfile()}>
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
                clerk.signOut()
              }}
            >
              <span>Log out</span>
              <DropdownMenuShortcut>
                <LogOut className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>
      <SignedOut>
        <Button
          className="p-0  focus:bg-transparent hover:bg-transparent hover:text-secondary"
          role="menuitem"
          aria-label="Sign in"
          variant="ghost"
          onClick={() => {
            clerk.openSignIn()
          }}
        >
          Sign in
        </Button>
      </SignedOut>
    </>
  )
}
