import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import LessonDrawerStack from "@/components/titus/LessonDrawerStack";
import PublicNodeMetaCard from "@/components/titus/PublicNodeMetaCard";
import QueuedLessonPage from "@/components/titus/QueuedLessonPage";
import { CourseWordLessonShellView } from "@/components/course-word-lesson-shell";
import { getCourse } from "@/data/titus/courses";
import { getCourseWordLessonShell } from "@/data/titus/course-word-lessons";
import { getLessonAssembly } from "@/data/titus/lesson-assemblies";
import { getLesson } from "@/data/titus/lessons";
import { getQueuedLesson } from "@/data/titus/queued-lessons";
import { hydrateCanonReadingFromNoel } from "@/lib/noel/titus-canon-reading";
import { getNoelCoursePreviewLessonBySlug } from "@/lib/titus/noel-course-preview";
import {
  getReturnHref,
  getReturnLabel,
  getSafeReturnPath,
} from "@/lib/titus/return-links";

function getCourseSlugFromReturnPath(returnPath: string | null | undefined) {
  if (!returnPath) return null;

  const match = returnPath.match(/^\/courses\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default async function LessonPage({
  params,
  searchParams,
}: {
  params: Promise<{ lessonSlug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { lessonSlug } = await params;
  const { from } = await searchParams;

  const normalizedLessonSlug = lessonSlug.toLowerCase();
  const safeFrom = getSafeReturnPath(from);
  const returnHref = getReturnHref(safeFrom, "/");
  const returnLabel = getReturnLabel(safeFrom);
  const fromQuery = safeFrom ? `?from=${encodeURIComponent(safeFrom)}` : "";
  const noelCourseSlug = getCourseSlugFromReturnPath(safeFrom);

  const noelPreviewLesson = await getNoelCoursePreviewLessonBySlug(
    normalizedLessonSlug,
    noelCourseSlug
  );

  if (noelPreviewLesson) {
    if (normalizedLessonSlug !== lessonSlug) {
      redirect(`/lessons/${normalizedLessonSlug}${fromQuery}`);
    }

    const lesson = noelPreviewLesson.lesson;
    const word = lesson.word;
    const publishedReturnHref = safeFrom
      ? returnHref
      : `/courses/${noelPreviewLesson.courseSlug}`;
    const publishedReturnLabel = safeFrom
      ? returnLabel
      : `← Return to ${noelPreviewLesson.title}`;

    return (
      <main className="page-shell lesson-shell">
        <section className="lesson-study-frame">
          <section className="lex-stamp">
            <div className="lex-stamp-main">
              <div className="lex-stamp-code">
                {noelPreviewLesson.title} · Lesson {lesson.lessonNumber} ·{" "}
                {word.strongId}
              </div>
              <div className="lex-stamp-word">
                {word.originalWord} / {word.transliteration}
              </div>
              <div className="lex-stamp-meta">
                {word.language} · {lesson.lessonSubtitle} ·{" "}
                {noelPreviewLesson.previewStatus}
              </div>
            </div>

            <div className="travels">
              <span className="pill">{lesson.lessonStatus}</span>
              <span className="pill">{lesson.researchStatus}</span>
              <span className="pill">{word.entityType}</span>
            </div>
          </section>

          <section
            className="course-landing__section course-landing__packet-preview"
            aria-labelledby="word-identity"
          >
            <p className="course-landing__eyebrow" id="word-identity">
              Word Identity
            </p>

            <div className="course-landing__language-grid">
              <article>
                <h2>{lesson.lessonTitle}</h2>
                <div className="course-landing__term-list">
                  <span className="course-landing__term">
                    <strong>{word.strongId}</strong>
                    <em>{word.transliteration}</em>
                    <small>{word.entityLabel}</small>
                  </span>

                  <span className="course-landing__term">
                    <strong>{word.language}</strong>
                    <em>{word.originalWord}</em>
                    <small>{word.functionNote}</small>
                  </span>
                </div>
              </article>

              <article>
                <h2>Course Position</h2>
                <p>{lesson.whyThisSlotExists}</p>
                <p>{lesson.prerequisitesNote}</p>
              </article>
            </div>
          </section>

          <section
            className="course-landing__section"
            aria-labelledby="function-reading"
          >
            <p className="course-landing__eyebrow" id="function-reading">
              Function Reading
            </p>
            <div className="course-landing__material-grid">
              <article className="course-landing__material-card">
                <h2>{lesson.slotTitle}</h2>
                <p>{lesson.functionReading}</p>
              </article>

              <article className="course-landing__material-card">
                <h2>Public Seed</h2>
                <p>{lesson.publicSummary}</p>
                <p>{noelPreviewLesson.publicCaveat}</p>
              </article>
            </div>
          </section>

          {word.gloss ? (
            <section
              className="course-landing__section"
              aria-labelledby="lexical-gloss"
            >
              <p className="course-landing__eyebrow" id="lexical-gloss">
                Lexical Field
              </p>
              <p>{word.gloss}</p>
            </section>
          ) : null}

          {lesson.knownLimits.length ? (
            <section
              className="course-landing__section"
              aria-labelledby="known-limits"
            >
              <p className="course-landing__eyebrow" id="known-limits">
                Known Limits
              </p>
              <div className="course-landing__term-list">
                {lesson.knownLimits.map((limit) => (
                  <span className="course-landing__term" key={limit}>
                    <strong>Limit</strong>
                    <small>{limit}</small>
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </section>

        <nav className="footer-nav">
          <Link className="small-link" href={publishedReturnHref}>
            {publishedReturnLabel}
          </Link>
          <Link className="small-link" href="/">
            Course catalogue
          </Link>
        </nav>
      </main>
    );
  }

  const courseWordLessonShell = getCourseWordLessonShell(lessonSlug);

  if (courseWordLessonShell) {
    return <CourseWordLessonShellView shell={courseWordLessonShell} />;
  }

  const lesson = getLesson(normalizedLessonSlug);

  if (!lesson) {
    const queuedLesson = getQueuedLesson(normalizedLessonSlug);

    if (!queuedLesson) {
      notFound();
    }

    if (normalizedLessonSlug !== lessonSlug) {
      redirect(`/lessons/${queuedLesson.slug}${fromQuery}`);
    }

    return (
      <QueuedLessonPage
        lesson={queuedLesson}
        returnHref={returnHref}
        returnLabel={returnLabel}
      />
    );
  }

  if (normalizedLessonSlug !== lesson.slug) {
    redirect(`/lessons/${lesson.slug}${fromQuery}`);
  }

  const course = getCourse(lesson.courseSlug);

  if (!course) {
    notFound();
  }

  const attachments = getLessonAssembly(lesson.slug);
  const hydratedCanonReading = await hydrateCanonReadingFromNoel(
    lesson.canonReading
  );
  const publishedReturnHref = from ? returnHref : `/courses/${lesson.courseSlug}`;
  const publishedReturnLabel = from ? returnLabel : `← Return to ${course.title}`;

  return (
    <main className="page-shell lesson-shell">
      <section className="lesson-study-frame">
        <section className="lex-stamp">
          <div className="lex-stamp-main">
            <div className="lex-stamp-code">
              {course.title} · Lesson {lesson.lessonNumber} · {lesson.strongId}
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
              <span className="pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>

        <LessonDrawerStack
          canonReading={hydratedCanonReading}
          attachments={attachments}
          currentLessonHref={`/lessons/${lesson.slug}`}
          drawers={lesson.drawers}
        />
      </section>

      <PublicNodeMetaCard meta={lesson.publicNodeMeta} />

      <nav className="footer-nav">
        <Link className="small-link" href={publishedReturnHref}>
          {publishedReturnLabel}
        </Link>
        <Link className="small-link" href="/">
          Course catalogue
        </Link>
      </nav>
    </main>
  );
}
