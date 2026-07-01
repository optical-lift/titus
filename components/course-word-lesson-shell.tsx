import Link from "next/link";
import type { CourseWordLessonShell } from "@/data/titus/course-word-lessons";

type CourseWordLessonShellViewProps = {
  shell: CourseWordLessonShell;
};

export function CourseWordLessonShellView({
  shell,
}: CourseWordLessonShellViewProps) {
  const identityRows = [
    ["Course", shell.course.title],
    ["Lesson", `${shell.lessonNumber} · ${shell.lessonKind}`],
    ["Method", shell.methodLabel],
    ["Field", shell.languageLabel],
    ["Strong’s ID", shell.term.strongId],
    ["Surface", shell.term.surface],
    ["Transliteration", shell.term.transliteration],
    ["Gloss", shell.term.gloss],
  ];

  return (
    <main className="course-word-lesson">
      <Link className="course-word-lesson__back" href={`/courses/${shell.course.slug}`}>
        ← Return to current course
      </Link>

      <section className="course-word-lesson__hero" aria-labelledby="lesson-title">
        <p className="course-word-lesson__eyebrow">
          Lesson {shell.lessonNumber} · {shell.lessonKind}
        </p>

        <h1 id="lesson-title">
          {shell.term.strongId} — {shell.term.surface}
        </h1>

        <p className="course-word-lesson__subtitle">
          {shell.term.transliteration}
        </p>

        <p className="course-word-lesson__description">
          {shell.term.gloss} · {shell.languageLabel} anchor for{" "}
          {shell.course.title}
        </p>
      </section>

      <section className="course-word-lesson__drawer-stack" aria-label="Lesson drawers">
        <details className="drawer course-word-drawer" open>
          <summary>Word Identity</summary>
          <div className="drawer-body">
            <div className="course-word-lesson__identity-grid">
              {identityRows.map(([label, value]) => (
                <div className="course-word-lesson__identity-row" key={label}>
                  <span>{label}</span>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </details>

        <details className="drawer course-word-drawer" open>
          <summary>Course Position</summary>
          <div className="drawer-body">
            <p className="course-word-lesson__note">{shell.positionNote}</p>
          </div>
        </details>

        <details className="drawer course-word-drawer" open>
          <summary>Packet Terms in View</summary>
          <div className="drawer-body">
            <div className="course-word-lesson__term-list">
              {shell.termsInView.map((term) => (
                <span className="course-word-lesson__term" key={term.strongId}>
                  <strong>{term.strongId}</strong>
                  <em>{term.transliteration}</em>
                  <small>{term.gloss}</small>
                </span>
              ))}
            </div>
          </div>
        </details>

        <details className="drawer course-word-drawer">
          <summary>Next Movement</summary>
          <div className="drawer-body">
            <p className="course-word-lesson__note">
              The next movement follows the canon chain after the word field is
              prepared.
            </p>
          </div>
        </details>
      </section>
    </main>
  );
}
