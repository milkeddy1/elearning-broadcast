import { ThemeProvider } from "./providers";
import React from "react";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div>
            <NextTopLoader color="#208AB2" />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
