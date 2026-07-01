"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "titus.course-progress.proverbs-law-vocabulary.v1";
const EVENT_NAME = "titus-course-progress-updated";

const LESSONS = [
  { slug: "h8451", strongId: "H8451", label: "Torah" },
  { slug: "h8085", strongId: "H8085", label: "Hear" },
  { slug: "h4687", strongId: "H4687", label: "Command" },
  { slug: "h3820", strongId: "H3820", label: "Heart" },
  { slug: "h6310", strongId: "H6310", label: "Mouth" },
  { slug: "h1870", strongId: "H1870", label: "Way" },
  { slug: "h4941", strongId: "H4941", label: "Justice" },
  { slug: "h6666", strongId: "H6666", label: "Righteous" },
  { slug: "h2416", strongId: "H2416", label: "Life" },
  { slug: "h2421", strongId: "H2421", label: "Live" },
  { slug: "g3551", strongId: "G3551", label: "Nomos" },
];

type TitusCourseProgressState = {
  completedLessonSlugs: string[];
  currentLessonSlug?: string;
  startedLessonSlugs?: string[];
  updatedAt?: string;
};

function emptyProgress(): TitusCourseProgressState {
  return {
    completedLessonSlugs: [],
    startedLessonSlugs: [],
  };
}

function readProgress(): TitusCourseProgressState {
  if (typeof window === "undefined") return emptyProgress();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();

    const parsed = JSON.parse(raw) as TitusCourseProgressState;

    return {
      completedLessonSlugs: Array.isArray(parsed.completedLessonSlugs)
        ? parsed.completedLessonSlugs
        : [],
      startedLessonSlugs: Array.isArray(parsed.startedLessonSlugs)
        ? parsed.startedLessonSlugs
        : [],
      currentLessonSlug: parsed.currentLessonSlug,
      updatedAt: parsed.updatedAt,
    };
  } catch {
    return emptyProgress();
  }
}

function writeProgress(next: TitusCourseProgressState) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...next,
      updatedAt: new Date().toISOString(),
    }),
  );

  window.dispatchEvent(new Event(EVENT_NAME));
}

function mergeUnique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function lessonFromPath() {
  if (typeof window === "undefined") return null;

  const match = window.location.pathname.match(/\/lessons\/([^/?#]+)/i);
  const slug = match?.[1]?.toLowerCase();

  if (!slug) return null;

  return LESSONS.find((lesson) => lesson.slug === slug) ?? null;
}

function markLessonStarted(lessonSlug: string) {
  const existing = readProgress();

  writeProgress({
    ...existing,
    currentLessonSlug: lessonSlug,
    startedLessonSlugs: mergeUnique([...(existing.startedLessonSlugs ?? []), lessonSlug]),
    completedLessonSlugs: mergeUnique(existing.completedLessonSlugs ?? []),
  });
}

function markLessonCompleted(lessonSlug: string) {
  const existing = readProgress();

  writeProgress({
    ...existing,
    currentLessonSlug: lessonSlug,
    startedLessonSlugs: mergeUnique([...(existing.startedLessonSlugs ?? []), lessonSlug]),
    completedLessonSlugs: mergeUnique([...(existing.completedLessonSlugs ?? []), lessonSlug]),
  });
}

export function TitusCourseProgressMarker() {
  useEffect(() => {
    const lesson = lessonFromPath();

    if (!lesson) return;

    markLessonStarted(lesson.slug);

    const syncCompletion = () => {
      const drawer = document.querySelector<HTMLElement>(".course-word-packet__drawer");
      const text = drawer?.textContent ?? "";
      const match = text.match(/DRAWER\s+(\d+)\s+OF\s+(\d+)/i);

      if (!match) return;

      const current = Number(match[1]);
      const total = Number(match[2]);

      if (Number.isFinite(current) && Number.isFinite(total) && total > 0 && current >= total) {
        markLessonCompleted(lesson.slug);
      }
    };

    const root = document.querySelector(".course-word-packet");
    const observer = root
      ? new MutationObserver(() => {
          window.setTimeout(syncCompletion, 0);
          window.setTimeout(syncCompletion, 80);
        })
      : null;

    if (observer && root) {
      observer.observe(root, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
      });
    }

    const onClick = () => {
      window.setTimeout(syncCompletion, 0);
      window.setTimeout(syncCompletion, 120);
    };

    syncCompletion();
    document.addEventListener("click", onClick, true);

    return () => {
      observer?.disconnect();
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}

export function TitusCourseProgress() {
  const [progress, setProgress] = useState<TitusCourseProgressState>(() => emptyProgress());

  useEffect(() => {
    const sync = () => setProgress(readProgress());

    sync();

    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const completedSet = useMemo(
    () => new Set(progress.completedLessonSlugs ?? []),
    [progress.completedLessonSlugs],
  );

  const startedSet = useMemo(
    () => new Set(progress.startedLessonSlugs ?? []),
    [progress.startedLessonSlugs],
  );

  const completedCount = LESSONS.filter((lesson) => completedSet.has(lesson.slug)).length;
  const percent = Math.round((completedCount / LESSONS.length) * 100);

  const currentLesson =
    LESSONS.find((lesson) => lesson.slug === progress.currentLessonSlug) ??
    LESSONS.find((lesson) => !completedSet.has(lesson.slug)) ??
    LESSONS[0];

  return (
    <section className="titus-course-progress-card" aria-label="Proverbs course progress">
      <div className="titus-course-progress-card__top">
        <span>Course progress</span>
        <strong>
          {completedCount} of {LESSONS.length} words studied
        </strong>
      </div>

      <div className="titus-course-progress-card__track" aria-hidden="true">
        <span style={{ width: `${percent}%` }} />
      </div>

      <div className="titus-course-progress-card__words" aria-label="Course vocabulary progress">
        {LESSONS.map((lesson, index) => {
          const completed = completedSet.has(lesson.slug);
          const started = startedSet.has(lesson.slug) || currentLesson.slug === lesson.slug;

          return (
            <span
              key={lesson.slug}
              className={[
                "titus-course-progress-card__word",
                completed ? "is-complete" : "",
                !completed && started ? "is-current" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              title={`${lesson.strongId} · ${lesson.label}`}
            >
              {completed ? "✓" : index + 1}
            </span>
          );
        })}
      </div>

      <p>
        {completedCount === LESSONS.length
          ? "Proverbs as Law Vocabulary is complete."
          : `Current word: ${currentLesson.strongId} · ${currentLesson.label}`}
      </p>
    </section>
  );
}
