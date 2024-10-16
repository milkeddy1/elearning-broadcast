import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VideoList from "@/components/video-list";
import React from "react";

export default function Videos() {
  return (
    <div className="flex flex-col gap-4 w-full p-16">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold mb-6">影片列表</h1>
        <Button>重新整理</Button>
      </div>

      <div>
        <Input className="w-[240px]" placeholder="搜尋影片" />
      </div>

      <div>
        <VideoList />
      </div>
    </div>
  );
}
