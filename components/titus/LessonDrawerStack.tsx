"use client";

import { useMemo, useState } from "react";
import type { CanonPassage, LessonDrawer } from "@/data/titus/lessons";

type GuidedDrawer =
  | {
      code: "canon";
      heading: string;
      kind: "canon";
      passages: CanonPassage[];
    }
  | {
      code: string;
      heading: string;
      kind: "text";
      body: string[];
    };

export default function LessonDrawerStack({
  canonReading,
  drawers,
}: {
  canonReading: CanonPassage[];
  drawers: LessonDrawer[];
}) {
  const guidedDrawers: GuidedDrawer[] = useMemo(
    () => [
      {
        code: "canon",
        heading: "1 · Canon Reading",
        kind: "canon",
        passages: canonReading,
      },
      ...drawers.map((drawer) => ({
        ...drawer,
        kind: "text" as const,
      })),
    ],
    [canonReading, drawers]
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
    <section className="guided-lesson" aria-label="Guided lesson drawers">
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

        {openDrawer.kind === "canon" ? (
          <div className="drawer-body no-border">
            <p>
              Read the passage chain before receiving the Function Reading.
              The Bible text is the floor under the lesson.
            </p>

            {openDrawer.passages.map((passage) => (
              <article className="scripture-card" key={passage.ref}>
                <div className="scripture-ref">{passage.ref}</div>
                <p>{passage.text}</p>
                <p>
                  <strong>Notice:</strong> {passage.notice}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="drawer-body no-border">
            {openDrawer.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}

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
