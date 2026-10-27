export type TimelineItem = {
  id: string;
  tag: string;
  current?: boolean;
  start: string;
  end?: string; // leave out for "Present"
  title: string;
  org: string;
  orgNote?: string;
  orgUrl?: string;
  summary: string;
  highlights?: string[];
  chipsLabel: string;
  chips: string[];
};

export type SkillGroup = { title: string; text: string; skills: string[] };
export type Fact = { label: string; value: string };