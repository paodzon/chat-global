import ChatList from '@/components/chat/ChatList';
import React from 'react'

interface ChatsPageProps{
  params: {};
  searchParams: {error: string};
}

export default function ChatsPage({params, searchParams : { error }} : ChatsPageProps) {
  return (
    <div>
      {/* Chat Permission chat */}

      {/* ChatList */}
      <ChatList/>
    </div>
  )
}
