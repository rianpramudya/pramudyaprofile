export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  highlights?: string[];
  techStack?: string[];
  year?: string;
  image?: string;
}

export interface Skill {
  name: string;
  icon: string;
  level?: number;
  category: 'backend' | 'frontend' | 'tools' | 'design' | 'ai-ml';
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  type: 'work' | 'organization' | 'education';
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  email: string;
  linkedin: string;
  github: string;
  url: string;
  
}
