import Link from "next/link";
import { getHomeStudyPaths } from "@/data/titus/courses";

const studySteps = [
  "Word Field",
  "Canon Chain",
  "Function Pattern",
  "Guardrails",
];

export default function Home() {
  const activePath = getHomeStudyPaths("active_path")[0];
  const packetQueue = getHomeStudyPaths("packet_queue");

  return (
    <main className="compact-course-app">
      <header className="compact-header" aria-label="Titus site header">
        <Link className="compact-brand" href="/">
          Titus
        </Link>

        <nav className="compact-nav" aria-label="Primary navigation">
          <a href="#courses">Courses</a>
          <Link href="/search">Search</Link>
        </nav>
      </header>

      <section className="compact-intro" aria-labelledby="home-title">
        <div>
          <h1 id="home-title" className="sr-only">
            Titus Greek and Hebrew word study
          </h1>
          <p className="compact-eyebrow">Greek &amp; Hebrew word study</p>
          <p>Whole-canon function pattern discovery.</p>
        </div>
      </section>

<section className="compact-active" id="courses" aria-labelledby="active-course-title">
        <div className="compact-section-heading compact-section-heading--centered">
          <h2 id="active-course-title" className="compact-section-label">
            Canon Patterns
          </h2>
        </div>

        <form className="compact-search compact-search--courses" action="/search">
          <label className="sr-only" htmlFor="home-search">
            Search Titus
          </label>
          <input id="home-search" name="q" placeholder="Search" />
          <button type="submit">Go</button>
        </form>

        <div className="compact-course-list">
          {activePath ? (
            <article className="compact-active-card">
              <div className="compact-active-card__top">
                <div>
                  <span>{activePath.homeBadge ?? "Canon Patterns"}</span>
                  <h3>{activePath.title}</h3>
                  <p>{activePath.subtitle}</p>
                </div>
              </div>

              <p className="compact-active-description">
                {activePath.homeDescription ?? activePath.description}
              </p>

              <div className="compact-outline" aria-label="Course outline">
                {studySteps.map((step, index) => (
                  <div className="compact-outline-row" key={step}>
                    <span>{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>

              <div className="compact-register-row">
                <Link
                  className="compact-primary-button"
                  href={activePath.homeHref ?? `/courses/${activePath.slug}`}
                >
                  {activePath.homeCtaLabel ?? `Register for ${activePath.title}`}
                </Link>
              </div>
            </article>
          ) : (
            <article className="compact-empty">
              <p>No course is marked as the active homepage path yet.</p>
            </article>
          )}

          {packetQueue.length > 0
            ? packetQueue.map((course) => (
                <article className="compact-packet-card" key={course.slug}>
                  <div>
                    <span>{course.homeBadge ?? "Packet Ready"}</span>
                    <h3>{course.title}</h3>
                    <p>{course.homeDescription ?? course.description}</p>
                  </div>

                  <Link href={course.homeHref ?? `/courses/${course.slug}`}>
                    {course.homeCtaLabel ?? "Open"}
                  </Link>
                </article>
              ))
            : null}
        </div>
      </section>

      <footer className="compact-footer compact-footer--lex">
        <p>
          The Lex Canon Pattern Engine Project traces original-language tokens
          through the whole canon to identify repeated function patterns. Titus
          uses those prepared findings to turn discovery packets into guided
          word-study paths: read the text, trace the repetition, and walk the
          pattern in order.
        </p>
        <p className="compact-footer__meta">
          © 2026 Lex Project. Titus is part of the Lex Canon Pattern Engine Project.
        </p>
      </footer>
</main>
  );
}