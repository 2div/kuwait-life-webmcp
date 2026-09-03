import { services } from "@/data/services";
import type { GovernmentService } from "@/types/service";

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchServices(query: string): GovernmentService[] {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return services;
  }

  const queryWords = normalizedQuery
    .split(" ")
    .filter((word) => word.length > 2);

  return services.filter((service) => {
    const searchableText = normalizeText(
      [
        service.title.en,
        service.title.ar,
        service.description.en,
        service.description.ar,
        service.authority,
        ...service.documents,
        ...service.requirements,
      ].join(" "),
    );

    return queryWords.some((word) => searchableText.includes(word));
  });
}

export function getServiceById(
  id: string,
): GovernmentService | undefined {
  return services.find((service) => service.id === id);
}