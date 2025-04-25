"use client";

import { useLogin } from "@/lib/auth/hook";
// TODO:
import { Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/primitive/avatar";
import { Button } from "@repo/ui/primitive/button";

export default function Page() {
  const { signIn, signOut, status, data } = useLogin();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {status === "loading" ? "loading..." : null}

      {status === "authenticated" ? (
        <div className="flex flex-col items-center gap-2">
          <span>Logged in as</span>

          <Avatar>
            <AvatarImage src={data?.user?.image ?? undefined} />
            <AvatarFallback>{data?.user?.name}</AvatarFallback>
          </Avatar>

          <div className="font-bold">{data?.user?.name}</div>
        </div>
      ) : null}

      {status === "unauthenticated" ? (
        <Button
          className="flex items-center gap-2"
          onClick={signIn}
          variant="outline"
        >
          <Github className="h-4 w-4" />
          Sign in with GitHub
        </Button>
      ) : null}

      <Button onClick={signOut} variant="outline">
        Sign out
      </Button>
    </div>
  );
}
