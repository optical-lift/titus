import Link from "next/link";
import { getHomeStudyPaths } from "@/data/titus/courses";

const methodSteps = [
  {
    title: "Read God’s words",
    text: "Let Scripture identify its own terms and keep the original-language tokens in view.",
  },
  {
    title: "Trace canon patterns",
    text: "Watch what travels together across the Bible so the pattern, not the genre, governs the reading.",
  },
  {
    title: "Receive the teaching",
    text: "Guided word studies turn those prepared patterns into a walkable study path.",
  },
];

export default function Home() {
  const activePath = getHomeStudyPaths("active_path")[0];
  const packetQueue = getHomeStudyPaths("packet_queue");
  const studyCards = [activePath, ...packetQueue].filter(Boolean);

  return (
    <main className="titus-home-v2">
      <header className="titus-home-v2__header" aria-label="Titus site header">
        <Link className="titus-home-v2__brand" href="/">
          Titus
        </Link>

        <nav className="titus-home-v2__nav" aria-label="Primary navigation">
          <a href="#courses">Courses</a>
          <Link href="/search">Search</Link>
        </nav>
      </header>

      <section className="titus-home-v2__intro" aria-labelledby="home-title">
        <div className="titus-home-v2__intro-copy">
          <p className="titus-home-v2__eyebrow">Greek &amp; Hebrew word study</p>
          <h1 id="home-title">Always on your lips.</h1>
          <p className="titus-home-v2__lede">
            Guided studies prepared from whole-canon function patterns.
          </p>
        </div>

        <form className="titus-home-v2__search" action="/search">
          <label className="sr-only" htmlFor="home-search">
            Search Titus
          </label>
          <input id="home-search" name="q" placeholder="Search Titus" />
          <button type="submit">Go</button>
        </form>
      </section>

      <section className="titus-home-v2__method" aria-labelledby="method-title">
        <div className="titus-home-v2__section-head">
          <p>Song lens premise</p>
          <h2 id="method-title">Using God’s words to define God’s teachings</h2>
        </div>

        <div className="titus-home-v2__method-flow">
          {methodSteps.map((step, index) => (
            <div className="titus-home-v2__method-piece" key={step.title}>
              <article className="titus-home-v2__method-card">
                <span>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>

              {index < methodSteps.length - 1 ? (
                <div className="titus-home-v2__method-arrow" aria-hidden="true">
                  →
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="titus-home-v2__studies" id="courses" aria-labelledby="courses-title">
        <div className="titus-home-v2__section-head">
          <p>Canon patterns</p>
          <h2 id="courses-title">Guided word studies</h2>
        </div>

        <div className="titus-home-v2__study-list">
          {studyCards.length > 0 ? (
            studyCards.map((course, index) => {
              const isActive = index === 0 && activePath && course.slug === activePath.slug;
              return (
                <article
                  className={`titus-home-v2__study-card ${isActive ? "is-active" : "is-pending"}`}
                  key={course.slug}
                >
                  <div className="titus-home-v2__study-copy">
                    <span className="titus-home-v2__study-badge">
                      {isActive ? "Active study" : course.homeBadge ?? "Guided path pending"}
                    </span>
                    <h3>{course.title}</h3>
                    <p className="titus-home-v2__study-subtitle">{course.subtitle}</p>
                    <p className="titus-home-v2__study-description">
                      {course.homeDescription ?? course.description}
                    </p>
                  </div>

                  <div className="titus-home-v2__study-register">
                    <p>Register</p>
                    <Link
                      className="titus-home-v2__study-action"
                      href={course.homeHref ?? `/courses/${course.slug}`}
                    >
                      {isActive ? "Start Proverbs" : course.homeCtaLabel ?? "Open map"}
                    </Link>
                  </div>
                </article>
              );
            })
          ) : (
            <article className="titus-home-v2__empty">
              <p>No homepage study paths are marked in the registry yet.</p>
            </article>
          )}
        </div>
      </section>

      <footer className="titus-home-v2__footer">
        <p>
          Titus uses prepared study material from patterns found through the Lex Canon
          Pattern Engine Project, a function-first methodology that uses original-language
          tokens to map the Bible as one complete unit, regardless of genre or historical setting.
        </p>
      </footer>
    </main>
  );
}
