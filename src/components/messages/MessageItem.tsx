"use client";

import { formatDateTime } from "@/lib";
import { translateText } from "@/lib/actions";
import { Message, User } from "@prisma/client";
import { Languages } from "lucide-react";
import { useState } from "react";
import { set } from "react-hook-form";

type Props = {
  message: Message & {
    sender: User;
  };

  currentUserId: string;
};

const MessageItem = ({ message, currentUserId }: Props) => {
  const [translateValue, setTranslateValue] = useState<string>("");

  return (
    <li
      key={message.id}
      className={`flex gap-2 ${
        message?.sender?.id === currentUserId ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-56 flex flex-col p-2 gap-1 ${
          message?.sender?.id === currentUserId ? "bg-gray-900" : "bg-gray-700"
        }`}
      >
        <p className="text-sm">
          {translateValue ? (
            <span className="text-xs text-gray-400">({translateValue})</span>
          ) : (
            message?.content
          )}
        </p>
        <span className="text-xs font-bold self-end">
          {message?.sender?.name}
        </span>
        <span className="text-xs text-gray-400 self-end">
          <span>{formatDateTime(message?.createdAt)}</span>
        </span>

        <span
          onClick={async () => {
            const translatedValue = await translateText(message?.content, "es");
            setTranslateValue(translatedValue);
          }}
          className="cursor-pointer"
        >
          <Languages />
        </span>
      </div>
    </li>
  );
};

export default MessageItem;
