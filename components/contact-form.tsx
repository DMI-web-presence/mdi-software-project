"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2, Mail, MessageSquareText, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactFormData } from "@/lib/lead-schema";
import { formatRomaniaPhone } from "@/lib/phone-formatter";

const projectTypes = [
  "Website de prezentare",
  "Website business",
  "Magazin online",
  "Aplicație web custom",
  "Automatizare / integrare",
  "Nu sunt sigur încă",
];

const budgets = ["Sub 1.000 EUR", "1.000–2.000 EUR", "2.000–4.000 EUR", "Peste 4.000 EUR", "De stabilit"];

type SubmitState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [companyWebsite, setCompanyWebsite] = useState("");
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      budget: "De stabilit",
      consent: false,
      projectType: "Website de prezentare",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setSubmitState("loading");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, _meta: { companyWebsite, startedAt } }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "Mesajul nu a putut fi trimis.");
      }

      setSubmitState("success");
      setSubmitMessage(payload.mode === "preview" ? "Mesaj validat local. Conectează Brevo pentru livrarea reală." : "Mesaj trimis. Revenim către tine după analiză.");
      reset({
        budget: "De stabilit",
        consent: false,
        email: "",
        message: "",
        name: "",
        phone: "",
        projectType: "Website de prezentare",
      });
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "Mesajul nu a putut fi trimis.");
    }
  }

  return (
    <section className="scroll-reveal relative overflow-hidden bg-[#fbfaf7] py-24 sm:py-28" data-reveal="fade" id="contact">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(0,117,255,0.08),transparent_26rem),radial-gradient(circle_at_12%_78%,rgba(228,93,54,0.08),transparent_24rem)]" />
      <div className="section-shell relative grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="section-kicker text-signal">Contact</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-black leading-[1.03] text-[#071022] sm:text-5xl lg:text-6xl">
            Ai o idee clară? Trimite-ne câteva detalii.
          </h2>
          <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-[#253045]/75">
            Formularul acesta este pentru mesaje rapide. Pentru proiecte unde vrei recomandare de pachet, structură și direcție vizuală, folosește brief-ul ghidat.
          </p>

          <div className="mt-8 grid gap-4 text-sm font-semibold text-[#253045]/80">
            <a className="inline-flex items-center gap-3 transition hover:text-signal" href="mailto:contact@mdisoftware.dev">
              <span className="grid size-10 place-items-center rounded-full border border-signal/30 bg-white text-signal">
                <Mail size={18} aria-hidden="true" />
              </span>
              contact@mdisoftware.dev
            </a>
            <p className="inline-flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full border border-[#0075ff]/25 bg-white text-[#0075ff]">
                <MessageSquareText size={18} aria-hidden="true" />
              </span>
              Răspuns după analizarea contextului proiectului
            </p>
          </div>

          <Link className="focus-ring mt-8 inline-flex items-center gap-3 rounded-md border border-[#dcd8d2] bg-white px-5 py-3 font-bold text-[#071022] shadow-sm transition hover:border-signal/50 hover:text-signal" href="/brief">
            Completează brief-ul ghidat
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <form className="rounded-lg border border-[#ddd8cf] bg-white/78 p-5 shadow-[0_26px_70px_rgba(7,16,34,0.08)] backdrop-blur sm:p-7" onSubmit={handleSubmit(onSubmit)}>
          <input
            aria-hidden="true"
            autoComplete="off"
            className="hidden"
            name="companyWebsite"
            onChange={(event) => setCompanyWebsite(event.target.value)}
            tabIndex={-1}
            type="text"
            value={companyWebsite}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field error={errors.name?.message} label="Nume complet">
              <input autoComplete="name" className={inputClass} placeholder="Ex: Andrei Popescu" {...register("name")} />
            </Field>
            <Field error={errors.email?.message} label="Email">
              <input autoComplete="email" className={inputClass} placeholder="Ex: andrei@email.ro" type="email" {...register("email")} />
            </Field>
            <Field error={errors.phone?.message} label="Telefon" optional>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7d84]" size={17} aria-hidden="true" />
                <input
                  autoComplete="tel"
                  className={`${inputClass} pl-10`}
                  placeholder="Ex: 0712 345 678"
                  type="tel"
                  maxLength={15}
                  {...register("phone", {
                    onChange: (e) => {
                      e.target.value = formatRomaniaPhone(e.target.value);
                    },
                  })}
                />
              </div>
            </Field>
            <Field error={errors.projectType?.message} label="Tip proiect">
              <select className={inputClass} {...register("projectType")}>
                {projectTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </Field>
            <Field label="Buget orientativ" optional>
              <select className={inputClass} {...register("budget")}>
                {budgets.map((budget) => <option key={budget}>{budget}</option>)}
              </select>
            </Field>
          </div>

          <Field className="mt-4" error={errors.message?.message} label="Mesaj">
            <textarea className={`${inputClass} min-h-36 resize-y py-3 leading-7`} placeholder="Spune-ne pe scurt ce vrei să construim, ce obiectiv ai și dacă există un termen important." {...register("message")} />
          </Field>

          <label className="mt-4 flex items-start gap-3 text-sm leading-7 text-[#555b66]">
            <input className="mt-1 size-4 accent-signal" type="checkbox" {...register("consent")} />
            <span>
              Sunt de acord ca datele mele să fie utilizate pentru a răspunde solicitării, conform{" "}
              <Link className="font-semibold text-[#1674df] underline" href="/confidentialitate" target="_blank">
                Politicii de confidențialitate
              </Link>.
            </span>
          </label>
          {errors.consent?.message && <p className="mt-1 text-xs font-semibold text-[#d64228]">{errors.consent.message}</p>}

          {submitMessage && (
            <p className={`mt-4 rounded-md px-4 py-3 text-sm font-semibold ${submitState === "success" ? "bg-[#e9f9ef] text-[#197344]" : "bg-[#fff0ec] text-[#c53f24]"}`}>
              {submitState === "success" && <CheckCircle2 className="mr-2 inline" size={17} aria-hidden="true" />}
              {submitMessage}
            </p>
          )}

          <button className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-3 rounded-md bg-signal px-5 py-4 font-bold text-white shadow-[0_16px_34px_rgba(228,93,54,0.24)] transition hover:bg-[#ff7048] disabled:cursor-not-allowed disabled:opacity-65" disabled={submitState === "loading"} type="submit">
            {submitState === "loading" ? <Loader2 className="animate-spin" size={20} aria-hidden="true" /> : <Send size={20} aria-hidden="true" />}
            {submitState === "loading" ? "Se trimite..." : "Trimite mesajul"}
          </button>
        </form>
      </div>
    </section>
  );
}

const inputClass = "min-h-12 w-full rounded-md border border-[#dcd8d2] bg-white px-3.5 text-sm font-medium text-[#111827] outline-none transition placeholder:text-[#9b9da3] focus:border-[#1674df] focus:shadow-[0_0_0_3px_rgba(22,116,223,0.10)]";

function Field({ children, className = "", error, label, optional }: { children: React.ReactNode; className?: string; error?: string; label: string; optional?: boolean }) {
  return (
    <label className={`grid gap-2 ${className}`}>
      <span className="text-sm font-bold text-[#15181e]">
        {label}
        {optional && <small className="font-normal text-[#74777e]"> (opțional)</small>}
      </span>
      {children}
      {error && <span className="text-xs font-semibold text-[#d64228]">{error}</span>}
    </label>
  );
}
