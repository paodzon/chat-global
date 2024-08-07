import { authOptions } from '@/auth'
import { chatMembersCollectionGroupRef } from '@/lib/converters/ChatMembers';
import { getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth'
import React from 'react'
import ChatListRows from './ChatListRows';

export default async function ChatList() {

  const session = await getServerSession(authOptions);

  const chatsSnapshot = await getDocs(chatMembersCollectionGroupRef(session?.user.id!));

  const initialChats = chatsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null
  }))

  return <ChatListRows initialChats={initialChats}/>
}
