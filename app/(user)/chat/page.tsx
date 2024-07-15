import ChatList from '@/components/chats/ChatList';
import ChatPermissionError from '@/components/chats/ChatPermissionError';
import React from 'react'

interface ChatsPageProps {
  params: {};
  searchParams: { error: string };
}

export default function ChatsPage({ params, searchParams: { error } }: ChatsPageProps) {
  return (
    <div>
      {/* Chat Permission chat */}
      {error && (
        <div className='m-2'>
          <ChatPermissionError />
        </div>
      )}
      {/* ChatList */}
      <ChatList />
    </div>
  )
}
