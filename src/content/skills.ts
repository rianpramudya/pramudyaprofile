// src/content/skills.ts
import type { Skill, Experience } from "@/types";

export const skills: Skill[] = [
  // Backend
  {
    name: "Laravel",
    icon: "devicon-laravel-plain colored",
    level: 95,
    category: "backend",
  },
  {
    name: "PHP",
    icon: "devicon-php-plain colored",
    level: 90,
    category: "backend",
  },
  {
    name: "GoLang",
    icon: "devicon-go-plain colored",
    level: 75,
    category: "backend",
  },
  {
    name: "Python",
    icon: "devicon-python-plain colored",
    level: 90,
    category: "backend",
  },
  {
    name: "MySQL / Database",
    icon: "devicon-mysql-plain colored",
    level: 88,
    category: "backend",
  },
  {
    name: "REST API",
    icon: "devicon-fastapi-plain colored",
    level: 92,
    category: "backend",
  },
  {
    name: "FastAPI",
    icon: "devicon-fastapi-plain colored",
    level: 80,
    category: "backend",
  },
  {
    name: "PostgreSQL",
    icon: "devicon-postgresql-plain colored",
    level: 78,
    category: "backend",
  },
  // Frontend
  {
    name: "Tailwind CSS",
    icon: "devicon-tailwindcss-plain colored",
    level: 95,
    category: "frontend",
  },
  {
    name: "HTML5 & CSS3",
    icon: "devicon-html5-plain colored",
    level: 95,
    category: "frontend",
  },
  {
    name: "Blade Template",
    icon: "devicon-laravel-plain colored",
    level: 90,
    category: "frontend",
  },
  {
    name: "JavaScript",
    icon: "devicon-javascript-plain colored",
    level: 92,
    category: "frontend",
  },
  {
    name: "Alpine.js",
    icon: "devicon-alpinejs-plain colored",
    level: 82,
    category: "frontend",
  },
  {
    name: "SvelteKit",
    icon: "devicon-svelte-plain colored",
    level: 75,
    category: "frontend",
  },
  {
    name: "Three.js",
    icon: "devicon-threejs-original",
    level: 70,
    category: "frontend",
  },
  {
    name: "Streamlit",
    icon: "devicon-python-plain colored",
    level: 80,
    category: "frontend",
  },
  // AI/ML
  {
    name: "Machine Learning",
    icon: "devicon-tensorflow-original colored",
    level: 85,
    category: "ai-ml",
  },
  {
    name: "Computer Vision",
    icon: "devicon-opencv-plain colored",
    level: 82,
    category: "ai-ml",
  },
  {
    name: "YOLO",
    icon: "devicon-pytorch-plain colored",
    level: 80,
    category: "ai-ml",
  },
  {
    name: "Generative AI",
    icon: "devicon-python-plain colored",
    level: 88,
    category: "ai-ml",
  },
  {
    name: "Data Science",
    icon: "devicon-pandas-plain colored",
    level: 78,
    category: "ai-ml",
  },
  // Tools
  {
    name: "Git & GitHub",
    icon: "devicon-git-plain colored",
    level: 92,
    category: "tools",
  },
  {
    name: "VS Code",
    icon: "devicon-vscode-plain colored",
    level: 95,
    category: "tools",
  },
  {
    name: "Composer",
    icon: "devicon-composer-plain colored",
    level: 88,
    category: "tools",
  },
  {
    name: "Procreate",
    icon: "devicon-figma-plain colored",
    level: 75,
    category: "tools",
  },
  // Design
  {
    name: "Figma",
    icon: "devicon-figma-plain colored",
    level: 90,
    category: "design",
  },
  {
    name: "Responsive Design",
    icon: "devicon-css3-plain colored",
    level: 92,
    category: "design",
  },
  {
    name: "Web Layout",
    icon: "devicon-html5-plain colored",
    level: 90,
    category: "design",
  },
  {
    name: "UI/UX Basic",
    icon: "devicon-figma-plain colored",
    level: 85,
    category: "design",
  },
];

// Experience keys untuk i18n — description diambil dari dictionary via key
export const experiences: Experience[] = [
  {
    titleKey: "timeline.job1.title",
    companyKey: "timeline.job1.company",
    periodKey: "timeline.job1.period",
    type: "work",
    descKeys: [
      "timeline.job1.desc1",
      "timeline.job1.desc2",
      "timeline.job1.desc3",
    ],
  },
  {
    titleKey: "timeline.org1.title",
    companyKey: "timeline.org1.company",
    periodKey: "timeline.org1.period",
    type: "organization",
    descKeys: [
      "timeline.org1.desc1",
      "timeline.org1.desc2",
      "timeline.org1.desc3",
    ],
  },
  {
    titleKey: "timeline.edu1.title",
    companyKey: "timeline.edu1.company",
    periodKey: "timeline.edu1.period",
    type: "education",
    descKeys: [
      "timeline.edu1.desc1",
      "timeline.edu1.desc2",
      "timeline.edu1.desc3",
    ],
  },
];

// Skill categories dengan i18n keys
export const skillCategories = [
  { id: "backend", labelKey: "skills.filter.backend", icon: "server" },
  { id: "frontend", labelKey: "skills.filter.frontend", icon: "layout" },
  { id: "ai-ml", labelKey: "skills.filter.ai-ml", icon: "brain" },
  { id: "tools", labelKey: "skills.filter.tools", icon: "wrench" },
  { id: "design", labelKey: "skills.filter.design", icon: "palette" },
];
