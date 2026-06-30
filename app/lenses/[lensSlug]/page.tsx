import Link from "next/link";
import { notFound } from "next/navigation";
import PublicNodeMetaCard from "@/components/titus/PublicNodeMetaCard";
import { getReturnHref, getReturnLabel } from "@/lib/titus/return-links";
import { getFunctionLens } from "@/data/titus/function-lenses";

export default async function FunctionLensPage({
  params,
  searchParams,
}: {
  params: Promise<{ lensSlug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { lensSlug } = await params;
  const { from } = await searchParams;
  const lens = getFunctionLens(lensSlug);
  const returnHref = getReturnHref(from, "/lessons/h0776");
  const returnLabel = getReturnLabel(from);

  if (!lens) {
    notFound();
  }

  return (
    <main className="page-shell lesson-shell">
      <Link className="small-link" href={returnHref}>
        {returnLabel}
      </Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">Function Lens</div>
        <h1>{lens.title}</h1>
        <p className="lede">
          {lens.subtitle}
          <br />
          Status: {lens.status}
        </p>
      </section>

      <section className="card pattern-section">
        <h2>Function Reading</h2>
        {lens.functionReading.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="card pattern-section">
        <h2>What this lens allows to stay</h2>
        <ul className="pattern-list">
          {lens.whatThisLensAllows.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>What this lens does not allow</h2>
        <ul className="pattern-list">
          {lens.whatThisLensDoesNotAllow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>Still must account for</h2>
        <ul className="pattern-list">
          {lens.stillMustAccountFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>Anchor lessons</h2>
        <div className="related-links">
          {lens.anchorLessons.map((lesson) => (
            <Link className="pill related-pill" href={lesson.href} key={lesson.label}>
              {lesson.label}
            </Link>
          ))}
        </div>
      </section>

      <PublicNodeMetaCard meta={lens.publicNodeMeta} />

      <nav className="footer-nav">
        <Link className="small-link" href={returnHref}>
          {returnLabel}
        </Link>
        <Link className="small-link" href="/">
          Course catalogue
        </Link>
      </nav>
    </main>
  );
}
