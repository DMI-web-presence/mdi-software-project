import { z } from "zod";

export const leadSchema = z.object({
  projectType: z.string().min(1, "Alege tipul proiectului."),
  goal: z.string().min(1, "Alege obiectivul principal."),
  visualAssets: z.string().min(1, "Alege direcția pentru imagini."),
  dominantColor: z.string().min(1, "Alege culoarea dominantă."),
  style: z.string().min(1, "Alege un stil."),
  sections: z.array(z.string()).min(1, "Alege cel puțin o secțiune."),
  features: z.array(z.string()),
  budget: z.string().min(1, "Alege un buget estimativ."),
  timeline: z.string().min(1, "Alege un termen dorit."),
  name: z.string().min(2, "Introdu numele."),
  email: z.string().email("Introdu o adresă de email validă."),
  company: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((value) => value, "Acordul este obligatoriu."),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export type LeadRecommendation = {
  packageName: string;
  complexity: "Scăzută" | "Medie" | "Ridicată";
  summary: string;
};

export function getLeadRecommendation(data: Partial<LeadFormData>): LeadRecommendation {
  const featureCount = data.features?.length ?? 0;
  const sectionCount = data.sections?.length ?? 0;
  const isCustom =
    data.projectType === "Aplicație web custom" ||
    data.projectType === "Automatizare / integrare" ||
    featureCount >= 4;
  const isBusiness =
    data.projectType === "Website business" ||
    sectionCount >= 5 ||
    featureCount >= 2;

  if (isCustom) {
    return {
      packageName: "Software Custom",
      complexity: "Ridicată",
      summary:
        "Proiectul pare potrivit pentru o construcție personalizată, cu planificare, integrări și un proces de livrare bine definit.",
    };
  }

  if (isBusiness) {
    return {
      packageName: "Pachet Business",
      complexity: "Medie",
      summary:
        "Direcția se potrivește unui website orientat spre conversii, cu secțiuni custom, SEO de bază și prezentare profesionistă.",
    };
  }

  return {
    packageName: "Pachet Starter",
    complexity: "Scăzută",
    summary:
      "Poate începe ca un website de prezentare concentrat, cu o pagină de start clară și secțiuni esențiale.",
  };
}
