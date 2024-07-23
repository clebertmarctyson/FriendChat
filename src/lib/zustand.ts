import { Conversation, User } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  selectedConversation: Conversation | null;
  selectedUserToChat: User | null;
  setSelectedUserToChat: (user: User) => void;
  setSelectedConversation: (conversation: Conversation) => void;
};

export const useStore = create(
  persist<State>(
    (set) => ({
      selectedUserToChat: null,
      selectedConversation: null,
      setSelectedUserToChat: (user) => set({ selectedUserToChat: user }),
      setSelectedConversation: (conversation) =>
        set({ selectedConversation: conversation }),
    }),
    {
      name: "chat-app",
    }
  )
);
