import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import Background from "@/components/Background";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import { Providers } from "./providers";
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
      // next-themes sets the theme class on <html> from an inline script that
      // runs before first paint, so the DOM differs from the server HTML on
      // this one element. This tells React to allow that here and only here.
      suppressHydrationWarning
    >
      {/* relative, so Background can be absolutely positioned over the
          whole document rather than fixed to the viewport. */}
      <body className="relative min-h-full flex flex-col">
        <Providers>
          {/* First in the DOM, so it is the first stop in the tab order. */}
          <SkipLink />
          <Background />
          <Header />
          {/* tabIndex={-1} makes <main> focusable by script but not by
              tabbing. Without it the skip link only scrolls the page in some
              browsers, leaving focus behind in the header. */}
          <main id="main" tabIndex={-1} className="flex-1">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
