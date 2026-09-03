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

  {
  id: "driving-license-renewal",

  authority: "Ministry of Interior - General Department of Traffic",

  title: {
    en: "Driving License Renewal",
    ar: "تجديد رخصة القيادة",
  },

  description: {
    en: "Renew an eligible Kuwait driving license electronically.",
    ar: "تجديد رخصة القيادة إلكترونياً للمستحقين.",
  },

  documents: [
    "Valid Civil ID",
    "Existing driving license",
  ],

  requirements: [
    "The driving license must be eligible for renewal.",
    "Some cases may require additional Ministry of Interior procedures.",
  ],

  fee: {
    amount: null,
    currency: "KWD",
    notes: "Check the official service for the applicable fee.",
  },

  channels: [
    "website",
    "sahel",
  ],

  officialUrl:
    "https://www.moi.gov.kw/main/eservices/gdt",

  lastVerified: "2026-09-02",
},

{
  id: "traffic-violation-payment",

  authority: "Ministry of Interior - General Department of Traffic",

  title: {
    en: "Traffic Violation Inquiry and Payment",
    ar: "الاستعلام ودفع المخالفات المرورية",
  },

  description: {
    en: "Check traffic violations and pay eligible fines through official Ministry of Interior channels.",
    ar: "الاستعلام عن المخالفات المرورية ودفع الغرامات المؤهلة عبر القنوات الرسمية لوزارة الداخلية.",
  },

  documents: [
    "Civil ID or relevant identification number",
  ],

  requirements: [
    "Some serious violations cannot be paid online and may require visiting the General Department of Traffic.",
  ],

  fee: {
    amount: null,
    currency: "KWD",
    notes: "The amount depends on the traffic violation.",
  },

  channels: [
    "website",
    "in-person",
  ],

  officialUrl:
    "https://www.moi.gov.kw/main/eservices/gdt",

  lastVerified: "2026-09-02",
},

{
  id: "vehicle-registration-renewal",

  authority: "Ministry of Interior - General Department of Traffic",

  title: {
    en: "Vehicle Registration Renewal",
    ar: "تجديد ترخيص المركبة",
  },

  description: {
    en: "Renew a vehicle registration after its current registration expires.",
    ar: "تجديد ترخيص المركبة بعد انتهاء الترخيص الحالي.",
  },

  documents: [
    "Proof of vehicle owner identity and residence",
    "Proof of vehicle ownership",
    "Technical inspection documentation when required",
    "Valid vehicle insurance",
  ],

  requirements: [
    "Renewal should be requested after the current registration expires.",
    "Technical inspection requirements may apply.",
  ],

  fee: {
    amount: null,
    currency: "KWD",
    notes: "Check the official service for the applicable fee.",
  },

  channels: [
    "website",
    "in-person",
  ],

  officialUrl:
    "https://www.moi.gov.kw/main/eServices/gdt/procedures/128",

  lastVerified: "2026-09-02",
},

];