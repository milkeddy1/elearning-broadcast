import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Videos() {
  return (
    <div>
      <Link href="/dashboard">
        <Button>Home</Button>
      </Link>
    </div>
  );
}
