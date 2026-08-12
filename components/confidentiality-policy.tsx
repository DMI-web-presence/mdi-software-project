import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Info, Rocket } from "lucide-react";
import { PolicyScrollSpy } from "@/components/policy-scroll-spy";

const policySections = [
  {
    title: "Cine suntem",
    body: [
      "MDI Software este operatorul datelor tale cu caracter personal în sensul Regulamentului (UE) 2016/679 (GDPR). Dezvoltăm servicii digitale personalizate: website-uri de prezentare, aplicații web, integrări, mentenanță și consultanță tehnică.",
      "Pentru exercitarea drepturilor sau întrebări legate de datele personale, ne poți contacta la contact@mdi-software.ro.",
    ],
  },
  {
    title: "Ce date colectăm",
    body: [
      "Colectăm doar datele necesare pentru a răspunde solicitărilor, pentru a pregăti oferte și pentru a furniza serviciile acceptate. Acestea pot include nume, adresă de e-mail, număr de telefon, numele business-ului, domeniul de activitate, informații despre proiect, buget estimativ, preferințe de design, cerințe tehnice și mesajele trimise prin formular.",
      "Putem colecta și date tehnice limitate, cum ar fi adresa IP, tipul browserului, dispozitivul sau paginile vizitate, dacă sunt folosite loguri tehnice sau instrumente de analytics.",
    ],
    note: "Nu colectăm în mod intenționat date speciale, precum date despre sănătate, convingeri religioase sau opinii politice. Dacă ne trimiți astfel de date fără solicitarea noastră, te rugăm să nu o faci.",
  },
  {
    title: "Cum folosim datele",
    body: [
      "Folosim datele pentru a răspunde cererilor, pentru a analiza brief-ul, pentru a clarifica serviciile solicitate, scope-ul, prețul, durata de execuție și livrabilele, pentru a pregăti oferte comerciale și pentru a presta serviciile acceptate.",
      "Datele pot fi folosite și pentru facturare, suport, mentenanță după lansare, securitatea website-ului, prevenirea abuzurilor și îmbunătățirea formularelor.",
    ],
    note: "Pentru comunicări de marketing direct, vom folosi datele doar dacă există consimțământ separat, pe care îl poți retrage oricând.",
  },
  {
    title: "Temeiul legal",
    body: [
      "Prelucrarea se poate baza pe demersuri precontractuale atunci când ceri o ofertă, pe executarea unui contract după acceptarea serviciilor, pe obligații legale pentru documente fiscale și contabile, pe interes legitim pentru securitate și îmbunătățirea serviciilor sau pe consimțământ pentru marketing și cookies neesențiale.",
    ],
  },
  {
    title: "Servicii, oferte și plăți",
    body: [
      "Website-ul MDI Software prezintă și vinde servicii digitale, nu produse fizice. Solicitările trimise prin formular pot fi folosite pentru pregătirea unei oferte, pentru organizarea proiectului și pentru livrarea serviciilor acceptate.",
      "Pentru moment, website-ul nu include plată online cu cardul. Nu colectăm, nu stocăm și nu procesăm date de card prin website. Dacă plata online va fi adăugată ulterior, politica va fi actualizată înainte de activarea serviciului.",
    ],
  },
  {
    title: "Cât timp păstrăm datele",
    body: [
      "Solicitările trimise prin formular pot fi păstrate maximum 12 luni de la ultima interacțiune. Lead-urile administrate prin Brevo pot fi păstrate până la retragerea consimțământului sau maximum 24 luni fără interacțiune.",
      "Datele de proiect pentru servicii acceptate sunt păstrate pe durata colaborării și ulterior cât este necesar pentru suport, mentenanță, apărarea unor drepturi sau respectarea obligațiilor legale. Datele fiscale se păstrează conform termenelor legale aplicabile.",
    ],
  },
  {
    title: "Cui putem transmite datele",
    body: [
      "Datele pot fi accesate sau prelucrate prin furnizori de hosting, Brevo, servicii de e-mail, instrumente de analytics, instrumente de management proiect sau documente, consultanți contabili/juridici ori autorități publice, dacă legea cere acest lucru.",
      "Nu vindem datele personale către terți și nu transmitem date de card prin website, deoarece plata online cu cardul nu este activă.",
    ],
  },
  {
    title: "Drepturile tale",
    body: [
      "Ai dreptul de informare, acces, rectificare, ștergere, restricționare, portabilitate, opoziție, retragere a consimțământului și dreptul de a nu fi supus unei decizii bazate exclusiv pe prelucrare automată, acolo unde aceste drepturi se aplică.",
      "Pentru exercitarea drepturilor, ne poți contacta la contact@mdi-software.ro. Ai și dreptul de a depune plângere la ANSPDCP.",
    ],
  },
  {
    title: "Cookie-uri",
    body: [
      "Website-ul poate folosi cookies strict necesare pentru funcționare, securitate și formulare. Cookies de analiză sau marketing vor fi folosite doar dacă îți exprimi acordul, acolo unde legea cere acest lucru.",
    ],
  },
  {
    title: "Securitatea datelor",
    body: [
      "Folosim măsuri rezonabile pentru protecția datelor: conexiune securizată HTTPS, acces limitat, conturi protejate, actualizări tehnice, verificări ale formularelor și păstrarea datelor doar cât este necesar.",
    ],
  },
  {
    title: "Contact și ANSPDCP",
    body: [
      "Pentru întrebări ne poți scrie la contact@mdi-software.ro. Pentru plângeri, te poți adresa Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal, Bd. G-ral Gheorghe Magheru nr. 28-30, Sector 1, București, e-mail anspdcp@dataprotection.ro.",
    ],
  },
];

export function ConfidentialityPolicy() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#071022]">
      <PolicyHeader />
      <PolicyHero />
      <section className="relative bg-[#fbfaf7] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(228,93,54,0.08),transparent_24rem),radial-gradient(circle_at_82%_20%,rgba(0,119,255,0.08),transparent_28rem)]" />
        <div className="section-shell relative grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)]">
          <PolicyScrollSpy sections={policySections.map((section) => section.title)} />

          <div className="mx-auto w-full max-w-4xl">
            {policySections.map((section, index) => (
              <article
                className="grid gap-6 border-b border-[#d7d4cc] py-8 first:pt-0 last:border-b-0 md:grid-cols-[4.25rem_minmax(0,1fr)]"
                id={`section-${index + 1}`}
                key={section.title}
              >
                <p className="text-5xl font-medium leading-none text-[#071022] md:text-right">{index + 1}.</p>
                <div>
                  <h2 className="text-2xl font-black leading-tight text-[#071022] sm:text-3xl">{section.title}</h2>
                  <div className="mt-5 grid gap-4 text-base font-medium leading-8 text-[#293244]/86">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.note && (
                    <div className="mt-6 flex gap-4 rounded-lg border border-[#b9d9f5] bg-[#eaf5ff] px-5 py-4 text-sm font-medium leading-6 text-[#1f3a58]">
                      <Info className="mt-0.5 shrink-0 text-[#2489df]" size={20} aria-hidden="true" />
                      <p>{section.note}</p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function PolicyHeader() {
  return (
    <header className="bg-[#fbfaf7]">
      <div className="section-shell flex items-center justify-between py-4">
        <Link className="focus-ring inline-flex items-center" href="/" aria-label="MDI Software">
          <Image
            alt="MDI Software"
            className="h-12 w-auto object-contain"
            height={558}
            priority
            src="/images/mdi-logo-cropped.png"
            width={939}
          />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-bold text-[#1c2430]/82 md:flex">
          <Link className="transition hover:text-signal" href="/#services">Servicii</Link>
          <Link className="transition hover:text-signal" href="/#pricing">Prețuri</Link>
          <Link className="transition hover:text-signal" href="/#projects">Proiecte</Link>
          <Link className="transition hover:text-signal" href="/#experience">Experiență</Link>
        </nav>
        <Link
          className="focus-ring inline-flex items-center gap-2 rounded-md bg-[#111316] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#253045]"
          href="/brief"
        >
          Începe
          <Rocket size={16} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}

function PolicyHero() {
  return (
    <section className="policy-hero relative isolate overflow-hidden py-20 text-white sm:py-24 lg:py-28">
      <div className="project-globe pointer-events-none absolute right-[-10rem] top-[-8rem] -z-10 h-[720px] w-[720px] opacity-90" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_40%,rgba(0,131,255,0.26),transparent_32rem),radial-gradient(circle_at_18%_24%,rgba(12,58,116,0.32),transparent_28rem),linear-gradient(180deg,#030b17_0%,#020815_100%)]" />
      <div className="section-shell relative">
        <p className="text-sm font-black uppercase tracking-[0.32em] text-signal">Legal</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
          Politica de
          <br />
          confidențialitate
        </h1>
        <p className="mt-6 max-w-xl text-xl font-medium leading-8 text-white/72">
          Transparență despre datele pe care le colectăm, de ce le folosim și ce drepturi ai.
        </p>
        <p className="mt-10 inline-flex items-center gap-3 text-base font-bold text-white/90">
          <CalendarDays className="text-signal" size={22} aria-hidden="true" />
          Ultima actualizare: 12 august 2026
        </p>
      </div>
    </section>
  );
}
