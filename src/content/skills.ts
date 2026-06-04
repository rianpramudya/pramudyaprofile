import type { Skill, Experience } from '@/types';

export const skills: Skill[] = [
  // Backend
  { name: 'Laravel', icon: 'devicon-laravel-plain colored', level: 95, category: 'backend' },
  { name: 'PHP', icon: 'devicon-php-plain colored', level: 90, category: 'backend' },
  { name: 'GoLang', icon: 'devicon-go-plain colored', level: 75, category: 'backend' },
  { name: 'Python', icon: 'devicon-python-plain colored', level: 90, category: 'backend' },
  { name: 'MySQL / Database', icon: 'devicon-mysql-plain colored', level: 88, category: 'backend' },
  { name: 'REST API', icon: 'devicon-fastapi-plain colored', level: 92, category: 'backend' },
  { name: 'FastAPI', icon: 'devicon-fastapi-plain colored', level: 80, category: 'backend' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', level: 78, category: 'backend' },
  // Frontend
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain colored', level: 95, category: 'frontend' },
  { name: 'HTML5 & CSS3', icon: 'devicon-html5-plain colored', level: 95, category: 'frontend' },
  { name: 'Blade Template', icon: 'devicon-laravel-plain colored', level: 90, category: 'frontend' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored', level: 92, category: 'frontend' },
  { name: 'Alpine.js', icon: 'devicon-alpinejs-plain colored', level: 82, category: 'frontend' },
  { name: 'SvelteKit', icon: 'devicon-svelte-plain colored', level: 75, category: 'frontend' },
  { name: 'Three.js', icon: 'devicon-threejs-original', level: 70, category: 'frontend' },
  { name: 'Streamlit', icon: 'devicon-python-plain colored', level: 80, category: 'frontend' },
  // AI/ML
  { name: 'Machine Learning', icon: 'devicon-tensorflow-original colored', level: 85, category: 'ai-ml' },
  { name: 'Computer Vision', icon: 'devicon-opencv-plain colored', level: 82, category: 'ai-ml' },
  { name: 'YOLO', icon: 'devicon-pytorch-plain colored', level: 80, category: 'ai-ml' },
  { name: 'Generative AI', icon: 'devicon-python-plain colored', level: 88, category: 'ai-ml' },
  { name: 'Data Science', icon: 'devicon-pandas-plain colored', level: 78, category: 'ai-ml' },
  // Tools
  { name: 'Git & GitHub', icon: 'devicon-git-plain colored', level: 92, category: 'tools' },
  { name: 'VS Code', icon: 'devicon-vscode-plain colored', level: 95, category: 'tools' },
  { name: 'Composer', icon: 'devicon-composer-plain colored', level: 88, category: 'tools' },
  { name: 'Procreate', icon: 'devicon-figma-plain colored', level: 75, category: 'tools' },
  // Design
  { name: 'Figma', icon: 'devicon-figma-plain colored', level: 90, category: 'design' },
  { name: 'Responsive Design', icon: 'devicon-css3-plain colored', level: 92, category: 'design' },
  { name: 'Web Layout', icon: 'devicon-html5-plain colored', level: 90, category: 'design' },
  { name: 'UI/UX Basic', icon: 'devicon-figma-plain colored', level: 85, category: 'design' },
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
