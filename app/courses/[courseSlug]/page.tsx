import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse } from "@/data/titus/courses";
import { getLessonsForCourse } from "@/data/titus/lessons";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);

  if (!course) {
    notFound();
  }

  const lessons = getLessonsForCourse(course.slug);

  return (
    <main className="page-shell">
      <Link className="small-link" href="/">← Course catalogue</Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">Active Course</div>
        <h1>{course.title}</h1>
        <p className="lede">
          <strong>{course.subtitle}</strong>
          <br />
          {course.description}
        </p>
        {course.firstLessonSlug ? (
          <Link className="button" href={`/lessons/${course.firstLessonSlug}`}>
            Continue {course.title}
          </Link>
        ) : null}
      </section>

      <section style={{ marginTop: 28 }}>
        <div className="kicker">Syllabus</div>
        <div className="grid" style={{ marginTop: 14 }}>
          {lessons.map((lesson) => (
            <Link className="card active" href={`/lessons/${lesson.slug}`} key={lesson.slug}>
              <span className="status">Lesson {lesson.lessonNumber}</span>
              <h2 style={{ marginTop: 12 }}>{lesson.title}</h2>
              <p>{lesson.subtitle}</p>
              <p>{lesson.field}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
