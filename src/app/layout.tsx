import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

import Providers from "@/components/providers";

import Conversations from "@/components/conversations/Conversations";
import UserList from "@/components/users/UserList";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FriendChat",
  description: "A chat app for friends to connect and chat.",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <main className="flex overflow-hidden w-full h-screen bg-gray-900">
            <Conversations currentUserId={session?.user?.id} />
            {children}
            <UserList currentUser={session?.user!} />
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
