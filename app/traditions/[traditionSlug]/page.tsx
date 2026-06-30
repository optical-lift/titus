import Link from "next/link";
import { notFound } from "next/navigation";
import PublicNodeMetaCard from "@/components/titus/PublicNodeMetaCard";
import { getTraditionNote } from "@/data/titus/tradition-notes";

export default async function TraditionNotePage({
  params,
  searchParams,
}: {
  params: Promise<{ traditionSlug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { traditionSlug } = await params;
  const { from } = await searchParams;
  const note = getTraditionNote(traditionSlug);
  const returnHref = from || "/lessons/h0776";

  if (!note) {
    notFound();
  }

  return (
    <main className="page-shell lesson-shell">
      <Link className="small-link" href={returnHref}>
        ← Return to current lesson
      </Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">Tradition Note</div>
        <h1>{note.title}</h1>
        <p className="lede">
          {note.subtitle}
          <br />
          Family: {note.traditionFamily}
          <br />
          Status: {note.status}
        </p>
      </section>

      <section className="card pattern-section">
        <h2>What this tradition preserves</h2>
        <ul className="pattern-list">
          {note.whatThisTraditionPreserves.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>Where it can flatten</h2>
        <ul className="pattern-list">
          {note.whereItCanFlatten.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>What gets to stay</h2>
        <ul className="pattern-list">
          {note.whatGetsToStay.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>What must still be accounted for</h2>
        <ul className="pattern-list">
          {note.whatMustStillBeAccountedFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>Anchor lessons</h2>
        <div className="related-links">
          {note.anchorLessons.map((lesson) => (
            <Link className="pill related-pill" href={lesson.href} key={lesson.label}>
              {lesson.label}
            </Link>
          ))}
        </div>
      </section>

      <PublicNodeMetaCard meta={note.publicNodeMeta} />

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
