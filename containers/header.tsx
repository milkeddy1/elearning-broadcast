import React from "react";
import MenuButton from "@/components/menu-button";
import ThemeButton from "@/components/theme-button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

export default function Header({ isLoggedIn = true }) {
  return (
    <header className="p-4 flex justify-between items-center bg-background fixed w-full">
      <div className="flex items-center">{isLoggedIn && <MenuButton />}</div>
      <div className="flex items-center space-x-4">
        <ThemeButton />
        {isLoggedIn && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">John Doe</span>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </header>
  );
}
