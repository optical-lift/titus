import Link from "next/link";
import { getTitusPublicCatalog } from "@/lib/titus/public-lessons";

export const dynamic = "force-dynamic";

export default async function RegistryPage() {
  const lessons = await getTitusPublicCatalog();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <section className="mb-10">
        <p className="mb-2 text-sm uppercase tracking-wide text-neutral-500">
          Titus Registry
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Public Word-Study Lessons
        </h1>
        <p className="mt-3 max-w-3xl text-neutral-700">
          Release-gated public-seed lessons from the Lex pattern engine. Candidate
          material, expandable stages, guardrails, and under-review drawers remain
          visibly marked.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {lessons.map((lesson) => (
          <Link
            key={lesson.song_object_id}
            href={`/lessons/${lesson.lesson_slug}`}
            className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
              {lesson.public_badge}
            </div>

            <h2 className="text-xl font-semibold">{lesson.title}</h2>

            {lesson.public_caveat ? (
              <p className="mt-2 text-sm text-neutral-600">
                {lesson.public_caveat}
              </p>
            ) : null}

            <dl className="mt-4 grid grid-cols-2 gap-2 text-sm text-neutral-700">
              <div>
                <dt className="text-neutral-500">Stages</dt>
                <dd className="font-medium">{lesson.stage_count}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Anchors</dt>
                <dd className="font-medium">{lesson.song_anchor_count}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Confirmed</dt>
                <dd className="font-medium">
                  {lesson.confirmed_trigger_count}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-500">Candidates</dt>
                <dd className="font-medium">
                  {lesson.candidate_trigger_count}
                </dd>
              </div>
            </dl>
          </Link>
        ))}
      </section>
    </main>
  );
}
