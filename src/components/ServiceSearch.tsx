"use client";

import { useEffect, useState } from "react";
import { searchServices } from "@/lib/service-search";

export default function ServiceSearch() {
  const [query, setQuery] = useState("");
  const [selectedServiceId, setSelectedServiceId] =
  useState<string | null>(null);

  const [checklistServiceId, setChecklistServiceId] =
  useState<string | null>(null);

  useEffect(() => {
  function handleWebMCPResult(event: Event) {
    const customEvent = event as CustomEvent<{
      query: string;
      serviceId: string | null;
    }>;

    setQuery(customEvent.detail.query);
    setSelectedServiceId(customEvent.detail.serviceId);
  }

  window.addEventListener(
    "kuwait-life:webmcp-result",
    handleWebMCPResult,
  );

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

  const element = document.getElementById(
    `service-${selectedServiceId}`,
  );

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

  window.addEventListener(
    "kuwait-life:webmcp-checklist",
    handleChecklist,
  );

  return () => {
    window.removeEventListener(
      "kuwait-life:webmcp-checklist",
      handleChecklist,
    );
  };
}, []);

  const results = searchServices(query);

  return (
    <div className="w-full max-w-3xl">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
        <label
          htmlFor="service-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          What do you need help with?
        </label>

        <input
          id="service-search"
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelectedServiceId(null);
          }}
          placeholder="Try: Civil ID"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
        />
      </div>

      <div className="mt-6 space-y-4">
        {results.map((service) => (
            <article
              key={service.id}
              id={`service-${service.id}`}
              className={`rounded-2xl bg-white p-6 shadow-sm transition ${
                selectedServiceId === service.id
                  ? "ring-2 ring-gray-900"
                  : "ring-1 ring-black/5"
              }`}
            >
            {selectedServiceId === service.id && (
              <p className="mb-3 inline-block rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
                AI selected
              </p>
            )}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-500">
                {service.authority}
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {service.title.en}
              </h2>

              <p className="mt-2 text-gray-600">
                {service.description.en}
              </p>
            </div>

            <div className="mt-5">
              <h3 className="font-semibold text-gray-900">
                What you may need
              </h3>

              <ul className="mt-2 space-y-2 text-gray-700">
                {service.documents.map((document) => (
                  <li key={document}>✓ {document}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="text-sm text-gray-600">
                Fee:{" "}
                <strong>
                  {service.fee.amount !== null
                    ? `${service.fee.amount} ${service.fee.currency}`
                    : "Check official source"}
                </strong>
              </p>
            </div>

            {checklistServiceId === service.id && (
          <div className="mt-6 rounded-xl bg-gray-50 p-5">
            <p className="mb-4 text-sm font-semibold text-gray-900">
              AI created your checklist
            </p>

            <div className="space-y-3">
              {service.documents.map((document) => (
                <label
                  key={document}
                  className="flex items-start gap-3 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="mt-1"
                  />

                  <span>{document}</span>
                </label>
              ))}

              {service.requirements.map((requirement) => (
                <label
                  key={requirement}
                  className="flex items-start gap-3 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    className="mt-1"
                  />

                  <span>{requirement}</span>
                </label>
              ))}
            </div>
          </div>
        )}

            <a
              href={service.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block rounded-xl bg-gray-900 px-5 py-3 font-medium text-white transition hover:bg-gray-700"
            >
              View official source
            </a>
          </article>
        ))}

        {query && results.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-center text-gray-600 shadow-sm">
            No matching service found yet.
          </div>
        )}
      </div>
    </div>
  );
}