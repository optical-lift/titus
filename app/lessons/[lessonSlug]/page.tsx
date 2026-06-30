import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import LessonDrawerStack from "@/components/titus/LessonDrawerStack";
import PublicNodeMetaCard from "@/components/titus/PublicNodeMetaCard";
import QueuedLessonPage from "@/components/titus/QueuedLessonPage";
import { getCourse } from "@/data/titus/courses";
import { getLessonAssembly } from "@/data/titus/lesson-assemblies";
import { getLesson } from "@/data/titus/lessons";
import { getQueuedLesson } from "@/data/titus/queued-lessons";
import { getReturnHref, getReturnLabel } from "@/lib/titus/return-links";

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
  const returnHref = getReturnHref(from, "/");
  const returnLabel = getReturnLabel(from);

  const lesson = getLesson(normalizedLessonSlug);

  if (!lesson) {
    const queuedLesson = getQueuedLesson(normalizedLessonSlug);

    if (!queuedLesson) {
      notFound();
    }

    if (normalizedLessonSlug !== lessonSlug) {
      redirect(`/lessons/${queuedLesson.slug}`);
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
    redirect(`/lessons/${lesson.slug}`);
  }

  const course = getCourse(lesson.courseSlug);

  if (!course) {
    notFound();
  }

  const attachments = getLessonAssembly(lesson.slug);
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
          canonReading={lesson.canonReading}
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
