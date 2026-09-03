import { services } from "@/data/services";
import type { GovernmentService } from "@/types/service";

export function searchServices(query: string): GovernmentService[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return services;
  }

  return services.filter((service) => {
    const searchableText = [
      service.title.en,
      service.title.ar,
      service.description.en,
      service.description.ar,
      service.authority,
      ...service.documents,
      ...service.requirements,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function getServiceById(
  id: string,
): GovernmentService | undefined {
  return services.find((service) => service.id === id);
}