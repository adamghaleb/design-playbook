import type { Metadata } from "next";
import { EB_Garamond, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
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
  title: "The Ultimate Playbook",
  description:
    "Research-backed playbooks for building better everything. Design, engineering, and product best practices.",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
