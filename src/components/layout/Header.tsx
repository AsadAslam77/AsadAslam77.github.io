import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-4 z-50 mx-auto mt-6 w-full max-w-[1120px] px-6 md:px-12">
      <div className="glass flex items-center justify-between rounded-full py-3 pl-7 pr-4">
        <a href="#" className="font-display font-medium !text-fg no-underline">
          asaddev.me
        </a>
        <nav className="hidden gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="!text-fg no-underline hover:!text-highlight">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full bg-accent px-[22px] py-2.5 font-medium !text-on-accent no-underline"
          >
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}