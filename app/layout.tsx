import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import ThemeToggle from "@/components/ui/theme-toggle";


import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepWise",
  description: "An AI-powered platform for preparing for mock interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
  className={`
    ${monaSans.className}
    bg-[var(--bg-main)] text-[var(--text-main)]
    dark:pattern dark:bg-black dark:text-white
  `}
>

        
        {/* Top Right Theme Button */}
        <div className="flex justify-end p-4">
          <ThemeToggle />
        </div>

        {children}

        <Toaster />
      </body>
    </html>
  );
}
