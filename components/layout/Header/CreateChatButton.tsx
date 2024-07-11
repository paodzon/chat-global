"use client";

import Loader from '@/components/common/Loader';
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import { addChatRef } from '@/lib/converters/ChatMembers';
import { useSubscriptionStore } from '@/store/store';
import { serverTimestamp, setDoc } from 'firebase/firestore';
import { MessageSquarePlusIcon } from 'lucide-react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

interface CreateChatButtonProps {
  isLarge?: boolean
}

export default function CreateChatButton({ isLarge }: CreateChatButtonProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {

    if(!session?.user.id) return;

    setLoading(true);
    toast({
      title: "Creating new chat...",
      description: "Hold tight while we create your new chat...",
      duration: 3000
    });

    // TODO: Check if user is pro and limit them creating a new chat

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id,
      email: session.user.email,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || ""
    }).then(() => {
      toast({
        title: "Success",
        description: "Your chat has been created!",
        className: "bg-green-600 text-white",
        duration: 2000
      });
      router.push(`/chat/${chatId}`)
    }).catch((error) => {
      console.error(error);
      toast({
        title: "Error",
        description: "There was an error creating your chat!",
        variant: 'destructive'
      });
    }).finally(() => {
      setLoading(false)
    });

  }

  if (isLarge) {
    return (
      <div>
        <Button variant={'default'} onClick={createNewChat}>
          {loading ? <Loader /> : "Create a New Chat"}
        </Button>
      </div>)
  }

  return (
    <Button onClick={createNewChat} variant="ghost">
      <MessageSquarePlusIcon />
    </Button>
  )
}
