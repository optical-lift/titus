import Link from "next/link";
import { courses } from "@/data/titus/courses";

const availableCourses = courses.filter((course) => course.status === "active");

export default function Home() {
  return (
    <main className="edu-home">
      <header className="edu-topbar" aria-label="Titus site header">
        <Link className="edu-brand" href="/">
          Titus
        </Link>
        <nav className="edu-nav" aria-label="Primary navigation">
          <Link href="/courses/ecology">Courses</Link>
        </nav>
      </header>

      <section className="edu-hero" aria-labelledby="titus-title">
        <h1 id="titus-title">Titus</h1>
        <p>
          Greek &amp; Hebrew word study through whole-canon function pattern discovery
        </p>
      </section>

      <section className="edu-course-section" aria-labelledby="available-courses">
        <div className="edu-section-heading">
          <p>Available courses</p>
          <h2 id="available-courses">Start a guided study</h2>
        </div>

        {availableCourses.length > 0 ? (
          <div className="edu-course-grid">
            {availableCourses.map((course) => (
              <article className="edu-course-card" key={course.slug}>
                <div className="edu-course-card__content">
                  <p className="edu-course-card__label">Course</p>
                  <h3>{course.title}</h3>
                  <p className="edu-course-card__subtitle">{course.subtitle}</p>
                  <p className="edu-course-card__description">{course.description}</p>
                </div>

                <Link className="edu-course-card__link" href={`/courses/${course.slug}`}>
                  Open course
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="edu-empty-card">
            <p>No public courses are marked active yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
