import type { GovernmentService } from "@/types/service";

export const services: GovernmentService[] = [
  {
    id: "civil-id-renewal-non-kuwaiti",

    authority: "PACI",

    title: {
      en: "Civil ID Renewal for Non-Kuwaitis",
      ar: "تجديد البطاقة المدنية لغير الكويتي",
    },

    description: {
      en: "Renew a Civil ID after residency has been issued or renewed.",
      ar: "تجديد البطاقة المدنية بعد إصدار أو تجديد الإقامة.",
    },

    documents: [
      "Valid Civil ID number",
      "Valid passport",
      "Residency extract",
    ],

    requirements: [
      "There must not be a pending request to change the personal photo.",
    ],

    fee: {
      amount: 5,
      currency: "KWD",
      notes: "Paid through the PACI website or Sahel app.",
    },

    channels: [
      "website",
      "sahel",
      "phone",
    ],

    officialUrl:
      "https://services.paci.gov.kw/applications-guide/detail/card-renewal-%28non-kuwaiti%29/17",

    lastVerified: "2026-09-02",
  },
];