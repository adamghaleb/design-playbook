import type { Metadata } from "next";
import { EB_Garamond, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { CommandPaletteProvider } from "@/components/command-palette";
import { PageTransition } from "@/components/page-transition";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const bethany = localFont({
  src: "./fonts/BethanyElingston.otf",
  variable: "--font-bethany",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Design Playbook — 633 UX & Product Design Best Practices",
  description:
    "A curated collection of 633 UX and product design best practices across 27 categories. Search, filter, and explore design principles backed by research.",
};

const themeScript = `(function(){try{var t=localStorage.getItem('dp-theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark')}else{document.documentElement.setAttribute('data-theme','light')}}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${garamond.variable} ${jetbrains.variable} ${bethany.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <CommandPaletteProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <MobileNav />
              <main className="flex-1 lg:pl-[280px]">
                <div className="mx-auto max-w-5xl px-8 py-16 sm:px-10 lg:px-16">
                  <PageTransition>{children}</PageTransition>
                </div>
              </main>
            </div>
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
