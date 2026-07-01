import Link from "next/link";
import { getHomeStudyPaths } from "@/data/titus/courses";

export default function Home() {
  const activePath = getHomeStudyPaths("active_path")[0];
  const packetQueue = getHomeStudyPaths("packet_queue");

  return (
    <main className="course-app">
      <header className="site-header" aria-label="Titus site header">
        <Link className="site-brand" href="/">
          Titus
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#study-paths">Courses</a>
          <Link href="/search">Search</Link>
        </nav>
      </header>

      <section className="map-hero" aria-labelledby="home-title">
        <p className="eyebrow">Map of Studies</p>
        <h1 id="home-title">Start with the active path.</h1>
        <p className="hero-subtitle">
          Greek &amp; Hebrew word study through whole-canon function pattern discovery.
        </p>
        <p className="hero-note">
          Each path turns a large discovery packet into a guided study: word field,
          canon chain, function pattern, and guardrails.
        </p>
      </section>

      <section className="active-path-section" aria-labelledby="active-path">
        <div className="section-heading">
          <p className="eyebrow">Active Path</p>
          <h2 id="active-path">Begin here</h2>
        </div>

        {activePath ? (
          <article className="study-path-card study-path-card--featured">
            <div className="study-path-card__body">
              <span className="path-badge">{activePath.homeBadge ?? "Active Path"}</span>
              <h3>{activePath.title}</h3>
              <p className="path-subtitle">{activePath.subtitle}</p>
              <p className="path-description">
                {activePath.homeDescription ?? activePath.description}
              </p>

              {activePath.homeMappedObjects?.length ? (
                <div className="mapped-object-block">
                  <p>Mapped objects</p>
                  <ul>
                    {activePath.homeMappedObjects.map((object) => (
                      <li key={object}>{object}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <Link
              className="primary-action"
              href={activePath.homeHref ?? `/courses/${activePath.slug}`}
            >
              {activePath.homeCtaLabel ?? "Open path"}
            </Link>
          </article>
        ) : (
          <article className="empty-state">
            <p>No course is marked as the active homepage path yet.</p>
          </article>
        )}
      </section>

      <section className="packet-section" id="study-paths" aria-labelledby="packet-paths">
        <div className="section-heading">
          <p className="eyebrow">Discovery Packets</p>
          <h2 id="packet-paths">Being shaped into guided paths</h2>
        </div>

        {packetQueue.length > 0 ? (
          <div className="study-path-grid">
            {packetQueue.map((course) => (
              <article className="study-path-card" key={course.slug}>
                <div className="study-path-card__body">
                  <span className="path-badge">{course.homeBadge ?? "Packet"}</span>
                  <h3>{course.title}</h3>
                  <p className="path-subtitle">{course.subtitle}</p>
                  <p className="path-description">
                    {course.homeDescription ?? course.description}
                  </p>

                  {course.homeMappedObjects?.length ? (
                    <div className="mapped-object-block">
                      <p>Mapped packet</p>
                      <ul>
                        {course.homeMappedObjects.map((object) => (
                          <li key={object}>{object}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <Link
                  className="secondary-action"
                  href={course.homeHref ?? `/courses/${course.slug}`}
                >
                  {course.homeCtaLabel ?? "Open map"}
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <article className="empty-state">
            <p>No packet-queue courses are marked for homepage display yet.</p>
          </article>
        )}
      </section>
    </main>
  );
}
