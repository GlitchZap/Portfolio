import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingDock from "./components/ui/FloatingDock";
import InteractiveCursor from "./components/ui/InteractiveCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aayush Patel | Full Stack Developer",
  description: "Portfolio of Aayush Patel, a full stack developer specializing in React, Next.js, and Node.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-gray-100 min-h-screen`}>
        <FloatingDock />
        <InteractiveCursor />
        {children}
      </body>
    </html>
  );
}