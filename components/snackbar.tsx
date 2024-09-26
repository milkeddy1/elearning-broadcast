"use client";

import React, { useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const snackbarVariants = cva(
  "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-full md:max-w-sm p-4 rounded-lg shadow-lg flex items-center justify-between",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        warning: "bg-yellow-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SnackbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof snackbarVariants> {
  message: string;
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number;
}

export function Snackbar({
  className,
  variant,
  message,
  open,
  onClose,
  autoHideDuration = 5000,
  ...props
}: SnackbarProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [open, onClose, autoHideDuration]);

  if (!open) return null;

  return (
    <div
      className={cn(snackbarVariants({ variant }), className)}
      role="alert"
      {...props}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 p-1 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="關閉通知"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
