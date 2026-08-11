"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Palette,
  Send,
  Sparkles,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { getLeadRecommendation, LeadFormData, leadSchema } from "@/lib/lead-schema";

const projectTypes = [
  "Website de prezentare",
  "Website business",
  "Magazin online",
  "Aplicație web custom",
  "Automatizare / integrare",
  "Nu sunt sigur încă",
];

const goals = [
  "Mai mulți clienți",
  "Prezentarea serviciilor",
  "Vânzare de produse",
  "Automatizarea muncii interne",
  "Modernizarea unui website existent",
  "Lansarea unei idei noi",
];

const visualAssets = [
  "Folosesc imaginile mele",
  "Generăm imagini cu AI",
  "Folosim imagini stock",
  "Am nevoie de recomandări",
];

const styles = ["Minimal", "Premium dark", "Corporate", "Creativ", "Tech startup"];

const sections = [
  "Hero / prima secțiune",
  "Despre",
  "Servicii",
  "Prețuri",
  "Proiecte",
  "Testimoniale",
  "FAQ",
  "Blog",
  "Formular de contact",
  "Programare",
];

const features = [
  "Integrare Brevo",
  "Configurare SEO",
  "Analytics",
  "Plăți",
  "Autentificare",
  "Panou admin",
  "Multilingv",
  "Widget chat",
];

const budgets = ["Sub 500 EUR", "500 - 1.500 EUR", "1.500 - 4.000 EUR", "4.000+ EUR"];
const timelines = ["Cât mai curând", "2-4 săptămâni", "1-2 luni", "Flexibil"];

const steps = [
  {
    title: "Proiect",
    description: "Începem cu nevoia de business.",
    fields: ["projectType", "goal"] as const,
  },
  {
    title: "Vizual",
    description: "Alegem prima direcție creativă.",
    fields: ["visualAssets", "dominantColor", "style"] as const,
  },
  {
    title: "Structură",
    description: "Selectăm secțiuni și funcționalități.",
    fields: ["sections", "features"] as const,
  },
  {
    title: "Plan",
    description: "Buget, termen și recomandare.",
    fields: ["budget", "timeline"] as const,
  },
  {
    title: "Contact",
    description: "Trimitem brief-ul către MDI Software.",
    fields: ["name", "email", "company", "message", "consent"] as const,
  },
];

type SubmitState = "idle" | "loading" | "success" | "error";

export function ProjectBriefWizard() {
  const [step, setStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      projectType: "Website business",
      goal: "Mai mulți clienți",
      visualAssets: "Am nevoie de recomandări",
      dominantColor: "#274568",
      style: "Tech startup",
      sections: ["Hero / prima secțiune", "Servicii", "Prețuri", "Proiecte", "Formular de contact"],
      features: ["Integrare Brevo", "Configurare SEO"],
      budget: "1.500 - 4.000 EUR",
      timeline: "2-4 săptămâni",
      name: "",
      email: "",
      company: "",
      message: "",
      consent: false,
    },
  });

  const values = useWatch({ control });
  const recommendation = useMemo(() => getLeadRecommendation(values), [values]);
  const isLastStep = step === steps.length - 1;

  async function goNext() {
    const valid = await trigger(steps[step].fields);
    if (valid) {
      setStep((current) => Math.min(current + 1, steps.length - 1));
    }
  }

  async function onSubmit(data: LeadFormData) {
    setSubmitState("loading");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Brief-ul nu a putut fi trimis.");
      }

      setSubmitState("success");
      setSubmitMessage(
        payload.mode === "preview"
          ? "Brief validat în modul preview. Adaugă datele Brevo pentru trimiterea lead-urilor reale."
          : "Brief trimis. MDI Software va analiza detaliile și va reveni cu un răspuns.",
      );
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "Brief-ul nu a putut fi trimis.");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr]" id="brief">
      <aside className="rounded-lg bg-ink p-6 text-white shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-signal text-white">
            <Sparkles size={20} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm text-white/60">Brief ghidat</p>
            <h2 className="text-2xl font-semibold">Clarifică proiectul înainte de ofertă.</h2>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {steps.map((item, index) => (
            <button
              className={`focus-ring flex w-full items-center gap-3 rounded-md p-3 text-left transition ${
                index === step ? "bg-white text-ink" : "bg-white/5 text-white/72 hover:bg-white/10"
              }`}
              key={item.title}
              onClick={() => setStep(index)}
              type="button"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  index < step ? "bg-moss text-white" : index === step ? "bg-signal text-white" : "bg-white/10"
                }`}
              >
                {index < step ? <Check size={16} aria-hidden="true" /> : index + 1}
              </span>
              <span>
                <span className="block font-semibold">{item.title}</span>
                <span className="block text-sm opacity-70">{item.description}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-md border border-white/12 bg-white/8 p-4">
          <p className="text-sm text-white/60">Recomandarea curentă</p>
          <p className="mt-1 text-xl font-semibold">{recommendation.packageName}</p>
          <p className="mt-2 text-sm leading-6 text-white/72">{recommendation.summary}</p>
          <div className="mt-4 inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink">
            Complexitate: {recommendation.complexity}
          </div>
        </div>
      </aside>

      <form className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft sm:p-7" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-ink/10 pb-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-signal">
              Pasul {step + 1} din {steps.length}
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{steps[step].title}</h3>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-mist p-1">
            {steps.map((item, index) => (
              <span
                aria-label={item.title}
                className={`h-2.5 w-8 rounded-full ${index <= step ? "bg-denim" : "bg-ink/12"}`}
                key={item.title}
              />
            ))}
          </div>
        </div>

        {step === 0 && (
          <div className="space-y-6">
            <ChoiceGroup error={errors.projectType?.message} label="Ce vrei să construim?" name="projectType" options={projectTypes} register={register} />
            <ChoiceGroup error={errors.goal?.message} label="Care este obiectivul principal?" name="goal" options={goals} register={register} />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <ChoiceGroup error={errors.visualAssets?.message} label="Cum gestionăm partea vizuală?" name="visualAssets" options={visualAssets} register={register} />
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-ink" htmlFor="dominantColor">
                <Palette size={18} aria-hidden="true" />
                Culoare dominantă
              </label>
              <input
                className="focus-ring mt-3 h-14 w-full rounded-md border border-ink/15 bg-white p-2"
                id="dominantColor"
                type="color"
                {...register("dominantColor")}
              />
              {errors.dominantColor?.message && <ErrorText>{errors.dominantColor.message}</ErrorText>}
            </div>
            <ChoiceGroup error={errors.style?.message} label="Stil preferat" name="style" options={styles} register={register} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <CheckboxGroup error={errors.sections?.message} label="Secțiuni necesare" name="sections" options={sections} register={register} />
            <CheckboxGroup label="Funcționalități utile" name="features" options={features} register={register} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <ChoiceGroup error={errors.budget?.message} label="Buget estimativ" name="budget" options={budgets} register={register} />
            <ChoiceGroup error={errors.timeline?.message} label="Termen dorit" name="timeline" options={timelines} register={register} />
            <div className="rounded-md border border-denim/18 bg-denim/6 p-4">
              <p className="text-sm font-semibold text-denim">Pachet recomandat</p>
              <p className="mt-1 text-2xl font-semibold">{recommendation.packageName}</p>
              <p className="mt-2 leading-7 text-ink/70">{recommendation.summary}</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField error={errors.name?.message} label="Nume" registration={register("name")} />
              <TextField error={errors.email?.message} label="Email" registration={register("email")} type="email" />
            </div>
            <TextField label="Companie" registration={register("company")} />
            <label className="block">
              <span className="text-sm font-semibold">Mesaj</span>
              <textarea
                className="focus-ring mt-2 min-h-32 w-full resize-y rounded-md border border-ink/15 px-4 py-3"
                placeholder="Spune-mi orice detaliu important despre proiect."
                {...register("message")}
              />
            </label>
            <label className="flex items-start gap-3 rounded-md bg-mist p-4 text-sm leading-6">
              <input className="mt-1" type="checkbox" {...register("consent")} />
              <span>Sunt de acord să fiu contactat de MDI Software în legătură cu acest brief.</span>
            </label>
            {errors.consent?.message && <ErrorText>{errors.consent.message}</ErrorText>}
          </div>
        )}

        {submitMessage && (
          <div
            className={`mt-5 rounded-md p-4 text-sm font-semibold ${
              submitState === "success" ? "bg-moss/12 text-moss" : "bg-signal/12 text-signal"
            }`}
          >
            {submitMessage}
          </div>
        )}

        <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-ink/10 pt-5">
          <button
            className="focus-ring inline-flex items-center gap-2 rounded-md border border-ink/15 px-4 py-3 font-semibold text-ink transition hover:bg-mist disabled:opacity-40"
            disabled={step === 0 || submitState === "loading"}
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            type="button"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Înapoi
          </button>

          {isLastStep ? (
            <button
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-semibold text-white transition hover:bg-[#c94f2e] disabled:opacity-60"
              disabled={submitState === "loading"}
              type="submit"
            >
              {submitState === "loading" ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
              Trimite brief-ul
            </button>
          ) : (
            <button
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 font-semibold text-white transition hover:bg-denim"
              onClick={goNext}
              type="button"
            >
              Continuă
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function ChoiceGroup({
  error,
  label,
  name,
  options,
  register,
}: {
  error?: string;
  label: string;
  name: keyof LeadFormData;
  options: string[];
  register: ReturnType<typeof useForm<LeadFormData>>["register"];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label className="cursor-pointer rounded-md border border-ink/12 bg-mist/60 p-4 transition hover:border-denim hover:bg-white" key={option}>
            <input className="peer sr-only" type="radio" value={option} {...register(name)} />
            <span className="flex items-center justify-between gap-3 text-sm font-semibold">
              {option}
              <span className="h-4 w-4 rounded-full border border-ink/25 peer-checked:border-[5px] peer-checked:border-signal" />
            </span>
          </label>
        ))}
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </fieldset>
  );
}

function CheckboxGroup({
  error,
  label,
  name,
  options,
  register,
}: {
  error?: string;
  label: string;
  name: "sections" | "features";
  options: string[];
  register: ReturnType<typeof useForm<LeadFormData>>["register"];
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{label}</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label className="flex cursor-pointer items-center gap-3 rounded-md border border-ink/12 bg-mist/60 p-4 text-sm font-semibold transition hover:border-denim hover:bg-white" key={option}>
            <input className="h-4 w-4 accent-signal" type="checkbox" value={option} {...register(name)} />
            {option}
          </label>
        ))}
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </fieldset>
  );
}

function TextField({
  error,
  label,
  registration,
  type = "text",
}: {
  error?: string;
  label: string;
  registration: ReturnType<ReturnType<typeof useForm<LeadFormData>>["register"]>;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input className="focus-ring mt-2 h-12 w-full rounded-md border border-ink/15 px-4" type={type} {...registration} />
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-sm font-semibold text-signal">{children}</p>;
}
