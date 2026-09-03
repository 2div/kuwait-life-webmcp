"use client";

import { useState } from "react";
import ServiceSearch from "@/components/ServiceSearch";

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const isArabic = language === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50"
    >
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-16">
        <div className="mb-8 flex w-full max-w-3xl justify-end">
          <button
            type="button"
            onClick={() =>
              setLanguage((current) =>
                current === "en" ? "ar" : "en",
              )
            }
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-100"
          >
            {isArabic ? "English" : "العربية"}
          </button>
        </div>

        <div className="mb-10 max-w-3xl text-center">
          <p className="mb-4 text-lg font-semibold text-gray-800">
            🇰🇼 Kuwait Life
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {isArabic ? (
              <>
                الخدمات الحكومية
                <br />
                بطريقة أبسط.
              </>
            ) : (
              <>
                Government services,
                <br />
                explained simply.
              </>
            )}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            {isArabic
              ? "اعثر على معلومات واضحة حول الخدمات الحكومية في الكويت والمتطلبات والمستندات والرسوم والمصادر الرسمية."
              : "Find clear information about Kuwait government services, requirements, documents, fees, and official sources."}
          </p>
        </div>

        <ServiceSearch language={language} />

        <p className="mt-12 max-w-2xl text-center text-xs leading-5 text-gray-500">
          {isArabic
            ? "Kuwait Life مشروع معلوماتي مستقل وغير تابع لحكومة الكويت. تحقق دائماً من المعلومات من خلال المصدر الحكومي الرسمي المرتبط."
            : "Kuwait Life is an independent informational project and is not affiliated with the Government of Kuwait. Always verify information using the linked official government source."}
        </p>
      </section>
    </main>
  );
}