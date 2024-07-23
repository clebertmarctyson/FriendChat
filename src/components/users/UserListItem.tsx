"use client";

import { User } from "@prisma/client";

import { createConversation } from "@/lib/actions";

type UserListItemProps = {
  user: User;
};

const UserListItem = ({ user }: UserListItemProps) => {
  return (
    <li
      key={user.id}
      className="flex items-center cursor-pointer bg-gray-700 p-2 text-sm border-b-[1px] border-gray-900"
      onClick={() => createConversation(user?.id)}
    >
      <span className="mr-2">{user.name}</span>
    </li>
  );
};

export default UserListItem;
