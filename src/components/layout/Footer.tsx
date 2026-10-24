import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1120px] px-4 pb-10 pt-6 sm:px-6 md:px-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--glass-border)] pt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-5">
          <Link href="/">Home</Link>
          <Link href="/experience/">Experience</Link>
          <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
      </div>
    </footer>
  );
}