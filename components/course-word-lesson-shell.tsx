"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CourseWordLessonShell } from "@/data/titus/course-word-lessons";
import { TitusLexStamp } from "@/components/titus-lex-stamp";

import { TitusCourseProgressMarker } from "@/components/titus-course-progress";

type CourseWordLessonShellViewProps = {
  shell: CourseWordLessonShell;
};

export function CourseWordLessonShellView({
  shell,
}: CourseWordLessonShellViewProps) {
  const [activeDrawerIndex, setActiveDrawerIndex] = useState(0);

  const identityRows = [
    ["Course", shell.course.title],
    ["Lesson", `${shell.lessonNumber} · ${shell.lessonKind}`],
    ["Method", shell.methodLabel],
    ["Field", shell.languageLabel],
    ["Strong’s ID", shell.term.strongId],
    ["Surface", shell.term.surface],
    ["Transliteration", shell.term.transliteration],
    ["Gloss", shell.term.gloss],
  ];

  const drawerTabs = useMemo(
    () => [
      {
        title: "Word Identity",
        description:
          "Begin by receiving the word as a named original-language anchor before moving through the course packet.",
        body: (
          <div className="course-word-packet__identity-grid">
            {identityRows.map(([label, value]) => (
              <div className="course-word-packet__identity-row" key={label}>
                <span>{label}</span>
                <p>{value}</p>
              </div>
            ))}
          </div>
        ),
      },
      {
        title: "Packet Field",
        description:
          "Locate this word inside the packet field it belongs to before treating it as an isolated study term.",
        body: (
          <div className="course-word-packet__field-card">
            <p className="course-word-packet__field-label">{shell.languageLabel}</p>
            <h3>{shell.lessonKind}</h3>
            <p>
              {shell.term.strongId} · {shell.term.transliteration} ·{" "}
              {shell.term.gloss}
            </p>
          </div>
        ),
      },
      {
        title: "Course Position",
        description:
          "Name what this lesson is doing inside the larger course path before continuing.",
        body: <p className="course-word-packet__note">{shell.positionNote}</p>,
      },
      {
        title: "Packet Terms in View",
        description:
          "Keep the surrounding packet terms visible so the word is read as part of the prepared field.",
        body: (
          <div className="course-word-packet__term-list">
            {shell.termsInView.map((term) => (
              <span className="course-word-packet__term" key={term.strongId}>
                <strong>{term.strongId}</strong>
                <em>{term.transliteration}</em>
                <small>{term.gloss}</small>
              </span>
            ))}
          </div>
        ),
      },
      {
        title: "Receive Carefully",
        description:
          "Receive this drawer as course preparation, not as the whole canon chain or final pattern claim.",
        body: (
          <div className="course-word-packet__field-card">
            <p className="course-word-packet__field-label">Next movement</p>
            <h3>Canon Chain</h3>
            <p>
              The next movement follows the canon chain after the word field is
              prepared.
            </p>
          </div>
        ),
      },
    ],
    [identityRows, shell],
  );

  const activeDrawer = drawerTabs[activeDrawerIndex];
function goPrevious() {
    setActiveDrawerIndex((current) => Math.max(current - 1, 0));
  }

  function goNext() {
    setActiveDrawerIndex((current) =>
      Math.min(current + 1, drawerTabs.length - 1),
    );
  }

  
  const drawerProgressCurrent = Number(activeDrawerIndex) + 1;
  const drawerProgressTotal = 5;
  const drawerProgressPercent = Math.min(
    100,
    Math.max(0, Math.round((drawerProgressCurrent / drawerProgressTotal) * 100)),
  );

return (
    <main className="course-word-packet">
      <Link className="course-word-packet__back" href={`/courses/${shell.course.slug}`}>
        ← Return to current course
      </Link>

{(() => {
  const courseTopPacket = (shell as Record<string, unknown>);
  const proverbsOrder: Record<string, number> = {
    h8451: 1,
    h8085: 2,
    h4687: 3,
    h3820: 4,
    h6310: 5,
    h1870: 6,
    h4941: 7,
    h6666: 8,
    h2416: 9,
    h2421: 10,
    g3551: 11,
  };

  const identityKey = String(
    courseTopPacket["lessonSlug"] ??
      courseTopPacket["strongId"] ??
      "",
  ).toLowerCase();

  const lessonNumberRaw = Number(
    courseTopPacket["lessonNumber"] ??
      proverbsOrder[identityKey] ??
      1,
  );

  const currentLesson =
    Number.isFinite(lessonNumberRaw) && lessonNumberRaw > 0
      ? lessonNumberRaw
      : 1;

  const totalLessonRaw = Number(
    courseTopPacket["courseLessonTotal"] ??
      courseTopPacket["lessonTotal"] ??
      11,
  );

  const totalLessons =
    Number.isFinite(totalLessonRaw) && totalLessonRaw >= currentLesson
      ? totalLessonRaw
      : 11;

  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((currentLesson / totalLessons) * 100)),
  );

  const strongId = String(courseTopPacket["strongId"] ?? courseTopPacket["lessonSlug"] ?? "H8451").toUpperCase();

  const studyTitle =
    strongId === "H8451"
      ? "Torah / Law-Instruction"
      : String(
          courseTopPacket["positionNote"] ??
            courseTopPacket["lessonTitle"] ??
            courseTopPacket["methodLabel"] ??
            "Word Study",
        );

  const courseTitle = String(
    courseTopPacket["courseTitle"] ??
      courseTopPacket["courseLabel"] ??
      "Proverbs as Law Vocabulary",
  );

  return (
    <section className="course-word-packet__top-study" aria-label="Current word study">
      <p className="course-word-packet__top-study-kicker">Greek & Hebrew Word Study</p>
      <h1>{studyTitle}</h1>
      <p className="course-word-packet__top-study-subtitle">
        {courseTitle} · Lesson {currentLesson} of {totalLessons}
      </p>
      <div className="course-word-packet__top-progress" aria-label={`Lesson progress: drawer ${drawerProgressCurrent} of ${drawerProgressTotal}`}>
        <span>
          <span style={{ width: `${drawerProgressPercent}%` }} />
        </span>
      </div>
    </section>
  );
})()}


      <section className="course-word-packet__drawer" aria-live="polite">
        <p className="course-word-packet__eyebrow">
          Drawer {activeDrawerIndex + 1} of {drawerTabs.length}
        </p>

        <h2>
          {activeDrawerIndex + 1} · {activeDrawer.title}
        </h2>

        <p className="course-word-packet__drawer-description">
          {activeDrawer.description}
        </p>

      {(() => {
    const shouldShowDrawerStamp =
      Number(
        (activeDrawer as Record<string, unknown>)["drawerNumber"] ??
          (activeDrawer as Record<string, unknown>)["number"] ??
          (activeDrawer as Record<string, unknown>)["step"] ??
          (activeDrawer as Record<string, unknown>)["id"] ??
          NaN,
      ) === 1 ||
      Number(activeDrawerIndex) === 0;

    return shouldShowDrawerStamp ? (
      <div className="course-word-packet__drawer-stamp course-word-packet__drawer-stamp-only-first" aria-label="Lesson vocabulary stamp">
                <TitusLexStamp stamp={shell.lexStamp} />
      </div>
    ) : null;
  })()}

        <div className="course-word-packet__drawer-body">{activeDrawer.body}</div>

        <div className="course-word-packet__drawer-actions">
          <button
            disabled={activeDrawerIndex === 0}
            onClick={goPrevious}
            type="button"
          >
            Previous
          </button>
          <button
            disabled={activeDrawerIndex === drawerTabs.length - 1}
            onClick={goNext}
            type="button"
          >
            Continue
          </button>
        </div>
      </section>

          <TitusCourseProgressMarker />
</main>
  );
}
