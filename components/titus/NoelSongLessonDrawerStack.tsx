"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type {
  SongLessonPacket,
  SongLessonStage,
  SongLessonTriggerPreview,
} from "@/lib/titus/noel-song-lessons";

type DrawerCode =
  | "anchors"
  | "function"
  | "stages"
  | "triggers"
  | "guardrails"
  | "pressure"
  | "contradictions"
  | "connections"
  | "receive";

type GuidedDrawer = {
  code: DrawerCode;
  heading: string;
};

export default function NoelSongLessonDrawerStack({
  packet,
}: {
  packet: SongLessonPacket;
}) {
  const guidedDrawers: GuidedDrawer[] = useMemo(
    () => [
      {
        code: "anchors",
        heading: "1 · Song Anchors",
      },
      {
        code: "function",
        heading: "2 · Function Reading",
      },
      {
        code: "stages",
        heading: "3 · Trace the Stage Sequence",
      },
      {
        code: "triggers",
        heading: "4 · Test the Trigger Evidence",
      },
      {
        code: "guardrails",
        heading: "5 · Guardrails",
      },
      {
        code: "pressure",
        heading: "6 · Tradition Pressure",
      },
      {
        code: "contradictions",
        heading: "7 · Contradiction Controls",
      },
      {
        code: "connections",
        heading: "8 · Connected Objects",
      },
      {
        code: "receive",
        heading: "9 · Word Study Complete",
      },
    ],
    []
  );

  const [openIndex, setOpenIndex] = useState(0);
  const openDrawer = guidedDrawers[openIndex];

  function goNext() {
    setOpenIndex((current) =>
      current + 1 < guidedDrawers.length ? current + 1 : current
    );
  }

  function goPrevious() {
    setOpenIndex((current) => (current > 0 ? current - 1 : current));
  }

  return (
    <section className="guided-lesson" aria-label="Guided Noel Song lesson drawers">
      <div className="drawer-tabs" aria-label="Lesson sections">
        {guidedDrawers.map((drawer, index) => (
          <button
            className={index === openIndex ? "drawer-tab active" : "drawer-tab"}
            key={drawer.code}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-pressed={index === openIndex}
          >
            <span>{index + 1}</span>
            {drawer.heading.replace(/^\d+\s·\s/, "")}
          </button>
        ))}
      </div>

      <article className="guided-drawer-card">
        <div className="guided-drawer-count">
          Drawer {openIndex + 1} of {guidedDrawers.length}
        </div>

        <h2>{openDrawer.heading}</h2>

        <div className="drawer-body no-border">
          <DrawerContent code={openDrawer.code} packet={packet} />
        </div>

        <div className="drawer-actions">
          <button
            className="secondary-button"
            type="button"
            onClick={goPrevious}
            disabled={openIndex === 0}
          >
            Previous
          </button>

          <button
            className="button compact-button"
            type="button"
            onClick={goNext}
            disabled={openIndex === guidedDrawers.length - 1}
          >
            Continue
          </button>
        </div>
      </article>
    </section>
  );
}

function DrawerContent({
  code,
  packet,
}: {
  code: DrawerCode;
  packet: SongLessonPacket;
}) {
  const object = packet.object ?? {};
  const pattern = packet.primary_governing_pattern ?? {};
  const card = packet.lesson_card;

  if (code === "anchors") {
    return (
      <>
        <p>
          Begin with the Song anchors before receiving the Function Reading.
          These are the approved anchor points that keep the lesson from
          becoming a free-floating theme.
        </p>

        {packet.song_anchors.length ? (
          packet.song_anchors.map((anchor, index) => (
            <RecordTeachingCard
              key={index}
              record={anchor}
              fallbackTitle={`Song anchor ${index + 1}`}
              statusLabel="Song Anchor"
              titleKeys={["instance_label", "label", "title", "pattern_instance_id"]}
              summaryKeys={["instance_summary", "review_note", "summary"]}
            />
          ))
        ) : (
          <EmptyNotice>No public Song anchors were returned.</EmptyNotice>
        )}
      </>
    );
  }

  if (code === "function") {
    return (
      <>
        <p>
          The Function Reading is not a new doctrine. It is the public reading
          claim allowed by the release packet after the Song object, governing
          pattern, guardrails, and limits are held together.
        </p>

        <div className="function-lens-callout">
          <span className="status">Song Object</span>
          <h3>{textField(object, "object_name") || card.title}</h3>
          <p>
            {textField(object, "one_sentence_claim") ||
              "No one-sentence object claim was returned."}
          </p>

          {textField(object, "mainstream_rival_reading") ? (
            <p>
              <strong>Mainstream rival reading:</strong>{" "}
              {textField(object, "mainstream_rival_reading")}
            </p>
          ) : null}
        </div>

        <div className="function-lens-callout">
          <span className="status">
            {textField(pattern, "pattern_status") || "Governing Pattern"}
          </span>
          <h3>{textField(pattern, "pattern_name") || "Primary governing pattern"}</h3>

          {textField(pattern, "plain_language_caption") ? (
            <p>{textField(pattern, "plain_language_caption")}</p>
          ) : null}

          {textField(pattern, "core_claim") ? (
            <p>
              <strong>Core claim:</strong> {textField(pattern, "core_claim")}
            </p>
          ) : null}

          {Array.isArray(pattern.core_sequence) && pattern.core_sequence.length ? (
            <ol className="pattern-list">
              {pattern.core_sequence.map((step) => (
                <li key={String(step)}>{String(step)}</li>
              ))}
            </ol>
          ) : null}

          {textField(pattern, "allowed_use") ? (
            <p>
              <strong>Allowed public use:</strong>{" "}
              {textField(pattern, "allowed_use")}
            </p>
          ) : null}
        </div>
      </>
    );
  }

  if (code === "stages") {
    return (
      <>
        <p>
          The stage sequence turns the packet into a guided path. Each stage
          names what kind of movement the reader is testing before the lesson is
          treated as settled.
        </p>

        <div className="pattern-card-grid">
          {packet.stages.map((stage) => (
            <StageTeachingCard key={`${stage.stage_order}-${stage.stage_id}`} stage={stage} />
          ))}
        </div>
      </>
    );
  }

  if (code === "triggers") {
    return (
      <>
        <p>
          Triggers are not decoration. They are the lexeme-level evidence that
          lets the stage remain in the public conversation. Candidate triggers
          stay visibly under review.
        </p>

        {packet.stages.map((stage) => (
          <section className="scripture-card" key={stage.stage_id}>
            <div className="scripture-ref">
              Stage {stage.stage_order} · {stage.stage_label}
            </div>

            <div className="pattern-card-grid">
              <TriggerGroup
                title="Confirmed trigger preview"
                triggers={stage.confirmed_trigger_preview}
                emptyText="No confirmed triggers in this preview."
              />

              <TriggerGroup
                title="Candidate trigger preview"
                triggers={stage.candidate_trigger_preview}
                emptyText="No candidate triggers in this preview."
                note={stage.public_candidate_display_rule}
              />
            </div>
          </section>
        ))}
      </>
    );
  }

  if (code === "guardrails") {
    return (
      <>
        <p>
          Guardrails are the whole-canon pressure points that keep the lesson
          from flattening into scenery, symbolism, romance imagery, agriculture
          only, or a private reading claim.
        </p>

        <RecordGrid
          items={packet.guardrails}
          emptyText="No public guardrails were returned."
          statusLabel="Guardrail"
          titleKeys={["guardrail_profile_id", "lane_role", "title", "label"]}
          summaryKeys={["required_behavior", "failure_mode_if_ignored", "summary"]}
        />
      </>
    );
  }

  if (code === "pressure") {
    return (
      <>
        <p>
          Tradition pressure shows what normal Christian reading streams are
          allowed to keep in the conversation, and where those readings must be
          breathed through the whole-canon function pattern.
        </p>

        <RecordGrid
          items={packet.pressure_buckets}
          emptyText="No public pressure buckets were returned."
          statusLabel="Pressure Bucket"
          titleKeys={["bucket_label", "tradition_label", "label", "title"]}
          summaryKeys={["public_note", "summary", "pressure_note", "required_behavior"]}
        />
      </>
    );
  }

  if (code === "contradictions") {
    return (
      <>
        <p>
          Contradiction controls name the readings that cannot be allowed to
          silently travel inside the lesson unless they account for the pattern.
        </p>

        <RecordGrid
          items={packet.contradiction_controls}
          emptyText="No public contradiction controls were returned."
          statusLabel="Contradiction Control"
          titleKeys={["control_label", "contradiction_label", "label", "title"]}
          summaryKeys={["control_note", "summary", "failure_mode_if_ignored"]}
        />
      </>
    );
  }

  if (code === "connections") {
    return (
      <>
        <p>
          Connected Song objects and canon echoes show where this lesson touches
          neighboring function-patterns without pretending every connected item
          has already been fully settled.
        </p>

        <h3>Connected Song objects</h3>
        <RecordGrid
          items={packet.connected_song_objects}
          emptyText="No connected Song objects were returned."
          statusLabel="Connected Object"
          titleKeys={["object_name", "connected_object_name", "label", "title"]}
          summaryKeys={["connection_note", "summary", "one_sentence_claim"]}
        />

        <h3 style={{ marginTop: 24 }}>Canon echoes under review</h3>
        <RecordGrid
          items={packet.canon_echoes_under_review}
          emptyText="No canon echoes under review were returned."
          statusLabel="Under Review"
          titleKeys={["echo_label", "ref", "reference", "label", "title"]}
          summaryKeys={["echo_note", "summary", "review_note"]}
        />
      </>
    );
  }

  return (
    <>
      <p>
        Receive this lesson as a public seed packet, not as completed proof.
        The stage counts, under-review drawers, guardrails, and known limits are
        part of the lesson’s honesty.
      </p>

      <div className="function-lens-callout">
        <span className="status">Release counts</span>
        <h3>{card.title}</h3>
        <p>
          Stages: {card.stage_count ?? 0} · Song anchors:{" "}
          {card.song_anchor_count ?? 0} · Confirmed triggers:{" "}
          {card.confirmed_trigger_count ?? 0} · Candidate triggers:{" "}
          {card.candidate_trigger_count ?? 0}
        </p>
        <p>
          Guardrails: {card.guardrail_count ?? 0} · Contradictions:{" "}
          {card.contradiction_count ?? 0} · Canon echoes under review:{" "}
          {card.candidate_echo_count ?? 0}
        </p>
      </div>

      {packet.known_limits.length ? (
        <div className="function-lens-callout">
          <span className="status">Known Limits</span>
          <h3>What must remain visible</h3>
          <ul className="pattern-list">
            {packet.known_limits.map((limit, index) => (
              <li key={`${String(limit)}-${index}`}>{renderValue(limit)}</li>
            ))}
          </ul>
        </div>
      ) : (
        <EmptyNotice>No known limits were returned.</EmptyNotice>
      )}
    </>
  );
}

function StageTeachingCard({ stage }: { stage: SongLessonStage }) {
  return (
    <article className="pattern-card">
      <span className="status">Stage {stage.stage_order}</span>
      <h3>{stage.stage_label}</h3>

      {stage.stage_function ? <p>{stage.stage_function}</p> : null}

      <p>
        Confirmed: {stage.confirmed_trigger_count} · Candidates:{" "}
        {stage.candidate_trigger_count} · Total: {stage.total_trigger_count}
      </p>

      <p>
        <strong>Display rule:</strong> {stage.public_trigger_display_rule}
      </p>

      <p>
        <strong>Candidate status:</strong> {stage.candidate_stage_status}
      </p>
    </article>
  );
}

function TriggerGroup({
  title,
  triggers,
  note,
  emptyText,
}: {
  title: string;
  triggers: SongLessonTriggerPreview[];
  note?: string;
  emptyText: string;
}) {
  return (
    <article className="pattern-card">
      <span className="status">{triggers.length} triggers</span>
      <h3>{title}</h3>

      {note ? <p>{note}</p> : null}

      {triggers.length ? (
        <div className="drawer-stack">
          {triggers.map((trigger, index) => (
            <article className="scripture-card" key={`${trigger.strong_id ?? "trigger"}-${index}`}>
              <div className="scripture-ref">
                {trigger.lexeme_display ||
                  [trigger.original_language, trigger.transliteration]
                    .filter(Boolean)
                    .join(" / ") ||
                  trigger.strong_id ||
                  "Unlabeled trigger"}
              </div>

              <p>
                {trigger.strong_id ? (
                  <>
                    <strong>Strong:</strong> {trigger.strong_id}
                    <br />
                  </>
                ) : null}

                {trigger.original_language || trigger.transliteration ? (
                  <>
                    <strong>Original:</strong>{" "}
                    {[trigger.original_language, trigger.transliteration]
                      .filter(Boolean)
                      .join(" / ")}
                    <br />
                  </>
                ) : null}

                {trigger.function_label ? (
                  <>
                    <strong>Function:</strong> {trigger.function_label}
                  </>
                ) : null}
              </p>

              {trigger.lexical_note ? (
                <p>
                  <strong>{trigger.lexical_note_label ?? "Lexical note"}:</strong>{" "}
                  {trigger.lexical_note}
                </p>
              ) : null}

              {trigger.review_note ? (
                <p>
                  <strong>Review:</strong> {trigger.review_note}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      ) : (
        <p>{emptyText}</p>
      )}
    </article>
  );
}

function RecordGrid({
  items,
  emptyText,
  statusLabel,
  titleKeys,
  summaryKeys,
}: {
  items: Record<string, unknown>[];
  emptyText: string;
  statusLabel: string;
  titleKeys: string[];
  summaryKeys: string[];
}) {
  if (!items.length) {
    return <EmptyNotice>{emptyText}</EmptyNotice>;
  }

  return (
    <div className="pattern-card-grid">
      {items.map((item, index) => (
        <RecordTeachingCard
          key={index}
          record={item}
          fallbackTitle={`${statusLabel} ${index + 1}`}
          statusLabel={statusLabel}
          titleKeys={titleKeys}
          summaryKeys={summaryKeys}
        />
      ))}
    </div>
  );
}

function RecordTeachingCard({
  record,
  fallbackTitle,
  statusLabel,
  titleKeys,
  summaryKeys,
}: {
  record: Record<string, unknown>;
  fallbackTitle: string;
  statusLabel: string;
  titleKeys: string[];
  summaryKeys: string[];
}) {
  const title = firstText(record, titleKeys) || fallbackTitle;
  const summary = firstText(record, summaryKeys);
  const status =
    firstText(record, ["confidence", "instance_status", "status", "public_status"]) ||
    statusLabel;

  const extraRows = Object.entries(record)
    .filter(([key, value]) => shouldShowRecordField(key, value))
    .slice(0, 5);

  return (
    <article className="pattern-card">
      <span className="status">{status}</span>
      <h3>{title}</h3>

      {summary ? <p>{summary}</p> : null}

      {extraRows.length ? (
        <ul className="pattern-list">
          {extraRows.map(([key, value]) => (
            <li key={key}>
              <strong>{humanizeKey(key)}:</strong> {renderValue(value)}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function EmptyNotice({ children }: { children: ReactNode }) {
  return (
    <div className="function-lens-callout">
      <span className="status">Empty drawer</span>
      <p>{children}</p>
    </div>
  );
}

function textField(record: Record<string, unknown>, key: string): string {
  return typeof record[key] === "string" ? String(record[key]) : "";
}

function firstText(record: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
    if (typeof value === "number" && Number.isFinite(value)) {
      return String(value);
    }
  }

  return "";
}

function shouldShowRecordField(key: string, value: unknown): boolean {
  if (value === null || value === undefined || value === "") return false;
  if (typeof value === "object") return false;

  return ![
    "title",
    "label",
    "instance_label",
    "pattern_instance_id",
    "summary",
    "instance_summary",
    "review_note",
    "required_behavior",
    "failure_mode_if_ignored",
    "confidence",
    "instance_status",
    "status",
    "public_status",
    "sort_order",
  ].includes(key);
}

function humanizeKey(key: string): string {
  return key
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function renderValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(renderValue).join(", ");
  return JSON.stringify(value);
}
