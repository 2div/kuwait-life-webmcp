"use client";

import { useState } from "react";
import ServiceSearch from "@/components/ServiceSearch";

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const isArabic = language === "ar";

  return (
    <main
      lang={language}
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen overflow-x-clip bg-[#f7f9f8] text-slate-950"
    >
      <a
        href="#main-content"
        className="sr-only z-50 rounded-lg bg-slate-950 px-4 py-3 font-bold text-white focus:fixed focus:start-4 focus:top-4 focus:not-sr-only focus:outline-2 focus:outline-offset-2 focus:outline-emerald-600"
      >
        {isArabic ? "انتقل إلى المحتوى الرئيسي" : "Skip to main content"}
      </a>
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[4.75rem] w-full max-w-[76rem] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="kuwait-mark"
            />
            <span className="leading-tight">
              <span className="block text-xl font-bold tracking-[-0.035em] text-[#0b1324] sm:text-[1.3rem]">
                Kuwait Life
              </span>
              <span className="mt-0.5 hidden text-xs font-medium text-slate-600 sm:block">
                {isArabic ? "الخدمات العامة بشكل أوضح" : "Public services, made clearer"}
              </span>
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              setLanguage((current) => (current === "en" ? "ar" : "en"))
            }
            aria-label={
              isArabic ? "Switch language to English" : "تغيير اللغة إلى العربية"
            }
            className="inline-flex min-h-11 items-center gap-2.5 rounded-xl bg-slate-100/80 px-3.5 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-200/70 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-emerald-700 sm:px-4"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-5 shrink-0 text-emerald-700"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3c2.25 2.46 3.5 5.63 3.5 9S14.25 18.54 12 21" />
              <path d="M12 3c-2.25 2.46-3.5 5.63-3.5 9S9.75 18.54 12 21" />
            </svg>
            <span>{isArabic ? "English" : "Arabic"}</span>
          </button>
        </div>
      </header>

      <div id="main-content">
        <section className="relative isolate overflow-hidden bg-[#fcfdfc]">
          <div className="civic-glow" aria-hidden="true" />
          <div className="mx-auto flex w-full max-w-[76rem] flex-col items-center px-4 pb-20 pt-14 text-center sm:px-6 sm:pb-28 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-24">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50/90 px-3.5 py-2 text-xs font-bold tracking-wide text-emerald-900 ring-1 ring-emerald-800/10 sm:text-sm">
              <span className="size-1.5 rounded-full bg-emerald-600" aria-hidden="true" />
              {isArabic ? "مدعوم بالذكاء الاصطناعي و WebMCP" : "AI + WebMCP enabled"}
            </div>

            <h1
              className={`mt-7 max-w-4xl text-balance text-[2.5rem] font-semibold leading-[1.08] text-[#07101f] sm:mt-8 sm:text-[3.5rem] lg:text-[4rem] ${
                isArabic ? "tracking-normal" : "tracking-[-0.05em]"
              }`}
            >
              {isArabic ? (
                <>
                  الخدمات الحكومية،
                  <br className="hidden sm:block" /> بطريقة أبسط.
                </>
              ) : (
                <>
                  Government services,
                  <br className="hidden sm:block" /> explained simply.
                </>
              )}
            </h1>

            <p className="mt-5 max-w-[40rem] text-pretty text-[1.0625rem] leading-7 text-slate-700 sm:mt-6 sm:text-lg sm:leading-8">
              {isArabic
                ? "معلومات واضحة وعملية حول خدمات حكومة الكويت، بما في ذلك المتطلبات والمستندات والرسوم والقنوات الرسمية."
                : "Clear, practical guidance for Kuwait government services—including requirements, documents, fees, and official channels."}
            </p>
          </div>
        </section>

        <section
          aria-label={isArabic ? "البحث عن الخدمات" : "Service search"}
          className="mx-auto flex w-full max-w-[76rem] flex-col items-center px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8"
        >
          <ServiceSearch language={language} />
        </section>
      </div>

      <footer className="bg-[#f1f4f2]">
        <div className="mx-auto flex w-full max-w-[76rem] flex-col gap-3 px-4 py-8 text-sm leading-6 text-slate-500 sm:px-6 sm:py-10 md:flex-row md:items-start md:justify-between md:gap-10 lg:px-8">
          <p className="shrink-0 font-semibold text-slate-700">© 2026 Kuwait Life</p>
          <p className="max-w-[42rem] text-[0.8125rem] leading-6 md:text-end">
            {isArabic
              ? "Kuwait Life مشروع معلوماتي مستقل وغير تابع لحكومة الكويت. تحقق دائماً من المعلومات من خلال المصدر الحكومي الرسمي المرتبط."
              : "Kuwait Life is an independent informational project and is not affiliated with the Government of Kuwait. Always verify information using the linked official government source."}
          </p>
        </div>
      </footer>
    </main>
  );
}
