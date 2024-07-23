"use client";

import { Conversation, Message, User } from "@prisma/client";

import MessageItem from "@/components/messages/MessageItem";

import { useSession } from "next-auth/react";

type Props = {
  conversation: Conversation & {
    members: User[];
    messages: (Message & { sender: User })[];
  };
};

const MessageList = ({ conversation }: Props) => {
  const { data } = useSession();

  return (
    <ul className="flex flex-col flex-1 gap-1 p-4 box-border overflow-y-auto">
      {conversation?.messages.map((message) => (
        <MessageItem
          key={message?.id}
          message={message}
          currentUserId={data?.user?.id as string}
        />
      ))}
    </ul>
  );
};

export default MessageList;
