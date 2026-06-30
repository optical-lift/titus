import Link from "next/link";
import { courses } from "@/data/titus/courses";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="kicker">Titus · Canon Word-Study Course Library</div>
        <h1>Read Scripture first. Trace one word. Receive the Function Reading carefully.</h1>
        <p className="lede">
          Titus is a guided Hebrew and Greek word-study path where each course
          opens one stable lesson at a time: canon reading, original-language
          identity, companion patterns, traditions in conversation, and careful
          reception.
        </p>
      </section>

      <section style={{ marginTop: 28 }}>
        <div className="kicker">Course Catalogue</div>
        <div className="course-grid grid">
          {courses.map((course) => (
            <article
              className={course.status === "active" ? "card active" : "card"}
              key={course.slug}
            >
              <span className="status">
                {course.status === "active" ? "Active first course" : "Coming later"}
              </span>
              <h2 style={{ marginTop: 14 }}>{course.title}</h2>
              <p><strong>{course.subtitle}</strong></p>
              <p>{course.description}</p>
              {course.status === "active" ? (
                <Link className="button" href={`/courses/${course.slug}`}>
                  Open course
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
