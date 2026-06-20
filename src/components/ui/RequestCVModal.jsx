import { useState, useEffect, useRef } from "react";
import { dictionary } from "@/i18n/dictionary";
import { langStore } from "@/stores/langStore";

const WEB3FORMS_KEY = "25fe095d-6c02-4f9b-9e95-e80c073b3d43";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 100;

export default function RequestCVModal() {
  const [lang, setLang] = useState("id");
  
  // State untuk animasi masuk/keluar yang smooth
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const [formData, setFormData] = useState({ name: "", email: "", company: "" });
  const [fieldErrors, setFieldErrors] = useState({ name: "", company: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const isSubmittingRef = useRef(false);

  // Subscribe ke perubahan bahasa
  useEffect(() => {
    setLang(langStore.get());
    const unsubscribe = langStore.subscribe((newLang) => setLang(newLang));
    return () => unsubscribe();
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

  // Handle pembukaan modal dengan animasi
  useEffect(() => {
    const handleOpen = () => {
      setIsRendered(true);
      // Timeout kecil agar browser sempat me-render elemen di DOM sebelum transisi CSS berjalan
      setTimeout(() => setIsVisible(true), 10);
    };
    window.addEventListener("open-cv-modal", handleOpen);
    return () => window.removeEventListener("open-cv-modal", handleOpen);
  }, []);

  // Handle penutupan modal dengan animasi
  const closeModal = () => {
    setIsVisible(false); // Jalankan animasi keluar
    isSubmittingRef.current = false;
    
    // Tunggu animasi CSS selesai baru hapus dari DOM
    setTimeout(() => {
      setIsRendered(false);
      setSubmitted(false);
      setError(null);
      setIsSubmitting(false);
      setFormData({ name: "", email: "", company: "" });
      setFieldErrors({ name: "", company: "" });
    }, 400); // 400ms durasi animasi
  };

  // Kunci scroll body saat modal terbuka
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isVisible]);

  // Jika belum di-render ke DOM, kembalikan null
  if (!isRendered) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);

    setFieldErrors((prev) => {
      const next = { ...prev };
      if (name === "name") {
        next.name = value.length > MAX_NAME_LENGTH ? t("contact.error.longName", { max: MAX_NAME_LENGTH, count: value.length }) : "";
      }
      if (name === "company") {
        next.company = value.length > MAX_COMPANY_LENGTH ? t("cvModal.error.longCompany", { max: MAX_COMPANY_LENGTH }) : "";
      }
      return next;
    });

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmittingRef.current) return;
    if (fieldErrors.name || fieldErrors.company) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setError(null);

    if (!formData.name.trim()) {
      setFieldErrors((prev) => ({ ...prev, name: t("contact.error.emptyName") }));
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      return;
    }
    if (!formData.company.trim()) {
      setFieldErrors((prev) => ({ ...prev, company: t("cvModal.error.emptyCompany") }));
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
          subject: `CV Request from ${formData.name.trim()}`,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: `Hello Rian,\n\nI am interested in your profile and would like to request access to your complete CV.\n\nCompany/Purpose: ${formData.company.trim()}`,
          botcheck: "",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => closeModal(), 4000);
      } else {
        setError(result?.message || t("contact.error.general"));
      }
    } catch (err) {
      setError(t("contact.error.connection"));
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 pt-10 pb-4 sm:p-0">
      {/* ── BACKDROP (FADE IN/OUT) ── */}
      <div
        className={`absolute inset-0 bg-[var(--bg)]/85 backdrop-blur-sm transition-opacity duration-400 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeModal}
      ></div>

      {/* ── MODAL BOX (SPRING ANIMATION) ── */}
      {/* Menggunakan cubic-bezier untuk efek pantulan kecil ala popup macOS/iOS */}
      <div 
        className={`relative w-full max-w-md bg-[var(--bg-2)] border border-[var(--border)] rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] z-10 flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-12"
        }`}
      >
        {/* Terminal Header ala Cyberpunk */}
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-3)] border-b border-[var(--border)] flex-shrink-0">
          <div className="flex gap-2">
            <button onClick={closeModal} className="w-3 h-3 rounded-full bg-[#fb7185] hover:bg-[#e11d48] transition-colors border border-transparent"></button>
            <div className="w-3 h-3 rounded-full bg-[#fbbf24] border border-transparent"></div>
            <div className="w-3 h-3 rounded-full bg-[var(--g)] border border-transparent"></div>
          </div>
          <div className="text-[0.6rem] font-mono text-[var(--t3)] tracking-widest uppercase ml-4">
            sys.req.cv //
          </div>
        </div>

        {/* Ambient Glow di Pojok Kanan Atas */}
        <div className="absolute top-12 right-0 w-32 h-32 bg-[var(--orb-v)] rounded-full blur-[40px] pointer-events-none"></div>

        {/* Konten Utama */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[var(--vd)] border border-[var(--v)] flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_var(--shadow-v)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--v)]"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--t1)] mb-2 font-['Syne'] uppercase">
                {t("cvModal.successTitle")}
              </h3>
              <p className="text-[var(--t2)] text-sm leading-relaxed font-light">
                {t("cvModal.successDesc")}
              </p>
            </div>
          ) : (
            <>
              {/* Header Title */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[var(--vd)] rounded-xl border border-[var(--v)]/30 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--v)]"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--t1)] font-['Syne'] uppercase tracking-tight leading-none mb-1">
                    {t("cvModal.title")}
                  </h3>
                  <p className="text-[var(--t3)] font-['JetBrains_Mono'] uppercase tracking-widest text-[0.6rem]">
                    {t("cvModal.subtitle")}
                  </p>
                </div>
              </div>

              {/* Form Area */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} readOnly />

                {/* Input: Nama */}
                <div className="group relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className={`peer w-full px-4 py-3.5 rounded bg-[var(--bg-3)] border text-[var(--t1)] text-sm focus:outline-none focus:ring-1 transition-all duration-300 placeholder-transparent shadow-inner ${
                      fieldErrors.name ? "border-[#fb7185] focus:ring-[#fb7185]/30" : "border-[var(--border)] focus:border-[var(--v)] focus:shadow-[0_0_15px_var(--shadow-v)]"
                    }`}
                    placeholder="Nama Lengkap"
                  />
                  <label className="absolute left-4 top-3.5 text-sm text-[var(--t3)] transition-all duration-300 pointer-events-none peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-[0.65rem] peer-focus:text-[var(--v)] peer-focus:bg-[var(--bg-2)] peer-focus:px-1 peer-valid:-top-2.5 peer-valid:left-2 peer-valid:text-[0.65rem] peer-valid:bg-[var(--bg-2)] peer-valid:px-1 font-['JetBrains_Mono'] tracking-wide">
                    {t("cvModal.nameLabel")}
                  </label>
                  {fieldErrors.name && <p className="text-[#fb7185] text-xs mt-1.5 font-light px-1">{fieldErrors.name}</p>}
                </div>

                {/* Input: Email */}
                <div className="group relative mt-2">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={MAX_EMAIL_LENGTH}
                    autoComplete="email"
                    className="peer w-full px-4 py-3.5 rounded bg-[var(--bg-3)] border border-[var(--border)] text-[var(--t1)] text-sm focus:outline-none focus:border-[var(--v)] focus:ring-1 focus:shadow-[0_0_15px_var(--shadow-v)] transition-all duration-300 placeholder-transparent shadow-inner"
                    placeholder="Email"
                  />
                  <label className="absolute left-4 top-3.5 text-sm text-[var(--t3)] transition-all duration-300 pointer-events-none peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-[0.65rem] peer-focus:text-[var(--v)] peer-focus:bg-[var(--bg-2)] peer-focus:px-1 peer-valid:-top-2.5 peer-valid:left-2 peer-valid:text-[0.65rem] peer-valid:bg-[var(--bg-2)] peer-valid:px-1 font-['JetBrains_Mono'] tracking-wide">
                    {t("contact.emailLabel")}
                  </label>
                </div>

                {/* Input: Company */}
                <div className="group relative mt-2">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    autoComplete="organization"
                    className={`peer w-full px-4 py-3.5 rounded bg-[var(--bg-3)] border text-[var(--t1)] text-sm focus:outline-none focus:ring-1 transition-all duration-300 placeholder-transparent shadow-inner ${
                      fieldErrors.company ? "border-[#fb7185] focus:ring-[#fb7185]/30" : "border-[var(--border)] focus:border-[var(--v)] focus:shadow-[0_0_15px_var(--shadow-v)]"
                    }`}
                    placeholder="Perusahaan"
                  />
                  <label className="absolute left-4 top-3.5 text-sm text-[var(--t3)] transition-all duration-300 pointer-events-none peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-[0.65rem] peer-focus:text-[var(--v)] peer-focus:bg-[var(--bg-2)] peer-focus:px-1 peer-valid:-top-2.5 peer-valid:left-2 peer-valid:text-[0.65rem] peer-valid:bg-[var(--bg-2)] peer-valid:px-1 font-['JetBrains_Mono'] tracking-wide">
                    {t("cvModal.companyLabel")}
                  </label>
                  {fieldErrors.company && <p className="text-[#fb7185] text-xs mt-1.5 font-light px-1">{fieldErrors.company}</p>}
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="flex items-center gap-2 mt-2 bg-[#fb7185]/10 p-3 rounded border border-[#fb7185]/20 animate-fade-in-up">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#fb7185] flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
                    <p className="text-[#fb7185] text-xs font-mono tracking-wide">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !!fieldErrors.name || !!fieldErrors.company}
                  className="w-full mt-4 relative overflow-hidden group inline-flex items-center justify-center gap-2 rounded bg-[var(--v)] px-4 py-4 text-xs font-mono font-bold uppercase tracking-widest text-[var(--bg)] shadow-lg hover:shadow-[0_8px_30px_var(--shadow-v)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[var(--bg)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      {t("cvModal.sending")}
                    </>
                  ) : (
                    <>
                      {t("cvModal.send")}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </>
                  )}
                  {/* Sweep Effect */}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none rounded"></div>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}