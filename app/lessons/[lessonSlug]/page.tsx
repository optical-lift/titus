import Link from "next/link";
import { notFound } from "next/navigation";
import { getTitusPublicLessonBySlug } from "@/lib/titus/public-lessons";
import ReleaseLessonDrawerStack from "@/components/titus/ReleaseLessonDrawerStack";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    lessonSlug: string;
  }>;
};

export default async function LessonPage({ params }: PageProps) {
  const { lessonSlug } = await params;
  const lesson = await getTitusPublicLessonBySlug(lessonSlug);

  if (!lesson) {
    notFound();
  }

  const card = lesson.lesson_card;
  const pattern = lesson.primary_governing_pattern;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/registry"
        className="text-sm text-neutral-600 hover:underline"
      >
        ← Back to registry
      </Link>

      <section className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-4 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
          {card.public_badge}
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">
          {card.title}
        </h1>

        {card.public_caveat ? (
          <p className="mt-3 max-w-3xl text-neutral-700">
            {card.public_caveat}
          </p>
        ) : null}

        <p className="mt-4 max-w-3xl text-neutral-700">
          {lesson.object.one_sentence_claim}
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <Stat label="Stages" value={card.stage_count} />
          <Stat label="Song anchors" value={card.song_anchor_count} />
          <Stat label="Confirmed" value={card.confirmed_trigger_count} />
          <Stat label="Candidates" value={card.candidate_trigger_count} />
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-wide text-neutral-500">
          Primary governing pattern
        </p>
        <h2 className="mt-2 text-2xl font-semibold">
          {pattern.pattern_name}
        </h2>

        {pattern.plain_language_caption ? (
          <p className="mt-3 text-neutral-700">
            {pattern.plain_language_caption}
          </p>
        ) : null}

        {pattern.core_claim ? (
          <p className="mt-4 text-neutral-700">{pattern.core_claim}</p>
        ) : null}

        {Array.isArray(pattern.core_sequence) ? (
          <ol className="mt-5 list-decimal space-y-1 pl-5 text-neutral-700">
            {pattern.core_sequence.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        ) : null}
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Stage sequence</h2>
        <ReleaseLessonDrawerStack stages={lesson.stages} />
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <JsonPanel title="Song anchors" items={lesson.song_anchors} />
        <JsonPanel title="Guardrails" items={lesson.guardrails} />
        <JsonPanel
          title="Contradiction controls"
          items={lesson.contradiction_controls}
        />
        <JsonPanel
          title="Canon echoes under review"
          items={lesson.canon_echoes_under_review}
        />
      </section>

      {lesson.known_limits?.length ? (
        <section className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Known limits</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-neutral-700">
            {lesson.known_limits.map((limit) => (
              <li key={limit}>{limit}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function JsonPanel({
  title,
  items,
}: {
  title: string;
  items: Array<Record<string, unknown>>;
}) {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>

      {items?.length ? (
        <div className="mt-4 space-y-3">
          {items.slice(0, 6).map((item, index) => (
            <div key={index} className="rounded-2xl bg-neutral-50 p-4 text-sm">
              <pre className="whitespace-pre-wrap break-words font-sans text-neutral-700">
                {JSON.stringify(item, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-neutral-600">No public items yet.</p>
      )}
    </section>
  );
}
