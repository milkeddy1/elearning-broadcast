import "../globals.css";
import Header from "@/containers/header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>
        <Header />
      </div>
      {children}
    </div>
  );
}
