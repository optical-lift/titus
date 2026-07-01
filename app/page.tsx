import Link from "next/link";
import { getHomeStudyPaths } from "@/data/titus/courses";

const studySteps = [
  {
    label: "Word Field",
    text: "Hebrew and Greek identity, Strong’s links, and companion vocabulary.",
  },
  {
    label: "Canon Chain",
    text: "Passage movement across Torah, Prophets, Gospels, Epistles, and Revelation.",
  },
  {
    label: "Function Pattern",
    text: "What the word is doing inside the whole-canon pattern.",
  },
  {
    label: "Guardrails",
    text: "Other canon patterns that must stay active while this one is read.",
  },
];

const categoryTiles = [
  {
    label: "Words",
    text: "Strong’s lessons",
  },
  {
    label: "Chains",
    text: "Canon routes",
  },
  {
    label: "Patterns",
    text: "Function maps",
  },
];

export default function Home() {
  const activePath = getHomeStudyPaths("active_path")[0];
  const packetQueue = getHomeStudyPaths("packet_queue");

  return (
    <main className="course-dashboard-app">
      <header className="app-header" aria-label="Titus site header">
        <Link className="app-brand" href="/">
          Titus
        </Link>

        <nav className="app-nav" aria-label="Primary navigation">
          <a href="#courses">Courses</a>
          <Link href="/search">Search</Link>
        </nav>
      </header>

      <section className="dashboard-hero" aria-labelledby="home-title">
        <div className="dashboard-hero__content">
          <p className="dashboard-greeting">Greek &amp; Hebrew word study</p>
          <h1 id="home-title">Find your guided canon path.</h1>
          <p>
            Whole-canon function pattern discovery, shaped into course paths you
            can walk one layer at a time.
          </p>

          <form className="dashboard-search" action="/search">
            <label className="sr-only" htmlFor="home-search">
              Search Titus
            </label>
            <input
              id="home-search"
              name="q"
              placeholder="Search words, courses, chains..."
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <aside className="active-path-mini" aria-label="Current active path">
          <span>Active path</span>
          <strong>{activePath?.title ?? "Not selected"}</strong>
          <p>{activePath?.subtitle ?? "Mark a course as active_path in the registry."}</p>
        </aside>
      </section>

      <section className="study-category-row" aria-label="Study layers">
        {categoryTiles.map((tile) => (
          <article className="study-category-tile" key={tile.label}>
            <div aria-hidden="true">{tile.label.slice(0, 1)}</div>
            <h2>{tile.label}</h2>
            <p>{tile.text}</p>
          </article>
        ))}
      </section>

      <section className="active-course-panel" id="courses" aria-labelledby="active-course-title">
        <div className="dashboard-section-heading">
          <span>Continue Learning</span>
          <h2 id="active-course-title">Take the active path first</h2>
        </div>

        {activePath ? (
          <article className="featured-course">
            <div className="featured-course__cover">
              <span>{activePath.homeBadge ?? "Active Path"}</span>
              <h3>{activePath.title}</h3>
              <p>{activePath.subtitle}</p>
            </div>

            <div className="featured-course__details">
              <p className="featured-course__description">
                {activePath.homeDescription ?? activePath.description}
              </p>

              <div className="course-progress-block">
                <div className="course-progress-block__topline">
                  <span>Guided path readiness</span>
                  <strong>Active</strong>
                </div>
                <div className="course-progress-bar" aria-hidden="true">
                  <span />
                </div>
              </div>

              <div className="course-step-list" aria-label="Course study order">
                {studySteps.map((step, index) => (
                  <div className="course-step" key={step.label}>
                    <span>{index + 1}</span>
                    <div>
                      <h4>{step.label}</h4>
                      <p>{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {activePath.homeMappedObjects?.length ? (
                <div className="course-object-pills" aria-label="Mapped objects">
                  {activePath.homeMappedObjects.map((object) => (
                    <span key={object}>{object}</span>
                  ))}
                </div>
              ) : null}

              <div className="featured-course__actions">
                <Link
                  className="app-primary-button"
                  href={activePath.homeHref ?? `/courses/${activePath.slug}`}
                >
                  {activePath.homeCtaLabel ?? "Start course"}
                </Link>
                <Link className="app-secondary-button" href="/search">
                  Search Titus
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <article className="dashboard-empty">
            <p>No course is marked as the active homepage path yet.</p>
          </article>
        )}
      </section>

      <section className="packet-course-panel" aria-labelledby="packet-course-title">
        <div className="dashboard-section-heading">
          <span>Discovery Packets</span>
          <h2 id="packet-course-title">Being shaped into guided paths</h2>
        </div>

        {packetQueue.length > 0 ? (
          <div className="packet-course-grid">
            {packetQueue.map((course) => (
              <article className="packet-course-card" key={course.slug}>
                <div>
                  <span className="packet-status">{course.homeBadge ?? "Packet Ready"}</span>
                  <h3>{course.title}</h3>
                  <p className="packet-subtitle">{course.subtitle}</p>
                  <p className="packet-description">
                    {course.homeDescription ?? course.description}
                  </p>

                  {course.homeMappedObjects?.length ? (
                    <div className="packet-object-list">
                      {course.homeMappedObjects.map((object) => (
                        <span key={object}>{object}</span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <Link
                  className="packet-link"
                  href={course.homeHref ?? `/courses/${course.slug}`}
                >
                  {course.homeCtaLabel ?? "Open map"}
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <article className="dashboard-empty">
            <p>No packet-queue courses are marked for homepage display yet.</p>
          </article>
        )}
      </section>
    </main>
  );
}
