"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Conversation, Message, User } from "@prisma/client";
import { useSession } from "next-auth/react";

type Props = {
  conversation: Conversation & {
    members: User[];
    messages: (Message & { sender: User })[];
  };
};

const ChatHeader = ({ conversation }: Props) => {
  const session = useSession();

  const selectedUserToChat = conversation?.members.find(
    (member) => member.id !== session.data?.user?.id
  );

  return (
    <header className="p-4 border-b-[1px] border-gray-900 flex justify-between items-start">
      <h1 className="font-semibold">Chat</h1>

      {selectedUserToChat && (
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage
              src={selectedUserToChat.image!}
              alt={selectedUserToChat.name!}
            />
            <AvatarFallback>{selectedUserToChat.name}</AvatarFallback>
          </Avatar>
        </div>
      )}
    </header>
  );
};

export default ChatHeader;
