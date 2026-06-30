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
  const isActive = course.status === "active";

  return (
    <main className="page-shell">
      <Link className="small-link" href="/">← Course catalogue</Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">
          {isActive ? "Active Course" : "Course Planned"}
        </div>
        <h1>{course.title}</h1>
        <p className="lede">
          <strong>{course.subtitle}</strong>
          <br />
          {course.description}
        </p>

        {isActive && course.firstLessonSlug ? (
          <Link className="button" href={`/lessons/${course.firstLessonSlug}`}>
            Continue {course.title}
          </Link>
        ) : (
          <p className="course-note">
            This course is part of the Titus library plan, but it is not open yet.
            Its study nodes may still appear as related patterns while the public
            course path is being built.
          </p>
        )}
      </section>

      <section style={{ marginTop: 28 }}>
        <div className="kicker">{isActive ? "Syllabus" : "Planned Path"}</div>

        {lessons.length > 0 ? (
          <div className="grid" style={{ marginTop: 14 }}>
            {lessons.map((lesson) => (
              <Link
                className="card active"
                href={`/lessons/${lesson.slug}`}
                key={lesson.slug}
              >
                <span className="status">Lesson {lesson.lessonNumber}</span>
                <h2 style={{ marginTop: 12 }}>{lesson.title}</h2>
                <p>{lesson.subtitle}</p>
                <p>{lesson.field}</p>
              </Link>
            ))}
          </div>
        ) : (
          <article className="card" style={{ marginTop: 14 }}>
            <span className="status">Queued</span>
            <h2 style={{ marginTop: 12 }}>No public lessons yet</h2>
            <p>
              This course will reuse published word lessons, Pattern Debriefs,
              Function Lenses, Canon Chains, and Tradition notes once those nodes
              are ready for public release.
            </p>
          </article>
        )}
      </section>
    </main>
  );
}
