"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
    message: "",
  });

  const [formState, setFormState] = useState<"idle" | "submitting" | "submitted" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          phone: formData.phone,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setFormState("submitted");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Shared Header Navigation */}
      <Header />

      {/* Main Content Canvas */}
      <main className="max-w-container-max mx-auto px-4 sm:px-6 md:px-8 py-24 md:py-32 flex-grow overflow-x-hidden">
        {/* Header Section */}
        <div className="max-w-3xl mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6">
            Let's build intelligence together.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Reach out to our institutional success team. We're here to answer questions, discuss custom deployments, and help your organization leverage AI with confidence.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

          {/* Contact Form (Spans 8 columns) */}
          <div className="lg:col-span-8 bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            {/* Decorative Accent Bar */}
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/80 rounded-l-2xl"></div>

            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-8">
              Send us a message
            </h2>

            {formState === "submitted" ? (
              <div className="p-6 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-3 text-white">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
                  <span className="material-symbols-outlined">check_circle</span>
                  Thank You for Reaching Out!
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Your message has been received by our Institutional Success team. We will be in touch within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setFormState("idle");
                    setFormData({ name: "", email: "", organization: "", phone: "", message: "" });
                  }}
                  className="mt-4 text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline"
                >
                  Send another message
                </button>
              </div>
            ) : formState === "error" ? (
              <div className="p-6 bg-red-950/30 border border-red-500/30 rounded-xl space-y-3 text-white">
                <div className="flex items-center gap-2 text-red-400 font-bold text-lg">
                  <span className="material-symbols-outlined">error</span>
                  Submission Failed
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Something went wrong while sending your message. Please try again or reach out directly via email.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-4 text-xs font-semibold text-red-400 hover:text-red-300 underline"
                >
                  Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      className="text-xs sm:text-sm font-medium text-slate-300 block"
                      htmlFor="name"
                    >
                      Full Name
                    </label>
                    <input
                      required
                      className="w-full bg-[#121218] border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all px-4 py-3 text-sm sm:text-base text-white placeholder:text-slate-600"
                      id="name"
                      placeholder="Jane Doe"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="text-xs sm:text-sm font-medium text-slate-300 block"
                      htmlFor="email"
                    >
                      Institutional Email
                    </label>
                    <input
                      required
                      className="w-full bg-[#121218] border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all px-4 py-3 text-sm sm:text-base text-white placeholder:text-slate-600"
                      id="email"
                      placeholder="jane@university.edu"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      className="text-xs sm:text-sm font-medium text-slate-300 block"
                      htmlFor="organization"
                    >
                      Organization
                    </label>
                    <input
                      required
                      className="w-full bg-[#121218] border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all px-4 py-3 text-sm sm:text-base text-white placeholder:text-slate-600"
                      id="organization"
                      placeholder="University Name"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="text-xs sm:text-sm font-medium text-slate-300 block"
                      htmlFor="phone"
                    >
                      Phone Number (Optional)
                    </label>
                    <input
                      className="w-full bg-[#121218] border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all px-4 py-3 text-sm sm:text-base text-white placeholder:text-slate-600"
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-xs sm:text-sm font-medium text-slate-300 block"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    required
                    className="w-full bg-[#121218] border border-white/10 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all px-4 py-3 text-sm sm:text-base text-white placeholder:text-slate-600 resize-none"
                    id="message"
                    placeholder="How can we assist your institution?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    disabled={formState === "submitting"}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-8 py-3 rounded-xl border border-indigo-500/40 transition-all shadow-md active:scale-95 flex items-center gap-2 disabled:opacity-50"
                    type="submit"
                  >
                    <span>{formState === "submitting" ? "Sending..." : "Send Message"}</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Direct Contact Info (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">

            {/* Contact Details Card */}
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 sm:p-8 flex-1 flex flex-col justify-center">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-8">
                Direct Contact
              </h3>
              <div className="space-y-8">

                {/* Gmail */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/[0.05] border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-indigo-400">mark_email_read</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1">Gmail</h4>
                    <a
                      className="text-sm sm:text-base text-indigo-400 hover:text-indigo-300 transition-colors break-all"
                      href="mailto:kikhoborai@gmail.com"
                    >
                      kikhoborai@gmail.com
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/[0.05] border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-indigo-400">photo_camera</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1">Instagram</h4>
                    <a
                      className="text-sm sm:text-base text-indigo-400 hover:text-indigo-300 transition-colors break-all"
                      href="https://www.instagram.com/ki__khobor"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @ki__khobor
                    </a>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/[0.05] border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-indigo-400">groups</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1">Facebook</h4>
                    <a
                      className="text-sm sm:text-base text-indigo-400 hover:text-indigo-300 transition-colors break-all"
                      href="https://www.facebook.com/ki.khobor.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ki khobor ai
                    </a>
                  </div>
                </div>


                {/* Headquarters */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/[0.05] border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-indigo-400">location_on</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1">Headquarters</h4>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                      Sovima, 6th Mile,<br />
                      Chumukedima, Nagaland
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
