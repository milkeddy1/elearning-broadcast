import { ThemeProvider } from "./providers";
import "./globals.css";
import Header from "@/containers/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div>
            <Header />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
