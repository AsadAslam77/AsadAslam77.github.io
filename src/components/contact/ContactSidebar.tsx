import { contactInfo, nextSteps, contactEmail } from "@/content/contact";
import { site } from "@/content/site";

export default function ContactSidebar() {
  return (
    <aside aria-label="Other ways to reach me" className="flex flex-col gap-6">
      <div className="glass rounded-3xl p-6 sm:p-7">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Prefer email?</p>
        <a href={`mailto:${contactEmail}`} className="mt-3 block break-all font-display text-xl font-medium">
          {contactEmail}
        </a>
        <p className="mt-4 flex items-center gap-3 text-[15px]">
          <span aria-hidden className="glow-node shrink-0" />
          Usually replies {contactInfo.responseTime.toLowerCase()}
        </p>
        <p className="mt-3 text-sm text-muted">{contactInfo.location}</p>
      </div>

      <div className="glass rounded-3xl p-6 sm:p-7">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Elsewhere</p>
        <ul className="mt-4 grid gap-3">
          {contactInfo.whatsapp && (
            <li>
              <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          )}
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
        </ul>
      </div>

      <div className="glass rounded-3xl p-6 sm:p-7">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">What happens next</p>
        <ol className="mt-5 grid gap-5">
          {nextSteps.map((s, i) => (
            <li key={s.title} className="flex gap-4">
              <span className="font-display text-2xl font-bold leading-none text-accent-soft">{i + 1}</span>
              <div>
                <p className="font-medium">{s.title}</p>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}