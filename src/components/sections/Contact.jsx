import { useState, useEffect, useRef } from 'react';
import { site } from '@/content/site';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrevgrpr';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errMsg = result?.errors?.map(e => e.message).join(', ')
          || 'Terjadi kesalahan. Coba beberapa saat lagi.';
        setError(errMsg);
      }
    } catch (err) {
      setError('Gagal terhubung. Periksa koneksi internet kamu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
        </svg>
      ),
      label: 'Email',
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
        </svg>
      ),
      label: 'LinkedIn',
      value: 'rianpramudyaamanda',
      href: site.linkedin,
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
        </svg>
      ),
      label: 'GitHub',
      value: 'rianpramudya',
      href: site.github,
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-32 bg-dark-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className={`max-w-3xl mx-auto mb-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-primary-400 font-semibold text-sm uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-primary-500"></span>
            Kontak
            <span className="w-8 h-px bg-primary-500"></span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-display leading-tight">
            Mari Berkolaborasi <span className="text-primary-400">Bersama</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Punya ide proyek menarik atau ingin berdiskusi tentang teknologi? Saya terbuka untuk kolaborasi, freelance, dan kesempatan berharga lainnya.
          </p>
        </div>

        {/* FIX: grid pakai items-stretch agar kedua kolom ikut tinggi yang lebih besar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">

          {/* ── Kiri: Contact Info ── */}
          {/* FIX: hapus space-y-6 (tidak perlu, 1 anak), tambah h-full */}
          <div className={`lg:col-span-2 h-full transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {/* FIX: h-full + flex flex-col agar card mengisi tinggi grid cell */}
            <div className="h-full flex flex-col rounded-2xl border border-slate-700/50 bg-dark-800/60 backdrop-blur-sm p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">Informasi Kontak</h3>

              {/* FIX: flex-1 agar daftar kontak mendorong badge ke bawah */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {contactInfo.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/30 border border-slate-700/30 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-300 group"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">{item.label}</p>
                        <p className="text-white text-sm font-medium group-hover:text-primary-400 transition-colors duration-300">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Respons Cepat — selalu di bawah daftar kontak */}
                <div className="mt-6 p-4 rounded-xl bg-primary-500/5 border border-primary-500/20">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75 animate-ping"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                    </div>
                    <div>
                      <p className="text-primary-400 text-sm font-semibold">Respons Cepat</p>
                      <p className="text-slate-500 text-xs">Biasanya membalas dalam 1-2 hari</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Kanan: Contact Form ── */}
          <div className={`lg:col-span-3 h-full transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* FIX: h-full + flex flex-col agar card mengisi tinggi grid cell */}
            <div className="h-full flex flex-col rounded-2xl border border-slate-700/50 bg-dark-800/60 backdrop-blur-sm p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">Kirim Pesan</h3>

              {submitted ? (
                // FIX: flex-1 + items-center justify-center agar success state
                // ter-center vertikal dan sejajar tinggi dengan card kiri
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-400">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Pesan Terkirim!</h4>
                  <p className="text-slate-400 mb-6">Terima kasih telah menghubungi saya. Saya akan membalas secepat mungkin.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary-500/10 border border-primary-500/30 px-6 py-2.5 text-sm font-semibold text-primary-400 hover:bg-primary-500/20 transition-all duration-300"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                // FIX: flex-1 + flex flex-col agar form memenuhi sisa ruang card
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="Nama kamu"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* FIX: flex-1 pada wrapper textarea agar textarea mengisi sisa ruang */}
                  <div className="flex-1 flex flex-col">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="flex-1 w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 resize-none min-h-[120px]"
                      placeholder="Ceritakan tentang proyek atau ide kamu..."
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 flex-shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
                      </svg>
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:from-primary-500 hover:to-primary-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Pesan
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}