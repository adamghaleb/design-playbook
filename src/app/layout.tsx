import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { CommandPaletteProvider } from "@/components/command-palette";
import { PageTransition } from "@/components/page-transition";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Design Playbook — 633 UX & Product Design Best Practices",
  description:
    "A curated collection of 633 UX and product design best practices across 27 categories. Search, filter, and explore design principles backed by research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
      >
        <CommandPaletteProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <MobileNav />
            <main className="flex-1 lg:pl-[280px]">
              <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-12">
                <PageTransition>{children}</PageTransition>
              </div>
            </main>
          </div>
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
