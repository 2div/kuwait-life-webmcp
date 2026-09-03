"use client";

import { useEffect, useState } from "react";
import { searchServices } from "@/lib/service-search";
import type { ServiceChannel } from "@/types/service";

type ServiceSearchProps = {
  language: "en" | "ar";
};

const channelLabels: Record<ServiceChannel, { en: string; ar: string }> = {
  website: { en: "Website", ar: "الموقع الإلكتروني" },
  sahel: { en: "Sahel app", ar: "تطبيق سهل" },
  phone: { en: "Phone", ar: "الهاتف" },
  "in-person": { en: "In person", ar: "زيارة شخصية" },
};

export default function ServiceSearch({ language }: ServiceSearchProps) {
  const isArabic = language === "ar";
  const [query, setQuery] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );
  const [checklistServiceId, setChecklistServiceId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    function handleWebMCPResult(event: Event) {
      const customEvent = event as CustomEvent<{
        query: string;
        serviceId: string | null;
      }>;

      setQuery(customEvent.detail.query);
      setSelectedServiceId(customEvent.detail.serviceId);
    }

    window.addEventListener("kuwait-life:webmcp-result", handleWebMCPResult);

    return () => {
      window.removeEventListener(
        "kuwait-life:webmcp-result",
        handleWebMCPResult,
      );
    };
  }, []);

  useEffect(() => {
    if (!selectedServiceId) {
      return;
    }

    const element = document.getElementById(`service-${selectedServiceId}`);

    element?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [selectedServiceId]);

  useEffect(() => {
    function handleChecklist(event: Event) {
      const customEvent = event as CustomEvent<{
        serviceId: string;
      }>;

      setChecklistServiceId(customEvent.detail.serviceId);
      setSelectedServiceId(customEvent.detail.serviceId);
    }

    window.addEventListener("kuwait-life:webmcp-checklist", handleChecklist);

    return () => {
      window.removeEventListener(
        "kuwait-life:webmcp-checklist",
        handleChecklist,
      );
    };
  }, []);

  const results = searchServices(query);

  return (
    <div className="w-full max-w-4xl">
      <div className="relative -mt-10 rounded-[1.25rem] bg-white p-5 shadow-[0_18px_48px_-28px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/[0.07] sm:-mt-12 sm:rounded-[1.5rem] sm:p-6">
        <label
          htmlFor="service-search"
          className="mb-3 block text-[0.9375rem] font-semibold text-slate-900 sm:text-base"
        >
          {isArabic
            ? "ما الخدمة التي تحتاج مساعدة بشأنها؟"
            : "What do you need help with?"}
        </label>

        <div className="relative">
          <span className="search-icon" aria-hidden="true" />
          <input
            id="service-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedServiceId(null);
            }}
            placeholder={
              isArabic
                ? "مثال: أريد تجديد بطاقتي المدنية"
                : "Try: I need to renew my Civil ID"
            }
            autoComplete="off"
            className="h-[3.75rem] w-full rounded-xl border border-transparent bg-[#f1f5f3] px-4 ps-12 text-base text-slate-950 outline-none ring-1 ring-slate-900/[0.08] transition placeholder:text-slate-500 hover:bg-slate-100 focus:bg-white focus:ring-2 focus:ring-emerald-700/70 sm:h-16 sm:rounded-2xl sm:text-[1.0625rem]"
          />
        </div>

        <p className="mt-3 text-sm leading-5 text-slate-600">
          {isArabic
            ? "ابحث باسم الخدمة أو الجهة أو صف ما تريد إنجازه."
            : "Search by service, authority, or describe what you need to do."}
        </p>
      </div>

      <div className="mb-5 mt-11 flex items-end justify-between gap-4 px-1 sm:mb-6 sm:mt-13">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
            {isArabic ? "دليل الخدمات" : "Service directory"}
          </p>
          <h2 className="mt-1.5 text-[1.6rem] font-semibold tracking-[-0.03em] text-[#0b1324] sm:text-[1.8rem]">
            {query
              ? isArabic
                ? "نتائج البحث"
                : "Search results"
              : isArabic
                ? "الخدمات المتاحة"
                : "Available services"}
          </h2>
        </div>
        <p
          className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600"
          aria-live="polite"
        >
          {isArabic
            ? `${results.length} ${results.length === 1 ? "خدمة" : "خدمات"}`
            : `${results.length} ${results.length === 1 ? "service" : "services"}`}
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {results.map((service) => {
          const isSelected = selectedServiceId === service.id;
          const hasChecklist = checklistServiceId === service.id;

          return (
            <article
              key={service.id}
              id={`service-${service.id}`}
              className={`relative scroll-mt-24 overflow-hidden rounded-[1.15rem] bg-white shadow-[0_12px_36px_-28px_rgba(15,23,42,0.32)] ring-1 transition sm:rounded-[1.4rem] ${
                isSelected
                  ? "ring-2 ring-emerald-700/65 shadow-[0_18px_52px_-32px_rgba(4,120,87,0.3)]"
                  : "ring-slate-900/[0.07] hover:ring-slate-900/[0.12] hover:shadow-[0_18px_52px_-32px_rgba(15,23,42,0.42)]"
              }`}
            >
              {isSelected && (
                <span
                  className="absolute inset-y-0 start-0 w-1 bg-emerald-600"
                  aria-hidden="true"
                />
              )}

              <div className="p-5 sm:p-6 lg:p-7">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.11em] text-slate-600">
                      <span
                        className="size-1.5 rounded-full bg-emerald-600"
                        aria-hidden="true"
                      />
                      {service.authority}
                    </p>
                    {isSelected && (
                      <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 ring-1 ring-emerald-800/10">
                        <span aria-hidden="true">✦</span>
                        {isArabic ? "اختيار الذكاء الاصطناعي" : "AI selected"}
                      </p>
                    )}
                  </div>
                  <h3
                    className={`mt-3 text-[1.35rem] font-semibold leading-snug text-[#0b1324] sm:text-2xl ${
                      isArabic ? "tracking-normal" : "tracking-tight"
                    }`}
                  >
                    {service.title[language]}
                  </h3>
                  <p className="mt-2 max-w-3xl text-[0.9375rem] leading-6 text-slate-700 sm:text-base sm:leading-7">
                    {service.description[language]}
                  </p>
                </div>

                <div className="mt-5 grid gap-5 border-t border-slate-200/80 pt-5 md:grid-cols-2 md:gap-0">
                  <section>
                    <h4 className="text-[0.9375rem] font-semibold text-slate-950">
                      {isArabic ? "المستندات المطلوبة" : "Documents to prepare"}
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                      {service.documents.map((document) => (
                        <li key={document} className="flex items-start gap-3">
                          <span className="list-check" aria-hidden="true">
                            ✓
                          </span>
                          <span>{document}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="md:border-s md:border-slate-200/80 md:ps-6">
                    <h4 className="text-[0.9375rem] font-semibold text-slate-950">
                      {isArabic ? "متطلبات الخدمة" : "Service requirements"}
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                      {service.requirements.map((requirement) => (
                        <li key={requirement} className="flex items-start gap-3">
                          <span className="list-check" aria-hidden="true">
                            ✓
                          </span>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="mt-5 grid overflow-hidden rounded-xl bg-[#f1f5f3] sm:grid-cols-2 sm:rounded-2xl">
                  <div className="p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                      {isArabic ? "الرسوم" : "Fee"}
                    </p>
                    <p className="mt-1 text-[0.9375rem] font-semibold text-slate-950 sm:text-base">
                      {service.fee.amount !== null
                        ? `${service.fee.amount} ${service.fee.currency}`
                        : isArabic
                          ? "تحقق من المصدر الرسمي"
                          : "Check official source"}
                    </p>
                    {service.fee.notes && (
                      <p className="mt-1 text-sm leading-5 text-slate-600">
                        {service.fee.notes}
                      </p>
                    )}
                  </div>
                  <div className="border-t border-slate-200/80 p-4 sm:border-s sm:border-t-0">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">
                      {isArabic ? "قنوات الخدمة" : "Available through"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {service.channels.map((channel) => (
                        <span
                          key={channel}
                          className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]"
                        >
                          {channelLabels[channel][language]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {hasChecklist && (
                  <div className="mt-5 rounded-xl bg-emerald-50/80 p-4 ring-1 ring-emerald-800/10 sm:rounded-2xl sm:p-5">
                    <div className="flex items-start gap-3">
                      <div
                        className="grid size-9 shrink-0 place-items-center rounded-lg bg-emerald-700 text-base font-bold text-white shadow-sm"
                        aria-hidden="true"
                      >
                        ✓
                      </div>
                      <div>
                        <p className="text-base font-semibold text-emerald-950">
                          {isArabic
                            ? "قائمة التحقق جاهزة لك"
                            : "Your checklist is ready"}
                        </p>
                        <p className="mt-0.5 text-sm leading-6 text-emerald-900/80">
                          {isArabic
                            ? "أعدّ الذكاء الاصطناعي هذه الخطوات بناءً على معلومات الخدمة."
                            : "AI prepared these steps from the service information above."}
                        </p>
                      </div>
                    </div>

                    <fieldset className="mt-4 space-y-2">
                      <legend className="sr-only">
                        {isArabic
                          ? "قائمة متطلبات الخدمة"
                          : "Service preparation checklist"}
                      </legend>
                      {service.documents.map((document) => (
                        <label
                          key={document}
                          className="flex cursor-pointer items-start gap-3 rounded-lg bg-white/80 p-3 text-sm leading-6 text-slate-700 shadow-[inset_0_0_0_1px_rgba(6,78,59,0.07)] transition hover:bg-white"
                        >
                          <input
                            type="checkbox"
                            className="mt-0.5 size-5 shrink-0 accent-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                          />
                          <span>{document}</span>
                        </label>
                      ))}
                      {service.requirements.map((requirement) => (
                        <label
                          key={requirement}
                          className="flex cursor-pointer items-start gap-3 rounded-lg bg-white/80 p-3 text-sm leading-6 text-slate-700 shadow-[inset_0_0_0_1px_rgba(6,78,59,0.07)] transition hover:bg-white"
                        >
                          <input
                            type="checkbox"
                            className="mt-0.5 size-5 shrink-0 accent-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                          />
                          <span>{requirement}</span>
                        </label>
                      ))}
                    </fieldset>
                  </div>
                )}

                <div className="mt-5 flex flex-col gap-3 border-t border-slate-200/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-5 text-slate-600">
                    {isArabic
                      ? "راجع دائماً أحدث التفاصيل لدى الجهة الرسمية."
                      : "Always confirm the latest details with the official authority."}
                  </p>
                  <a
                    href={service.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${
                      isArabic
                        ? "عرض المصدر الرسمي لخدمة"
                        : "View official source for"
                    } ${service.title[language]}`}
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-12px_rgba(6,95,70,0.8)] transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                  >
                    {isArabic ? "عرض المصدر الرسمي" : "View official source"}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}

        {query && results.length === 0 && (
          <div
            className="rounded-[1.4rem] bg-white px-6 py-12 text-center shadow-[0_16px_48px_-34px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/[0.07] sm:rounded-[1.75rem]"
            role="status"
          >
            <div
              aria-hidden="true"
              className="mx-auto grid size-12 place-items-center rounded-full bg-slate-100 text-xl text-slate-500"
            >
              ?
            </div>
            <p className="mt-4 font-bold text-slate-900">
              {isArabic
                ? "لم يتم العثور على خدمة مطابقة"
                : "No matching service found"}
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
              {isArabic
                ? "جرّب استخدام كلمات أبسط مثل البطاقة المدنية أو رخصة القيادة."
                : "Try simpler terms such as Civil ID, driving license, or traffic fine."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
