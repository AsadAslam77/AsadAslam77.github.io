import { site } from "./site";

export const contactMeta = {
  path: "/contact/",
  title: "Contact",
  description:
    "Start a project or ask a question. Send a brief for a web app, online store, mobile app or AI feature, and get a clear plan and quote.",
} as const;

export const contactHero = {
  eyebrow: "Contact",
  title: "Tell me about your project.",
  lead: "Share what you want to build, who it’s for and when you need it. I reply within 24 hours with a clear plan and a fixed quote.",
} as const;

// Leave empty to hide the WhatsApp button. Format: https://wa.me/923001234567
export const contactInfo = {
  whatsapp: "",
  responseTime: "Within 24 hours",
  location: "Pakistan · working with clients worldwide",
} as const;

export const contactForm = {
  title: "Send a project brief",
  projectTypes: [
    "Web application",
    "Online store",
    "Mobile app",
    "Backend or admin panel",
    "AI feature",
    "Something else",
  ],
  budgets: ["Not sure yet", "Under $1,000", "$1,000 to $3,000", "$3,000 to $10,000", "$10,000 or more"],
  timelines: ["As soon as possible", "Within a month", "One to three months", "Flexible"],
  submit: "Send brief",
  sending: "Sending…",
  successTitle: "Thanks, your brief is in.",
  successText: "I’ll reply within 24 hours. Check your inbox, and your spam folder just in case.",
  sendAnother: "Send another brief",
  errorText: "Something went wrong and your brief wasn’t sent. Please try again, or email me directly.",
  privacy: "I only use your details to reply to your enquiry.",
} as const;

export const nextSteps = [
  { title: "I reply within 24 hours", text: "We talk through scope, goals and timing." },
  { title: "You get a fixed quote", text: "A clear plan, price and timeline, before any work starts." },
  { title: "We start with a first milestone", text: "You see progress early, and nothing is a surprise." },
] as const;

export const contactEmail = site.email;