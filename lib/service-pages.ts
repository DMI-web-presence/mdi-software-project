export type ServicePageConfig = {
  description: string;
  faq: { answer: string; question: string }[];
  highlights: string[];
  href: `/${string}`;
  image: string;
  includes: string[];
  process: { copy: string; title: string }[];
  summary: string;
  title: string;
  useCases: string[];
};

export const servicePages: ServicePageConfig[] = [
  {
    href: "/website-de-prezentare",
    title: "Website de prezentare",
    summary: "Pagină dedicată pentru firme care vor un website clar, credibil și ușor de administrat.",
    description:
      "Construim website-uri de prezentare pentru servicii, branduri locale și business-uri care au nevoie de o imagine profesionistă, structură clară și formulare care aduc cereri relevante.",
    image: "/images/website_prezentare_1.png",
    highlights: ["website de prezentare", "site de prezentare custom", "creare website business"],
    useCases: [
      "Afaceri locale care au nevoie de o prezență online clară și credibilă.",
      "Servicii care vor mai multe cereri prin formular, telefon sau WhatsApp.",
      "Branduri care au nevoie de pagini de servicii, galerii, testimoniale și SEO de bază.",
    ],
    includes: [
      "Structură de pagini construită pe oferta ta reală.",
      "Design responsive, orientat spre claritate și conversie.",
      "Secțiuni pentru servicii, beneficii, întrebări frecvente și contact.",
      "Configurare domeniu, SSL, formulare și elemente SEO esențiale.",
    ],
    process: [
      {
        title: "Brief și context",
        copy: "Pornim de la serviciile tale, publicul vizat și obiectivul principal al website-ului.",
      },
      {
        title: "Structură și direcție",
        copy: "Stabilim paginile, secțiunile și mesajele care trebuie să fie clare din prima vizită.",
      },
      {
        title: "Design și dezvoltare",
        copy: "Construim interfața, conținutul vizual și comportamentul responsive pentru desktop și mobil.",
      },
      {
        title: "Lansare și optimizare",
        copy: "Verificăm formularele, indexarea, viteza și publicăm versiunea finală.",
      },
    ],
    faq: [
      {
        question: "Când este suficient un website de prezentare?",
        answer: "Atunci când principalul obiectiv este să explici oferta clar, să construiești încredere și să generezi cereri de contact.",
      },
      {
        question: "Pot să adaug pagini noi după lansare?",
        answer: "Da. Structura poate fi extinsă cu pagini noi, articole, studii de caz sau secțiuni suplimentare pe măsură ce business-ul crește.",
      },
    ],
  },
  {
    href: "/magazin-online",
    title: "Magazin online custom",
    summary: "Pagină dedicată pentru business-uri care vor catalog, plăți online și administrare clară.",
    description:
      "Construim magazine online custom pentru produse fizice sau digitale, cu structură de catalog, filtre, checkout clar și administrare gândită pentru operațiuni reale.",
    image: "/images/proffesional_price.png",
    highlights: ["magazin online custom", "creare magazin online", "ecommerce cu plăți online"],
    useCases: [
      "Magazine care au nevoie de un catalog clar și ușor de navigat.",
      "Business-uri care vor checkout simplu, plăți online și formulare de comandă clare.",
      "Echipe care au nevoie de administrare produse, reduceri, filtre și automatizări de bază.",
    ],
    includes: [
      "Structură pentru categorii, produse, filtre și pagini comerciale.",
      "Integrare pentru plăți online, livrare și notificări esențiale.",
      "Administrare produse, stoc, reduceri și conținut comercial.",
      "Bază SEO pentru pagini de categorie, produs și conținut informativ.",
    ],
    process: [
      {
        title: "Clarificăm catalogul",
        copy: "Începem cu tipurile de produse, modul de filtrare și pașii reali de cumpărare.",
      },
      {
        title: "Planificăm fluxul comercial",
        copy: "Stabilim ce trebuie să vadă clientul, ce trebuie să administrezi tu și ce integrări sunt necesare.",
      },
      {
        title: "Construim și conectăm",
        copy: "Implementăm paginile, checkout-ul, plățile, livrarea și logica de administrare.",
      },
      {
        title: "Testăm înainte de lansare",
        copy: "Verificăm produsele, plățile, emailurile și experiența completă pe mobil și desktop.",
      },
    ],
    faq: [
      {
        question: "Când aleg un magazin online custom în locul unei soluții standard?",
        answer: "Când ai nevoie de structură, logică de produse, integrare sau control mai bun decât oferă o platformă generică.",
      },
      {
        question: "Se poate porni cu un pachet mai simplu și extinde ulterior?",
        answer: "Da. Putem lansa cu un catalog clar și funcțiile esențiale, apoi adăuga automatizări, filtre sau integrări noi.",
      },
    ],
  },
  {
    href: "/aplicatii-web",
    title: "Aplicații web custom",
    summary: "Pagină dedicată pentru procese interne, dashboard-uri și fluxuri digitale construite pe nevoi reale.",
    description:
      "Construim aplicații web custom pentru administrare internă, portaluri, dashboard-uri și fluxuri care reduc munca repetitivă și aduc mai mult control asupra operațiunilor.",
    image: "/images/business_price.png",
    highlights: ["aplicații web custom", "dashboard business", "automatizări și integrări"],
    useCases: [
      "Echipe care lucrează cu fișiere, tabele și procese repetitive greu de urmărit.",
      "Business-uri care au nevoie de portaluri, dashboard-uri sau panouri admin personalizate.",
      "Fluxuri care cer integrări între formulare, CRM, email, plăți sau alte sisteme externe.",
    ],
    includes: [
      "Mapare de proces, roluri, permisiuni și logică operațională.",
      "Interfețe pentru administrare, statusuri, filtre și rapoarte utile.",
      "Integrare cu API-uri, formulare, emailuri și servicii externe.",
      "Bază tehnică pentru extindere, întreținere și optimizare ulterioară.",
    ],
    process: [
      {
        title: "Pornim de la workflow",
        copy: "Înțelegem pașii reali, blocajele, datele și oamenii implicați în proces.",
      },
      {
        title: "Definim scope-ul",
        copy: "Stabilim modulele, rolurile, interfețele și ce livrabile intră în prima versiune.",
      },
      {
        title: "Construim incremental",
        copy: "Dezvoltăm aplicația pe bucăți clare, astfel încât feedback-ul să apară devreme și util.",
      },
      {
        title: "Lansăm și iterăm",
        copy: "După lansare, continuăm cu îmbunătățiri, noi integrări și optimizare pe date reale.",
      },
    ],
    faq: [
      {
        question: "Când merită o aplicație web custom?",
        answer: "Atunci când procesele tale nu se potrivesc bine într-un tool generic sau când ai nevoie de logică specifică business-ului tău.",
      },
      {
        question: "Se poate începe cu o versiune simplă?",
        answer: "Da. De multe ori cea mai bună variantă este un MVP clar, lansat repede, pe care îl extindem în etape.",
      },
    ],
  },
];

export function getServicePage(href: string) {
  return servicePages.find((page) => page.href === href);
}
