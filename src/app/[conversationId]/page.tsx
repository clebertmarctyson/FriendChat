import prisma from "@/lib/prisma";

import ChatHeader from "@/components/chat/ChatHeader";
import ChatForm from "@/components/chat/ChatForm";
import MessageList from "@/components/messages/MessageList";

type ChatProps = {
  params: {
    conversationId: string;
  };
};

const Chat = async ({ params: { conversationId } }: ChatProps) => {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
    },
    include: {
      members: true,
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        include: {
          sender: true,
        },
      },
    },
  });

  return (
    <section className="flex-1 flex flex-col bg-gray-800 text-white">
      <ChatHeader conversation={conversation!} />
      <MessageList conversation={conversation!} />
      <ChatForm conversationId={conversationId} />
    </section>
  );
};

export default Chat;
