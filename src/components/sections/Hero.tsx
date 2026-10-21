import Chip from "@/components/ui/Chip";

export default function Hero() {
  return (
    <section className="grid items-center gap-10 pb-20 pt-14 sm:pt-20 md:grid-cols-[1.3fr_1fr] md:gap-12 md:pb-28">
      <div>
        <h1 className="font-display text-[44px] font-bold leading-none tracking-[-0.03em] sm:text-7xl lg:text-[88px]">
          Muhammad Asad
        </h1>
        <p className="mt-5 text-xl text-highlight sm:mt-6 sm:text-2xl md:text-[26px]">
          Full Stack Developer
        </p>
        <p className="mt-4 max-w-[560px] text-lg text-muted sm:text-xl">
          I build Next.js and Firebase web apps, Shopify storefronts and React Native apps, from
          the interface to the backend.
        </p>
        <p className="mt-4 flex items-start gap-2.5 sm:items-center">
          <span className="mt-2.5 inline-block h-2 w-2 shrink-0 rounded-full bg-accent sm:mt-0" />
          Available for freelance projects and full-time roles.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
          <a
            href="#contact"
            className="rounded-full bg-accent px-6 py-3 font-medium !text-on-accent no-underline"
          >
            Hire me
          </a>
          <a
            href="#work"
            className="glass rounded-full bg-ghost px-6 py-3 !text-fg no-underline"
          >
            View projects
          </a>
        </div>
      </div>

      <aside className="glass flex flex-col items-center gap-4 rounded-[28px] p-6 text-center sm:p-8">
        {/* Replace with next/image once your photo is in public/images/ */}
        <div className="slot flex h-[132px] w-[132px] items-center justify-center rounded-full px-3 text-sm text-muted">
          [Your photo]
        </div>
        <div>
          <p className="font-display text-[22px] font-medium">Muhammad Asad</p>
          <p className="text-muted">Full Stack Developer</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Chip>Next.js</Chip>
          <Chip>Firebase</Chip>
          <Chip>Shopify</Chip>
          <Chip>React Native</Chip>
        </div>
      </aside>
    </section>
  );
}