"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, Menu, X } from "lucide-react";

export default function MenuButton() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMenuOpen(!menuOpen)}
        className="mr-2"
      >
        {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">切換選單</span>
      </Button>
      {menuOpen && (
        <nav className="w-64 bg-secondary p-4 space-y-2 absolute">
          <Link
            href="/dashboard"
            className="block py-2 px-4 hover:bg-primary/10 rounded-md"
          >
            儀表板
          </Link>
          <Link
            href="/profile"
            className="block py-2 px-4 hover:bg-primary/10 rounded-md"
          >
            個人資料
          </Link>
          <Link
            href="/settings"
            className="block py-2 px-4 hover:bg-primary/10 rounded-md"
          >
            設置
          </Link>
          <Link
            href="/logout"
            className="block py-2 px-4 hover:bg-primary/10 rounded-md text-red-500"
          >
            登出
          </Link>
        </nav>
      )}
    </div>
  );
}
