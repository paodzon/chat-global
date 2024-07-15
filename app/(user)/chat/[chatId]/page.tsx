import { authOptions } from "@/auth";
import AdminControls from "@/components/chat/AdminControls";
import ChatInput from "@/components/chat/ChatInput";
import ChatMembersBadges from "@/components/chat/ChatMembersBadges";
import ChatMessages from "@/components/chat/ChatMessages";
import { chatMembersRef } from "@/lib/converters/ChatMembers";
import { sortedMessagesRef } from "@/lib/converters/Message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatPage({ params: { chatId } }: ChatPageProps) {

  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map((doc) => doc.data());

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs.map((doc) => doc.id).includes(session?.user.id);

  if(!hasAccess) redirect("/chat?error=permission")

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
