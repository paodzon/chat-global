"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

interface SignInBtnProps {
  text: string;
  className?: string;
}

export default function SignInBtn({ text, className }: SignInBtnProps) {
  return (
    <Button
      onClick={() => signIn()}
      className={
        className
          ? className
          : "w-full mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      }
    >
      {text}
    </Button>
  );
}
