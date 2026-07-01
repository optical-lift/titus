import type { ReactNode } from "react";
import type {
  TitusLessonStage,
  TitusTriggerPreview,
} from "@/lib/titus/public-lessons";

export default function ReleaseLessonDrawerStack({
  stages,
}: {
  stages: TitusLessonStage[];
}) {
  if (!stages.length) {
    return (
      <div style={emptyBoxStyle}>
        No public stage drawers were returned for this lesson packet.
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {stages.map((stage) => (
        <details
          key={`${stage.stage_order}-${stage.stage_id}`}
          open={stage.stage_order === 1}
          style={drawerStyle}
        >
          <summary style={{ cursor: "pointer", listStyle: "none" }}>
            <div style={summaryGridStyle}>
              <div>
                <p style={stageEyebrowStyle}>Stage {stage.stage_order}</p>
                <h3 style={stageTitleStyle}>{stage.stage_label}</h3>
                {stage.stage_function ? (
                  <p style={stageFunctionStyle}>{stage.stage_function}</p>
                ) : null}
              </div>

              <div style={badgeRowStyle}>
                <Badge>{stage.public_trigger_display_rule}</Badge>
                <Badge>{stage.candidate_stage_status}</Badge>
              </div>
            </div>
          </summary>

          <div style={triggerGridStyle}>
            <TriggerGroup
              title={`Confirmed triggers (${stage.confirmed_trigger_count})`}
              triggers={stage.confirmed_trigger_preview}
              variant="confirmed"
            />

            <TriggerGroup
              title={`Candidate triggers (${stage.candidate_trigger_count})`}
              triggers={stage.candidate_trigger_preview}
              variant="candidate"
              rule={stage.public_candidate_display_rule}
            />
          </div>
        </details>
      ))}
    </div>
  );
}

function TriggerGroup({
  title,
  triggers,
  variant,
  rule,
}: {
  title: string;
  triggers: TitusTriggerPreview[];
  variant: "confirmed" | "candidate";
  rule?: string;
}) {
  return (
    <section style={triggerGroupStyle}>
      <h4 style={triggerGroupTitleStyle}>{title}</h4>

      {rule ? <p style={smallMutedStyle}>{rule}</p> : null}

      {triggers?.length ? (
        <div style={{ display: "grid", gap: "0.75rem", marginTop: "1rem" }}>
          {triggers.map((trigger, index) => (
            <div
              key={`${variant}-${trigger.strong_id ?? "no-strong"}-${trigger.surface ?? "no-surface"}-${index}`}
              style={triggerCardStyle}
            >
              <div style={badgeRowStyle}>
                <span style={{ fontWeight: 800, color: "#1d2d24" }}>
                  {trigger.lexeme_display ||
                    [trigger.original_language, trigger.transliteration]
                      .filter(Boolean)
                      .join(" / ") ||
                    trigger.strong_id ||
                    "Unlabeled trigger"}
                </span>

                {trigger.strong_id ? <MiniBadge>{trigger.strong_id}</MiniBadge> : null}

                {variant === "candidate" ? (
                  <MiniBadge>under review</MiniBadge>
                ) : null}
              </div>

              {trigger.function_label ? (
                <p style={triggerFunctionStyle}>{trigger.function_label}</p>
              ) : null}

              {trigger.lexical_note ? (
                <p style={tinyNoteStyle}>
                  <strong>
                    {trigger.lexical_note_label ?? "Lexical / function note"}:
                  </strong>{" "}
                  {trigger.lexical_note}
                </p>
              ) : null}

              {trigger.evidence_note ? (
                <p style={tinyNoteStyle}>
                  <strong>Evidence:</strong> {trigger.evidence_note}
                </p>
              ) : null}

              {trigger.review_note ? (
                <p style={tinyNoteStyle}>
                  <strong>Review:</strong> {trigger.review_note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p style={smallMutedStyle}>None in this preview.</p>
      )}
    </section>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return <span style={badgeStyle}>{children}</span>;
}

function MiniBadge({ children }: { children: ReactNode }) {
  return <span style={miniBadgeStyle}>{children}</span>;
}

const drawerStyle: React.CSSProperties = {
  border: "1px solid rgba(38, 58, 47, 0.16)",
  borderRadius: "28px",
  background: "#fffdfa",
  boxShadow: "0 14px 40px rgba(20, 30, 24, 0.06)",
  padding: "1.1rem",
};

const summaryGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: "1rem",
  alignItems: "start",
};

const stageEyebrowStyle: React.CSSProperties = {
  margin: "0 0 0.25rem",
  color: "#6d796f",
  fontSize: "0.92rem",
  fontWeight: 800,
};

const stageTitleStyle: React.CSSProperties = {
  margin: 0,
  color: "#1d2d24",
  fontSize: "clamp(1.35rem, 2.2vw, 2rem)",
  lineHeight: 1.05,
};

const stageFunctionStyle: React.CSSProperties = {
  margin: "0.6rem 0 0",
  color: "#53635a",
  lineHeight: 1.55,
};

const badgeRowStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.45rem",
  alignItems: "center",
};

const badgeStyle: React.CSSProperties = {
  borderRadius: "999px",
  background: "rgba(38, 58, 47, 0.08)",
  color: "#315c40",
  padding: "0.4rem 0.65rem",
  fontSize: "0.8rem",
  fontWeight: 800,
};

const miniBadgeStyle: React.CSSProperties = {
  borderRadius: "999px",
  background: "rgba(38, 58, 47, 0.07)",
  color: "#53635a",
  padding: "0.25rem 0.5rem",
  fontSize: "0.75rem",
  fontWeight: 800,
};

const triggerGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "1rem",
  marginTop: "1.1rem",
};

const triggerGroupStyle: React.CSSProperties = {
  borderRadius: "22px",
  background: "rgba(237, 243, 237, 0.55)",
  padding: "1rem",
};

const triggerGroupTitleStyle: React.CSSProperties = {
  margin: 0,
  color: "#1d2d24",
  fontSize: "1.08rem",
};

const triggerCardStyle: React.CSSProperties = {
  border: "1px solid rgba(38, 58, 47, 0.13)",
  borderRadius: "18px",
  background: "#fff",
  padding: "0.9rem",
};

const triggerFunctionStyle: React.CSSProperties = {
  margin: "0.65rem 0 0",
  color: "#263a2f",
  lineHeight: 1.45,
  fontSize: "0.95rem",
};

const smallMutedStyle: React.CSSProperties = {
  margin: "0.55rem 0 0",
  color: "#6d796f",
  fontSize: "0.92rem",
  lineHeight: 1.45,
};

const tinyNoteStyle: React.CSSProperties = {
  margin: "0.55rem 0 0",
  color: "#6d796f",
  fontSize: "0.82rem",
  lineHeight: 1.45,
};

const emptyBoxStyle: React.CSSProperties = {
  border: "1px solid rgba(38, 58, 47, 0.16)",
  borderRadius: "24px",
  background: "#fffdfa",
  padding: "1rem",
  color: "#53635a",
};
