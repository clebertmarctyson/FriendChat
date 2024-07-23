import prisma from "@/lib/prisma";

import ConversationItem from "@/components/conversations/ConversationItem";

type ConversationsProps = {
  currentUserId: string;
};

const Conversations = async ({ currentUserId }: ConversationsProps) => {
  const conversations = await prisma.conversation.findMany({
    where: {
      members: {
        some: {
          id: currentUserId,
        },
      },
    },
    include: {
      members: true,
      messages: {
        orderBy: {
          updatedAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <nav className="min-w-56 flex flex-col gap-4 bg-gray-800 text-white p-4 border-r-[1px] border-gray-900">
      <div className="flex gap-2 justify-between items-start">
        <h1 className="font-semibold">Conversations</h1>
      </div>

      <ul className="flex flex-col flex-1 gap-1 box-border overflow-y-auto">
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <ConversationItem conversation={conversation} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Conversations;
