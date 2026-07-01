import Link from "next/link";
import { getTitusPublicCatalog } from "@/lib/titus/public-lessons";

export const dynamic = "force-dynamic";

export default async function RegistryPage() {
  const lessons = await getTitusPublicCatalog();

  return (
    <main style={pageStyle}>
      <div style={shellStyle}>
        <section style={heroStyle}>
          <p style={eyebrowStyle}>Titus Registry</p>
          <h1 style={h1Style}>Public Word-Study Lessons</h1>
          <p style={leadStyle}>
            Release-gated public-seed lessons from the Lex pattern engine.
            Candidate material, expandable stages, guardrails, and under-review
            drawers remain visibly marked.
          </p>
        </section>

        <section style={gridStyle}>
          {lessons.map((lesson) => (
            <Link
              key={lesson.song_object_id}
              href={`/lessons/${lesson.lesson_slug}`}
              style={cardLinkStyle}
            >
              <article style={cardStyle}>
                <div style={badgeStyle}>{lesson.public_badge}</div>

                <h2 style={cardTitleStyle}>{lesson.title}</h2>

                {lesson.public_caveat ? (
                  <p style={mutedTextStyle}>{lesson.public_caveat}</p>
                ) : null}

                <dl style={statGridStyle}>
                  <Stat label="Stages" value={lesson.stage_count} />
                  <Stat label="Anchors" value={lesson.song_anchor_count} />
                  <Stat label="Confirmed" value={lesson.confirmed_trigger_count} />
                  <Stat label="Candidates" value={lesson.candidate_trigger_count} />
                </dl>

                <p style={openStyle}>Open lesson →</p>
              </article>
            </Link>
          ))}
        </section>

        {!lessons.length ? (
          <section style={emptyStyle}>
            No public release lessons were returned by Noel.
          </section>
        ) : null}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt style={statLabelStyle}>{label}</dt>
      <dd style={statValueStyle}>{value}</dd>
    </div>
  );
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
  gap: "2rem",
};

const heroStyle: React.CSSProperties = {
  border: "1px solid rgba(38, 58, 47, 0.16)",
  borderRadius: "34px",
  background: "rgba(255, 255, 252, 0.84)",
  padding: "clamp(1.2rem, 4vw, 2.4rem)",
  boxShadow: "0 18px 50px rgba(20, 30, 24, 0.07)",
};

const eyebrowStyle: React.CSSProperties = {
  margin: "0 0 0.7rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontSize: "0.8rem",
  fontWeight: 900,
  color: "#315c40",
};

const h1Style: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(2.8rem, 7vw, 6rem)",
  lineHeight: 0.92,
  letterSpacing: "-0.06em",
};

const leadStyle: React.CSSProperties = {
  margin: "1rem 0 0",
  maxWidth: "780px",
  color: "#53635a",
  fontSize: "clamp(1.05rem, 2vw, 1.26rem)",
  lineHeight: 1.55,
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "1rem",
};

const cardLinkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "inherit",
};

const cardStyle: React.CSSProperties = {
  height: "100%",
  border: "1px solid rgba(38, 58, 47, 0.16)",
  borderRadius: "28px",
  background: "rgba(255, 255, 252, 0.9)",
  padding: "1.25rem",
  boxShadow: "0 14px 40px rgba(20, 30, 24, 0.06)",
  display: "grid",
  gap: "0.8rem",
};

const badgeStyle: React.CSSProperties = {
  justifySelf: "start",
  borderRadius: "999px",
  padding: "0.42rem 0.7rem",
  background: "rgba(42, 91, 63, 0.12)",
  color: "#244f38",
  fontSize: "0.82rem",
  fontWeight: 900,
};

const cardTitleStyle: React.CSSProperties = {
  margin: 0,
  color: "#1d2d24",
  fontSize: "clamp(1.7rem, 3vw, 2.45rem)",
  lineHeight: 0.98,
  letterSpacing: "-0.04em",
};

const mutedTextStyle: React.CSSProperties = {
  margin: 0,
  color: "#53635a",
  lineHeight: 1.55,
};

const statGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "0.75rem",
  margin: "0.2rem 0 0",
};

const statLabelStyle: React.CSSProperties = {
  color: "#6d796f",
  fontSize: "0.85rem",
};

const statValueStyle: React.CSSProperties = {
  margin: "0.1rem 0 0",
  color: "#1d2d24",
  fontWeight: 900,
};

const openStyle: React.CSSProperties = {
  margin: "auto 0 0",
  color: "#315c40",
  fontWeight: 900,
};

const emptyStyle: React.CSSProperties = {
  border: "1px solid rgba(38, 58, 47, 0.16)",
  borderRadius: "24px",
  background: "#fffdfa",
  padding: "1rem",
  color: "#53635a",
};
