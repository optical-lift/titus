import Link from "next/link";
import { getNoelSongLessonCatalog } from "@/lib/titus/noel-song-lessons";

export const dynamic = "force-dynamic";

export default async function SongLessonsPage() {
  const lessons = await getNoelSongLessonCatalog();

  return (
    <main className="page-shell">
      <Link className="small-link" href="/registry">
        ← Back to Titus registry
      </Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">Noel-backed Song lessons</div>
        <h1>Song object public release packets.</h1>
        <p className="lede">
          This is the isolated test surface for Titus lessons generated from the
          Noel / Song-object release tables. It does not replace the current
          registry or the existing H0776 lesson route.
        </p>
      </section>

      <section className="registry-section">
        <div className="kicker">Release-gated packets</div>

        {lessons.length ? (
          <div className="registry-grid">
            {lessons.map((lesson) => (
              <Link
                className="registry-card placement-registry-card"
                href={`/song-lessons/${lesson.lesson_slug}`}
                key={lesson.song_object_id}
              >
                <span className="status">{lesson.public_badge}</span>
                <h2>{lesson.title}</h2>

                {lesson.public_caveat ? <p>{lesson.public_caveat}</p> : null}

                <p>
                  Stages: {lesson.stage_count ?? 0}
                  <br />
                  Song anchors: {lesson.song_anchor_count ?? 0}
                  <br />
                  Confirmed triggers: {lesson.confirmed_trigger_count ?? 0}
                  <br />
                  Candidate triggers: {lesson.candidate_trigger_count ?? 0}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <article className="registry-health-card problem">
            <h2>No packets returned</h2>
            <p>
              Noel returned zero rows from titus_song_object_lesson_catalog_v1.
            </p>
          </article>
        )}
      </section>
    </main>
  );
}
