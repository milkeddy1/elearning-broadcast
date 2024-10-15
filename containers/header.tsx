"use client";

import React from "react";
import MenuButton from "@/components/menu-button";
import ThemeButton from "@/components/theme-button";
import UserMenu from "@/components/user-menu";
import { useQuery } from "@tanstack/react-query";
import { clientAxiosInstance } from "@/app/api";

export default function Header() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await clientAxiosInstance.get("/api/me");
      return res.data;
    },
  });

  return (
    <header className="p-4 flex justify-between items-center bg-background w-full">
      <div className="flex items-center">
        <MenuButton />
      </div>
      <div className="flex items-center space-x-4 gap-4">
        <ThemeButton />
        <UserMenu name={data.name} />
      </div>
    </header>
  );
}
