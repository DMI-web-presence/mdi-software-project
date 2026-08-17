export type PortfolioProject = {
  challenge: string;
  copy: string;
  industry: string;
  outcome: string;
  previewEnabled?: boolean;
  previewImage?: string;
  slug: string;
  solution: string;
  stack: string;
  stackIcon?: "nextjs" | "react";
  title: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "imobiliare",
    title: "Flux de prezentare imobiliară",
    copy: "Structură de website pentru proprietăți, cu progres de proiect, detalii pentru apartamente.",
    stack: "Next.js, UI responsive, arhitectură de conținut",
    industry: "Imobiliare",
    challenge:
      "Proiectele imobiliare au nevoie de structură clară, diferențiere între tipuri de apartamente și o prezentare care să construiască încredere încă din primele secunde.",
    solution:
      "Am gândit un flux de prezentare cu accent pe structură, progres vizual, informații ușor de parcurs și navigare rapidă între secțiunile importante ale proiectului.",
    outcome:
      "Rezultatul este o pagină care explică proiectul mai bine, reduce confuzia și pregătește vizitatorul pentru contact sau cerere de ofertă.",
  },
  {
    slug: "margele-net",
    title: "Ecommerce pentru pasionații de handmade",
    copy:
      "Exemplu de structură pentru un magazin online cu accent pe categorii clare, filtrare utilă și navigare simplă pentru un catalog extins.",
    previewImage: "/images/project-margele-homepage.png",
    previewEnabled: false,
    stack: "Ecommerce, catalog produse și filtrare",
    stackIcon: "nextjs",
    industry: "Ecommerce",
    challenge:
      "Catalogul era mare, cu multe produse și variațiuni, iar experiența de navigare trebuia să rămână clară pentru utilizatori care caută rapid materiale, culori și accesorii.",
    solution:
      "Am construit homepage, categorii și logică de filtrare orientate spre descoperire rapidă, cu accent pe produse, căutare și pași de cumpărare mai simpli.",
    outcome:
      "Magazinul oferă acum o experiență mai clară de explorare și cumpărare, chiar și într-un catalog extins cu peste 700 de produse și mii de variațiuni.",
  },
  {
    slug: "workflow-intern",
    title: "Instrumente pentru workflow intern",
    copy: "Tool-uri de administrare și automatizări care reduc munca operațională repetitivă.",
    stack: "Dashboard-uri, API-uri, integrări",
    industry: "Operațiuni interne",
    challenge:
      "Procesele interne repetitive consumă timp, creează erori și fac dificilă urmărirea statusurilor atunci când sunt gestionate în prea multe locuri.",
    solution:
      "Am proiectat instrumente interne cu dashboard-uri, statusuri și integrare între fluxuri, astfel încât echipa să poată administra mai ușor datele și acțiunile recurente.",
    outcome:
      "Rezultatul este mai mult control operațional, mai puțină muncă manuală și o bază clară pentru automatizări și extinderi viitoare.",
  },
];

export function getPortfolioProjectHref(project: Pick<PortfolioProject, "slug">) {
  return `/portofoliu#${project.slug}` as const;
}
