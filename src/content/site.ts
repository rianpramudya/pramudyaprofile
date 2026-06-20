import type { SiteConfig, NavItem, SocialLink } from '@/types';

export const site: SiteConfig = {
  name: 'Rian Pramudya Amanda',
  title: 'Rian Pramudya Amanda | Full Stack Developer & AI Enthusiast',
  description: 'Mahasiswa Informatika Telkom University yang berfokus pada Full-stack Web Development, Machine Learning, dan Generative AI. Membangun solusi teknologi yang inovatif dan efisien.',
  email: 'pramudya.career@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rianpramudyaamanda',
  github: 'https://github.com/rianpramudya',
  url: 'https://rianpramudya.dev',
};

// Navigation pakai key untuk i18n, bukan string hardcoded
export const navigation: NavItem[] = [
  { key: 'nav.home', href: '#hero' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.contact', href: '#contact' },
];

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/rianpramudya',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rianpramudyaamanda',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    href: 'mailto:pramudya.career@gmail.com',
    icon: 'mail',
  },
];