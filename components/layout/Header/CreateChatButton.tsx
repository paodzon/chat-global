"use client";

import { Button } from '@/components/ui/button'
import { MessageSquarePlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CreateChatButton() {
  const router = useRouter()

  const createNewChat = async() => {
    router.push('/chat/abc')
  }

  return (
    <Button onClick={createNewChat} variant="ghost">
      <MessageSquarePlusIcon />
    </Button>
  )
}
