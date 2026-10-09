/**
 * The hero: the name, the role line, the intro, the availability line, two
 * buttons, and the glass profile card.
 *
 * Every word comes from lib/content.ts. A server component: no state, no
 * handlers, no JavaScript sent to the browser. Animation is task 15.
 */

import Image from "next/image";
import Button from "./Button";
import Chip from "./Chip";
import GlassCard from "./GlassCard";
import { hero, resolve } from "@/lib/content";

/** The mockup's photo slot. Both branches below are exactly this size, so
 *  adding a real photo cannot shift the layout. */
const PHOTO_SIZE = 132;

export default function Hero() {
  // resolve() returns null while the photo is still a fill-in, which is what
  // forces the placeholder branch to exist.
  const photo = resolve(hero.card.photo);

  return (
    <section
      id="hero"
      className="grid items-center gap-10 py-14 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:pt-[88px] lg:pb-28"
    >
      <div>
        {/* The only h1 on the page. Every section heading is an h2. */}
        <h1 className="text-name leading-none font-bold tracking-[-0.03em]">
          {hero.name}
        </h1>

        <p className="mt-6 text-[clamp(20px,3vw,26px)] text-warm-text">
          {hero.roleLine}
        </p>

        <p className="mt-4 max-w-[560px] text-[clamp(17px,2vw,20px)] text-muted">
          {hero.intro}
        </p>

        <p className="mt-4 flex items-center gap-2.5">
          {/* Decorative: the sentence already says it. */}
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent"
          />
          {hero.availability}
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          {hero.buttons.map((button, i) => (
            <Button
              key={button.href}
              href={button.href}
              variant={i === 0 ? "primary" : "glass"}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>

      <GlassCard
        as="aside"
        radius="panel"
        className="flex flex-col items-center gap-4 p-8 text-center"
      >
        {photo ? (
          <Image
            src={photo}
            alt={hero.card.name}
            width={PHOTO_SIZE}
            height={PHOTO_SIZE}
            // priority: this is the largest image above the fold, so it
            // should not wait for lazy loading.
            priority
            className="rounded-full object-cover"
            style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
          />
        ) : (
          <div
            style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
            className="flex items-center justify-center rounded-full border border-dashed border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.04)] px-3 text-sm text-muted"
          >
            [Your photo]
          </div>
        )}

        <div>
          <p className="font-heading text-[22px] font-medium">
            {hero.card.name}
          </p>
          <p className="text-muted">{hero.card.role}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {hero.card.chips.map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
