"use client";

import { formatDateTime } from "@/lib";

import { Conversation, Message, User } from "@prisma/client";

import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  conversation: Conversation & {
    members: User[];
    messages: Message[];
  };
};

const ConversationItem = ({ conversation }: Props) => {
  const { data } = useSession();

  const userConversation = conversation.members.find(
    (member) => member.id !== data?.user?.id
  );

  return (
    <Link
      href={conversation?.id}
      className="flex justify-between cursor-pointer bg-gray-700 p-2 gap-1 text-sm border-b-[1px] border-gray-900"
    >
      <div className="flex flex-col">
        <p className="mr-2 capitalize">
          {userConversation?.name?.length! > 15
            ? `${userConversation?.name?.slice(0, 15)}...`
            : userConversation?.name}
        </p>
        <div>
          {conversation?.messages?.length > 0 && (
            <p className="block text-xs text-gray-400">
              {conversation.messages[0].content?.length > 15
                ? `${conversation.messages[0].content.slice(0, 15)}...`
                : conversation.messages[0].content}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-400">
          {formatDateTime(
            conversation?.messages[0]?.createdAt || conversation?.createdAt
          )}
        </span>
      </div>
    </Link>
  );
};

export default ConversationItem;
