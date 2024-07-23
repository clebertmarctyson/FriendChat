"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import { sendMessage } from "@/lib/actions";

type ChatFormProps = {
  conversationId: string;
};

const ChatForm = ({ conversationId }: ChatFormProps) => {
  const formSchema = z.object({
    message: z.string().min(1, "You cannot send an empty message."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async ({ message }: z.infer<typeof formSchema>) => {
    await sendMessage({ message, conversationId });

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-2 p-4"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Type your message here..."
                  {...field}
                  className="text-sm border-none outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size={"icon"}>
          <SendIcon />
        </Button>
      </form>
    </Form>
  );
};

export default ChatForm;
