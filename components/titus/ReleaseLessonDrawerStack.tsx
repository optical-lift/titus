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
  return (
    <div className="space-y-4">
      {stages.map((stage) => (
        <details
          key={stage.stage_id}
          className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
          open={stage.stage_order === 1}
        >
          <summary className="cursor-pointer list-none">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm text-neutral-500">
                  Stage {stage.stage_order}
                </p>
                <h3 className="text-xl font-semibold">
                  {stage.stage_label}
                </h3>
                <p className="mt-2 text-neutral-700">
                  {stage.stage_function}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <Badge>{stage.public_trigger_display_rule}</Badge>
                <Badge>{stage.candidate_stage_status}</Badge>
              </div>
            </div>
          </summary>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
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
    <section className="rounded-2xl bg-neutral-50 p-4">
      <h4 className="font-semibold">{title}</h4>

      {rule ? <p className="mt-2 text-sm text-neutral-600">{rule}</p> : null}

      {triggers?.length ? (
        <div className="mt-4 space-y-3">
          {triggers.map((trigger) => (
            <div
              key={`${variant}-${trigger.strong_id}-${trigger.surface}`}
              className="rounded-xl border border-neutral-200 bg-white p-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">
                  {trigger.lexeme_display}
                </span>

                {variant === "candidate" ? (
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                    under review
                  </span>
                ) : null}
              </div>

              <p className="mt-2 text-sm text-neutral-700">
                {trigger.function_label}
              </p>

              {trigger.lexical_note ? (
                <p className="mt-2 text-xs text-neutral-500">
                  <span className="font-medium">
                    {trigger.lexical_note_label ?? "Lexical / function note"}:
                  </span>{" "}
                  {trigger.lexical_note}
                </p>
              ) : null}

              {trigger.review_note ? (
                <p className="mt-2 text-xs text-neutral-500">
                  Review: {trigger.review_note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-neutral-500">
          None in this preview.
        </p>
      )}
    </section>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-neutral-100 px-3 py-1 text-neutral-600">
      {children}
    </span>
  );
}
