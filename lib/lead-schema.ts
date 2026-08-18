import { z } from "zod";

export const leadSchema = z.object({
  projectType: z.string().min(1, "Alege tipul proiectului."),
  goal: z.string().min(1, "Alege obiectivul principal."),
  projectDescription: z.string().max(1200).optional(),
  visualAssets: z.string().min(1, "Alege direcția pentru imagini."),
  dominantColor: z.string().min(1, "Alege culoarea dominantă."),
  style: z.string().min(1, "Alege un stil."),
  inspirationLinks: z.array(z.string()),
  colorFamily: z.string().min(1, "Alege o familie de culori."),
  fontPair: z.string().min(1, "Alege o combinație de fonturi."),
  pages: z.array(z.string()).min(1, "Alege cel puțin o pagină."),
  sections: z.array(z.string()).min(1, "Alege cel puțin o secțiune."),
  features: z.array(z.string()),
  assetNames: z.array(z.string()),
  contentStatus: z.string().min(1, "Alege stadiul conținutului."),
  contentNotes: z.string().max(1200).optional(),
  contentLinks: z.array(z.string()),
  budget: z.string().min(1, "Alege un buget estimativ."),
  timeline: z.string().min(1, "Alege un termen dorit."),
  support: z.string().min(1, "Alege nivelul de suport."),
  name: z.string().min(2, "Introdu numele."),
  email: z.string().email("Introdu o adresă de email validă."),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(0[237][0-9]{2} [0-9]{3} [0-9]{3}|\+40 [237][0-9]{2} [0-9]{3} [0-9]{3})$/.test(val),
      "Introdu numărul în formatul: 07XX XXX XXX"
    ),
  company: z.string().optional(),
  contactPreference: z.string().min(1, "Alege o metodă de contact."),
  message: z.string().max(1200).optional(),
  consent: z.boolean().refine((value) => value, "Acordul este obligatoriu."),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Introdu numele."),
  email: z.string().email("Introdu o adresă de email validă."),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(0[237][0-9]{2} [0-9]{3} [0-9]{3}|\+40 [237][0-9]{2} [0-9]{3} [0-9]{3})$/.test(val),
      "Introdu numărul în formatul: 07XX XXX XXX"
    ),
  projectType: z.string().min(1, "Alege tipul proiectului."),
  budget: z.string().optional(),
  message: z.string().min(10, "Scrie câteva detalii despre proiect.").max(1200, "Mesajul este prea lung."),
  consent: z.boolean().refine((value) => value, "Acordul este obligatoriu."),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type LeadRecommendation = {
  packageName: string;
  complexity: "Scăzută" | "Medie" | "Ridicată";
  summary: string;
  estimate: string;
  delivery: string;
  benefits: string[];
};

export function getLeadRecommendation(data: Partial<LeadFormData>): LeadRecommendation {
  const featureCount = data.features?.length ?? 0;
  const pageCount = data.pages?.length ?? 0;
  const sectionCount = data.sections?.length ?? 0;
  const isCustom =
    data.projectType === "Aplicație web custom" ||
    data.projectType === "Automatizare / integrare" ||
    featureCount >= 6;
  const isBusiness =
    data.projectType === "Website business" ||
    data.projectType === "Magazin online" ||
    pageCount >= 5 ||
    sectionCount >= 6 ||
    featureCount >= 3;

  if (isCustom) {
    return {
      packageName: "Software Custom",
      complexity: "Ridicată",
      summary: "Potrivit pentru aplicații, automatizări și fluxuri construite în jurul procesului tău.",
      estimate: data.budget || "Ofertă pe scope",
      delivery: data.timeline || "Stabilit după discovery",
      benefits: ["Discovery tehnic", "Interfață custom", "Integrări API", "Suport la lansare"],
    };
  }

  if (isBusiness) {
    return {
      packageName: "Pachet Business",
      complexity: "Medie",
      summary: "Ideal pentru un website de prezentare care generează încredere și conversii.",
      estimate: data.budget || "1.000–2.000 EUR",
      delivery: data.timeline || "4–8 săptămâni",
      benefits: ["Design personalizat", "Optimizare SEO avansată", "Formular de contact", "Până la 10 pagini", "Integrare rețele sociale", "Suport și consultanță"],
    };
  }

  return {
    packageName: "Pachet Starter",
    complexity: "Scăzută",
    summary: "O direcție clară pentru un website de prezentare concentrat și ușor de administrat.",
    estimate: data.budget || "Sub 1.000 EUR",
    delivery: data.timeline || "2–4 săptămâni",
    benefits: ["Design personalizat", "Optimizare pentru mobil", "Formular de contact", "Secțiuni esențiale"],
  };
}
