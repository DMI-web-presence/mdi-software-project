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
  Wrench,
  Workflow,
} from "lucide-react";
import type { UseFormRegister } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";
import { getLeadRecommendation, LeadFormData, leadSchema } from "@/lib/lead-schema";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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
  { name: "Corporate", description: "Serios, clar, orientat spre încredere.", colors: ["#07101f", "#1b4d89", "#d7e5f3", "#ffffff"] },
  { name: "Premium dark", description: "Elegant, contrastant, memorabil.", colors: ["#05070b", "#1b2433", "#d2a85f", "#f6efe2"] },
  { name: "Fresh", description: "Modern, luminos, prietenos.", colors: ["#072d2a", "#13b981", "#a7f3d0", "#f8fbf7"] },
  { name: "Creative tech", description: "Digital, energic, potrivit pentru produse.", colors: ["#08111f", "#3b38ff", "#21d4fd", "#ff4d6d"] },
  { name: "Soft premium", description: "Calm, rafinat, potrivit pentru servicii.", colors: ["#211b18", "#b08268", "#eadbd1", "#fffaf6"] },
  { name: "Medical clean", description: "Curat, sigur, foarte lizibil.", colors: ["#062a3d", "#0ea5a4", "#dff7f4", "#ffffff"] },
  { name: "Local business", description: "Apropiat, practic, ușor de recunoscut.", colors: ["#16201b", "#d95f31", "#f0c37a", "#fff7eb"] },
];

const customColorFamily = "Altă combinație de culori";
const customColorPreview = ["#07101f", "#f05b37", "#24c6dc", "#f7f2ea"];

const fontPairs = [
  { name: "Inter", value: "Inter — Inter", title: "Inter SemiBold", body: "Inter Regular", previewFamily: "Inter", previewWeight: 600 },
  { name: "Roboto", value: "Roboto — Roboto", title: "Roboto Bold", body: "Roboto Regular", previewFamily: "Roboto", previewWeight: 700 },
  { name: "Open Sans", value: "Open Sans — Open Sans", title: "Open Sans Bold", body: "Open Sans Regular", previewFamily: "Open Sans", previewWeight: 700 },
  { name: "Poppins", value: "Poppins — Poppins", title: "Poppins SemiBold", body: "Poppins Regular", previewFamily: "Poppins", previewWeight: 600 },
  { name: "Montserrat", value: "Montserrat — Open Sans", title: "Montserrat Bold", body: "Open Sans Regular", previewFamily: "Montserrat", previewWeight: 700 },
  { name: "Lato", value: "Lato — Lato", title: "Lato Bold", body: "Lato Regular", previewFamily: "Lato", previewWeight: 700 },
  { name: "Manrope", value: "Manrope — Inter", title: "Manrope SemiBold", body: "Inter Regular", previewFamily: "Manrope", previewWeight: 600 },
  { name: "Sora", value: "Sora — Inter", title: "Sora SemiBold", body: "Inter Regular", previewFamily: "Sora", previewWeight: 600 },
  { name: "Modern", value: "Modern — Inter + Sora", title: "Inter + Sora", body: "Inter Regular", previewFamily: "Inter", previewWeight: 600 },
  { name: "Editorial", value: "Editorial — Inter + Playfair Display", title: "Playfair Display Bold", body: "Inter Regular", previewFamily: "Playfair Display", previewWeight: 700 },
  { name: "Elegant", value: "Elegant — Manrope + Cormorant", title: "Manrope SemiBold", body: "Cormorant Regular", previewFamily: "Manrope", previewWeight: 600 },
  { name: "Boutique", value: "Boutique — Playfair Display + Lato", title: "Playfair Display Bold", body: "Lato Regular", previewFamily: "Playfair Display", previewWeight: 700 },
];

const customFontPair = "Altă combinație de fonturi";

const fontBodyFamilies: Record<string, string> = {
  "Inter Regular": "Inter",
  "Roboto Regular": "Roboto",
  "Open Sans Regular": "Open Sans",
  "Poppins Regular": "Poppins",
  "Lato Regular": "Lato",
  "Cormorant Regular": "Cormorant",
};

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
  { label: "Mentenanță", icon: Wrench },
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

const cardBase =
  "relative min-w-0 rounded-[7px] border border-[#dedbd6] bg-white/70 outline outline-2 outline-transparent outline-offset-2 transition hover:border-[#e95a35]/65 hover:bg-white focus-visible:border-[#f05c39] focus-visible:outline-[#f05c39]/55 focus-visible:shadow-[0_0_0_4px_rgba(240,92,57,0.1)]";
const cardSelected = "border-[#f05c39] bg-gradient-to-br from-white to-[#fff7f3] shadow-[0_0_0_1px_rgba(240,92,57,0.05)]";
const customCard = "bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,247,243,0.88)),repeating-linear-gradient(135deg,rgba(240,91,55,0.08)_0_1px,transparent_1px_9px)]";

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
  const activeColors = values.colorFamily === customColorFamily ? customColorPreview : colorFamilies.find((item) => item.name === values.colorFamily)?.colors ?? colorFamilies[2].colors;
  const activeFont = fontPairs.find((item) => item.value === values.fontPair);
  const activeFontLabel = values.fontPair === customFontPair ? customFontPair : activeFont?.title ?? fontPairs[0].title;
  const previewTitleFont = activeFont?.previewFamily ?? "Poppins";
  const previewBodyFont = activeFont ? fontBodyFamilies[activeFont.body] ?? "Poppins" : "Poppins";
  const previewTitleWeight = activeFont?.previewWeight ?? 600;
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
    <div id="brief-form" className="bg-[#fffdfb] [--brief-sidebar:318px] [--brief-summary:320px] max-[1240px]:[--brief-sidebar:270px] max-[1240px]:[--brief-summary:280px]">
      <section className="relative min-h-[158px] overflow-hidden border-b border-[#75b9ef]/25 bg-[radial-gradient(circle_at_69%_70%,rgba(35,145,224,0.13)_0_2px,transparent_3px),radial-gradient(circle_at_73%_35%,rgba(120,205,255,0.44)_0_5px,transparent_6px),radial-gradient(circle,rgba(79,180,243,0.25)_0_1px,transparent_1.4px),linear-gradient(102deg,#031022_0%,#020b1a_70%,#03152b_100%)] bg-[length:auto,auto,118px_132px,auto] text-white max-[820px]:min-h-[190px]">
        <div className="absolute bottom-[-335px] right-[-3%] size-[660px] rounded-full bg-[radial-gradient(circle_at_44%_22%,rgba(112,222,255,0.9)_0_4px,transparent_5px),radial-gradient(circle_at_64%_17%,rgba(130,225,255,0.5)_0_8px,transparent_9px),repeating-radial-gradient(circle_at_50%_50%,transparent_0_31px,rgba(28,169,248,0.24)_32px_33px),repeating-conic-gradient(from_7deg,rgba(35,177,255,0.32)_0deg_0.7deg,transparent_0.8deg_8deg),radial-gradient(circle,rgba(13,103,179,0.23),transparent_70%)] opacity-90 shadow-[inset_0_0_78px_rgba(15,161,255,0.24),0_0_50px_rgba(0,127,255,0.15)] max-[820px]:bottom-[-360px] max-[820px]:right-[-260px]" aria-hidden="true" />
        <div className="relative z-[2] mx-auto grid min-h-[158px] w-[min(1360px,calc(100%-48px))] grid-cols-[390px_minmax(300px,440px)_1fr] items-center gap-9 max-[1240px]:grid-cols-[345px_minmax(280px,380px)_1fr] max-[1023px]:w-[min(100%-32px,900px)] max-[1023px]:grid-cols-2 max-[820px]:min-h-[190px] max-[820px]:grid-cols-1 max-[820px]:content-center max-[820px]:gap-4 max-[520px]:w-[calc(100%-28px)]">
          <div>
            <p className="mb-3.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#ff633d] max-[520px]:text-[0.68rem]">Brief ghidat</p>
            <h1 className="text-[clamp(1.35rem,1.65vw,1.7rem)] font-extrabold leading-[1.16] max-[520px]:text-[1.4rem]">Clarifică cerințele și construim împreună direcția proiectului.</h1>
          </div>
          <p className="max-w-[410px] border-l border-white/45 pl-9 text-[0.92rem] font-semibold leading-[1.8] text-white/90 max-[820px]:max-w-[560px] max-[820px]:border-l-0 max-[820px]:pl-0 max-[820px]:text-[0.8rem]">
            Te ghidăm pas cu pas ca să definim direcția vizuală, conținutul, funcționalitățile, bugetul și termenul proiectului.
          </p>
          <div className="mr-4 flex items-center gap-3 justify-self-end text-white max-[1023px]:hidden">
            <CheckCircle2 className="size-9 rounded-full border border-[#23d9f5] p-2 text-[#23d9f5]" aria-hidden="true" />
            <span className="grid"><strong className="text-xs">{savedText}</strong><small className="mt-1 text-[0.68rem] text-white/65">datele rămân pe acest dispozitiv</small></span>
          </div>
        </div>
      </section>

      <div className="grid min-h-[970px] min-w-0 grid-cols-[var(--brief-sidebar)_1fr] items-stretch max-[1023px]:grid-cols-1">
        <BriefSidebar currentStep={step} progress={progress} onStepClick={goTo} />

        <form className="grid min-w-0 grid-cols-[minmax(0,1fr)_var(--brief-summary)] overflow-hidden bg-[#fdfbf8] max-[1023px]:grid-cols-[minmax(0,1fr)_280px] max-[820px]:grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
          <div className="hidden gap-1.5 px-4 pt-4 max-[820px]:col-span-1 max-[820px]:flex" aria-label={`Pasul ${step + 1} din 7`}>
            {steps.map((item, index) => <span className={cn("h-1 flex-1 rounded-full bg-[#dad8d4]", index <= step && "bg-[#f05b37]")} key={item.title} />)}
          </div>

          <main className="min-w-0 overflow-hidden px-[clamp(1.5rem,3.6vw,3.5rem)] py-8 pb-11 max-[1240px]:px-7 max-[820px]:px-4 max-[820px]:py-6">
            <StepHeading step={step} />

            {step === 0 && (
              <div className="grid min-w-0 gap-7">
                <Question number="1" title="Ce vrei să construim?">
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {projectTypes.map(({ label, icon: Icon }) => (
                      <ChoiceCard active={values.projectType === label} key={label} onClick={() => setValue("projectType", label, { shouldValidate: true })}>
                        <Icon size={34} aria-hidden="true" /><span>{label}</span>
                      </ChoiceCard>
                    ))}
                  </div>
                  <ErrorText>{errors.projectType?.message}</ErrorText>
                </Question>
                <Question number="2" title="Care este obiectivul principal?">
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {goals.map((goal) => <ChoiceCard active={values.goal === goal} className="min-h-[55px] flex-row justify-start px-10 py-3 text-left" key={goal} onClick={() => setValue("goal", goal, { shouldValidate: true })}>{goal}</ChoiceCard>)}
                  </div>
                </Question>
                <Question number="3" title="Descrie pe scurt ideea ta" optional>
                  <Textarea maxLength={1200} placeholder="Scrie câteva rânduri despre ideea, obiectivele și publicul țintă al proiectului tău..." registration={register("projectDescription")} />
                </Question>
              </div>
            )}

            {step === 1 && (
              <div className="grid min-w-0 gap-7">
                <Question title="Ce atmosferă îți dorești pentru website?" description="Alege stilul care se potrivește cel mai bine brandului și publicului tău.">
                  <div className="grid gap-3 max-[520px]:grid-cols-2 sm:grid-cols-2 xl:grid-cols-5">
                    {visualStyles.map((style) => (
                      <button className={cn(cardBase, "p-2 text-left", values.style === style.name && cardSelected)} key={style.name} onClick={() => setValue("style", style.name, { shouldValidate: true })} type="button">
                        <StylePreview style={style} className="h-[170px] max-[1240px]:h-[140px] max-[520px]:h-[125px]" />
                        <span className="mt-3 flex items-center gap-2.5 text-[0.8rem] font-bold"><RadioMark active={values.style === style.name} />{style.name}</span>
                        <small className="mt-2 block text-[0.68rem] leading-[1.55] text-[#686b73]">{style.description}</small>
                      </button>
                    ))}
                  </div>
                </Question>
                <Question title="Cum gestionăm imaginile?">
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {["Folosesc imaginile mele", "Generăm imagini cu AI", "Folosim imagini stock", "Am nevoie de recomandări"].map((item) => (
                      <ChoiceCard active={values.visualAssets === item} className="min-h-[58px] flex-row justify-start px-8 py-3 text-left" key={item} onClick={() => setValue("visualAssets", item, { shouldValidate: true })}>{item}</ChoiceCard>
                    ))}
                  </div>
                </Question>
                <LinkEditor label="Ai exemple de website-uri care îți plac?" links={values.inspirationLinks ?? [""]} onChange={(links) => setValue("inspirationLinks", links, { shouldDirty: true })} />
                <Tip>Poți combina mai multe stiluri. Folosește linkurile pentru a ne arăta exact elementele care îți plac.</Tip>
              </div>
            )}

            {step === 2 && (
              <div className="grid min-w-0 gap-7">
                <Question title="Alege familia de culori">
                  <Carousel>
                    {colorFamilies.map((family) => (
                      <button className={cn(cardBase, "min-w-0 flex-[0_0_clamp(195px,20vw,235px)] snap-start p-2 text-left max-[520px]:flex-[0_0_78vw]", values.colorFamily === family.name && cardSelected)} key={family.name} onClick={() => { setValue("colorFamily", family.name, { shouldValidate: true }); setValue("dominantColor", family.colors[1], { shouldValidate: true }); }} type="button">
                        <ColorSwatches colors={family.colors} flush />
                        <span className="mt-3 flex items-center gap-2.5 text-[0.8rem] font-bold"><RadioMark active={values.colorFamily === family.name} />{family.name}</span>
                        <small className="mt-2 block text-[0.68rem] leading-[1.55] text-[#686b73]">{family.description}</small>
                      </button>
                    ))}
                    <button className={cn(cardBase, customCard, "min-w-0 flex-[0_0_clamp(195px,20vw,235px)] snap-start p-2 text-left max-[520px]:flex-[0_0_78vw]", values.colorFamily === customColorFamily && cardSelected)} onClick={() => { setValue("colorFamily", customColorFamily, { shouldValidate: true }); setValue("dominantColor", "De stabilit împreună", { shouldValidate: true }); }} type="button">
                      <ColorSwatches colors={customColorPreview} flush />
                      <span className="mt-3 flex items-center gap-2.5 text-[0.8rem] font-bold"><RadioMark active={values.colorFamily === customColorFamily} />{customColorFamily}</span>
                      <small className="mt-2 block text-[0.68rem] leading-[1.55] text-[#565b66]">Nu alegi o paletă fixă acum. Stabilim culorile după brand, public și exemplele tale.</small>
                    </button>
                  </Carousel>
                </Question>
                <Question title="Alege combinația de fonturi">
                  <Carousel>
                    {fontPairs.map((font) => (
                      <button className={cn(cardBase, "min-w-0 flex-[0_0_clamp(245px,26vw,315px)] snap-start p-2 text-left max-[520px]:flex-[0_0_86vw]", values.fontPair === font.value && cardSelected)} key={font.value} onClick={() => setValue("fontPair", font.value, { shouldValidate: true })} type="button">
                        <span className="block text-center text-[3.7rem] leading-[1.15]" style={{ fontFamily: `"${font.previewFamily}", ${font.previewFamily === "Playfair Display" ? "Georgia, serif" : "Arial, sans-serif"}`, fontWeight: font.previewWeight }}>Ag</span>
                        <strong className="flex items-center gap-2 text-[0.73rem]"><RadioMark active={values.fontPair === font.value} />{font.value}</strong>
                        <small className="mt-2 block text-[0.68rem] leading-[1.55] text-[#686b73]">Titluri: {font.title}<br />Text: {font.body}</small>
                      </button>
                    ))}
                    <button className={cn(cardBase, customCard, "min-w-0 flex-[0_0_clamp(245px,26vw,315px)] snap-start p-2 text-left max-[520px]:flex-[0_0_86vw]", values.fontPair === customFontPair && cardSelected)} onClick={() => setValue("fontPair", customFontPair, { shouldValidate: true })} type="button">
                      <span className="block text-center text-[3.7rem] leading-[1.15]" style={{ fontFamily: "\"Poppins\", Arial, sans-serif", fontWeight: 600 }}>Aa</span>
                      <strong className="flex items-center gap-2 text-[0.73rem]"><RadioMark active={values.fontPair === customFontPair} />{customFontPair}</strong>
                      <small className="mt-2 block text-[0.68rem] leading-[1.55] text-[#565b66]">Titluri: de stabilit<br />Text: de stabilit</small>
                    </button>
                  </Carousel>
                </Question>
                <Question title="Previzualizare combinație selectată">
                  <div className="grid grid-cols-[145px_1fr] items-center gap-8 rounded-[7px] border border-[#ddd9d3] p-3 max-[520px]:grid-cols-1 max-[520px]:gap-4">
                    <div className="min-h-[90px] rounded-[5px]" style={{ background: `linear-gradient(135deg, ${activeColors[0]}, ${activeColors[2]})` }} />
                    <span className="grid gap-2">
                      <strong className="text-[1.1rem]" style={{ color: activeColors[0], fontFamily: `"${previewTitleFont}", ${previewTitleFont === "Playfair Display" ? "Georgia, serif" : "Arial, sans-serif"}`, fontWeight: previewTitleWeight }}>Un titlu clar pentru brandul tău</strong>
                      <small className="max-w-[430px] text-xs leading-[1.6] opacity-70" style={{ color: activeColors[0], fontFamily: `"${previewBodyFont}", ${previewBodyFont === "Cormorant" ? "Georgia, serif" : "Arial, sans-serif"}` }}>Acesta este un subtitlu care susține mesajul principal și oferă context vizitatorului.</small>
                    </span>
                  </div>
                </Question>
              </div>
            )}

            {step === 3 && (
              <div className="grid min-w-0 gap-10 xl:grid-cols-[minmax(0,1fr)_160px] max-[1240px]:grid-cols-1">
                <div className="grid gap-7">
                  <Question number="1" title="Pagini principale" description="Selectează paginile de care are nevoie website-ul tău.">
                    <div className="grid gap-3 grid-cols-3 min-[1241px]:grid-cols-7 max-[1240px]:grid-cols-4">
                      {pageOptions.map(({ label, icon: Icon }) => <MultiChoice active={values.pages?.includes(label)} className="min-h-[86px] flex-col justify-center" key={label} onClick={() => toggleArray("pages", label)}><Icon size={24} />{label}</MultiChoice>)}
                    </div>
                  </Question>
                  <Question number="2" title="Secțiuni pentru pagina Acasă" description="Alege secțiunile pe care vrei să le includem pe pagina principală.">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{sectionOptions.map((item) => <MultiChoice active={values.sections?.includes(item)} key={item} onClick={() => toggleArray("sections", item)}>{item}</MultiChoice>)}</div>
                  </Question>
                  <Question number="3" title="Funcționalități" description="Selectează funcționalitățile de care ai nevoie.">
                    <div className="grid grid-cols-2 gap-x-9 gap-y-3 rounded-[7px] border border-[#ddd9d3] p-4">
                      {featureOptions.map((item) => <label className="flex items-center gap-2.5 text-[0.72rem]" key={item}><input className="size-4 accent-[#ef5b38]" checked={values.features?.includes(item) ?? false} onChange={() => toggleArray("features", item)} type="checkbox" />{item}</label>)}
                    </div>
                  </Question>
                </div>
                <StructurePreview pages={values.pages ?? []} />
              </div>
            )}

            {step === 4 && (
              <div className="grid min-w-0 gap-7">
                <Question title="Încarcă logo și imagini">
                  <div className={cn("flex min-h-[155px] flex-col items-center justify-center rounded-[7px] border border-dashed border-[#8a8885] bg-white/45 transition", dragging && "border-[#13a8d5] bg-[#eefaff]")} onDragEnter={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }}>
                    <CloudUpload size={42} aria-hidden="true" />
                    <p className="mt-2 text-xs">Trage fișierele aici sau</p>
                    <button className="mt-2 rounded-[5px] border border-[#d5d2cd] bg-white px-4 py-2 text-[0.73rem] font-semibold" onClick={() => fileInput.current?.click()} type="button">Alege din dispozitiv</button>
                    <small className="mt-2 text-[0.67rem] text-[#777a80]">JPG, PNG, SVG sau WebP · max. 20 MB / fișier</small>
                    <input accept="image/jpeg,image/png,image/svg+xml,image/webp" hidden multiple onChange={(event) => event.target.files && addFiles(event.target.files)} ref={fileInput} type="file" />
                  </div>
                  {uploads.length > 0 && <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{uploads.map((file, index) => <UploadCard file={file} key={`${file.name}-${index}`} onRemove={() => removeFile(index)} />)}</div>}
                </Question>
                <LinkEditor label="Ai exemple de referință?" links={values.contentLinks ?? [""]} onChange={(links) => setValue("contentLinks", links, { shouldDirty: true })} />
                <Question title="Cum este stadiul conținutului?">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[{ title: "Am conținutul pregătit", note: "Îl voi pune la dispoziție pentru integrare." }, { title: "Am nevoie de suport", note: "Vă rog să mă ajutați cu redactarea conținutului." }].map((item) => <ChoiceCard active={values.contentStatus === item.title} className="min-h-[58px] items-start px-10 py-3 text-left" key={item.title} onClick={() => setValue("contentStatus", item.title, { shouldValidate: true })}><span className="grid gap-1"><strong>{item.title}</strong><small className="text-[0.67rem] text-[#7b7c80]">{item.note}</small></span></ChoiceCard>)}
                  </div>
                </Question>
                <Question title="Observații despre conținut" optional><Textarea placeholder="Scrie aici orice mențiuni importante despre conținut..." registration={register("contentNotes")} /></Question>
              </div>
            )}

            {step === 5 && (
              <div className="grid min-w-0 gap-7">
                <Question title="Care este bugetul orientativ?">
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{budgetOptions.map((item) => <ChoiceCard active={values.budget === item} className="min-h-[94px]" key={item} onClick={() => setValue("budget", item, { shouldValidate: true })}><span className="text-[1.6rem] font-normal">€</span>{item}</ChoiceCard>)}</div>
                </Question>
                <Question title="Când ai dori lansarea?">
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{timelineOptions.map((item) => <ChoiceCard active={values.timeline === item} className="min-h-[94px]" key={item} onClick={() => setValue("timeline", item, { shouldValidate: true })}><CalendarDays size={24} />{item}</ChoiceCard>)}</div>
                </Question>
                <Question title="De cât suport ai nevoie?">
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{supportOptions.map(({ label, icon: Icon }) => <ChoiceCard active={values.support === label} className="min-h-[94px]" key={label} onClick={() => setValue("support", label, { shouldValidate: true })}><Icon size={24} />{label}</ChoiceCard>)}</div>
                </Question>
                <div className="flex items-center gap-3.5 rounded-lg border border-[#ef5b38]/35 bg-[#fff8f5] p-4 text-[0.77rem] text-[#33363c]"><Sparkles className="size-[34px] rounded-full bg-[#f05b37] p-2 text-white" aria-hidden="true" /><span>Pe baza răspunsurilor tale, <strong className="text-[#ef5b38]">{recommendation.packageName}</strong> este cea mai potrivită direcție.</span></div>
              </div>
            )}

            {step === 6 && (
              <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)]">
                <div className="grid min-w-0 gap-7">
                  <TextField error={errors.name?.message} label="Nume complet" placeholder="Ex: Andrei Popescu" registration={register("name")} />
                  <TextField error={errors.email?.message} label="Email" placeholder="Ex: andrei.popescu@email.ro" registration={register("email")} type="email" />
                  <TextField label="Telefon" optional placeholder="Ex: 0712 345 678" registration={register("phone")} type="tel" />
                  <TextField label="Companie" optional placeholder="Ex: Exemplu SRL" registration={register("company")} />
                  <Question title="Preferința de contact">
                    <div className="grid gap-3 sm:grid-cols-3">{[{ label: "Email", icon: Mail }, { label: "Telefon", icon: Users }, { label: "WhatsApp", icon: MessageCircle }].map(({ label, icon: Icon }) => <ChoiceCard active={values.contactPreference === label} className="min-h-12 flex-row px-8 py-3" key={label} onClick={() => setValue("contactPreference", label, { shouldValidate: true })}><Icon size={17} />{label}</ChoiceCard>)}</div>
                  </Question>
                  <label className="relative grid gap-2"><span className="text-[0.9rem] font-bold text-[#15181e]">Ce ar mai trebui să știm?</span><Textarea maxLength={1000} placeholder="Detalii utile despre proiect, audiență, concurență, exemple suplimentare sau orice altceva relevant." registration={register("message")} /><small className="absolute bottom-2 right-3 text-[0.65rem] text-[#888]">{values.message?.length ?? 0} / 1000</small></label>
                  <label className="flex items-start gap-3 text-[0.7rem] leading-[1.7] text-[#6b6e75]"><input className="size-4 accent-[#ef5b38]" type="checkbox" {...register("consent")} /><span>Sunt de acord ca datele mele să fie utilizate conform <a className="text-[#1674df] underline" href="/confidentialitate" target="_blank">Politicii de confidențialitate</a>.</span></label>
                  <ErrorText>{errors.consent?.message}</ErrorText>
                  <Tip>Vei primi o copie a brief-ului pe email.</Tip>
                </div>
                <FinalReview data={values} onEdit={setStep} style={activeStyle.name} colors={activeColors} font={activeFontLabel} />
              </div>
            )}

            {submitMessage && <div className={cn("mt-5 rounded-md p-3.5 text-xs font-semibold", submitState === "success" && "bg-[#e9f9ef] text-[#197344]", submitState === "error" && "bg-[#fff0ec] text-[#c53f24]")}>{submitMessage}</div>}
            <div className="mt-8 flex justify-between gap-4">
              <button className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[5px] border border-[#ddd9d3] bg-white px-5 text-[0.82rem] font-bold disabled:opacity-35 max-[520px]:flex-1 max-[520px]:px-3" disabled={step === 0 || submitState === "loading"} onClick={() => goTo(step - 1)} type="button"><ArrowLeft size={18} />Înapoi</button>
              {step < 6 ? <button className="ml-auto inline-flex min-h-12 items-center justify-center gap-3 rounded-[5px] bg-[#111419] px-5 text-[0.82rem] font-bold text-white hover:bg-[#253143] max-[520px]:flex-1 max-[520px]:px-3" onClick={() => goTo(step + 1)} type="button">Continuă<ArrowRight size={18} /></button> : <button className="ml-auto inline-flex min-h-12 items-center justify-center gap-3 rounded-[5px] bg-[#f05b37] px-5 text-[0.82rem] font-bold text-white shadow-[0_10px_24px_rgba(240,91,55,0.18)] hover:bg-[#d94d2c] disabled:opacity-60 max-[520px]:flex-1 max-[520px]:px-3" disabled={submitState === "loading"} type="submit">{submitState === "loading" ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}Trimite brief-ul<ArrowRight size={18} /></button>}
            </div>
          </main>

          <SummaryPanel colors={activeColors} font={activeFontLabel} recommendation={recommendation} step={step} style={activeStyle} values={values} />
        </form>
      </div>
    </div>
  );
}

function BriefSidebar({ currentStep, progress, onStepClick }: { currentStep: number; progress: number; onStepClick: (step: number) => void }) {
  return (
    <aside className="relative z-10 bg-[radial-gradient(circle,rgba(58,164,228,0.18)_0_1px,transparent_1.5px),linear-gradient(160deg,#031226_0%,#020a18_100%)] bg-[length:116px_132px,auto] px-5 py-8 text-white max-[1023px]:p-4">
      <div className="px-1 pb-7 text-[0.78rem] text-white/80 max-[1023px]:hidden">
        <span>Progres brief</span>
        <strong className="mt-1 block font-medium">{progress} din 7 pași completați</strong>
        <div className="relative mt-4 flex justify-between before:absolute before:left-1 before:right-1 before:top-1 before:h-0.5 before:bg-white/15">
          {steps.map((item, index) => <i className={cn("relative z-[1] size-[9px] rounded-full bg-[#26364a]", index <= currentStep && "bg-[#26d9ed] shadow-[0_0_12px_rgba(38,217,237,0.55)]")} key={item.title} />)}
        </div>
      </div>
      <nav className="grid gap-1 max-[1023px]:flex max-[1023px]:gap-2 max-[1023px]:overflow-x-auto max-[1023px]:[scrollbar-width:none] max-[520px]:justify-between">
        {steps.map((item, index) => (
          <button className={cn("relative grid min-h-[61px] w-full grid-cols-[29px_1fr_auto] items-center gap-3 rounded-lg border border-transparent px-2 py-2 text-left text-white before:absolute before:left-6 before:top-[-0.25rem] before:h-2 before:w-px before:bg-[#21bde8]/35 max-[1023px]:min-h-[46px] max-[1023px]:w-auto max-[1023px]:flex-none max-[1023px]:grid-cols-[26px_auto] max-[1023px]:pr-4 max-[1023px]:before:hidden max-[520px]:w-[42px] max-[520px]:grid-cols-1 max-[520px]:justify-items-center max-[520px]:p-1.5", index === currentStep && "border-[#16a9d4] bg-[#07304c]/55")} key={item.title} onClick={() => onStepClick(index)} type="button">
            <span className={cn("grid size-[27px] place-items-center rounded-full bg-[#223349] text-xs font-bold text-white/90", index === currentStep && "bg-[#f05b37] shadow-[0_0_16px_rgba(240,91,55,0.3)]", index < currentStep && index !== currentStep && "bg-[#075a7a] text-[#34d8ed]")}>{index < currentStep ? <Check size={14} /> : index + 1}</span>
            <div className="max-[520px]:hidden"><strong className="block text-sm">{item.title}</strong><small className="mt-1 block text-[0.71rem] text-white/70 max-[1023px]:hidden">{item.subtitle}</small></div>
            {index < currentStep && <CheckCircle2 className="text-[#20d8ec] max-[1023px]:hidden" size={18} />}
          </button>
        ))}
      </nav>
      <div className="mt-8 grid grid-cols-[auto_1fr] gap-3 rounded-lg border border-white/40 p-4 max-[1023px]:hidden">
        <Sparkles className="text-[#46d7f3]" size={21} />
        <div><strong className="text-[0.83rem]">Ai nevoie de ajutor?</strong><p className="mt-3 text-[0.72rem] leading-[1.7] text-white/75">Nu ești sigur ce să alegi? Îți recomandăm cele mai bune opțiuni pentru tine.</p><a className="mt-4 inline-flex items-center gap-2 rounded-[5px] border border-[#0e83b6] px-3 py-2 text-xs" href="mailto:contact@mdi-software.ro?subject=Ajutor%20brief%20MDI">Contactează-ne <Mail size={16} /></a></div>
      </div>
    </aside>
  );
}

function StepHeading({ step }: { step: number }) {
  const descriptions = ["Tipul proiectului și obiectivul principal", "Alegi atmosfera și exemplele preferate", "Construim direcția de brand", "Alegem paginile, secțiunile și funcționalitățile.", "Adăugăm textele, logo-ul și imaginile disponibile.", "Stabilim bugetul, termenul și nivelul de suport.", "Verifică rezumatul și spune-ne cum putem lua legătura."];
  return <header className="mb-7 border-b border-[#dedbd6] pb-5"><span className="inline-flex rounded-full border border-[#ec5934]/25 bg-[#fff0ea] px-3 py-1.5 text-[0.73rem] font-extrabold uppercase tracking-[0.08em] text-[#e95734]">Pasul {step + 1} din 7</span><h2 className="mt-3 text-[clamp(1.55rem,2.2vw,2rem)] font-extrabold leading-[1.1]">{steps[step].title}{step === 6 ? " și trimitere" : ""}</h2><p className="mt-1.5 text-[0.93rem] text-[#6c7078]">{descriptions[step]}</p></header>;
}

function SummaryPanel({ colors, font, recommendation, step, style, values }: { colors: string[]; font: string; recommendation: ReturnType<typeof getLeadRecommendation>; step: number; style: (typeof visualStyles)[number]; values: Partial<LeadFormData> }) {
  return (
    <aside className="grid content-start gap-4 border-l border-[#ece8e3] bg-[#fffdfb] p-5 max-[820px]:border-l-0 max-[820px]:border-t max-[820px]:border-[#e6e2dd] max-[820px]:p-4">
      <div className="rounded-lg border border-[#e2dfda] bg-white/70 shadow-[0_10px_28px_rgba(31,28,24,0.035)]">
        <header className="flex justify-between border-b border-[#e2dfda] p-4 text-[0.8rem]"><strong>Rezumat proiect</strong><ChevronUp size={16} /></header>
        <SummaryItem icon={Rocket} label="Tip project" value={values.projectType || "Necompletat"} />
        <SummaryItem icon={Target} label="Obiectiv principal" value={values.goal || "Necompletat"} />
        <SummarySection label="Stil vizual selectat">{step >= 1 ? <div className="grid grid-cols-[74px_1fr] items-center gap-3"><StylePreview style={style} className="h-[62px]" /><p className="grid gap-0.5"><strong className="text-[0.82rem] text-[#16191e]">{style.name}</strong><small className="text-[0.58rem] leading-[1.45] text-[#73767c]">{style.description}</small></p></div> : <em className="text-[0.66rem] not-italic text-[#73767c]">Necompletat</em>}</SummarySection>
        <SummarySection label="Culori & fonturi">{step >= 2 ? <><ColorSwatches colors={colors} summary /><div className="mt-3 flex items-center justify-between rounded-[5px] border border-[#e2dfda] px-3 py-2 text-[0.68rem]">{font}<b className="text-[1.05rem]">Aa</b></div></> : <em className="text-[0.66rem] not-italic text-[#73767c]">Necompletat</em>}</SummarySection>
        {step >= 3 && <SummarySection label="Structură"><p className="text-[0.66rem] text-[#73767c]">{values.pages?.length ?? 0} pagini · {values.sections?.length ?? 0} secțiuni</p></SummarySection>}
        {step >= 4 && <SummarySection label="Conținut"><p className="text-[0.66rem] text-[#73767c]">{values.assetNames?.length ?? 0} fișiere · {values.contentStatus}</p></SummarySection>}
      </div>
      <RecommendationCard recommendation={recommendation} ready={step >= 5} />
    </aside>
  );
}

function RecommendationCard({ recommendation, ready }: { recommendation: ReturnType<typeof getLeadRecommendation>; ready: boolean }) {
  return <div className="rounded-lg border border-[#e2dfda] bg-white/70 p-4 shadow-[0_10px_28px_rgba(31,28,24,0.035)]"><span className="text-[0.67rem] font-bold">Recomandare curentă</span><div className="mt-3 flex items-center justify-between gap-2"><h3 className="text-[1.08rem] font-semibold leading-tight text-[#ed5936]">{ready ? recommendation.packageName : "Se actualizează după următorii pași"}</h3>{ready && <em className="rounded-full bg-[#e4f7e8] px-2 py-1 text-[0.57rem] not-italic text-[#21834f]">Potrivire ridicată</em>}</div><p className="mt-3 text-[0.68rem] leading-[1.55] text-[#73767c]">{ready ? recommendation.summary : "—"}</p>{ready && <ul className="mt-3 grid gap-1.5 text-[0.66rem]">{recommendation.benefits.slice(0, 4).map((item) => <li className="flex items-center gap-2" key={item}><Check size={14} />{item}</li>)}</ul>}<footer className="mt-4 grid grid-cols-2 border-t border-[#e2dfda] pt-3"><span className="grid gap-1 text-[0.58rem] text-[#666a72]">Estimare buget<strong className="text-[0.68rem] text-[#30343b]">{ready ? recommendation.estimate : "Necompletat"}</strong></span><span className="grid gap-1 border-l border-[#e2dfda] pl-3 text-[0.58rem] text-[#666a72]">Estimare termen<strong className="text-[0.68rem] text-[#30343b]">{ready ? recommendation.delivery : "Necompletat"}</strong></span></footer></div>;
}

function FinalReview({ colors, data, font, onEdit, style }: { colors: string[]; data: Partial<LeadFormData>; font: string; onEdit: (step: number) => void; style: string }) {
  const rows = [{ title: "Proiect", detail: `Tip proiect: ${data.projectType}\nObiectiv: ${data.goal}`, step: 0, icon: Rocket }, { title: "Stil vizual", detail: `${style}\n${data.visualAssets}`, step: 1, icon: Palette }, { title: "Culori & fonturi", detail: font, step: 2, icon: Palette }, { title: "Structură", detail: `${data.pages?.length ?? 0} pagini · ${data.sections?.length ?? 0} secțiuni`, step: 3, icon: FileText }, { title: "Conținut", detail: `${data.assetNames?.length ?? 0} fișiere · ${data.contentStatus}`, step: 4, icon: Upload }, { title: "Plan", detail: `Buget: ${data.budget}\nTermen: ${data.timeline}`, step: 5, icon: CalendarDays }];
  return <div className="self-start rounded-[7px] border border-[#ddd9d3] bg-white/70 max-xl:order-first"><header className="border-b border-[#ddd9d3] p-5 text-[0.82rem] font-bold">Rezumat brief</header>{rows.map(({ title, detail, step, icon: Icon }) => <div className="grid grid-cols-[auto_1fr_auto] gap-3 border-b border-[#e4e1dc] p-4" key={title}><Icon size={19} /><span className="min-w-0">{title === "Culori & fonturi" && <ColorSwatches colors={colors} review />}<strong className="block text-[0.74rem]">{title}</strong><small className="mt-1 block whitespace-pre-line text-[0.66rem] leading-[1.55] text-[#74777e]">{detail}</small></span><button aria-label={`Editează ${title}`} onClick={() => onEdit(step)} type="button"><Pencil size={15} /></button></div>)}</div>;
}

function Question({ children, description, number, optional, title }: { children: React.ReactNode; description?: string; number?: string; optional?: boolean; title: string }) {
  return <section className="min-w-0 max-w-full"><h3 className="text-[0.9rem] font-bold text-[#15181e]">{number && `${number}. `}{title}{optional && <small className="font-normal text-[#73757b]"> (opțional)</small>}</h3>{description && <p className="mt-1.5 text-xs text-[#73757b]">{description}</p>}<div className="mt-4 min-w-0 max-w-full">{children}</div></section>;
}

function ChoiceCard({ active, children, className, onClick }: { active: boolean; children: React.ReactNode; className?: string; onClick: () => void }) {
  return <button aria-pressed={active} className={cn(cardBase, "flex min-h-[112px] flex-col items-center justify-center gap-2 p-4 text-center text-[0.82rem] font-medium max-[1240px]:text-[0.74rem] max-[520px]:min-h-[82px]", active && cardSelected, className)} onClick={onClick} type="button"><RadioMark active={active} />{children}{active && <Check className="absolute right-2 top-2 size-5 rounded-full bg-[#f05b37] p-1 text-white" size={14} />}</button>;
}

function MultiChoice({ active, children, className, onClick }: { active?: boolean; children: React.ReactNode; className?: string; onClick: () => void }) {
  return <button aria-pressed={active} className={cn(cardBase, "flex min-h-[42px] items-center justify-center gap-2 px-3 py-2 text-[0.72rem]", active && cardSelected, className)} onClick={onClick} type="button">{active && <Check className="rounded-full bg-[#f05b37] p-0.5 text-white" size={13} />}{children}</button>;
}

function RadioMark({ active }: { active: boolean }) { return <i className={cn("inline-block size-4 flex-none rounded-full border border-[#c9c7c3] bg-white", active && "border-[5px] border-[#f05b37]")} aria-hidden="true" />; }

function ColorSwatches({ colors, flush, review, summary }: { colors: string[]; flush?: boolean; review?: boolean; summary?: boolean }) {
  return <div className={cn("flex gap-1.5", review && "mb-2", summary && "gap-1")}>{colors.map((color, index) => <i className={cn("block border border-black/10", flush ? "h-[30px] flex-1 first:rounded-l last:rounded-r" : "h-[30px] w-11 rounded-[5px]", review && "h-[18px] w-6", summary && "h-7 flex-1 w-auto")} key={`${color}-${index}`} style={{ backgroundColor: color }} />)}</div>;
}

function StylePreview({ className, style }: { className?: string; style: (typeof visualStyles)[number] }) {
  return <div className={cn("relative overflow-hidden rounded bg-[#eee]", className)}><Image alt={`Preview stil ${style.name}`} className="object-cover" fill sizes="(max-width: 768px) 45vw, 180px" src={style.image} /></div>;
}

function Tip({ children }: { children: React.ReactNode }) { return <div className="flex items-start gap-4 rounded-[7px] border border-[#e2ded8] bg-white/45 p-4 text-[#50545d]"><Sparkles size={20} /><p className="grid gap-1.5 text-[0.77rem]"><strong className="text-[#343840]">Sfat util</strong><span className="text-[#74777e]">{children}</span></p></div>; }
function SummaryItem({ icon: Icon, label, value }: { icon: typeof Rocket; label: string; value: string }) { return <div className="flex gap-3 p-4"><Icon size={20} /><p className="grid gap-1"><strong className="text-[0.68rem] font-bold">{label}</strong><span className="text-[0.66rem] text-[#73767c]">{value}</span></p></div>; }
function SummarySection({ children, label }: { children: React.ReactNode; label: string }) { return <div className="mx-4 grid gap-3 border-t border-[#e2dfda] py-4"><span className="text-[0.68rem] font-bold">{label}</span>{children}</div>; }

function StructurePreview({ pages }: { pages: string[] }) {
  return <aside className="max-[1240px]:hidden"><strong className="mb-3 block text-[0.72rem]">Previzualizare structură</strong><div className="grid gap-4 rounded-lg border border-[#e2ded8] p-3">{pageOptions.map(({ label, icon: Icon }, index) => <div className={cn("relative flex min-h-[54px] items-center gap-2.5 rounded-md border border-dashed border-[#ccc8c2] p-3 text-[0.7rem] text-[#676a71]", pages.includes(label) && "border-solid border-[#e6ddd7] text-[#17191e]", index === 0 && "border-[#f05b37] bg-[#fff8f5]")} key={label}><Icon size={18} /><span>{label}</span>{index < pageOptions.length - 1 && <i className="absolute bottom-[-1.05rem] left-[19px] h-4 w-px bg-[#bebbb6]" />}</div>)}</div></aside>;
}

function Carousel({ children }: { children: React.ReactNode }) {
  return <div className="block min-w-0 max-w-full overflow-x-auto overflow-y-hidden overscroll-x-contain rounded-lg border border-[#ebe4dc] bg-[linear-gradient(90deg,#fffdfb_0%,rgba(255,253,251,0)_4%),linear-gradient(270deg,#fffdfb_0%,rgba(255,253,251,0)_4%),rgba(255,255,255,0.42)] [scroll-padding-inline:0.75rem] [scrollbar-color:#f05b37_#eee9e2] [scrollbar-width:thin]"><div className="flex w-max min-w-full gap-3 p-3 pb-4">{children}</div></div>;
}

function LinkEditor({ label, links, onChange }: { label: string; links: string[]; onChange: (links: string[]) => void }) {
  return <Question optional title={label}><div className="grid grid-cols-[1fr_auto] gap-3 max-[520px]:grid-cols-1">{links.map((link, index) => <div className="flex min-h-12 items-center gap-3 rounded-md border border-[#ddd9d3] bg-white px-4" key={index}><Link2 size={16} /><input className="min-w-0 flex-1 border-0 text-[0.78rem] outline-0 focus-visible:ring-0" aria-label={`${label} ${index + 1}`} onChange={(event) => onChange(links.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} placeholder="Adaugă link (ex: https://exemplu.ro)" type="url" value={link} />{links.length > 1 && <button aria-label="Șterge linkul" onClick={() => onChange(links.filter((_, itemIndex) => itemIndex !== index))} type="button"><Trash2 size={15} /></button>}</div>)}<button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#ddd9d3] bg-white px-4 text-xs font-bold disabled:opacity-45" disabled={links.length >= 4} onClick={() => onChange([...links, ""])} type="button"><Plus size={16} />Adaugă alt link</button></div></Question>;
}

function Textarea({ maxLength, placeholder, registration }: { maxLength?: number; placeholder: string; registration: ReturnType<UseFormRegister<LeadFormData>> }) {
  return <textarea className="min-h-[105px] w-full resize-y rounded-md border border-[#dcd9d4] bg-white/80 px-4 py-3 text-[0.82rem] text-[#15181e] outline-none transition focus:border-[#1584ed] focus:shadow-[0_0_0_3px_rgba(21,132,237,0.09)]" maxLength={maxLength} placeholder={placeholder} {...registration} />;
}

function TextField({ error, label, optional, placeholder, registration, type = "text" }: { error?: string; label: string; optional?: boolean; placeholder: string; registration: ReturnType<UseFormRegister<LeadFormData>>; type?: string }) {
  return <label className="grid gap-2"><span className="text-[0.9rem] font-bold text-[#15181e]">{label}{optional && <small className="font-normal text-[#73757b]"> (opțional)</small>}</span><input className="min-h-[45px] w-full rounded-md border border-[#dcd9d4] bg-white/80 px-3.5 text-[0.82rem] text-[#15181e] outline-none transition focus:border-[#1584ed] focus:shadow-[0_0_0_3px_rgba(21,132,237,0.09)]" placeholder={placeholder} type={type} {...registration} />{error && <ErrorText>{error}</ErrorText>}</label>;
}

function UploadCard({ file, onRemove }: { file: UploadPreview; onRemove: () => void }) {
  return <div className="relative grid min-w-0 grid-rows-[90px_auto] overflow-hidden rounded-[7px] border border-[#ddd9d3] bg-white">{file.url ? <UploadedImagePreview name={file.name} url={file.url} /> : <FileText className="place-self-center" size={38} />}<span className="min-w-0 p-3"><strong className="block truncate text-[0.68rem]">{file.name}</strong><small className="mt-1 block truncate text-[0.64rem] text-[#787a80]">{file.size}</small></span><button className="absolute bottom-1.5 right-1.5 p-1 text-[#555]" aria-label={`Șterge ${file.name}`} onClick={onRemove} type="button"><Trash2 size={15} /></button></div>;
}

function ErrorText({ children }: { children?: React.ReactNode }) { return children ? <p className="mt-1.5 text-[0.7rem] font-semibold text-[#d64228]">{children}</p> : null; }
function UploadedImagePreview({ name, url }: { name: string; url: string }) {
  // Blob URLs are local previews and cannot be handled by the Next.js image optimizer.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="h-[90px] w-full object-cover" alt={`Previzualizare ${name}`} src={url} />;
}
function formatFileSize(bytes: number) { return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`; }
