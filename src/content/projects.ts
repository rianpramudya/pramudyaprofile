import type { Project } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// CATATAN SETUP:
//
// 1. GAMBAR — Letakkan file gambar di:
//    public/projects/<nama-file>.jpg
//    Lalu ubah nilai `image` tiap project sesuai nama file yang kamu upload.
//
// 2. GITHUB URL — Semua link di bawah masih dummy.
//    Ganti dengan URL repo GitHub kamu yang sebenarnya.
//
// 3. TYPES — Tambahkan dua field ini ke interface Project di src/types/index.ts:
//    githubUrl?: string;
//    image?: string;
// ─────────────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    slug: 'website-pemerintahan-subang',
    icon: 'devicon-laravel-plain colored',
    title: 'Website Pemerintahan Subang - 60 Instansi',
    description: 'Portal web pemerintahan terintegrasi berskala besar yang menaungi 60 instansi (30 website Kecamatan dan 30 website OPD) menggunakan Laravel 11 dan Tailwind CSS dengan integrasi Generative AI.',
    longDescription: 'Memimpin pengembangan arsitektur portal web pemerintahan terintegrasi berskala besar yang menaungi 60 instansi (30 website Kecamatan dan 30 website OPD) menggunakan Laravel 11 dan Tailwind CSS. Proyek ini mengintegrasikan alur kerja berbasis Generative AI untuk mengakselerasi siklus development secara efisien dengan tetap mempertahankan standar keamanan sistem yang ketat. Dilengkapi dengan fitur komprehensif dan optimasi UI/UX yang responsif dan intuitif untuk memastikan kemudahan akses bagi masyarakat luas.',
    tags: ['Laravel 11', 'Tailwind CSS', 'Generative AI', 'Full-Stack'],
    category: 'Full-Stack Web Development',
    techStack: ['Laravel 11', 'Tailwind CSS', 'PHP', 'MySQL', 'Generative AI', 'REST API'],
    year: '2025',
    featured: true,
    // ⬇ Ganti dengan URL repo GitHub yang sebenarnya
    githubUrl: 'https://github.com/rianpramudya/WebsiteKabupatenSubang',
    // ⬇ Ganti dengan nama file gambar yang kamu upload ke public/projects/
    image: '/Subang.jpeg',
    highlights: [
      'Arsitektur portal terintegrasi untuk 60 instansi pemerintahan',
      '30 website Kecamatan + 30 website OPD dalam satu ekosistem',
      'Integrasi Generative AI untuk akselerasi development',
      'Sistem keamanan berstandar pemerintahan',
      'UI/UX responsif dan intuitif untuk masyarakat luas',
    ],
  },
  {
  slug: 'astra-logistic-tracking',
  icon: 'devicon-svelte-plain colored',
  title: 'Astra Logistic & Asset Tracking System',
  description: 'Sistem manajemen logistik dan pelacakan aset dengan backend RESTful API berkinerja tinggi, simulasi 3D interaktif Three.js, dan dashboard analitik real-time menggunakan SvelteKit.',
  longDescription: 'Mengembangkan arsitektur backend RESTful API berkinerja tinggi menggunakan FastAPI dan SQLAlchemy (PostgreSQL) untuk manajemen data logistik jutaan aset. Membangun fitur simulasi 3D interaktif menggunakan Three.js untuk memvisualisasikan dan mengoptimalkan penataan muatan (packing) di dalam kontainer industri. Sistem dilengkapi dengan pencatatan riwayat dan pelacakan status pergerakan aset secara real-time berbasis API, serta dashboard analitik real-time menggunakan SvelteKit untuk memantau KPI seperti utilisasi kontainer, performa pengiriman, dan anomali operasional.',
  tags: ['FastAPI', 'Three.js', 'SvelteKit', 'PostgreSQL', 'REST API'],
  category: 'Full-Stack Web Development',
  techStack: ['FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Three.js', 'SvelteKit', 'Python'],
  year: '2025',
  featured: true,
  githubUrl: 'https://github.com/rianpramudya/Astra-Project',
  
  // UBAH BARIS INI:
  image: '/Astra.jpeg', 
  
  highlights: [
    'Backend RESTful API berkinerja tinggi dengan FastAPI',
    'Simulasi 3D interaktif menggunakan Three.js',
    'Manajemen data logistik jutaan aset',
    'Pelacakan status pergerakan aset real-time',
    'Dashboard analitik real-time dengan SvelteKit',
  ],
},
  {
    slug: 'dompet-rantau',
    icon: 'devicon-php-plain colored',
    title: 'Dompet Rantau - Manajemen Keuangan',
    description: 'Sistem manajemen finansial digital berbasis web untuk fleksibilitas keuangan mahasiswa perantau dengan fitur pelacakan arus kas, sistem alokasi multi-kantong, dan kalkulator tagihan.',
    longDescription: 'Mengimplementasikan Laravel 11 untuk mengembangkan sistem manajemen finansial digital berbasis web yang ditargetkan untuk fleksibilitas keuangan mahasiswa perantau. Mengembangkan fitur inti yang mencakup pelacakan arus kas (pemasukan & pengeluaran), sistem alokasi multi-kantong (pocket system), dan kalkulator tagihan. Membangun fungsionalitas pembuatan laporan keuangan komprehensif yang dapat diekspor dan diunduh dalam format PDF oleh pengguna.',
    tags: ['Laravel 11', 'Full-Stack', 'PDF Export', 'Financial System'],
    category: 'Full-Stack Web Development',
    techStack: ['Laravel 11', 'PHP', 'MySQL', 'Blade', 'Tailwind CSS'],
    year: '2025',
    featured: true,
    githubUrl: 'https://github.com/rianpramudya/Website-Manajemen-Keuangan',
    image: '/DompetRantau.jpeg',
    highlights: [
      'Pelacakan arus kas pemasukan & pengeluaran',
      'Sistem alokasi multi-kantong (pocket system)',
      'Kalkulator tagihan otomatis',
      'Laporan keuangan komprehensif dalam format PDF',
      'Desain khusus untuk mahasiswa perantau',
    ],
  },
  {
    slug: 'portfolio-cms',
    icon: 'devicon-tailwindcss-plain colored',
    title: 'Portfolio Pribadi dengan CMS Kustom',
    description: 'Platform personal branding dinamis terintegrasi dengan CMS kustom menggunakan Laravel 11 dan Tailwind CSS, dilengkapi Admin Panel dan generator dokumen otomatis.',
    longDescription: 'Merancang platform personal branding dinamis terintegrasi dengan Content Management System (CMS) kustom menggunakan Laravel 11 dan Tailwind CSS. Membangun Admin Panel untuk manajemen konten secara real-time (proyek, pengalaman, keahlian, dan layanan) serta sistem inbox untuk interaksi pesan masuk. Mengembangkan fitur unggulan berupa Generator dokumen otomatis yang mampu mengekspor profil menjadi CV (format ATS & Kreatif) dan Surat Lamaran dalam bentuk PDF.',
    tags: ['Laravel 11', 'Tailwind CSS', 'CMS', 'PDF Generator'],
    category: 'Full-Stack Web Development',
    techStack: ['Laravel 11', 'Tailwind CSS', 'PHP', 'MySQL', 'PDF Generation'],
    year: '2025',
    featured: false,
    githubUrl: 'https://github.com/rianpramudya/My-Portofolio-Website-Profile-',
    image: '/Portofolio.jpeg',
    highlights: [
      'CMS kustom untuk manajemen konten real-time',
      'Admin Panel lengkap dengan sistem inbox',
      'Generator CV otomatis (format ATS & Kreatif)',
      'Generator Surat Lamaran dalam format PDF',
      'Personal branding yang dinamis',
    ],
  },
  {
    slug: 'amazon-recommendation',
    icon: 'devicon-python-plain colored',
    title: 'Amazon Electronics Recommendation System',
    description: 'Sistem rekomendasi produk elektronik Amazon menggunakan Machine Learning dengan Truncated SVD, K-Means clustering, dan dashboard analitik interaktif Streamlit.',
    longDescription: 'Memproses dan membersihkan dataset ulasan produk Amazon berskala besar, mengimplementasikan Truncated SVD untuk mereduksi dimensi matriks user-item menjadi 50 fitur laten guna mengatasi masalah data sparsity. Mengembangkan model clustering menggunakan algoritma K-Means untuk memetakan pengguna ke dalam 10 profil minat yang berbeda, menghasilkan rekomendasi produk yang relevan berdasarkan metrik popularitas dalam klaster. Mengevaluasi keandalan algoritma menggunakan 5-Fold Cross Validation untuk memastikan konsistensi akurasi prediksi (Precision, Recall, F1-Score). Membangun antarmuka dashboard analitik interaktif menggunakan Streamlit dan Plotly.',
    tags: ['Machine Learning', 'K-Means', 'SVD', 'Streamlit', 'Data Science'],
    category: 'Machine Learning / Data Science',
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Plotly', 'Truncated SVD'],
    year: '2024',
    featured: true,
    githubUrl: 'https://github.com/rianpramudya/SistemRekomendasiAmazon',
    image: '/RecSys.jpeg',
    highlights: [
      'Truncated SVD untuk reduksi dimensi data sparsity',
      'K-Means clustering dengan 10 profil minat pengguna',
      '5-Fold Cross Validation untuk evaluasi model',
      'Dashboard analitik interaktif dengan Streamlit & Plotly',
      'Rekomendasi produk berbasis popularitas klaster',
    ],
  },
  {
    slug: 'acnescan-yolo',
    icon: 'devicon-pytorch-plain colored',
    title: 'AcneScan - Deteksi Jerawat YOLOv11',
    description: 'Sistem deteksi dan penghitungan lesi jerawat berbasis YOLOv11 dengan teknik SAHI untuk citra resolusi tinggi, dilengkapi antarmuka web Streamlit dan penyimpanan SQLite.',
    longDescription: 'Membangun pipeline deteksi objek dari hulu ke hilir menggunakan YOLOv11m untuk klasifikasi lesi jerawat aktif dengan tingkat presisi yang akurat. Mengintegrasikan teknik Slicing Aided Hyper Inference (SAHI) untuk memproses citra resolusi tinggi dalam jendela kecil, yang secara efektif melipatgandakan kemampuan deteksi pada objek kecil. Mengembangkan antarmuka aplikasi web menggunakan Streamlit untuk mempermudah aksesibilitas model bagi pengguna non-teknis. Menerapkan sistem penyimpanan data menggunakan SQLite untuk manajemen metadata hasil deteksi dan analisis statistik jangka panjang. Melakukan optimasi performa melalui eksperimen hyperparameter pada resolusi 800px dan berbagai strategi augmentasi citra.',
    tags: ['YOLOv11', 'Computer Vision', 'SAHI', 'Streamlit', 'Deep Learning'],
    category: 'Machine Learning / Computer Vision',
    techStack: ['Python', 'YOLOv11', 'SAHI', 'Streamlit', 'SQLite', 'OpenCV'],
    year: '2024',
    featured: true,
    githubUrl: 'https://github.com/rianpramudya/AcneScan',
    image: '/AcneScan.jpeg',
    highlights: [
      'Pipeline deteksi objek end-to-end dengan YOLOv11m',
      'Teknik SAHI untuk deteksi objek kecil pada citra resolusi tinggi',
      'Antarmuka web Streamlit untuk pengguna non-teknis',
      'Sistem penyimpanan SQLite untuk metadata dan statistik',
      'Optimasi hyperparameter dan augmentasi citra',
    ],
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}