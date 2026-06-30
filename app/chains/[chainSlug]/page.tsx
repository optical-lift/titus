import Link from "next/link";
import { notFound } from "next/navigation";
import PublicNodeMetaCard from "@/components/titus/PublicNodeMetaCard";
import { getCanonChain } from "@/data/titus/canon-chains";

export default async function CanonChainPage({
  params,
  searchParams,
}: {
  params: Promise<{ chainSlug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { chainSlug } = await params;
  const { from } = await searchParams;
  const chain = getCanonChain(chainSlug);
  const returnHref = from || "/lessons/h0776";

  if (!chain) {
    notFound();
  }

  return (
    <main className="page-shell lesson-shell">
      <Link className="small-link" href={returnHref}>
        ← Return to current lesson
      </Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">Canon Chain</div>
        <h1>{chain.title}</h1>
        <p className="lede">
          {chain.subtitle}
          <br />
          Status: {chain.status}
        </p>
      </section>

      <section className="card pattern-section">
        <h2>Chain Reading</h2>
        {chain.chainReading.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="canon-chain-timeline" aria-label="Canon chain passages">
        {chain.passages.map((passage, index) => (
          <article className="canon-chain-card" key={`${passage.ref}-${passage.title}`}>
            <div className="canon-chain-index">{index + 1}</div>
            <div>
              <div className="scripture-ref">{passage.ref}</div>
              <h2>{passage.title}</h2>
              <p className="language-focus">
                {passage.originalLanguageFocus} / {passage.transliteration}
              </p>
              <p>{passage.publicText}</p>
              <p>
                <strong>Function notice:</strong> {passage.functionNotice}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="card pattern-section">
        <h2>Unresolved pressure</h2>
        <ul className="pattern-list">
          {chain.unresolvedPressure.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>Anchor lessons</h2>
        <div className="related-links">
          {chain.anchorLessons.map((lesson) => (
            <Link className="pill related-pill" href={lesson.href} key={lesson.label}>
              {lesson.label}
            </Link>
          ))}
        </div>
      </section>

      <PublicNodeMetaCard meta={chain.publicNodeMeta} />

      <nav className="footer-nav">
        <Link className="small-link" href={returnHref}>
          ← Return to current lesson
        </Link>
        <Link className="small-link" href="/">
          Course catalogue
        </Link>
      </nav>
    </main>
  );
}
