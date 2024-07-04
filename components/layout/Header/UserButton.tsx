"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

interface UserButtonProps {
  session : Session | null
}

export default function UserButton({session}: UserButtonProps) {

  if(!session) return (
    <Button variant="outline" onClick={() => signIn()}>
      Sign In
    </Button>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger><UserAvatar name={session.user?.name || ''} image={session.user?.image || ''}/></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
