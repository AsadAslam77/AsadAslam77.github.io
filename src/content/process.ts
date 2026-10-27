import type { ProcessStep } from "@/types/service";

export const processIntro = { title: "How I work" } as const;

export const processSteps: ProcessStep[] = [
  {
    title: "Talk",
    text: "You tell me what you need, who it is for and when you need it. I ask questions until the scope is clear.",
  },
  {
    title: "Quote",
    text: "I send a quote with the scope and timeline. We start once you approve it.",
  },
  {
    title: "Build and deliver",
    text: "I build in stages and show you progress along the way, then deliver the finished project.",
  },
];