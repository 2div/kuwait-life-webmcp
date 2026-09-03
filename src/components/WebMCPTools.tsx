"use client";

import { useEffect } from "react";
import { searchServices } from "@/lib/service-search";

export default function WebMCPTools() {
  useEffect(() => {
    if (!document.modelContext) {
      console.info("WebMCP is not available in this browser.");
      return;
    }

    const controller = new AbortController();

    async function registerTools() {
      if (!document.modelContext) {
        return;
      }

      try {
        await document.modelContext.registerTool(
          {
            name: "find-kuwait-government-service",

            description:
              "Find Kuwait government services based on a user's situation or question.",

            inputSchema: {
              type: "object",

              properties: {
                query: {
                  type: "string",
                  description:
                    "Describe the Kuwait government service or situation the user needs help with.",
                },
              },

              required: ["query"],
              additionalProperties: false,
            },

            execute: ({ query }) => {
              if (typeof query !== "string") {
                return {
                  error: "A query is required.",
                };
              }

              const results = searchServices(query);

              const topService = results[0];

              window.dispatchEvent(
                new CustomEvent("kuwait-life:webmcp-result", {
                  detail: {
                    query,
                    serviceId: topService?.id ?? null,
                  },
                }),
              );

              return {
                count: results.length,

                services: results.map((service) => ({
                  id: service.id,
                  authority: service.authority,
                  title: service.title,
                  description: service.description,
                  documents: service.documents,
                  requirements: service.requirements,
                  fee: service.fee,
                  channels: service.channels,
                  officialUrl: service.officialUrl,
                })),
              };
            },
          },

          {
            signal: controller.signal,
          },
        );

        console.info(
          "WebMCP tool registered: find-kuwait-government-service",
        );
        } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Failed to register WebMCP tools:", error);
      }
    }

    registerTools();

    return () => {
      controller.abort();
    };
  }, []);

  return null;
}