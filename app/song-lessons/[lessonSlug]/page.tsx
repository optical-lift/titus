import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getNoelSongLessonBySlug,
  type SongLessonStage,
  type SongLessonTriggerPreview,
} from "@/lib/titus/noel-song-lessons";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    lessonSlug: string;
  }>;
};

export default async function SongLessonPage({ params }: PageProps) {
  const { lessonSlug } = await params;
  const packet = await getNoelSongLessonBySlug(lessonSlug);

  if (!packet) {
    notFound();
  }

  const card = packet.lesson_card;
  const object = packet.object ?? {};
  const pattern = packet.primary_governing_pattern ?? {};

  return (
    <main className="page-shell lesson-shell">
      <Link className="small-link" href="/song-lessons">
        ← Back to Noel-backed Song lessons
      </Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">{card.public_badge}</div>
        <h1>{card.title}</h1>

        {card.public_caveat ? <p className="lede">{card.public_caveat}</p> : null}

        <p className="lede">
          {text(object.one_sentence_claim) ||
            text(pattern.plain_language_caption) ||
            "No one-sentence claim was returned in this packet."}
        </p>
      </section>

      <section className="registry-section">
        <div className="registry-grid">
          <Stat label="Stages" value={card.stage_count ?? 0} />
          <Stat label="Song anchors" value={card.song_anchor_count ?? 0} />
          <Stat label="Confirmed triggers" value={card.confirmed_trigger_count ?? 0} />
          <Stat label="Candidate triggers" value={card.candidate_trigger_count ?? 0} />
          <Stat label="Guardrails" value={card.guardrail_count ?? 0} />
          <Stat label="Contradictions" value={card.contradiction_count ?? 0} />
        </div>
      </section>

      <section className="registry-section">
        <div className="kicker">Primary governing pattern</div>
        <article className="registry-card placement-registry-card">
          <span className="status">
            {text(pattern.pattern_status) || "pattern status pending"}
          </span>
          <h2>{text(pattern.pattern_name) || "Primary governing pattern"}</h2>

          {text(pattern.core_claim) ? <p>{text(pattern.core_claim)}</p> : null}

          {Array.isArray(pattern.core_sequence) && pattern.core_sequence.length ? (
            <ol className="pattern-list">
              {pattern.core_sequence.map((step) => (
                <li key={String(step)}>{String(step)}</li>
              ))}
            </ol>
          ) : null}

          {text(pattern.rival_reading) ? (
            <p>
              <strong>Rival reading:</strong> {text(pattern.rival_reading)}
            </p>
          ) : null}

          {text(pattern.allowed_use) ? (
            <p>
              <strong>Allowed public use:</strong> {text(pattern.allowed_use)}
            </p>
          ) : null}
        </article>
      </section>

      <section className="registry-section">
        <div className="kicker">Stage sequence</div>
        <div style={{ display: "grid", gap: 16 }}>
          {packet.stages.map((stage) => (
            <StageDrawer key={`${stage.stage_order}-${stage.stage_id}`} stage={stage} />
          ))}
        </div>
      </section>

      <section className="registry-section">
        <div className="kicker">Packet drawers</div>
        <div className="registry-grid">
          <DataCard title="Song anchors" items={packet.song_anchors} />
          <DataCard title="Guardrails" items={packet.guardrails} />
          <DataCard title="Contradiction controls" items={packet.contradiction_controls} />
          <DataCard title="Pressure buckets" items={packet.pressure_buckets} />
          <DataCard title="Connected Song objects" items={packet.connected_song_objects} />
          <DataCard title="Canon echoes under review" items={packet.canon_echoes_under_review} />
        </div>
      </section>
    </main>
  );
}

function StageDrawer({ stage }: { stage: SongLessonStage }) {
  return (
    <details
      className="registry-card placement-registry-card"
      open={stage.stage_order === 1}
    >
      <summary style={{ cursor: "pointer" }}>
        <span className="status">Stage {stage.stage_order}</span>
        <h2>{stage.stage_label}</h2>
        {stage.stage_function ? <p>{stage.stage_function}</p> : null}
        <p>
          Confirmed: {stage.confirmed_trigger_count} · Candidates:{" "}
          {stage.candidate_trigger_count} · Total: {stage.total_trigger_count}
        </p>
      </summary>

      <div className="registry-grid" style={{ marginTop: 16 }}>
        <TriggerGroup
          title="Confirmed trigger preview"
          triggers={stage.confirmed_trigger_preview}
        />
        <TriggerGroup
          title="Candidate trigger preview"
          triggers={stage.candidate_trigger_preview}
          note={stage.public_candidate_display_rule}
        />
      </div>
    </details>
  );
}

function TriggerGroup({
  title,
  triggers,
  note,
}: {
  title: string;
  triggers: SongLessonTriggerPreview[];
  note?: string;
}) {
  return (
    <article className="registry-health-card ok">
      <h2>{title}</h2>
      {note ? <p>{note}</p> : null}

      {triggers.length ? (
        <ul className="pattern-list">
          {triggers.map((trigger, index) => (
            <li key={`${trigger.strong_id ?? "no-strong"}-${index}`}>
              <strong>
                {trigger.lexeme_display ||
                  [trigger.original_language, trigger.transliteration]
                    .filter(Boolean)
                    .join(" / ") ||
                  trigger.strong_id ||
                  "Unlabeled trigger"}
              </strong>
              {trigger.strong_id ? ` · ${trigger.strong_id}` : ""}
              {trigger.function_label ? ` — ${trigger.function_label}` : ""}
              {trigger.lexical_note ? ` (${trigger.lexical_note})` : ""}
            </li>
          ))}
        </ul>
      ) : (
        <p>No triggers in this preview.</p>
      )}
    </article>
  );
}

function DataCard({
  title,
  items,
}: {
  title: string;
  items: Record<string, unknown>[];
}) {
  return (
    <article className="registry-card placement-registry-card">
      <span className="status">{items.length} public items</span>
      <h2>{title}</h2>

      {items.length ? (
        <div style={{ display: "grid", gap: 12 }}>
          {items.slice(0, 5).map((item, index) => (
            <pre
              key={index}
              style={{
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                fontFamily: "inherit",
                fontSize: "0.9rem",
                background: "rgba(38, 58, 47, 0.05)",
                borderRadius: 16,
                padding: 14,
              }}
            >
              {JSON.stringify(item, null, 2)}
            </pre>
          ))}
        </div>
      ) : (
        <p>No public items returned.</p>
      )}
    </article>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <article className="registry-card placement-registry-card">
      <span className="status">{label}</span>
      <h2>{value}</h2>
    </article>
  );
}

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}
