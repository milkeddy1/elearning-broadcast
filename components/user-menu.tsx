"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

export default function UserMenu({ name }: { name: string }) {
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  };

  // first letter of the name

  function getFirstLetter(name: string) {
    if (!name) return "U";
    const trimmedName = name.trim();

    return trimmedName[0].toUpperCase();
  }

  const firstLetter = getFirstLetter(name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative rounded-full px-[4px] py-4px]">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">用戶名稱</p>
            <p className="text-xs leading-none text-muted-foreground">{name}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>登出</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
