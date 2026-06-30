import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson } from "@/data/titus/lessons";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;
  const lesson = getLesson(lessonSlug);

  if (!lesson) {
    notFound();
  }

  return (
    <main className="page-shell lesson-shell">
      <section className="lex-stamp">
        <div className="lex-stamp-main">
          <div className="lex-stamp-code">
            Ecology · Lesson {lesson.lessonNumber} · {lesson.strongId}
          </div>
          <div className="lex-stamp-word">
            {lesson.originalWord} / {lesson.transliteration}
          </div>
          <div className="lex-stamp-meta">
            {lesson.language} · {lesson.field} · Status: {lesson.status}
          </div>
        </div>
        <div className="travels">
          {lesson.travelsWith.map((item) => (
            <span className="pill" key={item}>{item}</span>
          ))}
        </div>
      </section>

      <div className="drawer-stack">
        <details className="drawer" open>
          <summary>1 · Canon Reading</summary>
          <div className="drawer-body">
            <p>
              Read the passage chain before receiving the Function Reading.
              The Bible text is the floor under the lesson.
            </p>
            {lesson.canonReading.map((passage) => (
              <article className="scripture-card" key={passage.ref}>
                <div className="scripture-ref">{passage.ref}</div>
                <p>{passage.text}</p>
                <p><strong>Notice:</strong> {passage.notice}</p>
              </article>
            ))}
          </div>
        </details>

        {lesson.drawers.map((drawer) => (
          <details className="drawer" key={drawer.code}>
            <summary>{drawer.heading}</summary>
            <div className="drawer-body">
              {drawer.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </details>
        ))}
      </div>

      <nav className="footer-nav">
        <Link className="small-link" href={`/courses/${lesson.courseSlug}`}>
          ← Return to Ecology
        </Link>
        <Link className="small-link" href="/">
          Course catalogue
        </Link>
      </nav>
    </main>
  );
}
