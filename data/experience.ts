export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "DIGITAL ABODE",
    role: "Growth Marketer & Frontend Engineer",
    period: "2025 - Present",
    description: "Built an AI-powered digital hub and co-working platform, designing scalable web experiences and managing digital creatives.",
    stack: ["Next.js", "React", "Tailwind", "AI Tools"]
  },
  {
    id: 2,
    company: "BRAND SPARK",
    role: "Frontend Engineer & Brand Designer",
    period: "2024 - Present",
    description: "Designed and developed high-converting websites and brand identities for businesses, combining UI/UX and marketing strategy.",
    stack: ["React", "Figma", "Tailwind", "SEO"]
  },
  {
    id: 3,
    company: "Freelance Projects",
    role: "Frontend Developer",
    period: "2022 - Present",
    description: "Worked with clients across industries to build responsive, user-focused websites that improve engagement and performance.",
    stack: ["JavaScript", "Next.js", "CSS", "APIs"]
  }
];
