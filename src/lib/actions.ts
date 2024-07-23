"use server";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { v2 } from "@google-cloud/translate";

type SendMessageProps = {
  message: string;
  conversationId: string;
};

export const sendMessage = async ({
  message,
  conversationId,
}: SendMessageProps) => {
  const session = await getAuthSession();

  await prisma.message.create({
    data: {
      content: message,
      conversationId: conversationId,
      userId: session?.user?.id as string,
    },
  });

  revalidatePath("/");
};

export const createConversation = async (selectedUserId: string) => {
  const session = await getAuthSession();

  const conversation = await prisma.conversation.create({
    data: {
      members: {
        connect: [
          {
            id: session?.user?.id as string,
          },
          {
            id: selectedUserId,
          },
        ],
      },
    },
  });

  redirect(`/${conversation?.id}`);
};

export const findConversationByMembers = async (selectedUserId: string) => {
  const session = await getAuthSession();

  const conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          members: {
            some: {
              id: session?.user?.id as string,
            },
          },
        },
        {
          members: {
            some: {
              id: selectedUserId,
            },
          },
        },
      ],
    },
  });

  return conversation;
};

export const translateText = async (text: string, target: string) => {
  const translate = new v2.Translate({
    projectId: process.env.GOOGLE_PROJECT_ID,
  });

  const [translation] = await translate.translate(text, target);

  return translation;
};
