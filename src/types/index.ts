// src/types/index.ts

// ============================================
// CORE / SITE
// ============================================

export type Lang = 'id' | 'en';

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  email: string;
  linkedin: string;
  github: string;
  url: string;
}

// ============================================
// NAVIGATION & SOCIAL
// ============================================

export interface NavItem {
  key: string;       // i18n key
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

// ============================================
// PROJECTS
// ============================================

export interface Project {
  slug: string;
  icon: string;
  titleKey: string;      // ← i18n key
  descKey: string;       // ← i18n key
  longDescKey: string;   // ← i18n key
  tags: string[];
  categoryKey: string;   // ← i18n key
  techStack: string[];
  year: string;
  featured: boolean;
  githubUrl: string;
  image: string;
  images: string[];
  highlightKeys: string[]; // ← i18n keys
}

// ============================================
// SKILLS
// ============================================

export interface SkillCategory {
  id: string;
  labelKey: string;  // ← i18n key
  icon: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: string;
}

// ============================================
// EXPERIENCE
// ============================================

export interface Experience {
  titleKey: string;    // ← i18n key
  companyKey: string;  // ← i18n key
  periodKey: string;   // ← i18n key
  type: 'work' | 'organization' | 'education';
  descKeys: string[];  // ← i18n keys
}

// ============================================
// LEGACY / BACKWARD COMPATIBILITY
// ============================================

/** @deprecated Gunakan titleKey, companyKey, periodKey, descKeys */
export interface ExperienceLegacy {
  title: string;
  company: string;
  period: string;
  description: string[];
  type: 'work' | 'organization' | 'education';
}

/** @deprecated Gunakan field-field yang tidak berakhiran Key */
export interface ProjectLegacy {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: string;
  icon?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  highlights?: string[];
  techStack?: string[];
  year?: string;
  image?: string;
  images?: string[];
}

/** @deprecated Gunakan Skill dengan level wajib & category string */
export interface SkillLegacy {
  name: string;
  icon: string;
  level?: number;
  category: 'backend' | 'frontend' | 'tools' | 'design' | 'ai-ml';
}

export interface BilingualText {
  id: string;
  en: string;
}