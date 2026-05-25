import type { Metadata } from "next";
import { StoreProvider } from "@/lib/store";
import { TopNav } from "@/components/shell/TopNav";
import { SideNav } from "@/components/shell/SideNav";
import { BottomNav } from "@/components/shell/BottomNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "daily.dev Learning Sprints",
  description: "Turn passive saved articles into active, gamified learning sprints",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="min-h-full flex flex-col bg-bg-base text-on-surface custom-scrollbar" suppressHydrationWarning>
        <StoreProvider>
          <TopNav />
          <div className="flex flex-col min-h-screen">
            <SideNav />
            <div className="flex-1 w-full">
              {children}
            </div>
          </div>
          <BottomNav />
        </StoreProvider>
      </body>
    </html>
  );
}
