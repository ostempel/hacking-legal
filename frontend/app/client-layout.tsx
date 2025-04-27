"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarLayoutWrapper>{children}</SidebarLayoutWrapper>
    </ThemeProvider>
  );
}

// Client component to conditionally render the sidebar
function SidebarLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show sidebar on the root page (mode selection)
  if (pathname === "/") {
    return children;
  }

  // Show sidebar on all other pages
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
