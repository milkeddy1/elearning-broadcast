import "../globals.css";
import ThemeButton from "@/components/theme-button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="p-4 flex justify-end items-center bg-background fixed w-full">
        <div className="flex items-center space-x-4 gap-4">
          <ThemeButton />
        </div>
      </header>
      {children}
    </div>
  );
}
