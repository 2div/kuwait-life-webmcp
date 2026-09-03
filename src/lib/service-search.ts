import { services } from "@/data/services";
import type { GovernmentService } from "@/types/service";

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "to",
  "for",
  "of",
  "in",
  "on",
  "my",
  "me",
  "i",
  "need",
  "want",
  "please",
  "how",
  "do",
  "can",
  "is",
  "was",
  "with",
]);

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getQueryWords(query: string): string[] {
  return normalizeText(query)
    .split(" ")
    .filter(
      (word) =>
        word.length > 2 &&
        !STOP_WORDS.has(word),
    );
}

function countMatches(
  text: string,
  queryWords: string[],
): number {
  const normalizedText = normalizeText(text);

  return queryWords.reduce((score, word) => {
    return normalizedText.includes(word)
      ? score + 1
      : score;
  }, 0);
}

function scoreService(
  service: GovernmentService,
  queryWords: string[],
): number {
  let score = 0;

  // Title matches are the strongest signal.
  score +=
    countMatches(service.title.en, queryWords) * 10;

  score +=
    countMatches(service.title.ar, queryWords) * 10;

  // Description is also important.
  score +=
    countMatches(service.description.en, queryWords) * 5;

  score +=
    countMatches(service.description.ar, queryWords) * 5;

  // Authority can help with searches such as PACI or MOI.
  score +=
    countMatches(service.authority, queryWords) * 3;

  // Documents are useful but less important.
  score +=
    service.documents.reduce(
      (total, document) =>
        total + countMatches(document, queryWords) * 2,
      0,
    );

  // Requirements have the lowest weight.
  score +=
    service.requirements.reduce(
      (total, requirement) =>
        total + countMatches(requirement, queryWords),
      0,
    );

  return score;
}

export function searchServices(
  query: string,
): GovernmentService[] {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return services;
  }

  const queryWords = getQueryWords(query);

  if (queryWords.length === 0) {
    return [];
  }

  return services
    .map((service) => ({
      service,
      score: scoreService(service, queryWords),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.service);
}

export function getServiceById(
  id: string,
): GovernmentService | undefined {
  return services.find(
    (service) => service.id === id,
  );
}