import Link from "next/link";
import { notFound } from "next/navigation";
import { getPatternDebrief } from "@/data/titus/pattern-debriefs";

export default async function PatternDebriefPage({
  params,
  searchParams,
}: {
  params: Promise<{ patternSlug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { patternSlug } = await params;
  const { from } = await searchParams;
  const pattern = getPatternDebrief(patternSlug);
  const returnHref = from || "/lessons/h0776";

  if (!pattern) {
    notFound();
  }

  return (
    <main className="page-shell lesson-shell">
      <Link className="small-link" href={returnHref}>
        ← Return to current lesson
      </Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">Pattern Debrief</div>
        <h1>{pattern.title}</h1>
        <p className="lede">
          Status: {pattern.status.replaceAll("_", " ")}
          <br />
          Appears in: {pattern.appearsIn.join(", ")}
        </p>
      </section>

      <section className="card pattern-section">
        <h2>Why this pattern matters</h2>
        {pattern.whyThisPatternMatters.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="card pattern-section">
        <h2>What this pattern prevents</h2>
        <ul className="pattern-list">
          {pattern.whatThisPatternPrevents.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>Related lessons</h2>
        <div className="related-links">
          {pattern.relatedLessons.map((lesson) => (
            <Link className="pill related-pill" href={lesson.href} key={lesson.label}>
              {lesson.label}
            </Link>
          ))}
        </div>
      </section>

      <nav className="footer-nav">
        <Link className="small-link" href={returnHref}>
          ← Return to current lesson
        </Link>
        <Link className="small-link" href="/courses/ecology">
          Continue Ecology
        </Link>
      </nav>
    </main>
  );
}
