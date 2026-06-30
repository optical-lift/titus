import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import LessonDrawerStack from "@/components/titus/LessonDrawerStack";
import PublicNodeMetaCard from "@/components/titus/PublicNodeMetaCard";
import { getCourse } from "@/data/titus/courses";
import { getLesson } from "@/data/titus/lessons";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  const { lessonSlug } = await params;
  const normalizedLessonSlug = lessonSlug.toLowerCase();
  const lesson = getLesson(normalizedLessonSlug);

  if (!lesson) {
    notFound();
  }

  if (normalizedLessonSlug !== lesson.slug) {
    redirect(`/lessons/${lesson.slug}`);
  }

  const course = getCourse(lesson.courseSlug);

  if (!course) {
    notFound();
  }

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
          companionPatternSlugs={lesson.companionPatternSlugs}
          currentLessonHref={`/lessons/${lesson.slug}`}
          drawers={lesson.drawers}
        />
      </section>

      <PublicNodeMetaCard meta={lesson.publicNodeMeta} />

      <nav className="footer-nav">
        <Link className="small-link" href={`/courses/${lesson.courseSlug}`}>
          ← Return to {course.title}
        </Link>
        <Link className="small-link" href="/">
          Course catalogue
        </Link>
      </nav>
    </main>
  );
}
