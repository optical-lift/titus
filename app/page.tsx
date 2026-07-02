import Link from "next/link";
import { getHomeStudyPaths } from "@/data/titus/courses";

import { TitusCourseProgress } from "@/components/titus-course-progress";

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
<section className="compact-intro" aria-labelledby="home-title">
        <div>
          <h1 id="home-title" className="sr-only">
            Titus Greek and Hebrew word study
          </h1>
          <p className="compact-eyebrow">Greek &amp; Hebrew word study</p>
          <p>Whole-canon function pattern discovery</p>
        </div>
      </section>

<section className="compact-active" id="courses" aria-label="Titus courses">

        <form className="compact-search compact-search--courses" action="/search" role="search">
          <label className="sr-only" htmlFor="home-search">
            Search Titus
          </label>
          <input
            id="home-search"
            name="q"
            placeholder="Search Titus"
            type="search"
            autoComplete="off"
          />
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

                            <TitusCourseProgress />

              <div className="compact-register-row">
                <Link
                  className="compact-primary-button"
                  href={activePath.homeHref ?? `/courses/${activePath.slug}`}
                >
                  Start Study
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
                <article className="compact-packet-card compact-packet-card--pending" key={course.slug}>
                  <div>
                    <span>{course.homeBadge ?? "Packet Ready"}</span>
                    <h3>{course.title}</h3>
                    <p>{course.homeDescription ?? course.description}</p>
                  </div>
                </article>
              ))
            : null}
        </div>
      </section>
</main>
  );
}