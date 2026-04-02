import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Games Next JS",
  description: "Welcome to Games Next JS, your ideal space to explore the world of video games",
  icons: {
    icon: "/logo.ico",
    apple: "/logo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><StackProvider app={stackClientApp}><StackTheme>
        <Toaster
          theme="dark"
          richColors
          closeButton
          toastOptions={{
            style: { background: '#1d232a', border: '1px solid rgba(255,255,255,0.1)' }
          }}
        />
        {children}
      </StackTheme></StackProvider></body>
    </html>
  );
}
