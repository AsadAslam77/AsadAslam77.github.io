import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Background from "@/components/Background";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Asad | Full Stack Developer",
  description:
    "Full stack developer building Next.js and Firebase web apps, Shopify storefronts and React Native apps. Available for freelance projects and full-time roles.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Background />
        {children}
      </body>
    </html>
  );
}
