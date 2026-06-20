import { useState, useEffect, useRef } from "react";
import { site } from "@/content/site";
import { dictionary } from "@/i18n/dictionary";
import { langStore } from "@/stores/langStore";

const WEB3FORMS_KEY = "25fe095d-6c02-4f9b-9e95-e80c073b3d43";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const STORAGE_KEY = "pramudya-lang";

export default function Contact() {
  const [lang, setLang] = useState("id");
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const sectionRef = useRef(null);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    // ── ROBUST LANG DETECTION ──
    // Priority: URL param → localStorage → langStore → "id"
    // Sama persis dengan logika di i18n/index.ts → getLang()
    const getActiveLang = () => {
      const urlLang = new URLSearchParams(window.location.search).get("lang");
      if (urlLang === "en" || urlLang === "id") return urlLang;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === "en" || stored === "id") return stored;
      } catch (_) {}
      const storeLang = langStore.get();
      if (storeLang === "en" || storeLang === "id") return storeLang;
      return "id";
    };

    setLang(getActiveLang());
    setMounted(true);

    // 1. Subscribe ke Nanostores (fallback jika berhasil lintas island)
    const unsubscribe = langStore.subscribe((newLang) => {
      if (newLang === "en" || newLang === "id") setLang(newLang);
    });

    // 2. Listen ke window event yang di-dispatch oleh i18n/index.ts → setLang()
    //    Ini adalah fix utama — event inilah yang di-fire header saat ganti bahasa
    const handleLangChange = () => setLang(getActiveLang());
    window.addEventListener("pramudya-lang-change", handleLangChange);
    window.addEventListener("langchange", handleLangChange);

    return () => {
      unsubscribe();
      window.removeEventListener("pramudya-lang-change", handleLangChange);
      window.removeEventListener("langchange", handleLangChange);
    };
  }, []);

  const dict = dictionary[lang] ?? dictionary.id;

  function t(key, vars) {
    let str = dict[key] ?? key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        str = str.replace(`{${k}}`, v);
      });
    }
    return str;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);

    setFieldErrors((prev) => {
      const next = { ...prev };
      if (name === "name") {
        next.name =
          value.length > MAX_NAME_LENGTH
            ? t("contact.error.longName", {
                max: MAX_NAME_LENGTH,
                count: value.length,
              })
            : "";
      }
      if (name === "message") {
        next.message =
          value.length > MAX_MESSAGE_LENGTH
            ? t("contact.error.longMessage", {
                max: MAX_MESSAGE_LENGTH,
                count: value.length,
              })
            : "";
      }
      return next;
    });

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(site.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      window.location.href = `mailto:${site.email}`;
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  const handleCopyPhone = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("0851-2111-1260");
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      window.open(
        "https://wa.me/6285121111260",
        "_blank",
        "noopener,noreferrer",
      );
    } catch (err) {
      console.error("Failed to copy phone", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmittingRef.current) return;
    if (fieldErrors.name || fieldErrors.message) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setError(null);

    if (!formData.name.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        name: t("contact.error.emptyName"),
      }));
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      return;
    }
    if (!formData.message.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        message: t("contact.error.emptyMessage"),
      }));
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim()
            ? `[PORTFOLIO] ${formData.subject.trim()}`
            : "[PORTFOLIO] Pesan Baru",
          message: formData.message.trim(),
          botcheck: "",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setFieldErrors({ name: "", message: "" });
      } else {
        setError(
          result?.errors?.map((e) => e.message).join(", ") ||
            t("contact.error.general"),
        );
      }
    } catch (err) {
      setError(t("contact.error.connection"));
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  const opacityClass = mounted ? "opacity-100" : "opacity-0";

  const rawTitle = t("contact.title") || "MARI BERKOLABORASI";
  const titleWords = rawTitle.split(" ");
  const titleFirst = titleWords[0];
  const titleRest = titleWords.slice(1).join(" ");

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative py-28 md:py-32 bg-[var(--bg)] overflow-hidden transition-opacity duration-1000 ${opacityClass}`}
    >
      {/* ── AMBIENT BACKGROUND ── */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[var(--orb-v)] rounded-full blur-[150px] opacity-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--orb-c)] rounded-full blur-[120px] opacity-[0.05]" />
      </div>

      {/* Container: max-w-[1200px] (konsisten dengan Hero/Projects) */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="max-w-xl w-full">
              <div className="inline-flex items-center gap-4 border-l-2 border-[var(--v)] pl-3 mb-8">
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-[var(--t3)] uppercase">
                  {t("contact.eyebrow")} / SECURE_CHANNEL
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[0.55rem] text-[var(--v)] bg-[var(--v)]/10 px-2 py-0.5 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-[var(--v)] rounded-sm animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Brutalism Hero Title */}
              <h2 className="font-black uppercase leading-[0.85] tracking-tight mb-8 group cursor-default w-full">
                <span className="block text-[clamp(2.5rem,6.5vw,4.5rem)] text-[var(--t1)] transition-colors duration-500 group-hover:text-[var(--v)] break-words hyphens-auto">
                  {titleFirst}
                </span>
                {titleRest && (
                  <span className="block text-[clamp(2.5rem,6.5vw,4.5rem)] text-transparent [-webkit-text-stroke:1.5px_var(--t1)] opacity-70 transition-all duration-500 group-hover:[-webkit-text-stroke:1.5px_var(--v)] group-hover:opacity-100 group-hover:translate-x-2 break-words hyphens-auto">
                    {titleRest}
                  </span>
                )}
              </h2>

              <p className="text-[var(--t2)] text-sm md:text-[0.9rem] leading-relaxed font-light mb-10 max-w-sm">
                {t("contact.desc")}
              </p>

              {/* System Info */}
              <div className="flex flex-col gap-2 font-mono text-[0.6rem] text-[var(--t3)] uppercase tracking-widest border-t border-[var(--border)] pt-6 mb-12">
                <div className="flex justify-between items-center max-w-sm">
                  <span>{t("contact.info.uptime")}</span>
                  <span className="text-[var(--t2)]">{t("contact.info.uptimeValue")}</span>
                </div>
                <div className="flex justify-between items-center max-w-sm">
                  <span>{t("contact.info.geo")}</span>
                  <span className="text-[var(--t2)]">
                    {t("contact.info.geoValue")}
                  </span>
                </div>
                <div className="flex justify-between items-center max-w-sm">
                  <span>{t("contact.info.encryption")}</span>
                  <span className="text-[var(--v)]">{t("contact.info.encryptionValue")}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-col gap-6 mb-10">
                {/* Email */}
                <a
                  href={`mailto:${site.email}`}
                  onClick={handleCopyEmail}
                  className="group relative flex flex-col text-left focus:outline-none w-fit"
                >
                  <span className="font-mono text-[0.6rem] text-[var(--t3)] tracking-widest uppercase mb-2 group-hover:text-[var(--c)] transition-colors flex items-center gap-2">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="group-hover:hidden">{t("contact.info.primaryContact")}</span>
                    <span className="hidden group-hover:inline">
                      {copiedEmail ? t("contact.copySuccess") : t("contact.launchMail")}
                    </span>
                  </span>
                  <span className="font-['Syne','Inter','Helvetica_Neue',sans-serif] text-xl sm:text-2xl font-bold text-[var(--t1)] group-hover:text-[var(--v)] transition-colors break-all relative inline-flex items-center gap-2">
                    {site.email}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[var(--v)]"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--v)] transition-all duration-500 group-hover:w-full"></span>
                  </span>
                </a>

                {/* Phone / WhatsApp */}
                <a
                  href="https://wa.me/6285121111260"
                  onClick={handleCopyPhone}
                  className="group relative flex flex-col text-left focus:outline-none w-fit"
                >
                  <span className="font-mono text-[0.6rem] text-[var(--t3)] tracking-widest uppercase mb-2 group-hover:text-[var(--c)] transition-colors flex items-center gap-2">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="group-hover:hidden">{t("contact.info.directLine")}</span>
                    <span className="hidden group-hover:inline">
                      {copiedPhone ? t("contact.copySuccessPhone") : t("contact.launchWhatsapp")}
                    </span>
                  </span>
                  <span className="font-['Syne','Inter','Helvetica_Neue',sans-serif] text-xl sm:text-2xl font-bold text-[var(--t1)] group-hover:text-[var(--v)] transition-colors relative inline-flex items-center gap-2">
                    +62 851-2111-1260
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[var(--v)]"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--v)] transition-all duration-500 group-hover:w-full"></span>
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[var(--border-2)] text-[var(--t2)] hover:text-[var(--v)] hover:border-[var(--v)] px-4 py-2 font-mono text-[0.65rem] uppercase tracking-widest transition-all duration-300"
                >
                  GITHUB{" "}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-[var(--border-2)] text-[var(--t2)] hover:text-[var(--c)] hover:border-[var(--c)] px-4 py-2 font-mono text-[0.65rem] uppercase tracking-widest transition-all duration-300"
                >
                  LINKEDIN{" "}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: FORM ── */}
          <div className="lg:col-span-7 flex flex-col justify-center mt-10 lg:mt-0 relative">
            <div className="absolute -top-4 -left-4 w-4 h-4 border-t-2 border-l-2 border-[var(--border-2)] opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b-2 border-r-2 border-[var(--border-2)] opacity-50"></div>

            {submitted ? (
              <div className="bg-[var(--bg-2)] border border-[var(--v)]/50 p-8 md:p-12 relative overflow-hidden group shadow-[0_0_30px_rgba(167,139,250,0.1)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--v)] to-transparent opacity-50"></div>

                <div className="font-mono relative z-10">
                  <div className="text-[var(--v)] mb-6 text-[0.65rem] tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--v)] rounded-full animate-ping"></span>
                    {t("contact.transmissionSuccess")}
                  </div>
                  <h3 className="text-2xl text-[var(--t1)] font-bold mb-4 uppercase tracking-tight">
                    {t("contact.successTitle")}
                  </h3>
                  <p className="text-[var(--t2)] text-sm leading-relaxed mb-10 max-w-sm">
                    {t("contact.successDesc")}
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-3 border border-[var(--v)] text-[var(--v)] hover:bg-[var(--v)] hover:text-[var(--bg)] px-6 py-3.5 text-[0.65rem] font-bold tracking-widest uppercase transition-all duration-300"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 12h18" />
                      <path d="M3 12l6-6" />
                      <path d="M3 12l6 6" />
                    </svg>
                    {t("contact.sendAnother")}
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-10 md:gap-12 w-full max-w-2xl ml-auto"
              >
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  readOnly
                />

                {/* Name */}
                <div className="relative group">
                  <div className="flex justify-between items-end mb-2">
                    <label
                      htmlFor="name"
                      className="font-mono text-[0.6rem] text-[var(--t3)] uppercase tracking-[0.15em] transition-colors group-focus-within:text-[var(--v)]"
                    >
                      {t("contact.nameLabel")}
                    </label>
                    <span className="font-mono text-[0.6rem] text-[var(--v)] opacity-0 group-focus-within:opacity-100 transition-opacity animate-pulse">
                      {t("contact.inputActive")}
                    </span>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] text-[var(--t1)] text-base py-2 focus:outline-none focus:ring-0 focus:border-[var(--v)] transition-all placeholder:text-[var(--t3)]/30 rounded-none shadow-none"
                    placeholder={t("contact.placeholder.name")}
                  />
                  {fieldErrors.name && (
                    <p className="text-[#fb7185] font-mono text-[0.6rem] mt-2 absolute -bottom-5">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative group">
                  <div className="flex justify-between items-end mb-2">
                    <label
                      htmlFor="email"
                      className="font-mono text-[0.6rem] text-[var(--t3)] uppercase tracking-[0.15em] transition-colors group-focus-within:text-[var(--c)]"
                    >
                      {t("contact.emailLabel")}
                    </label>
                    <span className="font-mono text-[0.6rem] text-[var(--c)] opacity-0 group-focus-within:opacity-100 transition-opacity animate-pulse">
                      {t("contact.inputActive")}
                    </span>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={MAX_EMAIL_LENGTH}
                    autoComplete="email"
                    className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] text-[var(--t1)] text-base py-2 focus:outline-none focus:ring-0 focus:border-[var(--c)] transition-all placeholder:text-[var(--t3)]/30 rounded-none shadow-none"
                    placeholder={t("contact.placeholder.email")}
                  />
                </div>

                {/* Subject */}
                <div className="relative group">
                  <div className="flex justify-between items-end mb-2">
                    <label
                      htmlFor="subject"
                      className="font-mono text-[0.6rem] text-[var(--t3)] uppercase tracking-[0.15em] transition-colors group-focus-within:text-[var(--v)]"
                    >
                      {t("contact.label.subject")}
                    </label>
                  </div>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] text-[var(--t1)] text-base py-2 focus:outline-none focus:ring-0 focus:border-[var(--v)] transition-all placeholder:text-[var(--t3)]/30 rounded-none shadow-none"
                    placeholder={t("contact.placeholder.subject")}
                  />
                </div>

                {/* Message */}
                <div className="relative group">
                  <div className="flex justify-between items-end mb-2">
                    <label
                      htmlFor="message"
                      className="font-mono text-[0.6rem] text-[var(--t3)] uppercase tracking-[0.15em] transition-colors group-focus-within:text-[var(--v)]"
                    >
                      {t("contact.messageLabel")}
                    </label>
                    <span
                      className={`font-mono text-[0.6rem] ${formData.message.length > MAX_MESSAGE_LENGTH ? "text-[#fb7185]" : "text-[var(--t3)]/50"}`}
                    >
                      [{formData.message.length}/{MAX_MESSAGE_LENGTH}]
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] text-[var(--t1)] text-base py-2 min-h-[100px] resize-y focus:outline-none focus:ring-0 focus:border-[var(--v)] transition-all placeholder:text-[var(--t3)]/30 rounded-none shadow-none"
                    placeholder={t("contact.placeholder.message")}
                  />
                  {fieldErrors.message && (
                    <p className="text-[#fb7185] font-mono text-[0.6rem] mt-2 absolute -bottom-5">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="flex items-start gap-3 p-3 bg-[#fb7185]/10 border-l-2 border-[#fb7185] text-[#fb7185] font-mono text-[0.65rem] uppercase tracking-widest">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !!fieldErrors.name ||
                      !!fieldErrors.message
                    }
                    className="relative group overflow-hidden flex items-center justify-center gap-3 bg-[var(--v)] text-[var(--bg)] font-bold font-mono text-xs tracking-[0.2em] uppercase px-10 py-5 transition-all duration-300 hover:shadow-[0_0_25px_var(--shadow-v)] disabled:opacity-50 disabled:cursor-not-allowed [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="relative z-10 w-3.5 h-3.5 border-2 border-[var(--bg)] border-t-transparent rounded-full animate-spin"></span>
                        <span className="relative z-10">{t("contact.sending")}</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">
                          {t("contact.send").replace(/^→\s*/, "")}
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        >
                          <path d="M7 17l9.2-9.2M17 17V7H7" />
                        </svg>
                      </>
                    )}
                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out pointer-events-none"></div>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}