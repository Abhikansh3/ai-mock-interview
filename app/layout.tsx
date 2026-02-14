import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monasans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prepwise",
  description: "An ai-powered platform for preparing for mock interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monasans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
