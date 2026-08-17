import { CalendarDays, Info } from "lucide-react";
import { PolicyScrollSpy } from "@/components/policy-scroll-spy";
import { SiteHeader } from "@/components/site-header";

const termsSections = [
  {
    title: "Cine suntem",
    body: [
      "MDI Software furnizează servicii digitale personalizate: website-uri de prezentare, aplicații web, integrări, formulare ghidate, mentenanță și consultanță tehnică.",
      "Datele complete de identificare ale furnizorului vor fi afișate pe această pagină după confirmarea formei legale. Pentru contact ne poți scrie la contact@mdi-software.ro.",
    ],
    note: "Legea comerțului electronic cere afișarea informațiilor de identificare și contact într-o formă clară, vizibilă, permanentă și gratuită.",
  },
  {
    title: "Acceptarea termenilor",
    body: [
      "Prin accesarea website-ului sau trimiterea unui formular, confirmi că ai citit acești termeni. Trimiterea unei solicitări nu reprezintă automat încheierea unui contract și nu obligă MDI Software să accepte proiectul.",
      "Colaborarea începe doar după analizarea cerințelor, transmiterea unei oferte și acceptarea explicită a acesteia.",
    ],
  },
  {
    title: "Serviciile oferite",
    body: [
      "Serviciile MDI Software sunt servicii digitale personalizate. Acestea pot include website-uri de prezentare, aplicații web custom, formulare ghidate, integrare Brevo, integrări API, optimizare SEO tehnică, mentenanță, suport și consultanță.",
      "Conținutul, funcționalitățile, termenul de execuție și livrabilele exacte sunt stabilite prin ofertă, contract sau comunicare scrisă acceptată de ambele părți.",
    ],
  },
  {
    title: "Cum începe colaborarea",
    body: [
      "Clientul trimite formularul de brief/contact, MDI Software analizează cerințele, se clarifică scope-ul, materialele, termenul și bugetul, apoi se transmite o ofertă.",
      "Proiectul începe după acceptarea ofertei și, dacă este cazul, după achitarea avansului stabilit.",
    ],
  },
  {
    title: "Oferte, prețuri și pachete",
    body: [
      "Prețurile afișate pe website sunt puncte de pornire pentru pachete uzuale. Oferta finală se stabilește după analizarea cerințelor și poate varia în funcție de complexitate, integrări, conținut, termen de execuție și modificări solicitate.",
      "TVA, moneda de facturare și condițiile exacte de plată vor fi clarificate în ofertă, în funcție de forma legală și regulile fiscale aplicabile.",
    ],
    note: "Prețurile afișate nu reprezintă ofertă finală automată pentru orice proiect. Proiectele custom se estimează după scope.",
  },
  {
    title: "Plăți și facturare",
    body: [
      "Pentru moment, website-ul nu include plată online cu cardul. Nu colectăm și nu procesăm date de card prin website.",
      "Plata serviciilor se stabilește separat, în baza ofertei acceptate și a facturii emise conform legislației aplicabile. Poate fi solicitat un avans înainte de începerea proiectului.",
    ],
    note: "Dacă plata online cu cardul va fi adăugată ulterior, termenii și politica de confidențialitate vor fi actualizate înainte de activarea serviciului.",
  },
  {
    title: "Obligațiile clientului",
    body: [
      "Clientul este responsabil să transmită informații corecte, materiale, texte, imagini, logo-uri și accesuri necesare, precum și să confirme că are dreptul să folosească materialele trimise.",
      "Întârzierile în transmiterea materialelor, feedback-ului sau accesurilor pot duce la decalarea termenului de livrare. Clientul nu trebuie să solicite funcționalități ilegale, abuzive sau care încalcă drepturile altor persoane.",
    ],
  },
  {
    title: "Procesul de lucru",
    body: [
      "Procesul poate include discovery, structurare cerințe, ofertare, design, dezvoltare, integrare servicii externe, testare, feedback, revizii, lansare și suport.",
      "Procesul exact poate varia în funcție de proiect. Pentru proiectele custom, etapele și livrabilele sunt stabilite în ofertă sau în comunicarea scrisă acceptată de părți.",
    ],
  },
  {
    title: "Revizii și modificări",
    body: [
      "Reviziile incluse se aplică în limita scope-ului agreat. Funcționalitățile noi, schimbările majore de direcție sau solicitările care depășesc oferta inițială pot fi estimate și facturate separat.",
      "Fiecare pachet poate avea un număr diferit de revizii. Modificările majore sau cerințele noi pot prelungi termenul de livrare.",
    ],
  },
  {
    title: "Termene de livrare",
    body: [
      "Termenele de livrare comunicate sunt estimări realiste, dar pot fi ajustate dacă apar modificări de scope, întârzieri în feedback, probleme tehnice ale serviciilor externe sau lipsa materialelor necesare.",
      "MDI Software nu răspunde pentru întârzieri cauzate de terți, lipsa accesurilor, lipsa materialelor sau schimbări de cerințe apărute după acceptarea ofertei.",
    ],
  },
  {
    title: "Drepturi de autor",
    body: [
      "După plata integrală, clientul primește drepturile de utilizare asupra livrabilului final, în limitele stabilite prin ofertă. Codul generic, componentele reutilizabile, know-how-ul și metodologiile MDI Software rămân proprietatea MDI Software.",
      "Librăriile open-source, serviciile terțe, fonturile, imaginile și asset-urile licențiate rămân supuse licențelor și termenilor furnizorilor respectivi.",
    ],
  },
  {
    title: "Conținutul clientului",
    body: [
      "Clientul este responsabil pentru conținutul transmis și pentru dreptul de utilizare al acestuia: texte, imagini, logo-uri, prețuri, afirmații comerciale, politici legale și date de firmă.",
      "MDI Software poate refuza publicarea sau implementarea conținutului care pare ilegal, abuziv, discriminatoriu sau care poate încălca drepturile unor terți.",
    ],
  },
  {
    title: "Mentenanță și suport",
    body: [
      "Mentenanța este opțională și se contractează separat sau conform pachetului ales. Poate include verificări tehnice, mici modificări, suport, actualizări și monitorizare.",
      "Lucrările care depășesc orele sau activitățile incluse se estimează și se facturează separat. Mentenanța nu include costuri externe precum hosting, domeniu, Brevo, licențe, analytics sau servicii API, dacă nu se specifică altfel.",
    ],
  },
  {
    title: "Servicii externe",
    body: [
      "Unele proiecte pot depinde de servicii externe precum domeniu, hosting, Vercel, Supabase, Brevo, Cloudflare, Google Analytics, Search Console, e-mail, servicii API sau licențe.",
      "Aceste servicii au propriile costuri, termeni, disponibilitate și politici. MDI Software nu controlează funcționarea permanentă a serviciilor externe și nu răspunde pentru întreruperi sau modificări impuse de furnizorii acestora.",
    ],
  },
  {
    title: "Dreptul de retragere",
    body: [
      "Dacă ești consumator persoană fizică, poți beneficia de drepturile prevăzute de legislația privind contractele la distanță.",
      "În cazul serviciilor începute la cererea ta expresă sau al livrabilelor digitale personalizate, dreptul de retragere poate fi limitat conform legii. Detaliile aplicabile vor fi menționate în ofertă sau contract, acolo unde este cazul.",
    ],
  },
  {
    title: "Conformitatea serviciilor digitale",
    body: [
      "Pentru serviciile digitale furnizate consumatorilor, MDI Software urmărește livrarea conform scope-ului agreat.",
      "Eventualele neconformități trebuie comunicate în scris, cu descriere clară, pentru a putea fi analizate și remediate în condițiile aplicabile.",
    ],
  },
  {
    title: "Limitarea răspunderii",
    body: [
      "MDI Software depune eforturi rezonabile pentru livrarea serviciilor agreate, dar nu garantează rezultate comerciale specifice, poziții SEO exacte, un anumit volum de lead-uri sau funcționarea neîntreruptă a serviciilor externe.",
      "Nicio prevedere din acești termeni nu limitează drepturile consumatorilor care nu pot fi excluse prin lege.",
    ],
  },
  {
    title: "Reclamații și litigii",
    body: [
      "Pentru reclamații, te rugăm să ne contactezi mai întâi la contact@mdi-software.ro. Vom încerca soluționarea amiabilă.",
      "Dacă ești consumator, poți apela la mecanismele legale de protecție a consumatorilor, inclusiv ANPC/SAL, acolo unde acestea sunt aplicabile. Legea aplicabilă este legea română.",
    ],
  },
  {
    title: "Încetarea colaborării",
    body: [
      "În cazul încetării colaborării, lucrările efectuate până la acel moment pot fi facturate conform stadiului proiectului și condițiilor acceptate.",
      "Drepturile asupra livrabilelor finale se transferă conform ofertei doar după plata integrală, dacă nu s-a stabilit altfel în scris.",
    ],
  },
  {
    title: "Modificarea termenilor",
    body: [
      "MDI Software poate actualiza acești termeni atunci când se schimbă serviciile, procesul de lucru, obligațiile legale sau structura website-ului.",
      "Versiunea actualizată va fi publicată pe această pagină.",
    ],
  },
];

export function TermsPolicy() {
  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#071022]">
      <SiteHeader />
      <TermsHero />
      <section className="relative bg-[#fbfaf7] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(228,93,54,0.08),transparent_24rem),radial-gradient(circle_at_82%_20%,rgba(0,119,255,0.08),transparent_28rem)]" />
        <div className="section-shell relative grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,1fr)]">
          <PolicyScrollSpy sections={termsSections.map((section) => section.title)} />

          <div className="mx-auto w-full max-w-4xl">
            {termsSections.map((section, index) => (
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

function TermsHero() {
  return (
    <section className="policy-hero relative isolate overflow-hidden py-20 text-white sm:py-24 lg:py-28">
      <div className="project-globe pointer-events-none absolute right-[-10rem] top-[-8rem] -z-10 h-[720px] w-[720px] opacity-90" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_40%,rgba(0,131,255,0.26),transparent_32rem),radial-gradient(circle_at_18%_24%,rgba(12,58,116,0.32),transparent_28rem),linear-gradient(180deg,#030b17_0%,#020815_100%)]" />
      <div className="section-shell relative">
        <p className="text-sm font-black uppercase tracking-[0.32em] text-signal">Legal</p>
        <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
          Termeni și
          <br />
          condiții
        </h1>
        <p className="mt-6 max-w-xl text-xl font-medium leading-8 text-white/72">
          Regulile clare pentru solicitări, oferte, colaborări, plăți și livrarea serviciilor digitale.
        </p>
        <p className="mt-10 inline-flex items-center gap-3 text-base font-bold text-white/90">
          <CalendarDays className="text-signal" size={22} aria-hidden="true" />
          Ultima actualizare: 12 august 2026
        </p>
      </div>
    </section>
  );
}
