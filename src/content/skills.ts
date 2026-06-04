import type { Skill, Experience } from '@/types';

export const skills: Skill[] = [
  // Backend
  { name: 'Laravel', icon: 'server', level: 95, category: 'backend' },
  { name: 'PHP', icon: 'code-2', level: 90, category: 'backend' },
  { name: 'GoLang', icon: 'terminal', level: 75, category: 'backend' },
  { name: 'Python', icon: 'file-code', level: 90, category: 'backend' },
  { name: 'MySQL / Database', icon: 'database', level: 88, category: 'backend' },
  { name: 'REST API', icon: 'webhook', level: 92, category: 'backend' },
  { name: 'FastAPI', icon: 'zap', level: 80, category: 'backend' },
  { name: 'PostgreSQL', icon: 'database', level: 78, category: 'backend' },
  // Frontend
  { name: 'Tailwind CSS', icon: 'palette', level: 95, category: 'frontend' },
  { name: 'HTML5 & CSS3', icon: 'layout', level: 95, category: 'frontend' },
  { name: 'Blade Template', icon: 'file-type', level: 90, category: 'frontend' },
  { name: 'JavaScript', icon: 'braces', level: 92, category: 'frontend' },
  { name: 'Alpine.js', icon: 'mountain', level: 82, category: 'frontend' },
  { name: 'SvelteKit', icon: 'layers', level: 75, category: 'frontend' },
  { name: 'Three.js', icon: 'box', level: 70, category: 'frontend' },
  { name: 'Streamlit', icon: 'bar-chart-3', level: 80, category: 'frontend' },
  // AI/ML
  { name: 'Machine Learning', icon: 'brain', level: 85, category: 'ai-ml' },
  { name: 'Computer Vision', icon: 'eye', level: 82, category: 'ai-ml' },
  { name: 'YOLO', icon: 'scan', level: 80, category: 'ai-ml' },
  { name: 'Generative AI', icon: 'sparkles', level: 88, category: 'ai-ml' },
  { name: 'Data Science', icon: 'pie-chart', level: 78, category: 'ai-ml' },
  // Tools
  { name: 'Git & GitHub', icon: 'git-branch', level: 92, category: 'tools' },
  { name: 'VS Code', icon: 'code', level: 95, category: 'tools' },
  { name: 'Composer', icon: 'package', level: 88, category: 'tools' },
  { name: 'Procreate', icon: 'pen-tool', level: 75, category: 'tools' },
  // Design
  { name: 'Figma', icon: 'figma', level: 90, category: 'design' },
  { name: 'Responsive Design', icon: 'smartphone', level: 92, category: 'design' },
  { name: 'Web Layout', icon: 'layout-template', level: 90, category: 'design' },
  { name: 'UI/UX Basic', icon: 'mouse-pointer', level: 85, category: 'design' },
];

export const experiences: Experience[] = [
  {
    title: 'FullStack Web Developer',
    company: 'Diskominfo Kabupaten Subang',
    period: 'Juni 2025 - September 2025',
    type: 'work',
    description: [
      'Membangun arsitektur ekosistem digital terintegrasi berskala besar untuk mendukung program digitalisasi Pemerintah Kabupaten Subang',
      'Mengembangkan platform terpusat yang memfasilitasi pembuatan dan pengelolaan website mandiri bagi 30 Kecamatan dan 30 OPD',
      'Mengoptimalkan aksesibilitas informasi publik melalui integrasi portal profil utama kabupaten yang responsif dan efisien',
    ],
  },
  {
    title: 'Media Informasi dan Komunikasi',
    company: 'HIMA IF Telkom University',
    period: '2024 - 2026',
    type: 'organization',
    description: [
      'Merancang dan mengelola aset visual konten media sosial HIMA IF menggunakan Figma untuk menjaga standar branding digital',
      'Mengelola identitas visual digital himpunan guna meningkatkan engagement audiens dan profesionalisme platform komunikasi',
      'Membangun kemitraan strategis dengan pihak internal maupun eksternal untuk mendukung keberhasilan program kerja strategis',
    ],
  },
  {
    title: 'Mahasiswa S1 Informatika',
    company: 'Telkom University',
    period: '2022 - 2026 (Expected)',
    type: 'education',
    description: [
      'Mempertahankan standar prestasi akademik tinggi dengan fokus mendalam pada Informatika dan pengembangan perangkat lunak',
      'Meningkatkan kompetensi profesional secara proaktif melalui penguasaan teknologi mutakhir (Laravel 11, Computer Vision)',
      'Terlibat dalam berbagai proyek praktis untuk mengasah soft skills dan kemampuan adaptasi di industri teknologi',
    ],
  },
];

export const skillCategories = [
  { id: 'backend', label: 'Backend', icon: 'server' },
  { id: 'frontend', label: 'Frontend', icon: 'layout' },
  { id: 'ai-ml', label: 'AI & Machine Learning', icon: 'brain' },
  { id: 'tools', label: 'Tools', icon: 'wrench' },
  { id: 'design', label: 'Design', icon: 'palette' },
];
