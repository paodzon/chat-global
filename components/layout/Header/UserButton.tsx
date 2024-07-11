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
import { useSubscriptionStore } from "@/store/store";

interface UserButtonProps {
  session : Session | null
}

export default function UserButton({session}: UserButtonProps) {
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isActive = subscription?.status === "active";


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

        <DropdownMenuLabel>{isActive && <p className="text-indigo-400 font-extrabold">★ Pro Tier</p> }</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {}}>Manage Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
