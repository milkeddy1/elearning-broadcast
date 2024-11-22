import VideoList from "@/components/video-list";
import React from "react";

export default function Videos() {
  return (
    <div className="flex flex-col gap-4 w-full p-16">
      <div>
        <VideoList />
      </div>
    </div>
  );
}
