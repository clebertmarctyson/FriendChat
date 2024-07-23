import prisma from "@/lib/prisma";

import { User } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Menu from "@/components/Menu";

import UserListItem from "@/components/users/UserListItem";

type UserListProps = {
  currentUser: User;
};

const UserList = async ({ currentUser }: UserListProps) => {
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        id: currentUser.id,
      },
      conversations: {
        none: {
          members: {
            some: {
              id: currentUser.id,
            },
          },
        },
      },
    },
  });

  return (
    <nav className="w-56 flex flex-col gap-4 bg-gray-800 text-white overflow-y-auto p-4 border-l-[1px] border-gray-900">
      <div className="flex gap-2 justify-between items-start">
        <h1 className="font-semibold">Users</h1>

        <Menu>
          <Avatar>
            <AvatarImage src={currentUser.image!} alt={currentUser.name!} />
            <AvatarFallback>{currentUser.name}</AvatarFallback>
          </Avatar>
        </Menu>
      </div>

      <ul className="flex flex-col">
        {users.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </ul>
    </nav>
  );
};

export default UserList;
