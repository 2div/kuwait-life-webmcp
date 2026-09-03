export type ServiceChannel =
  | "website"
  | "sahel"
  | "phone"
  | "in-person";

export interface GovernmentService {
  id: string;

  authority: string;

  title: {
    en: string;
    ar: string;
  };

  description: {
    en: string;
    ar: string;
  };

  documents: string[];

  requirements: string[];

  fee: {
    amount: number | null;
    currency: "KWD";
    notes?: string;
  };

  channels: ServiceChannel[];

  officialUrl: string;

  lastVerified: string;
}