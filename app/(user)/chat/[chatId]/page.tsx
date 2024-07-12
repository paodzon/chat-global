import { authOptions } from "@/auth";
import AdminControls from "@/components/chat/AdminControls";
import ChatInput from "@/components/chat/ChatInput";
import ChatMembersBadges from "@/components/chat/ChatMembersBadges";
import ChatMessages from "@/components/chat/ChatMessages";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import React from "react";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatPage({ params: { chatId } }: ChatPageProps) {

  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map((doc) => doc.data());

  return (
    <>
      {/* Admin Controls */}
      <AdminControls chatId={chatId} />

      {/* Chat Members Badge */}
      <ChatMembersBadges chatId={chatId} />

      {/* Chat Messages */}
      <ChatMessages
        chatId={chatId}
        session={session}
        initialMessages={initialMessages}
      />

      {/* Chat Input */}
      <ChatInput chatId={chatId} />
    </>
  );
}
