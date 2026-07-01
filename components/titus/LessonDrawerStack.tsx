"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getCanonChain } from "@/data/titus/canon-chains";
import type { LessonAssemblyAttachment } from "@/data/titus/lesson-assemblies";
import { getAttachmentHref } from "@/lib/titus/node-links";
import type { CanonPassage, LessonDrawer } from "@/data/titus/lessons";
import { getFunctionLens } from "@/data/titus/function-lenses";
import { getPatternDebriefs } from "@/data/titus/pattern-debriefs";
import {
  getTraditionCard,
  getTraditionPlacements,
} from "@/data/titus/tradition-notes";

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
  attachments,
  currentLessonHref,
}: {
  canonReading: CanonPassage[];
  drawers: LessonDrawer[];
  attachments: LessonAssemblyAttachment[];
  currentLessonHref: string;
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

  const canonChainAttachment = attachments.find(
    (attachment) =>
      attachment.drawerCode === "canon" && attachment.type === "canon_chain"
  );

  const functionLensAttachment = attachments.find(
    (attachment) =>
      attachment.drawerCode === "function" && attachment.type === "function_lens"
  );

  const companionPatternAttachments = attachments.filter(
    (attachment) =>
      attachment.drawerCode === "companions" &&
      attachment.type === "pattern_debrief"
  );

  const traditionPlacementAttachments = attachments.filter(
    (attachment) =>
      attachment.drawerCode === "traditions" &&
      attachment.type === "tradition_placement"
  );

  const companionPatterns = getPatternDebriefs(
    companionPatternAttachments.map((attachment) => attachment.nodeSlug)
  );

  const functionLens = functionLensAttachment
    ? getFunctionLens(functionLensAttachment.nodeSlug)
    : undefined;

  const canonChain = canonChainAttachment
    ? getCanonChain(canonChainAttachment.nodeSlug)
    : undefined;

  const traditionPlacements = getTraditionPlacements(
    traditionPlacementAttachments.map((attachment) => attachment.nodeSlug)
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
                <div className="scripture-text">
                  {passage.text.split("\n").map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <p>
                  <strong>Notice:</strong> {passage.notice}
                </p>
              </article>
            ))}

            {canonChain ? (
              <div className="function-lens-callout">
                <span className="status">Canon Chain</span>
                <h3>{canonChain.title}</h3>
                <p>{canonChain.subtitle}</p>
                {canonChainAttachment ? (
                  <Link
                    className="button compact-button"
                    href={getAttachmentHref(canonChainAttachment) || currentLessonHref}
                  >
                    Open Canon Chain
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="drawer-body no-border">
            {openDrawer.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {openDrawer.code === "companions" ? (
              <div className="pattern-card-grid" aria-label="Pattern debrief links">
                {companionPatterns.map((pattern) => {
                  const attachment = companionPatternAttachments.find(
                    (candidate) => candidate.nodeSlug === pattern.slug
                  );

                  return (
                    <Link
                      className="pattern-card"
                      href={attachment ? getAttachmentHref(attachment) || currentLessonHref : currentLessonHref}
                      key={pattern.slug}
                    >
                      <span className="status">Pattern Debrief</span>
                      <h3>{pattern.title}</h3>
                      <p>{pattern.whyThisPatternMatters[0]}</p>
                      <span className="small-link">Open debrief →</span>
                    </Link>
                  );
                })}
              </div>
            ) : null}

            {openDrawer.code === "traditions" ? (
              <div className="pattern-card-grid" aria-label="Tradition placement links">
                {traditionPlacements.map((placement) => {
                  const card = getTraditionCard(placement.cardSlug);
                  const attachment = traditionPlacementAttachments.find(
                    (candidate) => candidate.nodeSlug === placement.slug
                  );

                  if (!card || !attachment) {
                    return null;
                  }

                  return (
                    <Link
                      className="pattern-card"
                      href={getAttachmentHref(attachment) || currentLessonHref}
                      key={placement.slug}
                    >
                      <span className="status">Tradition Placement</span>
                      <h3>{card.title}</h3>
                      <p>{placement.placementSummary}</p>
                      <span className="small-link">Open tradition card →</span>
                    </Link>
                  );
                })}
              </div>
            ) : null}

            {openDrawer.code === "function" && functionLens ? (
              <div className="function-lens-callout">
                <span className="status">Function Lens</span>
                <h3>{functionLens.title}</h3>
                <p>{functionLens.subtitle}</p>
                {functionLensAttachment ? (
                  <Link
                    className="button compact-button"
                    href={getAttachmentHref(functionLensAttachment) || currentLessonHref}
                  >
                    Open Function Lens
                  </Link>
                ) : null}
              </div>
            ) : null}
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
