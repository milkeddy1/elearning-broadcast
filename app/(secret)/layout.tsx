import { ThemeProvider } from "../providers";
import "../globals.css";
import Header from "@/containers/header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}