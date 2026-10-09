import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import Background from "@/components/Background";
import "./globals.css";

/**
 * next/font downloads these at build time and writes them into
 * out/_next/static/media/, so the browser never contacts Google.
 *
 * `weight` is given explicitly, which loads static cuts of only the weights
 * the design uses. Leaving it out would load the variable font instead: one
 * larger file covering every weight from 300 to 900.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-geist",
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
      // Each font's `.variable` is a generated class that defines its CSS
      // variable. Putting both on <html> makes --font-space-grotesk and
      // --font-geist available to every element on the page.
      className={`${spaceGrotesk.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Background />
        {children}
      </body>
    </html>
  );
}
