"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronUp,
  CircleHelp,
  CloudUpload,
  Code2,
  FileText,
  Home,
  ImageIcon,
  Link2,
  Loader2,
  Mail,
  MessageCircle,
  Palette,
  Pencil,
  Plus,
  Rocket,
  Send,
  ShoppingCart,
  Sparkles,
  Target,
  Trash2,
  Upload,
  Users,
  WandSparkles,
  Workflow,
} from "lucide-react";
import type { UseFormRegister } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";
import { getLeadRecommendation, LeadFormData, leadSchema } from "@/lib/lead-schema";

const steps = [
  { title: "Proiect", subtitle: "Tipul și obiectivul", fields: ["projectType", "goal"] },
  { title: "Stil vizual", subtitle: "Alegi atmosfera și exemplele", fields: ["style", "visualAssets"] },
  { title: "Culori & fonturi", subtitle: "Direcția de brand", fields: ["colorFamily", "fontPair", "dominantColor"] },
  { title: "Structură", subtitle: "Pagini și funcționalități", fields: ["pages", "sections", "features"] },
  { title: "Conținut", subtitle: "Texte, logo și imagini", fields: ["contentStatus"] },
  { title: "Plan", subtitle: "Buget, termen și recomandare", fields: ["budget", "timeline", "support"] },
  { title: "Contact", subtitle: "Rezumat și trimitere", fields: ["name", "email", "contactPreference", "consent"] },
] as const;

const projectTypes = [
  { label: "Website de prezentare", icon: FileText },
  { label: "Website business", icon: BriefcaseBusiness },
  { label: "Magazin online", icon: ShoppingCart },
  { label: "Aplicație web custom", icon: Code2 },
  { label: "Automatizare / integrare", icon: Workflow },
  { label: "Nu sunt sigur încă", icon: CircleHelp },
];

const goals = [
  "Mai mulți clienți",
  "Prezentarea serviciilor",
  "Vânzare de produse",
  "Automatizarea muncii interne",
  "Modernizarea unui website existent",
  "Lansarea unei idei noi",
];

const visualStyles = [
  { name: "Minimal", description: "Curat, spațios, focus pe esențial.", tone: "minimal", image: "/images/brief-styles/minimal.png" },
  { name: "Editorial", description: "Elegant, tipografic, conținut în prim-plan.", tone: "editorial", image: "/images/brief-styles/editorial.png" },
  { name: "Tehnologic", description: "Modern, digital, futurist.", tone: "tech", image: "/images/brief-styles/technologic.png" },
  { name: "Elegant", description: "Rafinat, premium, atemporal.", tone: "elegant", image: "/images/brief-styles/elegant.png" },
  { name: "Îndrăzneț", description: "Curajos, creativ, impact vizual.", tone: "bold", image: "/images/brief-styles/bold.png" },
];

const colorFamilies = [
  { name: "Neutru", description: "Echilibrat, profesional, temporal.", colors: ["#111111", "#555555", "#b7b7b7", "#f2f2f2"] },
  { name: "Cald", description: "Prietenos, energic, primitor.", colors: ["#bd2e1d", "#f15b35", "#f2a266", "#f6e1c7"] },
  { name: "Rece", description: "Curat, modern, încrezător.", colors: ["#002344", "#07569d", "#25b9d0", "#e8f6f8"] },
  { name: "Natural", description: "Autentic, calm, apropiat de natură.", colors: ["#145d45", "#7c9e6b", "#dfd3b4", "#a46939"] },
  { name: "Îndrăzneț", description: "Creativ, puternic, memorabil.", colors: ["#29106c", "#bd2461", "#e3494e", "#ff7a00"] },
];

const fontPairs = [
  { name: "Modern", value: "Modern — Inter + Sora", title: "Inter + Sora", body: "Inter Regular" },
  { name: "Editorial", value: "Editorial — Inter + Playfair Display", title: "Playfair Display Bold", body: "Inter Regular" },
  { name: "Elegant", value: "Elegant — Manrope + Cormorant", title: "Manrope SemiBold", body: "Cormorant Regular" },
];

const pageOptions = [
  { label: "Acasă", icon: Home },
  { label: "Despre noi", icon: Users },
  { label: "Servicii", icon: BriefcaseBusiness },
  { label: "Proiecte", icon: ImageIcon },
  { label: "Contact", icon: Mail },
  { label: "Blog", icon: FileText },
  { label: "FAQ", icon: CircleHelp },
];

const sectionOptions = ["Hero", "Beneficii", "Servicii", "Despre noi", "Proiecte", "Testimoniale", "Call to action", "Contact"];
const featureOptions = ["Formular de contact", "Două limbi", "Galerie foto/video", "Cookie banner", "Hartă Google", "Integrare social media", "Newsletter", "Programări"];
const budgetOptions = ["Sub 500 EUR", "500–1.000 EUR", "1.000–2.000 EUR", "2.000–4.000 EUR", "Peste 4.000 EUR"];
const timelineOptions = ["Cât mai repede", "În 2–4 săptămâni", "În 1–2 luni", "Nu am un termen fix"];
const supportOptions = [
  { label: "Doar dezvoltare", icon: Code2 },
  { label: "Design + dezvoltare", icon: WandSparkles },
  { label: "Parteneriat complet", icon: Users },
];

const defaultValues: LeadFormData = {
  projectType: "Website de prezentare",
  goal: "Mai mulți clienți",
  projectDescription: "",
  visualAssets: "Folosesc imaginile mele",
  dominantColor: "#07569d",
  style: "Editorial",
  inspirationLinks: [""],
  colorFamily: "Rece",
  fontPair: "Modern — Inter + Sora",
  pages: ["Acasă", "Despre noi", "Servicii", "Proiecte", "Contact"],
  sections: ["Hero", "Beneficii", "Servicii", "Despre noi", "Proiecte", "Testimoniale", "Call to action"],
  features: ["Formular de contact", "Galerie foto/video", "Hartă Google", "Cookie banner"],
  assetNames: [],
  contentStatus: "Am conținutul pregătit",
  contentNotes: "",
  contentLinks: [""],
  budget: "1.000–2.000 EUR",
  timeline: "În 1–2 luni",
  support: "Design + dezvoltare",
  name: "",
  email: "",
  phone: "",
  company: "",
  contactPreference: "Email",
  message: "",
  consent: false,
};

type SubmitState = "idle" | "loading" | "success" | "error";
type UploadPreview = { name: string; size: string; url?: string; type: string };

export function ProjectBriefWizard() {
  const [step, setStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [savedText, setSavedText] = useState("Salvat automat");
  const [uploads, setUploads] = useState<UploadPreview[]>([]);
  const [dragging, setDragging] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({ resolver: zodResolver(leadSchema), defaultValues });

  const values = useWatch({ control });
  const recommendation = useMemo(() => getLeadRecommendation(values), [values]);
  const activeStyle = visualStyles.find((item) => item.name === values.style) ?? visualStyles[1];
  const activeColors = colorFamilies.find((item) => item.name === values.colorFamily)?.colors ?? colorFamilies[2].colors;
  const activeFont = fontPairs.find((item) => item.value === values.fontPair) ?? fontPairs[0];
  const progress = step === 6 ? 6 : step + 1;

  useEffect(() => {
    const draft = window.localStorage.getItem("mdi-brief-draft");
    if (!draft) return;
    try {
      const parsed = JSON.parse(draft) as Partial<LeadFormData>;
      reset({ ...defaultValues, ...parsed, assetNames: [] });
    } catch {
      window.localStorage.removeItem("mdi-brief-draft");
    }
  }, [reset]);

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      window.localStorage.setItem("mdi-brief-draft", JSON.stringify({ ...values, assetNames: [] }));
      setSavedText("Salvat automat");
    }, 450);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [values]);

  async function goTo(nextStep: number) {
    setStep(Math.max(0, Math.min(nextStep, steps.length - 1)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleArray(name: "pages" | "sections" | "features", option: string) {
    const current = getValues(name);
    setValue(name, current.includes(option) ? current.filter((item) => item !== option) : [...current, option], {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  function addFiles(fileList: FileList | File[]) {
    const accepted = Array.from(fileList).filter((file) => file.size <= 20 * 1024 * 1024);
    const next = accepted.map((file) => ({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      url: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }));
    const merged = [...uploads, ...next].slice(0, 8);
    setUploads(merged);
    setValue("assetNames", merged.map((file) => file.name), { shouldDirty: true });
  }

  function removeFile(index: number) {
    const target = uploads[index];
    if (target?.url) URL.revokeObjectURL(target.url);
    const next = uploads.filter((_, itemIndex) => itemIndex !== index);
    setUploads(next);
    setValue("assetNames", next.map((file) => file.name), { shouldDirty: true });
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
      if (!response.ok || !payload.ok) throw new Error(payload.message || "Brief-ul nu a putut fi trimis.");
      setSubmitState("success");
      setSubmitMessage(payload.mode === "preview" ? "Brief validat. Conectează Brevo pentru livrarea mesajului real." : "Brief trimis cu succes. Revenim către tine după analiză.");
      window.localStorage.removeItem("mdi-brief-draft");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "Brief-ul nu a putut fi trimis.");
    }
  }

  return (
    <div className="brief-experience" id="brief-form">
      <section className="brief-hero">
        <div className="brief-hero-globe" aria-hidden="true" />
        <div className="brief-hero-inner">
          <div>
            <p className="brief-eyebrow">Brief ghidat</p>
            <h1>Alege cerințele, iar proiectul<br />capătă structură.</h1>
          </div>
          <p className="brief-hero-copy">Te ghidăm pas cu pas ca să definim direcția vizuală, conținutul, funcționalitățile, bugetul și termenul proiectului.</p>
          <div className="brief-save-state"><CheckCircle2 aria-hidden="true" /><span><strong>{savedText}</strong><small>datele rămân pe acest dispozitiv</small></span></div>
        </div>
      </section>

      <div className="brief-layout">
        <BriefSidebar currentStep={step} progress={progress} onStepClick={goTo} />

        <form className="brief-workspace" onSubmit={handleSubmit(onSubmit)}>
          <div className="brief-mobile-progress" aria-label={`Pasul ${step + 1} din 7`}>
            {steps.map((item, index) => <span className={index <= step ? "active" : ""} key={item.title} />)}
          </div>

          <main className="brief-stage">
            <StepHeading step={step} />

            {step === 0 && (
              <div className="brief-step-content">
                <Question number="1" title="Ce vrei să construim?">
                  <div className="brief-card-grid brief-card-grid-3">
                    {projectTypes.map(({ label, icon: Icon }) => (
                      <ChoiceCard active={values.projectType === label} key={label} onClick={() => setValue("projectType", label, { shouldValidate: true })}>
                        <Icon size={34} aria-hidden="true" /><span>{label}</span>
                      </ChoiceCard>
                    ))}
                  </div>
                  <ErrorText>{errors.projectType?.message}</ErrorText>
                </Question>
                <Question number="2" title="Care este obiectivul principal?">
                  <div className="brief-card-grid brief-card-grid-3 brief-goals">
                    {goals.map((goal) => <ChoiceCard active={values.goal === goal} key={goal} onClick={() => setValue("goal", goal, { shouldValidate: true })}>{goal}</ChoiceCard>)}
                  </div>
                </Question>
                <Question number="3" title="Descrie pe scurt ideea ta" optional>
                  <textarea className="brief-textarea" maxLength={1200} placeholder="Scrie câteva rânduri despre ideea, obiectivele și publicul țintă al proiectului tău..." {...register("projectDescription")} />
                </Question>
              </div>
            )}

            {step === 1 && (
              <div className="brief-step-content">
                <Question title="Ce atmosferă îți dorești pentru website?" description="Alege stilul care se potrivește cel mai bine brandului și publicului tău.">
                  <div className="brief-style-grid">
                    {visualStyles.map((style) => (
                      <button className={`brief-style-card ${values.style === style.name ? "selected" : ""}`} key={style.name} onClick={() => setValue("style", style.name, { shouldValidate: true })} type="button">
                        <StylePreview style={style} /><span className="brief-choice-line"><RadioMark active={values.style === style.name} />{style.name}</span><small>{style.description}</small>
                      </button>
                    ))}
                  </div>
                </Question>
                <Question title="Cum gestionăm imaginile?">
                  <div className="brief-inline-options">
                    {["Folosesc imaginile mele", "Generăm imagini cu AI", "Folosim imagini stock", "Am nevoie de recomandări"].map((item) => (
                      <ChoiceCard active={values.visualAssets === item} key={item} onClick={() => setValue("visualAssets", item, { shouldValidate: true })}>{item}</ChoiceCard>
                    ))}
                  </div>
                </Question>
                <LinkEditor label="Ai exemple de website-uri care îți plac?" links={values.inspirationLinks ?? [""]} onChange={(links) => setValue("inspirationLinks", links, { shouldDirty: true })} />
                <Tip>Poți combina mai multe stiluri. Folosește linkurile pentru a ne arăta exact elementele care îți plac.</Tip>
              </div>
            )}

            {step === 2 && (
              <div className="brief-step-content">
                <Question title="Alege familia de culori">
                  <div className="brief-color-grid">
                    {colorFamilies.map((family) => (
                      <button className={`brief-color-card ${values.colorFamily === family.name ? "selected" : ""}`} key={family.name} onClick={() => { setValue("colorFamily", family.name, { shouldValidate: true }); setValue("dominantColor", family.colors[1], { shouldValidate: true }); }} type="button">
                        <ColorSwatches colors={family.colors} /><span className="brief-choice-line"><RadioMark active={values.colorFamily === family.name} />{family.name}</span><small>{family.description}</small>
                      </button>
                    ))}
                  </div>
                </Question>
                <Question title="Alege combinația de fonturi">
                  <div className="brief-font-grid">
                    {fontPairs.map((font) => (
                      <button className={`brief-font-card ${values.fontPair === font.value ? "selected" : ""}`} key={font.value} onClick={() => setValue("fontPair", font.value, { shouldValidate: true })} type="button">
                        <span className={font.name === "Editorial" ? "serif" : ""}>Ag</span><strong><RadioMark active={values.fontPair === font.value} />{font.value}</strong><small>Titluri: {font.title}<br />Text: {font.body}</small>
                      </button>
                    ))}
                  </div>
                </Question>
                <Question title="Previzualizare combinație selectată">
                  <div className="brief-brand-preview"><div style={{ background: `linear-gradient(135deg, ${activeColors[0]}, ${activeColors[2]})` }} /><span><strong>Un titlu clar pentru brandul tău</strong><small>Acesta este un subtitlu care susține mesajul principal și oferă context vizitatorului.</small></span></div>
                </Question>
              </div>
            )}

            {step === 3 && (
              <div className="brief-step-content brief-structure-layout">
                <div>
                  <Question number="1" title="Pagini principale" description="Selectează paginile de care are nevoie website-ul tău.">
                    <div className="brief-page-grid">
                      {pageOptions.map(({ label, icon: Icon }) => <MultiChoice active={values.pages?.includes(label)} key={label} onClick={() => toggleArray("pages", label)}><Icon size={24} />{label}</MultiChoice>)}
                    </div>
                  </Question>
                  <Question number="2" title="Secțiuni pentru pagina Acasă" description="Alege secțiunile pe care vrei să le includem pe pagina principală.">
                    <div className="brief-chip-grid">{sectionOptions.map((item) => <MultiChoice active={values.sections?.includes(item)} key={item} onClick={() => toggleArray("sections", item)}>{item}</MultiChoice>)}</div>
                  </Question>
                  <Question number="3" title="Funcționalități" description="Selectează funcționalitățile de care ai nevoie.">
                    <div className="brief-check-list">{featureOptions.map((item) => <label key={item}><input checked={values.features?.includes(item) ?? false} onChange={() => toggleArray("features", item)} type="checkbox" />{item}</label>)}</div>
                  </Question>
                </div>
                <StructurePreview pages={values.pages ?? []} />
              </div>
            )}

            {step === 4 && (
              <div className="brief-step-content">
                <Question title="Încarcă logo și imagini">
                  <div className={`brief-dropzone ${dragging ? "dragging" : ""}`} onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}>
                    <CloudUpload size={42} aria-hidden="true" /><p>Trage fișierele aici sau</p><button onClick={() => fileInput.current?.click()} type="button">Alege din dispozitiv</button><small>JPG, PNG, SVG sau WebP · max. 20 MB / fișier</small>
                    <input accept="image/jpeg,image/png,image/svg+xml,image/webp" hidden multiple onChange={(event) => event.target.files && addFiles(event.target.files)} ref={fileInput} type="file" />
                  </div>
                  {uploads.length > 0 && <div className="brief-upload-grid">{uploads.map((file, index) => <div className="brief-upload-card" key={`${file.name}-${index}`}>{file.url ? <UploadedImagePreview name={file.name} url={file.url} /> : <FileText size={38} />}<span><strong>{file.name}</strong><small>{file.size}</small></span><button aria-label={`Șterge ${file.name}`} onClick={() => removeFile(index)} type="button"><Trash2 size={15} /></button></div>)}</div>}
                </Question>
                <LinkEditor label="Ai exemple de referință?" links={values.contentLinks ?? [""]} onChange={(links) => setValue("contentLinks", links, { shouldDirty: true })} />
                <Question title="Cum este stadiul conținutului?">
                  <div className="brief-inline-options brief-content-status">
                    {[{ title: "Am conținutul pregătit", note: "Îl voi pune la dispoziție pentru integrare." }, { title: "Am nevoie de suport", note: "Vă rog să mă ajutați cu redactarea conținutului." }].map((item) => <ChoiceCard active={values.contentStatus === item.title} key={item.title} onClick={() => setValue("contentStatus", item.title, { shouldValidate: true })}><span><strong>{item.title}</strong><small>{item.note}</small></span></ChoiceCard>)}
                  </div>
                </Question>
                <Question title="Observații despre conținut" optional><textarea className="brief-textarea" placeholder="Scrie aici orice mențiuni importante despre conținut..." {...register("contentNotes")} /></Question>
              </div>
            )}

            {step === 5 && (
              <div className="brief-step-content">
                <Question title="Care este bugetul orientativ?">
                  <div className="brief-plan-grid brief-plan-grid-5">{budgetOptions.map((item) => <ChoiceCard active={values.budget === item} key={item} onClick={() => setValue("budget", item, { shouldValidate: true })}><span className="brief-plan-icon">€</span>{item}</ChoiceCard>)}</div>
                </Question>
                <Question title="Când ai dori lansarea?">
                  <div className="brief-plan-grid">{timelineOptions.map((item) => <ChoiceCard active={values.timeline === item} key={item} onClick={() => setValue("timeline", item, { shouldValidate: true })}><CalendarDays size={24} />{item}</ChoiceCard>)}</div>
                </Question>
                <Question title="De cât suport ai nevoie?">
                  <div className="brief-plan-grid brief-plan-grid-3">{supportOptions.map(({ label, icon: Icon }) => <ChoiceCard active={values.support === label} key={label} onClick={() => setValue("support", label, { shouldValidate: true })}><Icon size={24} />{label}</ChoiceCard>)}</div>
                </Question>
                <div className="brief-recommendation-banner"><Sparkles aria-hidden="true" /><span>Pe baza răspunsurilor tale, <strong>{recommendation.packageName}</strong> este cea mai potrivită direcție.</span></div>
              </div>
            )}

            {step === 6 && (
              <div className="brief-final-grid">
                <div className="brief-step-content">
                  <TextField error={errors.name?.message} label="Nume complet" placeholder="Ex: Andrei Popescu" registration={register("name")} />
                  <TextField error={errors.email?.message} label="Email" placeholder="Ex: andrei.popescu@email.ro" registration={register("email")} type="email" />
                  <TextField label="Telefon" optional placeholder="Ex: 0712 345 678" registration={register("phone")} type="tel" />
                  <TextField label="Companie" optional placeholder="Ex: Exemplu SRL" registration={register("company")} />
                  <Question title="Preferința de contact">
                    <div className="brief-contact-options">{[{ label: "Email", icon: Mail }, { label: "Telefon", icon: Users }, { label: "WhatsApp", icon: MessageCircle }].map(({ label, icon: Icon }) => <ChoiceCard active={values.contactPreference === label} key={label} onClick={() => setValue("contactPreference", label, { shouldValidate: true })}><Icon size={17} />{label}</ChoiceCard>)}</div>
                  </Question>
                  <label className="brief-field"><span>Ce ar mai trebui să știm?</span><textarea className="brief-textarea" maxLength={1000} placeholder="Detalii utile despre proiect, audiență, concurență, exemple suplimentare sau orice altceva relevant." {...register("message")} /><small className="brief-counter">{values.message?.length ?? 0} / 1000</small></label>
                  <label className="brief-consent"><input type="checkbox" {...register("consent")} /><span>Sunt de acord ca datele mele să fie utilizate conform <a href="/confidentialitate" target="_blank">Politicii de confidențialitate</a>.</span></label>
                  <ErrorText>{errors.consent?.message}</ErrorText>
                  <Tip>Vei primi o copie a brief-ului pe email.</Tip>
                </div>
                <FinalReview data={values} onEdit={setStep} style={activeStyle.name} colors={activeColors} font={activeFont.title} />
              </div>
            )}

            {submitMessage && <div className={`brief-submit-message ${submitState}`}>{submitMessage}</div>}
            <div className="brief-actions">
              <button className="brief-button-secondary" disabled={step === 0 || submitState === "loading"} onClick={() => goTo(step - 1)} type="button"><ArrowLeft size={18} />Înapoi</button>
              {step < 6 ? <button className="brief-button-primary" onClick={() => goTo(step + 1)} type="button">Continuă<ArrowRight size={18} /></button> : <button className="brief-button-submit" disabled={submitState === "loading"} type="submit">{submitState === "loading" ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}Trimite brief-ul<ArrowRight size={18} /></button>}
            </div>
          </main>

          <SummaryPanel colors={activeColors} font={activeFont.title} recommendation={recommendation} step={step} style={activeStyle} values={values} />
        </form>
      </div>
    </div>
  );
}

function BriefSidebar({ currentStep, progress, onStepClick }: { currentStep: number; progress: number; onStepClick: (step: number) => void }) {
  return <aside className="brief-sidebar"><div className="brief-progress"><span>Progres brief</span><strong>{progress} din 7 pași completați</strong><div>{steps.map((item, index) => <i className={index <= currentStep ? "active" : ""} key={item.title} />)}</div></div><nav>{steps.map((item, index) => <button className={index === currentStep ? "active" : ""} key={item.title} onClick={() => onStepClick(index)} type="button"><span>{index < currentStep ? <Check size={14} /> : index + 1}</span><div><strong>{item.title}</strong><small>{item.subtitle}</small></div>{index < currentStep && <CheckCircle2 className="brief-step-check" size={18} />}</button>)}</nav><div className="brief-help"><Sparkles size={21} /><div><strong>Ai nevoie de ajutor?</strong><p>Nu ești sigur ce să alegi? Îți recomandăm cele mai bune opțiuni pentru tine.</p><a href="mailto:contact@mdi-software.ro?subject=Ajutor%20brief%20MDI">Contactează-ne <Mail size={16} /></a></div></div></aside>;
}

function StepHeading({ step }: { step: number }) {
  const descriptions = ["Tipul proiectului și obiectivul principal", "Alegi atmosfera și exemplele preferate", "Construim direcția de brand", "Alegem paginile, secțiunile și funcționalitățile.", "Adăugăm textele, logo-ul și imaginile disponibile.", "Stabilim bugetul, termenul și nivelul de suport.", "Verifică rezumatul și spune-ne cum putem lua legătura."];
  return <header className="brief-step-heading"><span>Pasul {step + 1} din 7</span><h2>{steps[step].title}{step === 6 ? " și trimitere" : ""}</h2><p>{descriptions[step]}</p></header>;
}

function SummaryPanel({ colors, font, recommendation, step, style, values }: { colors: string[]; font: string; recommendation: ReturnType<typeof getLeadRecommendation>; step: number; style: (typeof visualStyles)[number]; values: Partial<LeadFormData> }) {
  return <aside className="brief-summary"><div className="brief-summary-card"><header><strong>Rezumat proiect</strong><ChevronUp size={16} /></header><SummaryItem icon={Rocket} label="Tip proiect" value={values.projectType || "Necompletat"} /><SummaryItem icon={Target} label="Obiectiv principal" value={values.goal || "Necompletat"} /><div className="brief-summary-section"><span>Stil vizual selectat</span>{step >= 1 ? <div className="brief-style-summary"><StylePreview style={style} /><p><strong>{style.name}</strong><small>{style.description}</small></p></div> : <em>Necompletat</em>}</div><div className="brief-summary-section"><span>Culori & fonturi</span>{step >= 2 ? <><ColorSwatches colors={colors} /><div className="brief-font-summary">{font}<b>Aa</b></div></> : <em>Necompletat</em>}</div>{step >= 3 && <div className="brief-summary-section"><span>Structură</span><p>{values.pages?.length ?? 0} pagini · {values.sections?.length ?? 0} secțiuni</p></div>}{step >= 4 && <div className="brief-summary-section"><span>Conținut</span><p>{values.assetNames?.length ?? 0} fișiere · {values.contentStatus}</p></div>}</div><RecommendationCard recommendation={recommendation} ready={step >= 5} /></aside>;
}

function RecommendationCard({ recommendation, ready }: { recommendation: ReturnType<typeof getLeadRecommendation>; ready: boolean }) {
  return <div className="brief-recommendation"><span>Recomandare curentă</span><div><h3>{ready ? recommendation.packageName : "Se actualizează după următorii pași"}</h3>{ready && <em>Potrivire ridicată</em>}</div><p>{ready ? recommendation.summary : "—"}</p>{ready && <ul>{recommendation.benefits.slice(0, 4).map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>}<footer><span>Estimare buget<strong>{ready ? recommendation.estimate : "Necompletat"}</strong></span><span>Estimare termen<strong>{ready ? recommendation.delivery : "Necompletat"}</strong></span></footer></div>;
}

function FinalReview({ colors, data, font, onEdit, style }: { colors: string[]; data: Partial<LeadFormData>; font: string; onEdit: (step: number) => void; style: string }) {
  const rows = [{ title: "Proiect", detail: `Tip proiect: ${data.projectType}\nObiectiv: ${data.goal}`, step: 0, icon: Rocket }, { title: "Stil vizual", detail: `${style}\n${data.visualAssets}`, step: 1, icon: Palette }, { title: "Culori & fonturi", detail: font, step: 2, icon: Palette }, { title: "Structură", detail: `${data.pages?.length ?? 0} pagini · ${data.sections?.length ?? 0} secțiuni`, step: 3, icon: FileText }, { title: "Conținut", detail: `${data.assetNames?.length ?? 0} fișiere · ${data.contentStatus}`, step: 4, icon: Upload }, { title: "Plan", detail: `Buget: ${data.budget}\nTermen: ${data.timeline}`, step: 5, icon: CalendarDays }];
  return <div className="brief-final-review"><header>Rezumat brief</header>{rows.map(({ title, detail, step, icon: Icon }) => <div className="brief-review-row" key={title}><Icon size={19} /><span>{title === "Culori & fonturi" && <ColorSwatches colors={colors} />}<strong>{title}</strong><small>{detail}</small></span><button aria-label={`Editează ${title}`} onClick={() => onEdit(step)} type="button"><Pencil size={15} /></button></div>)}</div>;
}

function Question({ children, description, number, optional, title }: { children: React.ReactNode; description?: string; number?: string; optional?: boolean; title: string }) { return <section className="brief-question"><h3>{number && `${number}. `}{title}{optional && <small> (opțional)</small>}</h3>{description && <p>{description}</p>}<div>{children}</div></section>; }
function ChoiceCard({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) { return <button aria-pressed={active} className={`brief-choice-card ${active ? "selected" : ""}`} onClick={onClick} type="button"><RadioMark active={active} />{children}{active && <Check className="brief-card-check" size={14} />}</button>; }
function MultiChoice({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick: () => void }) { return <button aria-pressed={active} className={`brief-multi-choice ${active ? "selected" : ""}`} onClick={onClick} type="button">{active && <Check size={13} />}{children}</button>; }
function RadioMark({ active }: { active: boolean }) { return <i className={`brief-radio ${active ? "active" : ""}`} aria-hidden="true" />; }
function ColorSwatches({ colors }: { colors: string[] }) { return <div className="brief-swatches">{colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}</div>; }
function StylePreview({ style }: { style: (typeof visualStyles)[number] }) { return <div className={`brief-style-preview ${style.tone}`}><Image alt={`Preview stil ${style.name}`} fill sizes="(max-width: 768px) 45vw, 180px" src={style.image} /></div>; }
function Tip({ children }: { children: React.ReactNode }) { return <div className="brief-tip"><Sparkles size={20} /><p><strong>Sfat util</strong><span>{children}</span></p></div>; }
function SummaryItem({ icon: Icon, label, value }: { icon: typeof Rocket; label: string; value: string }) { return <div className="brief-summary-item"><Icon size={20} /><p><strong>{label}</strong><span>{value}</span></p></div>; }
function StructurePreview({ pages }: { pages: string[] }) { return <aside className="brief-structure-preview"><strong>Previzualizare structură</strong><div>{pageOptions.map(({ label, icon: Icon }, index) => <div className={pages.includes(label) ? "selected" : ""} key={label}><Icon size={18} /><span>{label}</span>{index < pageOptions.length - 1 && <i />}</div>)}</div></aside>; }

function LinkEditor({ label, links, onChange }: { label: string; links: string[]; onChange: (links: string[]) => void }) {
  return <Question optional title={label}><div className="brief-link-list">{links.map((link, index) => <div key={index}><Link2 size={16} /><input aria-label={`${label} ${index + 1}`} onChange={(event) => onChange(links.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} placeholder="Adaugă link (ex: https://exemplu.ro)" type="url" value={link} />{links.length > 1 && <button aria-label="Șterge linkul" onClick={() => onChange(links.filter((_, itemIndex) => itemIndex !== index))} type="button"><Trash2 size={15} /></button>}</div>)}<button disabled={links.length >= 4} onClick={() => onChange([...links, ""])} type="button"><Plus size={16} />Adaugă alt link</button></div></Question>;
}

function TextField({ error, label, optional, placeholder, registration, type = "text" }: { error?: string; label: string; optional?: boolean; placeholder: string; registration: ReturnType<UseFormRegister<LeadFormData>>; type?: string }) { return <label className="brief-field"><span>{label}{optional && <small> (opțional)</small>}</span><input placeholder={placeholder} type={type} {...registration} />{error && <ErrorText>{error}</ErrorText>}</label>; }
function ErrorText({ children }: { children?: React.ReactNode }) { return children ? <p className="brief-error">{children}</p> : null; }
function UploadedImagePreview({ name, url }: { name: string; url: string }) {
  // Blob URLs are local previews and cannot be handled by the Next.js image optimizer.
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={`Previzualizare ${name}`} src={url} />;
}
function formatFileSize(bytes: number) { return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`; }
