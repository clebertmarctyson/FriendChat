"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

const SignInButton = () => {
  return (
    <Button
      onClick={async () => {
        await signIn();
      }}
      size={"lg"}
    >
      Sign In With Google
    </Button>
  );
};

export default SignInButton;
