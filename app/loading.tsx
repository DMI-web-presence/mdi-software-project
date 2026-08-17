import Image from "next/image";

export default function Loading() {
  return (
    <main className="global-route-loading" aria-busy="true" aria-label="Se incarca pagina">
      <div className="global-route-loading-bar" aria-hidden="true" />
      <div className="global-route-loading-card">
        <div className="global-route-loading-logo">
          <Image src="/images/mdi-logo-cropped.png" alt="" width={118} height={72} priority />
        </div>
        <p>Se incarca...</p>
      </div>
    </main>
  );
}
