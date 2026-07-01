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
    <main style={pageStyle}>
      <div style={shellStyle}>
        <nav style={navStyle}>
          <Link href="/registry" style={navLinkStyle}>
            ← Back to registry
          </Link>
        </nav>

        <section style={heroStyle}>
          <div style={badgeStyle}>{card.public_badge}</div>

          <h1 style={h1Style}>{card.title}</h1>

          {card.public_caveat ? (
            <p style={leadStyle}>{card.public_caveat}</p>
          ) : null}

          {lesson.object.one_sentence_claim ? (
            <p style={claimStyle}>{lesson.object.one_sentence_claim}</p>
          ) : null}

          <div style={statGridStyle}>
            <Stat label="Stages" value={card.stage_count} />
            <Stat label="Song anchors" value={card.song_anchor_count} />
            <Stat label="Confirmed" value={card.confirmed_trigger_count} />
            <Stat label="Candidates" value={card.candidate_trigger_count} />
          </div>
        </section>

        <section style={panelStyle}>
          <p style={eyebrowStyle}>Primary governing pattern</p>
          <h2 style={h2Style}>{pattern.pattern_name}</h2>

          {pattern.plain_language_caption ? (
            <p style={bodyTextStyle}>{pattern.plain_language_caption}</p>
          ) : null}

          {pattern.core_claim ? (
            <p style={bodyTextStyle}>{pattern.core_claim}</p>
          ) : null}

          {Array.isArray(pattern.core_sequence) && pattern.core_sequence.length ? (
            <ol style={orderedListStyle}>
              {pattern.core_sequence.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : null}

          {pattern.rival_reading ? (
            <Callout title="Rival reading" body={pattern.rival_reading} />
          ) : null}

          {pattern.allowed_use ? (
            <Callout title="Allowed public use" body={pattern.allowed_use} />
          ) : null}
        </section>

        <section>
          <h2 style={sectionTitleStyle}>Stage sequence</h2>
          <ReleaseLessonDrawerStack stages={lesson.stages} />
        </section>

        <section style={twoColumnGridStyle}>
          <DataPanel title="Song anchors" items={lesson.song_anchors} />
          <DataPanel title="Guardrails" items={lesson.guardrails} />
          <DataPanel title="Contradiction controls" items={lesson.contradiction_controls} />
          <DataPanel title="Canon echoes under review" items={lesson.canon_echoes_under_review} />
          <DataPanel title="Pressure buckets" items={lesson.pressure_buckets} />
          <DataPanel title="Connected Song objects" items={lesson.connected_song_objects} />
        </section>

        {lesson.known_limits?.length ? (
          <section style={panelStyle}>
            <h2 style={h2Style}>Known limits</h2>
            <ul style={unorderedListStyle}>
              {lesson.known_limits.map((limit) => (
                <li key={limit}>{limit}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={statBoxStyle}>
      <p style={statLabelStyle}>{label}</p>
      <p style={statValueStyle}>{value}</p>
    </div>
  );
}

function Callout({ title, body }: { title: string; body: string }) {
  return (
    <div style={calloutStyle}>
      <p style={calloutTitleStyle}>{title}</p>
      <p style={calloutBodyStyle}>{body}</p>
    </div>
  );
}

function DataPanel({
  title,
  items,
}: {
  title: string;
  items: Array<Record<string, unknown>>;
}) {
  return (
    <section style={panelStyle}>
      <h2 style={smallPanelTitleStyle}>{title}</h2>

      {items?.length ? (
        <div style={{ display: "grid", gap: "0.75rem", marginTop: "1rem" }}>
          {items.slice(0, 6).map((item, index) => (
            <div key={index} style={dataCardStyle}>
              {Object.entries(item).slice(0, 8).map(([key, value]) => (
                <div key={key} style={dataRowStyle}>
                  <span style={dataKeyStyle}>{key}</span>
                  <span style={dataValueStyle}>{renderValue(value)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p style={mutedTextStyle}>No public items yet.</p>
      )}
    </section>
  );
}

function renderValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(renderValue).join(", ");
  return JSON.stringify(value);
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, rgba(224, 235, 224, 0.9), transparent 36rem), #fbfaf6",
  color: "#1d2d24",
  padding: "clamp(1rem, 4vw, 3rem)",
};

const shellStyle: React.CSSProperties = {
  maxWidth: "1120px",
  margin: "0 auto",
  display: "grid",
  gap: "1.4rem",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
};

const navLinkStyle: React.CSSProperties = {
  color: "#315c40",
  fontWeight: 900,
  textDecoration: "none",
};

const heroStyle: React.CSSProperties = {
  border: "1px solid rgba(38, 58, 47, 0.16)",
  borderRadius: "34px",
  background: "rgba(255, 255, 252, 0.86)",
  padding: "clamp(1.2rem, 4vw, 2.6rem)",
  boxShadow: "0 18px 50px rgba(20, 30, 24, 0.07)",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-flex",
  borderRadius: "999px",
  padding: "0.42rem 0.7rem",
  background: "rgba(42, 91, 63, 0.12)",
  color: "#244f38",
  fontSize: "0.82rem",
  fontWeight: 900,
  marginBottom: "0.9rem",
};

const h1Style: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(3.1rem, 7vw, 7rem)",
  lineHeight: 0.88,
  letterSpacing: "-0.07em",
};

const h2Style: React.CSSProperties = {
  margin: "0.35rem 0 0",
  color: "#1d2d24",
  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
  lineHeight: 1.05,
};

const leadStyle: React.CSSProperties = {
  margin: "1rem 0 0",
  maxWidth: "860px",
  color: "#53635a",
  fontSize: "clamp(1.05rem, 2vw, 1.24rem)",
  lineHeight: 1.55,
};

const claimStyle: React.CSSProperties = {
  margin: "1rem 0 0",
  maxWidth: "880px",
  color: "#263a2f",
  fontSize: "clamp(1.08rem, 2vw, 1.28rem)",
  lineHeight: 1.55,
};

const statGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "0.85rem",
  marginTop: "1.4rem",
};

const statBoxStyle: React.CSSProperties = {
  borderRadius: "20px",
  background: "rgba(237, 243, 237, 0.72)",
  padding: "0.9rem",
};

const statLabelStyle: React.CSSProperties = {
  margin: "0 0 0.25rem",
  color: "#6d796f",
  fontSize: "0.9rem",
};

const statValueStyle: React.CSSProperties = {
  margin: 0,
  color: "#1d2d24",
  fontSize: "2rem",
  fontWeight: 900,
};

const panelStyle: React.CSSProperties = {
  border: "1px solid rgba(38, 58, 47, 0.16)",
  borderRadius: "28px",
  background: "rgba(255, 255, 252, 0.88)",
  padding: "1.2rem",
  boxShadow: "0 14px 40px rgba(20, 30, 24, 0.05)",
};

const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontSize: "0.78rem",
  fontWeight: 900,
  color: "#315c40",
};

const bodyTextStyle: React.CSSProperties = {
  margin: "1rem 0 0",
  color: "#53635a",
  lineHeight: 1.6,
};

const orderedListStyle: React.CSSProperties = {
  margin: "1rem 0 0",
  paddingLeft: "1.4rem",
  color: "#53635a",
  lineHeight: 1.55,
};

const unorderedListStyle: React.CSSProperties = {
  margin: "1rem 0 0",
  paddingLeft: "1.4rem",
  color: "#53635a",
  lineHeight: 1.55,
};

const calloutStyle: React.CSSProperties = {
  borderLeft: "4px solid rgba(49, 92, 64, 0.38)",
  paddingLeft: "0.9rem",
  marginTop: "1rem",
};

const calloutTitleStyle: React.CSSProperties = {
  margin: "0 0 0.2rem",
  color: "#315c40",
  fontWeight: 900,
};

const calloutBodyStyle: React.CSSProperties = {
  margin: 0,
  color: "#53635a",
  lineHeight: 1.5,
};

const sectionTitleStyle: React.CSSProperties = {
  margin: "0 0 1rem",
  color: "#1d2d24",
  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
};

const twoColumnGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "1rem",
};

const smallPanelTitleStyle: React.CSSProperties = {
  margin: 0,
  color: "#1d2d24",
  fontSize: "1.35rem",
};

const dataCardStyle: React.CSSProperties = {
  borderRadius: "18px",
  background: "rgba(237, 243, 237, 0.55)",
  padding: "0.9rem",
  display: "grid",
  gap: "0.45rem",
};

const dataRowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(110px, 0.45fr) minmax(0, 1fr)",
  gap: "0.75rem",
};

const dataKeyStyle: React.CSSProperties = {
  color: "#315c40",
  fontSize: "0.78rem",
  fontWeight: 900,
  overflowWrap: "anywhere",
};

const dataValueStyle: React.CSSProperties = {
  color: "#53635a",
  fontSize: "0.86rem",
  lineHeight: 1.35,
  overflowWrap: "anywhere",
};

const mutedTextStyle: React.CSSProperties = {
  margin: "0.8rem 0 0",
  color: "#6d796f",
};
