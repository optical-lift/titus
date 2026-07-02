"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  LiveCourseWordLessonDrawer,
  LiveCourseWordLessonStatement,
  LiveCourseWordLessonShell,
} from "@/data/titus/live-course-word-lesson-types";
import { TitusLexStamp } from "@/components/titus-lex-stamp";
import { TitusCourseProgressMarker } from "@/components/titus-course-progress";

type LiveCourseWordLessonShellViewProps = {
  shell: LiveCourseWordLessonShell;
};

type HermeneuticalStatement = LiveCourseWordLessonStatement & {
  keeps?: string[];
  mayFlatten?: string[];
};

export function LiveCourseWordLessonShellView({ shell }: LiveCourseWordLessonShellViewProps) {
  const [activeDrawerIndex, setActiveDrawerIndex] = useState(0);
  const [isLessonComplete, setIsLessonComplete] = useState(false);

  const drawerTabs = useMemo(
    () =>
      shell.drawers.length > 0
        ? shell.drawers
        : [
            {
              drawerCode: "live_noel_packet",
              heading: "Live Noel Packet",
              body: {
                summary: shell.publicSummary,
                statements: [
                  {
                    label: "Function Reading",
                    title: shell.wordDisplayTitle,
                    lines: [shell.functionReading],
                  },
                ],
              },
            },
          ],
    [shell],
  );

  const activeDrawer = drawerTabs[activeDrawerIndex];
  const drawerProgressCurrent = activeDrawerIndex + 1;
  const drawerProgressTotal = drawerTabs.length;
  const drawerProgressPercent = Math.min(
    100,
    Math.max(0, Math.round((drawerProgressCurrent / drawerProgressTotal) * 100)),
  );
  const isFinalDrawer = drawerProgressCurrent >= drawerProgressTotal;

  function goPrevious() {
    setActiveDrawerIndex((current) => Math.max(current - 1, 0));
  }

  function goNext() {
    setActiveDrawerIndex((current) => Math.min(current + 1, drawerTabs.length - 1));
  }

  return (
    <main className="course-word-packet">
      <section className="course-word-packet__top-study" aria-label="Current word study">
        <p className="course-word-packet__top-study-kicker">Live Noel Word Study</p>
        <h1>{shell.wordDisplayTitle}</h1>
        <p className="course-word-packet__top-study-subtitle">
          {shell.course.title} · Lesson {shell.lessonNumber} of {shell.courseLessonTotal}
        </p>
        <div className="course-word-packet__top-progress" aria-label={`Lesson progress: drawer ${drawerProgressCurrent} of ${drawerProgressTotal}`}>
          <span>
            <span style={{ width: `${drawerProgressPercent}%` }} />
          </span>
        </div>
      </section>

      <section className="course-word-packet__drawer" aria-live="polite">
        <p className="course-word-packet__eyebrow">
          Module {activeDrawerIndex + 1} of {drawerTabs.length} · Noel live packet
        </p>
        <h2>{activeDrawer.heading}</h2>

        {activeDrawerIndex === 0 ? (
          <div className="course-word-packet__drawer-stamp course-word-packet__drawer-stamp-only-first" aria-label="Lesson vocabulary stamp">
            <TitusLexStamp stamp={shell.lexStamp} />
          </div>
        ) : null}

        <div className="course-word-packet__drawer-body course-word-packet__drawer-body--viewport">
          <LiveDrawerBody activeDrawer={activeDrawer} shell={shell} />
        </div>

        <div className="course-word-packet__drawer-actions course-movement-rail">
          <button disabled={activeDrawerIndex === 0} onClick={goPrevious} type="button" aria-label="Previous lesson section" title="Previous">
            ←
          </button>
          <div className="course-movement-rail__label">
            {isFinalDrawer && isLessonComplete ? "Lesson complete" : `${activeDrawer.heading} · ${activeDrawerIndex + 1} of ${drawerTabs.length}`}
          </div>
          {isFinalDrawer ? (
            isLessonComplete ? (
              <div className="course-movement-rail__complete-actions">
                <Link className="course-movement-rail__course-link" href={`/courses/${shell.course.slug}`}>
                  Course
                </Link>
                {shell.nextWordStudyHref ? (
                  <Link className="course-movement-rail__next-study-link" href={shell.nextWordStudyHref}>
                    {shell.nextWordStudyLabel ?? "Next word study →"}
                  </Link>
                ) : null}
              </div>
            ) : (
              <button className="button compact-button course-movement-finish" type="button" onClick={() => setIsLessonComplete(true)}>
                Finish
              </button>
            )
          ) : (
            <button className="button compact-button" type="button" onClick={goNext} aria-label="Continue to next lesson section" title="Continue">
              →
            </button>
          )}
        </div>
      </section>

      <TitusCourseProgressMarker />
    </main>
  );
}

function LiveDrawerBody({
  activeDrawer,
  shell,
}: {
  activeDrawer: LiveCourseWordLessonDrawer;
  shell: LiveCourseWordLessonShell;
}) {
  const isHermeneuticalDrawer =
    activeDrawer.drawerCode === "traditions" ||
    activeDrawer.drawerCode === "hermeneutical_readings" ||
    activeDrawer.drawerCode === "hermeneutic_readings";

  return (
    <section
      className={isHermeneuticalDrawer ? "course-word-packet__hermeneutical-summary" : "course-word-packet__lexicon-summary"}
      aria-label={`${activeDrawer.heading} from Noel`}
    >
      {activeDrawer.body.summary ? (
        <article className="course-word-packet__lexicon-statement">
          <p className="course-word-packet__field-label">Noel summary</p>
          <h3>{activeDrawer.heading}</h3>
          <p>{activeDrawer.body.summary}</p>
        </article>
      ) : null}

      {(activeDrawer.body.statements ?? []).map((statement) => (
        <LiveStatementCard
          key={`${activeDrawer.drawerCode}-${statement.title}`}
          statement={statement as HermeneuticalStatement}
          isHermeneuticalDrawer={isHermeneuticalDrawer}
        />
      ))}

      {activeDrawer.drawerCode === "lexicon" ? <LiveLexiconFacts shell={shell} /> : null}
      {activeDrawer.drawerCode === "travels_with" ? <LiveRelationshipFacts shell={shell} /> : null}
      {activeDrawer.drawerCode === "canon_chains" ? <LiveCanonPassages shell={shell} /> : null}
    </section>
  );
}

function LiveStatementCard({
  statement,
  isHermeneuticalDrawer,
}: {
  statement: HermeneuticalStatement;
  isHermeneuticalDrawer: boolean;
}) {
  const keeps = Array.isArray(statement.keeps) ? statement.keeps : [];
  const mayFlatten = Array.isArray(statement.mayFlatten) ? statement.mayFlatten : [];
  const hasTwoColumnReading = keeps.length > 0 || mayFlatten.length > 0;

  return (
    <article className={isHermeneuticalDrawer ? "course-word-packet__method-statement" : "course-word-packet__lexicon-statement"}>
      {statement.label ? <p className="course-word-packet__field-label">{statement.label}</p> : null}
      <h3>{statement.title}</h3>
      {statement.references ? <p className="course-word-packet__canon-chain-refs">{statement.references}</p> : null}

      {hasTwoColumnReading ? (
        <div className="course-word-packet__two-column-note">
          <div>
            <h4>Keeps in view</h4>
            <ul>
              {keeps.map((line) => (
                <li key={`${statement.title}-keeps-${line}`}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>May flatten</h4>
            <ul>
              {mayFlatten.map((line) => (
                <li key={`${statement.title}-flattens-${line}`}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <ul>
          {statement.lines.map((line) => (
            <li key={`${statement.title}-${line}`}>{line}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

function LiveLexiconFacts({ shell }: { shell: LiveCourseWordLessonShell }) {
  const mirror = shell.mirrors[0];

  return (
    <article className="course-word-packet__lexicon-statement">
      <p className="course-word-packet__field-label">Live Noel facts</p>
      <h3>Source packet fields</h3>
      <ul>
        <li>Primary live term: {shell.term.strongId} · {shell.term.surface} / {shell.term.transliteration} / {shell.term.gloss}</li>
        <li>Occurrence count in Proverbs: {shell.occurrenceCount ?? "—"}</li>
        <li>Baseline source: {shell.baseline.source}</li>
        {mirror ? <li>Greek mirror: {mirror.greekId} / {mirror.transliteration ?? "Greek witness"} / weight {mirror.weight ?? "—"}</li> : null}
        <li>Status: {shell.status}; confidence: {shell.confidence}</li>
      </ul>
    </article>
  );
}

function LiveRelationshipFacts({ shell }: { shell: LiveCourseWordLessonShell }) {
  if (shell.relationships.length === 0) return null;

  return (
    <article className="course-word-packet__lexicon-statement">
      <p className="course-word-packet__field-label">Relationships from Noel</p>
      <h3>Live linked terms</h3>
      <ul>
        {shell.relationships.map((relationship) => (
          <li key={`${relationship.relationshipType}-${relationship.targetStrongId}-${relationship.targetLabel}`}>
            {relationship.targetStrongId ? `${relationship.targetStrongId} · ` : ""}
            {relationship.targetLabel ?? "Related term"}
            {relationship.functionNote ? ` — ${relationship.functionNote}` : ""}
          </li>
        ))}
      </ul>
    </article>
  );
}

function LiveCanonPassages({ shell }: { shell: LiveCourseWordLessonShell }) {
  if (shell.canonPassages.length === 0) return null;

  return (
    <>
      {shell.canonPassages.map((passage) => (
        <article className="course-word-packet__canon-chain-statement" key={passage.ref}>
          <p className="course-word-packet__field-label">{passage.passageRole ?? "Canon passage"}</p>
          <h3>{passage.ref}</h3>
          {passage.notice ? <p>{passage.notice}</p> : null}
          {passage.text ? <pre className="course-word-packet__canon-chain-refs">{passage.text}</pre> : null}
        </article>
      ))}
    </>
  );
}
