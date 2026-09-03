import { useState } from "react";
import emailjs from "@emailjs/browser";
import SectionTitle from "../components/SectionTitle";

// ---------------------------------------------------------------
// EmailJS configuration (https://www.emailjs.com)
// Credentials come from environment variables only — never hardcode
// or commit them. Create a `.env` file in the project root with:
//   VITE_EMAILJS_SERVICE_ID=
//   VITE_EMAILJS_TEMPLATE_ID=
//   VITE_EMAILJS_PUBLIC_KEY=
// The receiving inbox (madhaviporte2004@gmail.com) is configured in
// the EmailJS dashboard template, not in this code.
// ---------------------------------------------------------------
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";
const EMAILJS_CONFIGURED = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
);

// The public key is safe to expose client-side (EmailJS is designed
// for browser use). Initialising once at module load is enough.
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

const SUCCESS_MESSAGE = "Message sent successfully! I'll get back to you soon.";
const ERROR_MESSAGE = "Something went wrong. Please try again.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputBase =
  "w-full rounded-lg border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none transition-colors duration-200";

function fieldClass(hasError) {
  return `${inputBase} ${hasError ? "border-red-400/60" : "border-white/10 focus:border-lime-400/60"}`;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function validateForm({ name, email, subject, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!subject.trim()) errors.subject = "Please enter a subject.";
  if (!message.trim()) {
    errors.message = "Please write a short message.";
  } else if (message.trim().length < 10) {
    errors.message = "Your message is a little short (10+ characters).";
  }
  return errors;
}

async function sendEmail({ name, email, subject, message }) {
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    name,
    email,
    subject,
    message,
    // Lets the EmailJS template reply to the visitor directly from Gmail.
    reply_to: email,
  });
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const updateField = (field) => (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return; // prevent duplicate submissions

    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("sending");

    try {
      if (!EMAILJS_CONFIGURED) {
        // Developer-facing hint only — visitors always get the generic message.
        console.warn(
          "[portfolio] EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, " +
            "VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in .env"
        );
        throw new Error("EmailJS not configured");
      }
      await sendEmail({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      // Never surface technical details to the visitor.
      console.error("[portfolio] Contact form send failed:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-28 lg:py-32">
      <div className="w-full max-w-[80rem] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
        <div data-section-title>
          <SectionTitle title="Get In Touch" subtitle="Let's work together on your next project" />
        </div>

        <div data-contact className="max-w-5xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Direct contact info */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-semibold text-white leading-snug mb-4">
                Have a project in mind or want to know more?
              </h3>
              <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 lg:mb-10">
                Send me a message and I&apos;ll get back to you — or reach out directly any time.
              </p>

              <a
                href="mailto:madhaviporte2004@gmail.com"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-lime-400 text-black font-medium rounded-xl hover:bg-lime-300 transition-all duration-200 text-base sm:text-lg mb-8 lg:mb-10"
                style={{ boxShadow: "0 10px 25px -5px rgba(163,230,53,0.2)" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                madhaviporte2004@gmail.com
              </a>

              <div className="flex items-center justify-center lg:justify-start gap-8">
                <a href="https://github.com/madhaviporte" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-gray-400 hover:text-lime-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/madhavi-porte-091219329/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-gray-400 hover:text-lime-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 lg:p-10">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <Field id="contact-name" label="Name" error={errors.name}>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="Your name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    className={fieldClass(errors.name)}
                  />
                </Field>
                <Field id="contact-email" label="Email" error={errors.email}>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={updateField("email")}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    className={fieldClass(errors.email)}
                  />
                </Field>
              </div>

              <Field id="contact-subject" label="Subject" error={errors.subject}>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={updateField("subject")}
                  placeholder="What is this about?"
                  aria-invalid={Boolean(errors.subject)}
                  className={`${fieldClass(errors.subject)} mb-5`}
                />
              </Field>

              <Field id="contact-message" label="Message" error={errors.message}>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={updateField("message")}
                  placeholder="Write your message here..."
                  rows={5}
                  aria-invalid={Boolean(errors.message)}
                  className={`${fieldClass(errors.message)} resize-none`}
                />
              </Field>

              <div aria-live="polite" className="mt-5">
                {status === "success" && (
                  <div className="rounded-lg border border-lime-400/30 bg-lime-400/10 text-lime-300 text-sm px-4 py-3 mb-5">
                    {SUCCESS_MESSAGE}
                  </div>
                )}
                {status === "error" && (
                  <div className="rounded-lg border border-red-400/30 bg-red-400/10 text-red-300 text-sm px-4 py-3 mb-5" role="alert">
                    {ERROR_MESSAGE}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-lime-400 text-black font-medium rounded-xl hover:bg-lime-300 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-base"
              >
                {status === "sending" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
