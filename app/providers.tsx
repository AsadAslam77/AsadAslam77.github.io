"use client";

import { ThemeProvider } from "next-themes";

/**
 * next-themes' ThemeProvider uses React context, which only exists in client
 * components. Keeping it in its own file means app/layout.tsx can stay a
 * server component: children are rendered before being passed in, so they do
 * not become client components by sitting inside this one.
 *
 * attribute="class" writes class="dark" on <html>, which is what the .dark
 * token block in globals.css is keyed to.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
