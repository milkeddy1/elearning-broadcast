"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";

const menuList = [
  { title: "首頁", href: "/dashboard" },
  { title: "影片列表", href: "/dashboard/videos" },
];

export default function MenuButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>莘莘學院</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <SheetDescription>
          <div className="flex flex-col gap-2">
            {menuList.map((menu) => {
              return (
                <Button
                  key={menu.href}
                  style={{ width: "100%", justifyContent: "start" }}
                  variant="ghost"
                  className={clsx(menu.href === pathname && "bg-accent")}
                  onClick={handleLinkClick}
                >
                  <Link style={{ width: "100%", textAlign: "start" }} href={menu.href}>
                    {menu.title}
                  </Link>
                </Button>
              );
            })}
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
