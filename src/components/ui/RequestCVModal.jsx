import { useState, useEffect, useRef } from "react";

const WEB3FORMS_KEY = "25fe095d-6c02-4f9b-9e95-e80c073b3d43";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 100;

export default function RequestCVModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [fieldErrors, setFieldErrors] = useState({ name: "", company: "" }); // Real-time error per field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-cv-modal", handleOpen);
    return () => window.removeEventListener("open-cv-modal", handleOpen);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    // Bug tambahan Fix — reset ref & state saat modal ditutup paksa
    isSubmittingRef.current = false;
    setTimeout(() => {
      setSubmitted(false);
      setError(null);
      setIsSubmitting(false);
      setFieldErrors({ name: "", company: "" });
    }, 300);
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Bug #3 Fix — Reset error global saat user mengedit
    setError(null);

    // Real-time validasi per field
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (name === "name") {
        next.name =
          value.length > MAX_NAME_LENGTH
            ? `Nama maksimal ${MAX_NAME_LENGTH} karakter (sekarang ${value.length}).`
            : "";
      }
      if (name === "company") {
        next.company =
          value.length > MAX_COMPANY_LENGTH
            ? `Perusahaan/Tujuan maksimal ${MAX_COMPANY_LENGTH} karakter (sekarang ${value.length}).`
            : "";
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
    if (fieldErrors.name || fieldErrors.company) return;

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
    if (!formData.company.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        company: "Perusahaan/Tujuan tidak boleh kosong atau hanya spasi.",
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
          subject: `Permintaan Akses CV dari ${formData.name.trim()}`,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: `Halo Rian,\n\nSaya tertarik dengan profil Anda dan ingin meminta akses untuk melihat CV lengkap.\n\nPerusahaan/Instansi: ${formData.company.trim()}`,
          botcheck: "",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", company: "" });
        setFieldErrors({ name: "", company: "" });
        setTimeout(() => {
          closeModal();
        }, 4000);
      } else {
        setError(result?.message || "Terjadi kesalahan. Coba lagi.");
      }
    } catch (err) {
      setError("Gagal terhubung. Periksa koneksi internet kamu.");
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#04040f]/80 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      ></div>

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_20px_60px_rgba(16,185,129,0.15)] animate-fade-in-up z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none"></div>

        <button
          onClick={closeModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-all duration-300 z-20"
          aria-label="Tutup"
        >
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
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
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
            <h3 className="text-xl font-bold text-white mb-2 font-display">
              Permintaan Terkirim!
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Terima kasih. Saya akan segera meninjau dan mengirimkan instruksi
              akses CV lengkap saya ke email Anda.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
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
                  className="text-emerald-400"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-display leading-tight">
                  Minta Akses CV
                </h3>
                <p className="text-slate-400 text-xs">
                  Dokumen rahasia via email personal.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 relative z-10"
            >
              {/* Bug #4 Fix — Honeypot */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                readOnly
              />

              {/* Field Nama */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-900/80 border text-white text-sm focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600 shadow-inner ${
                    fieldErrors.name
                      ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/30"
                      : "border-slate-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30"
                  }`}
                  placeholder="John Doe"
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
                <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">
                  Email Anda
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={MAX_EMAIL_LENGTH}
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl bg-dark-900/80 border border-slate-700/50 text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all placeholder:text-slate-600 shadow-inner"
                  placeholder="email@perusahaan.com"
                />
              </div>

              {/* Field Perusahaan */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 ml-1">
                  Perusahaan / Tujuan
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  autoComplete="organization"
                  className={`w-full px-4 py-3 rounded-xl bg-dark-900/80 border text-white text-sm focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600 shadow-inner ${
                    fieldErrors.company
                      ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/30"
                      : "border-slate-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30"
                  }`}
                  placeholder="PT Teknologi Modern"
                />
                {/* Real-time error perusahaan */}
                {fieldErrors.company && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {fieldErrors.company}
                  </p>
                )}
              </div>

              {/* Error global (koneksi / API) */}
              {error && (
                <div className="flex items-center gap-2 mt-1 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-400 flex-shrink-0"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" x2="12" y1="8" y2="12"></line>
                    <line x1="12" x2="12.01" y1="16" y2="16"></line>
                  </svg>
                  <p className="text-red-400 text-xs font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={
                  isSubmitting || !!fieldErrors.name || !!fieldErrors.company
                }
                className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Kirim Permintaan CV
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}