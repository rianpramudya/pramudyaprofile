// src/components/layout/MobileNav.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { dictionary } from "@/i18n/dictionary";
import { setLang, getLang } from "@/i18n/index";

const NAV_ITEMS = [
  { key: "nav.home", href: "#hero", cmd: "home" },
  { key: "nav.about", href: "#about", cmd: "about" },
  { key: "nav.skills", href: "#skills", cmd: "skills" },
  { key: "nav.projects", href: "#projects", cmd: "projects" },
  { key: "nav.contact", href: "#contact", cmd: "contact" },
];

const STORAGE_THEME = "pramudya-theme";
const TRANSITION_DURATION = 450;

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLangState] = useState(() => getLang());
  const [theme, setThemeState] = useState("dark");

  const navRef = useRef(null);

  // ── Helpers ──
  const t = useCallback(
    (key) => dictionary[lang]?.[key] ?? key,
    [lang]
  );

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // ── Sync language dari store global ──
  useEffect(() => {
    // Set initial state dari store
    setLangState(getLang());

    const handleLangChange = (e) => {
      setLangState(e.detail);
    };
    window.addEventListener("langchange", handleLangChange);
    return () => window.removeEventListener("langchange", handleLangChange);
  }, []);

  // ── Sync theme dari localStorage ──
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_THEME) ?? "dark";
    setThemeState(saved);
  }, []);

  // ── Scroll listener ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Click outside to close ──
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      const onClickOutside = (e) => {
        if (navRef.current && !navRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("click", onClickOutside);
    }, 10);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // ── Escape key to close ──
  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isOpen]);

  // ── Lock body scroll ──
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Actions ──
  const toggleMenu = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const switchLang = useCallback(
    (newLang) => {
      if (newLang === lang) return;
      // Panggil setLang dari i18n/index yang harusnya trigger langchange event
      setLang(newLang);
      // Fallback: langsung update state lokal juga kalau event tidak jalan
      setLangState(newLang);
    },
    [lang]
  );

  const switchTheme = useCallback(
    (newTheme) => {
      if (newTheme === theme) return;
      const root = document.documentElement;

      root.classList.add("theme-transition");
      
      // FIX: Gunakan setAttribute/removeAttribute seperti Header.astro
      if (newTheme === "light") {
        root.setAttribute("data-theme", "light");
      } else {
        root.removeAttribute("data-theme");
      }

      localStorage.setItem(STORAGE_THEME, newTheme);
      setThemeState(newTheme);

      // Update meta theme-color
      const themeMeta = document.querySelector('meta[name="theme-color"]');
      if (themeMeta) {
        themeMeta.setAttribute("content", newTheme === "light" ? "#f7f5fb" : "#06060a");
      }

      setTimeout(() => root.classList.remove("theme-transition"), TRANSITION_DURATION);
    },
    [theme]
  );

  // ── Styles ──
  const btnBaseStyle = {
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    letterSpacing: "0.04em",
  };

  const getHamburgerStyle = () => ({
    ...btnBaseStyle,
    background: isOpen ? "var(--bg-2)" : scrolled ? "var(--nav-bg)" : "var(--bg-2)",
    color: isOpen || scrolled ? "var(--v)" : "var(--t1)",
    border: `1px solid ${isOpen ? "var(--v)" : "var(--border-2)"}`,
    backdropFilter: scrolled ? "blur(24px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
  });

  const dropdownClasses = isOpen
    ? "opacity-100 translate-y-0 pointer-events-auto"
    : "opacity-0 -translate-y-2 pointer-events-none";

  const getStaggerStyle = (index) => ({
    transitionDelay: isOpen ? `${index * 40}ms` : "0ms",
  });

  // ── Render helpers ──
  const renderTerminalLine = (command, path) => (
    <div className="text-[11px] leading-none" style={{ color: "var(--v)" }}>
      <span className="opacity-60 mr-1">$</span>
      <span className="opacity-40">{command}</span>
      <span className="mx-0.5 opacity-30">/</span>
      <span>{path}</span>
    </div>
  );

  const renderNavLink = (item, index) => (
    <a
      key={item.key}
      href={item.href}
      onClick={closeMenu}
      className={`group block transition-all duration-300 ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
      }`}
      style={getStaggerStyle(index)}
    >
      {renderTerminalLine("cd", item.cmd)}
      <div
        className="mt-0.5 pl-3 text-sm font-semibold leading-tight transition-colors group-hover:text-[var(--v)]"
        style={{ color: "var(--t1)" }}
      >
        {t(item.key)}
      </div>
    </a>
  );

  const renderCTA = () => (
    <a
      href="#contact"
      onClick={closeMenu}
      className={`group block mt-0.5 transition-all duration-300 ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
      }`}
      style={getStaggerStyle(NAV_ITEMS.length)}
    >
      {renderTerminalLine("exec", "contact")}
      <div
        className="mt-0.5 pl-3 text-sm font-semibold leading-tight flex items-center gap-1 transition-colors group-hover:text-[var(--v)]"
        style={{ color: "var(--t1)" }}
      >
        {t("hero.ctaSecondary")}
        <ArrowRightIcon />
      </div>
    </a>
  );

  const renderDivider = (index) => (
    <div
      className={`border-t transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      style={{
        borderColor: "var(--border)",
        transitionDelay: isOpen ? `${index * 40}ms` : "0ms",
        margin: "4px 0",
      }}
    />
  );

  const renderLangSwitcher = () => (
    <div
      className={`flex items-center gap-2 transition-all duration-300 ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
      }`}
      style={getStaggerStyle(NAV_ITEMS.length + 2)}
    >
      {renderTerminalLine("set", "lang")}
      <div className="flex gap-1 pl-3">
        {["id", "en"].map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => switchLang(code)}
            className="px-2 py-1 text-[10px] font-bold rounded-sm transition-all duration-200 uppercase"
            style={{
              background: lang === code ? "var(--vd)" : "transparent",
              color: lang === code ? "var(--v)" : "var(--t3)",
              border: `1px solid ${lang === code ? "var(--v)" : "var(--border-2)"}`,
            }}
          >
            {code}
          </button>
        ))}
      </div>
    </div>
  );

  const renderThemeSwitcher = () => (
    <div
      className={`flex items-center gap-2 transition-all duration-300 ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"
      }`}
      style={getStaggerStyle(NAV_ITEMS.length + 3)}
    >
      {renderTerminalLine("set", "theme")}
      <div className="flex gap-1 pl-3">
        <ThemeButton
          theme="light"
          current={theme}
          onClick={() => switchTheme("light")}
          label="Light mode"
        >
          <SunIcon />
        </ThemeButton>
        <ThemeButton
          theme="dark"
          current={theme}
          onClick={() => switchTheme("dark")}
          label="Dark mode"
        >
          <MoonIcon />
        </ThemeButton>
      </div>
    </div>
  );

  return (
    <div ref={navRef} className="terminal-nav fixed top-5 right-5 z-[999] md:hidden">
      {/* Hamburger - FIX: Center alignment dengan transform */}
      <button
        type="button"
        onClick={toggleMenu}
        className="w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer rounded-sm relative"
        style={getHamburgerStyle()}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        <span className="flex items-center justify-center transform translate-y-[1px]">
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </span>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-12 right-0 w-64 transition-all duration-300 ${dropdownClasses}`}
        style={{ transformOrigin: "top right", zIndex: 999 }}
      >
        <div
          className="rounded-sm overflow-hidden"
          style={{
            background: "var(--bg-2)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)",
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
          }}
        >
          {/* Terminal Bar */}
          <TerminalBar />

          {/* Body */}
          <div className="p-3.5 flex flex-col gap-2">
            {NAV_ITEMS.map(renderNavLink)}
            {renderCTA()}
            {renderDivider(NAV_ITEMS.length + 1)}
            {renderLangSwitcher()}
            {renderThemeSwitcher()}

            {/* Blinking Cursor */}
            <div
              className={`flex items-center gap-1 transition-all duration-300 ${
                isOpen ? "opacity-25" : "opacity-0"
              }`}
              style={getStaggerStyle(NAV_ITEMS.length + 4)}
            >
              <span className="text-[11px]">$</span>
              <span className="w-1 h-3 bg-current animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ──

function TerminalBar() {
  return (
    <div
      className="flex items-center gap-2 px-3 py-2.5 border-b"
      style={{ borderColor: "var(--border)", background: "var(--bg-3)" }}
    >
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#fb7185]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
      </div>
      <span
        className="ml-2 text-[10px] tracking-wide uppercase"
        style={{ color: "var(--t3)" }}
      >
        rian@portfolio:~
      </span>
    </div>
  );
}

function ThemeButton({ theme, current, onClick, label, children }) {
  const isActive = theme === current;
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-7 h-7 flex items-center justify-center rounded-sm transition-all duration-200"
      style={{
        background: isActive ? "var(--vd)" : "transparent",
        color: isActive ? "var(--v)" : "var(--t3)",
        border: `1px solid ${isActive ? "var(--v)" : "var(--border-2)"}`,
      }}
      aria-label={label}
    >
      {children}
    </button>
  );
}

// ── Icons ──

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.4 1.4M17.66 17.66l1.4 1.4M2 12h2M20 12h2M6.34 17.66l-1.4 1.4M19.07 4.93l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}