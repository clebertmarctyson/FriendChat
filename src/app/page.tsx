import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";

import prisma from "@/lib/prisma";

const Home = async () => {
  const session = await getAuthSession();

  const conversation = await prisma.conversation.findMany({
    where: {
      members: {
        some: {
          id: session?.user?.id,
        },
      },
    },
    include: {
      members: true,
      messages: true,
    },
  });

  if (conversation.length > 0) {
    redirect(`/${conversation[0].id}`);
  }

  return (
    <section className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-gray-400 font-semibold">
          Select a user to start a conversation
        </h1>
      </div>
    </section>
  );
};

export default Home;
