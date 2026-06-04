import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Beranda', href: '#hero' },
  { name: 'Tentang', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Proyek', href: '#projects' },
  { name: 'Kontak', href: '#contact' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Mobile Nav Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 md:hidden ${
          isOpen
            ? 'bg-slate-800 text-white rotate-180'
            : scrolled
            ? 'bg-primary-600 text-white shadow-primary-500/30'
            : 'bg-dark-800/90 backdrop-blur-xl text-white border border-slate-700/50'
        }`}
        style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
        aria-label="Toggle navigation"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[55] md:hidden transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-dark-900/98 backdrop-blur-2xl"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <nav className="relative flex flex-col items-center justify-center h-full gap-2">
          {navigation.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className={`text-3xl font-bold text-white hover:text-primary-400 transition-all duration-500 py-3 px-8 rounded-2xl hover:bg-white/5 ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{
                transitionDelay: isOpen ? `${i * 75}ms` : '0ms',
              }}
            >
              {item.name}
            </a>
          ))}
          
          <a
            href="#contact"
            onClick={handleLinkClick}
            className={`mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-primary-500/25 transition-all duration-500 ${
              isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: isOpen ? `${navigation.length * 75}ms` : '0ms',
            }}
          >
            Hubungi Saya
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
        </nav>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl" />
      </div>
    </>
  );
}
