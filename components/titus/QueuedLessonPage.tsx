import Link from "next/link";
import PublicNodeMetaCard from "@/components/titus/PublicNodeMetaCard";
import type { QueuedLesson } from "@/data/titus/queued-lessons";

export default function QueuedLessonPage({
  lesson,
  returnHref,
  returnLabel,
}: {
  lesson: QueuedLesson;
  returnHref: string;
  returnLabel: string;
}) {
  return (
    <main className="page-shell lesson-shell">
      <Link className="small-link" href={returnHref}>
        {returnLabel}
      </Link>

      <section className="lesson-hero" style={{ marginTop: 18 }}>
        <div className="kicker">Queued Word Lesson</div>
        <h1>{lesson.title}</h1>
        <p className="lede">
          {lesson.subtitle}
          <br />
          Status: {lesson.status}
        </p>
      </section>

      <section className="card course-intro-card">
        <h2>Lesson queued</h2>
        <p>
          This Strong’s-ID route has been reserved so the word can be attached
          to courses, searches, chains, patterns, and traditions before the full
          guided lesson is written.
        </p>
        <p>
          When this queued word becomes a published Titus lesson, this same URL
          will become the full guided drawer path.
        </p>
      </section>

      <section className="card course-intro-card">
        <h2>Current searchable identity</h2>
        <div className="queued-identity-grid">
          <div>
            <span className="kicker">Original Word</span>
            <p>{lesson.originalWord}</p>
          </div>
          <div>
            <span className="kicker">Transliteration</span>
            <p>{lesson.transliteration}</p>
          </div>
          <div>
            <span className="kicker">Primary Terms</span>
            <p>{lesson.primaryTerms.join(", ")}</p>
          </div>
          <div>
            <span className="kicker">Keywords</span>
            <p>{lesson.keywords.join(", ")}</p>
          </div>
        </div>
      </section>

      <PublicNodeMetaCard meta={lesson.publicNodeMeta} />

      <nav className="footer-nav">
        <Link className="small-link" href={returnHref}>
          {returnLabel}
        </Link>
        <Link className="small-link" href="/registry">
          Node Registry
        </Link>
      </nav>
    </main>
  );
}
