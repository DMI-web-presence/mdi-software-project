import Image from "next/image";

const processSteps = [
  {
    number: "01",
    title: "Intelegem ideea",
    description: "Pornim de la mesajul tau, brief sau call si clarificam ce conteaza cu adevarat.",
  },
  {
    number: "02",
    title: "Punem proiectul in ordine",
    description: "Stabilim scope-ul, paginile, functionalitatile si prioritatile reale.",
  },
  {
    number: "03",
    title: "Stabilim directia",
    description: "Alegem structura, UX-ul, continutul si directia vizuala potrivita.",
  },
  {
    number: "04",
    title: "Construim produsul",
    description: "Facem design, development, integrari si testare pana cand totul e solid.",
  },
  {
    number: "05",
    title: "Lansam fara improvizatii",
    description: "Verificam formularele, viteza, SEO-ul si publicam versiunea finala.",
  },
  {
    number: "06",
    title: "Ramanem alaturi de proiect",
    description: "Continuam cu suport, update-uri, imbunatatiri si pasii urmatori.",
  },
];

export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="process-section" id="process">
      <div className="relative z-[1] mx-auto w-[min(1240px,calc(100%-32px))] px-8 py-[5.5rem] pb-[4.75rem] max-md:px-4 max-md:py-[4.5rem] max-md:pb-[3.5rem]">
        <header className="scroll-reveal relative z-[2] max-w-[48rem]" data-reveal="left">
          <p className="section-kicker text-signal">Procesul nostru</p>
          <h2
            className="mt-[1.7rem] text-[4.4rem] font-black leading-[1.04] tracking-[0] text-white [text-wrap:balance] max-md:mt-6 max-md:text-[2.65rem] max-md:leading-[1.05]"
            id="process-title"
          >
            <span className="block">De la primul contact</span>
            <span className="block">
              la software real<span>.</span>
            </span>
          </h2>
          <p className="mt-[1.15rem] text-[1.18rem] font-medium leading-[1.55] text-white/80 max-md:text-base">
            <span className="block">Un traseu clar si colaborativ, de la idee si scope</span>
            <span className="block">la lansare, suport si crestere.</span>
          </p>
        </header>

        <div
          aria-label="Procesul de dezvoltare software, deruleaza orizontal pentru a vedea fiecare pas"
          className="process-flow-viewport"
          role="region"
          tabIndex={0}
        >
          <div className="process-flow">
            <div aria-hidden="true" className="process-flow__beam" />

            <div className="process-origin scroll-reveal" data-reveal="left">
              <Image
                alt=""
                aria-hidden="true"
                className="process-origin__image"
                height={941}
                sizes="220px"
                src="/images/process-idea-core.png"
                width={1672}
              />
              <p>Ideea ta</p>
            </div>

            {processSteps.map((step, index) => (
              <article
                className={`process-card scroll-reveal ${index % 3 === 1 ? "reveal-delay-1" : index % 3 === 2 ? "reveal-delay-2" : ""}`}
                data-reveal="scale"
                key={step.number}
              >
                <div aria-hidden="true" className="process-card__number">
                  {step.number}
                </div>
                <h3>{step.title}</h3>
                <span aria-hidden="true" className="process-card__divider" />
                <p>{step.description}</p>
              </article>
            ))}

            <div className="process-result scroll-reveal" data-reveal="right">
              <Image
                alt=""
                aria-hidden="true"
                className="process-result__image"
                height={1307}
                sizes="230px"
                src="/images/process-software-cube.png"
                width={1203}
              />
              <p>Software real</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
