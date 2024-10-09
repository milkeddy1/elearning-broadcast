import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/dashboard/videos">
        <Button>Videos</Button>
      </Link>
    </div>
  );
}
