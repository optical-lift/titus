import Link from "next/link";
import { notFound } from "next/navigation";
import NoelSongLessonDrawerStack from "@/components/titus/NoelSongLessonDrawerStack";
import { getNoelSongLessonBySlug } from "@/lib/titus/noel-song-lessons";

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

  const travelPills = [
    packet.song_anchors.length ? "Song anchors" : null,
    packet.stages.length ? "stage sequence" : null,
    packet.guardrails.length ? "guardrails" : null,
    packet.pressure_buckets.length ? "tradition pressure" : null,
    packet.contradiction_controls.length ? "contradiction controls" : null,
    packet.connected_song_objects.length ? "connected objects" : null,
  ].filter(Boolean) as string[];

  return (
    <main className="page-shell lesson-shell">
      <section className="lesson-study-frame">
        <section className="lex-stamp">
          <div className="lex-stamp-main">
            <div className="lex-stamp-code">
              Noel Song Packet · {card.public_badge ?? "Public seed"}
            </div>

            <div className="lex-stamp-word">{card.title}</div>

            <div className="lex-stamp-meta">
              {textField(object, "object_type") || "Song object"} ·{" "}
              {textField(object, "provisional_function_lane") ||
                textField(pattern, "pattern_name") ||
                "Function pattern"}{" "}
              · Status: {card.titus_ui_status ?? "public release"}
            </div>
          </div>

          <div className="travels">
            {travelPills.map((item) => (
              <span className="pill" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>

        <NoelSongLessonDrawerStack packet={packet} />
      </section>

      <NoelSongLessonMeta packet={packet} />

      <nav className="footer-nav">
        <Link className="small-link" href="/song-lessons">
          ← Return to Noel-backed Song lessons
        </Link>
        <Link className="small-link" href="/registry">
          Titus registry
        </Link>
      </nav>
    </main>
  );
}

function NoelSongLessonMeta({
  packet,
}: {
  packet: Awaited<ReturnType<typeof getNoelSongLessonBySlug>> extends infer T
    ? NonNullable<T>
    : never;
}) {
  const card = packet.lesson_card;
  const sourcePacket = packet.source_packet ?? {};
  const object = packet.object ?? {};

  const sourceRows = Object.entries(sourcePacket)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .slice(0, 8);

  return (
    <section className="public-node-meta-card">
      <div>
        <div className="kicker">Source · Review · Version</div>
        <h2>Noel Packet Metadata</h2>
      </div>

      <div className="meta-grid">
        <div>
          <span className="meta-label">Compiler</span>
          <p>Lex Bible Project / Noel</p>
        </div>

        <div>
          <span className="meta-label">Reviewer</span>
          <p>Pending theological and lexical review</p>
        </div>

        <div>
          <span className="meta-label">Status</span>
          <p>{card.titus_ui_status ?? "public release packet"}</p>
        </div>

        <div>
          <span className="meta-label">Release badge</span>
          <p>{card.public_badge ?? "Public seed"}</p>
        </div>

        <div>
          <span className="meta-label">Object</span>
          <p>
            {textField(object, "object_name") || card.title}
            {textField(object, "object_status")
              ? ` · ${textField(object, "object_status")}`
              : ""}
          </p>
        </div>

        <div>
          <span className="meta-label">Packet counts</span>
          <p>
            {card.stage_count ?? 0} stages · {card.song_anchor_count ?? 0} anchors ·{" "}
            {card.confirmed_trigger_count ?? 0} confirmed ·{" "}
            {card.candidate_trigger_count ?? 0} candidates
          </p>
        </div>
      </div>

      <details className="meta-details">
        <summary>Known limits and source packet</summary>

        <div className="meta-detail-grid">
          <div>
            <h3>Known limits</h3>
            {packet.known_limits.length ? (
              <ul>
                {packet.known_limits.map((item, index) => (
                  <li key={`${String(item)}-${index}`}>{renderValue(item)}</li>
                ))}
              </ul>
            ) : (
              <p>No known limits were returned.</p>
            )}
          </div>

          <div>
            <h3>Source packet</h3>
            {sourceRows.length ? (
              <ul>
                {sourceRows.map(([key, value]) => (
                  <li key={key}>
                    <strong>{humanizeKey(key)}:</strong> {renderValue(value)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Source packet details were not returned.</p>
            )}
          </div>
        </div>
      </details>
    </section>
  );
}

function textField(record: Record<string, unknown>, key: string): string {
  return typeof record[key] === "string" ? String(record[key]) : "";
}

function renderValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(renderValue).join(", ");
  return JSON.stringify(value);
}

function humanizeKey(key: string): string {
  return key
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
