import Link from "next/link";
import { courses } from "@/data/titus/courses";

const availableCourses = courses.filter((course) => course.status === "active");

export default function Home() {
  return (
    <main className="titus-home">
      <section className="titus-home__masthead" aria-labelledby="titus-title">
        <p className="titus-kicker">Titus</p>
        <h1 id="titus-title">Titus</h1>
        <p className="titus-subtitle">
          Greek &amp; Hebrew word study through whole-canon function pattern discovery
        </p>
      </section>

      <section className="titus-section" aria-labelledby="available-courses">
        <div className="titus-section__header">
          <p className="titus-kicker">Available Courses</p>
          <h2 id="available-courses">Courses</h2>
        </div>

        {availableCourses.length > 0 ? (
          <div className="titus-course-list">
            {availableCourses.map((course) => (
              <article className="titus-course-card" key={course.slug}>
                <div>
                  <p className="titus-course-card__eyebrow">Course</p>
                  <h3>{course.title}</h3>
                  <p className="titus-course-card__subtitle">{course.subtitle}</p>
                  <p className="titus-course-card__description">{course.description}</p>
                </div>

                <Link className="titus-button" href={`/courses/${course.slug}`}>
                  Open Course
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="titus-empty-card">
            <p>No public courses are marked active yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
