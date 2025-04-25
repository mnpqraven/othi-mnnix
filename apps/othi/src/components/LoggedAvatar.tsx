import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/primitive/avatar";
import { Button } from "@repo/ui/primitive/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/primitive/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

// TODO: see if this can be a server component
export function LoggedAvatar() {
  const { status, data } = useSession();
  // TODO: loading
  if (status !== "authenticated") return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-auto rounded-full p-1" variant="ghost">
          <Avatar>
            {data.user?.image ? <AvatarImage src={data.user.image} /> : null}

            <AvatarFallback>{data.user?.name?.at(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{data.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            void signOut();
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
