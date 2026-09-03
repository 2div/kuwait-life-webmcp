"use client";

import { useState } from "react";
import { searchServices } from "@/lib/service-search";

export default function ServiceSearch() {
  const [query, setQuery] = useState("");

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
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try: Civil ID"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
        />
      </div>

      <div className="mt-6 space-y-4">
        {results.map((service) => (
          <article
            key={service.id}
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
          >
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