import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import LessonDrawerStack from "@/components/titus/LessonDrawerStack";
import PublicNodeMetaCard from "@/components/titus/PublicNodeMetaCard";
import QueuedLessonPage from "@/components/titus/QueuedLessonPage";
import { CourseWordLessonShellView } from "@/components/course-word-lesson-shell";
import { LiveCourseWordLessonShellView } from "@/components/live-course-word-lesson-shell";
import { getCourse } from "@/data/titus/courses";
import { getCourseWordLessonShell } from "@/data/titus/course-word-lessons";
import { getLessonAssembly } from "@/data/titus/lesson-assemblies";
import { getLesson } from "@/data/titus/lessons";
import { getQueuedLesson } from "@/data/titus/queued-lessons";
import { getLiveCourseWordLessonShell } from "@/lib/noel/live-course-word-lesson";
import { hydrateCanonReadingFromNoel } from "@/lib/noel/titus-canon-reading";
import { getReturnHref, getReturnLabel, getSafeReturnPath } from "@/lib/titus/return-links";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LessonPage({
  params,
  searchParams,
}: {
  params: Promise<{ lessonSlug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { lessonSlug } = await params;

  const liveCourseWordLessonShell = await getLiveCourseWordLessonShell(lessonSlug);

  if (liveCourseWordLessonShell) {
    return <LiveCourseWordLessonShellView shell={liveCourseWordLessonShell} />;
  }

  const courseWordLessonShell = getCourseWordLessonShell(lessonSlug);

  if (courseWordLessonShell) {
    return <CourseWordLessonShellView shell={courseWordLessonShell} />;
  }

  const { from } = await searchParams;
  const normalizedLessonSlug = lessonSlug.toLowerCase();
  const safeFrom = getSafeReturnPath(from);
  const returnHref = getReturnHref(safeFrom, "/");
  const returnLabel = getReturnLabel(safeFrom);
  const fromQuery = safeFrom ? `?from=${encodeURIComponent(safeFrom)}` : "";

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
  const hydratedCanonReading = await hydrateCanonReadingFromNoel(lesson.canonReading);
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
