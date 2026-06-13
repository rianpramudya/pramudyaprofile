import { useState, useEffect, useRef } from "react";
import { site } from "@/content/site";

const WEB3FORMS_KEY = "25fe095d-6c02-4f9b-9e95-e80c073b3d43";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({ name: "", message: "" }); // Real-time error per field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Bug #3 Fix — Reset error global saat user mengedit
    setError(null);

    // Real-time validasi per field
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (name === "name") {
        if (value.length > MAX_NAME_LENGTH) {
          next.name = `Nama maksimal ${MAX_NAME_LENGTH} karakter (sekarang ${value.length}).`;
        } else {
          next.name = "";
        }
      }
      if (name === "message") {
        if (value.length > MAX_MESSAGE_LENGTH) {
          next.message = `Pesan maksimal ${MAX_MESSAGE_LENGTH} karakter (sekarang ${value.length}).`;
        } else {
          next.message = "";
        }
      }
      return next;
    });

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bug #5 Fix — Race condition
    if (isSubmittingRef.current) return;

    // Blok submit jika masih ada field error
    if (fieldErrors.name || fieldErrors.message) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setError(null);

    // Bug #1 Fix — Validasi whitespace-only
    if (!formData.name.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        name: "Nama tidak boleh kosong atau hanya spasi.",
      }));
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      return;
    }
    if (!formData.message.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        message: "Pesan tidak boleh kosong atau hanya spasi.",
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
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setFieldErrors({ name: "", message: "" });
      } else {
        const errMsg =
          result?.errors?.map((e) => e.message).join(", ") ||
          "Terjadi kesalahan. Coba beberapa saat lagi.";
        setError(errMsg);
      }
    } catch (err) {
      setError("Gagal terhubung. Periksa koneksi internet kamu.");
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      label: "LinkedIn",
      value: "rianpramudyaamanda",
      href: site.linkedin,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      label: "GitHub",
      value: "rianpramudya",
      href: site.github,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-[#04040f] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-3xl mx-auto mb-16 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4">
            <span className="w-8 h-px bg-emerald-500"></span>
            Kontak
            <span className="w-8 h-px bg-emerald-500"></span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-display leading-tight">
            Mari Berkolaborasi <span className="text-emerald-400">Bersama</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Punya ide proyek menarik atau ingin berdiskusi tentang teknologi?
            Saya terbuka untuk kolaborasi, freelance, dan kesempatan berharga
            lainnya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
          {/* ── Kiri: Contact Info ── */}
          <div
            className={`lg:col-span-2 h-full transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className="h-full flex flex-col rounded-2xl border border-slate-700/50 bg-dark-800/60 backdrop-blur-sm p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Informasi Kontak
              </h3>
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {contactInfo.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/30 border border-slate-700/30 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 group"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">
                          {item.label}
                        </p>
                        <p className="text-white text-sm font-medium group-hover:text-emerald-400 transition-colors duration-300">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </div>
                    <div>
                      <p className="text-emerald-400 text-sm font-semibold">
                        Respons Cepat
                      </p>
                      <p className="text-slate-500 text-xs">
                        Biasanya membalas dalam 1-2 hari
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Kanan: Contact Form ── */}
          <div
            className={`lg:col-span-3 h-full transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="h-full flex flex-col rounded-2xl border border-slate-700/50 bg-dark-800/60 backdrop-blur-sm p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">Kirim Pesan</h3>

              {submitted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-400"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Pesan Terkirim!
                  </h4>
                  <p className="text-slate-400 mb-6">
                    Terima kasih telah menghubungi saya. Saya akan membalas
                    secepat mungkin.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-6 py-2.5 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex-1 flex flex-col gap-5"
                >
                  {/* Bug #4 Fix — Honeypot */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: "none" }}
                    readOnly
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Field Nama */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        className={`w-full px-4 py-3 rounded-xl bg-dark-700/50 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          fieldErrors.name
                            ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20"
                            : "border-slate-600/50 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                        }`}
                        placeholder="Nama kamu"
                      />
                      {/* Real-time error nama */}
                      {fieldErrors.name && (
                        <p className="text-red-400 text-xs mt-1.5">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Field Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={MAX_EMAIL_LENGTH}
                        autoComplete="email"
                        className="w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-slate-600/50 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* Field Pesan */}
                  <div className="flex-1 flex flex-col">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className={`flex-1 w-full px-4 py-3 rounded-xl bg-dark-700/50 border text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 resize-none min-h-[120px] ${
                        fieldErrors.message
                          ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20"
                          : "border-slate-600/50 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      }`}
                      placeholder="Ceritakan tentang proyek atau ide kamu..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      {/* Real-time error pesan */}
                      {fieldErrors.message ? (
                        <p className="text-red-400 text-xs">
                          {fieldErrors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      {/* Karakter counter */}
                      <p
                        className={`text-xs ml-auto ${formData.message.length > MAX_MESSAGE_LENGTH ? "text-red-400" : "text-slate-600"}`}
                      >
                        {formData.message.length}/{MAX_MESSAGE_LENGTH}
                      </p>
                    </div>
                  </div>

                  {/* Error global (koneksi / API) */}
                  {error && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-400 flex-shrink-0 mt-0.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="12" />
                        <line x1="12" x2="12.01" y1="16" y2="16" />
                      </svg>
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !!fieldErrors.name ||
                      !!fieldErrors.message
                    }
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Pesan
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m22 2-7 20-4-9-9-4Z" />
                          <path d="M22 2 11 13" />
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
