import React from "react";
import MenuButton from "@/components/menu-button";
import ThemeButton from "@/components/theme-button";

import UserMenu from "@/hooks/user-menu";

export default function Header() {
  return (
    <header className="p-4 flex justify-between items-center bg-background w-full">
      <div className="flex items-center">
        <MenuButton />
      </div>
      <div className="flex items-center space-x-4 gap-4">
        <ThemeButton />
        <UserMenu />
      </div>
    </header>
  );
}
