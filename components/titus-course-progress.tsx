"use client";

import { useEffect, useMemo, useState } from "react";

type ProgressProps = {
  courseSlug?: string;
  lessonSlug?: string;
  strongId?: string;
  markComplete?: boolean;
  status?: string;
  [key: string]: unknown;
};

type StoredProgress = {
  completedLessons?: string[];
  completedLessonSlugs?: string[];
  completed?: string[];
  startedLessons?: string[];
  lastLessonSlug?: string;
};

const COURSE_SLUG = "proverbs-law-vocabulary";
const STORAGE_KEY = `titus.course-progress.${COURSE_SLUG}.v1`;

const proverbsLessons = [
  { number: 1, slug: "h8451", strongId: "H8451", original: "תורה", transliteration: "tôrâ", title: "Torah / Law-Instruction" },
  { number: 2, slug: "h8085", strongId: "H8085", original: "שמע", transliteration: "shāmaʿ", title: "Hear / Obey" },
  { number: 3, slug: "h4687", strongId: "H4687", original: "מצוה", transliteration: "mitsvâh", title: "Commandment" },
  { number: 4, slug: "h3820", strongId: "H3820", original: "לב", transliteration: "lēb", title: "Heart" },
  { number: 5, slug: "h6310", strongId: "H6310", original: "פה", transliteration: "peh", title: "Mouth" },
  { number: 6, slug: "h1870", strongId: "H1870", original: "דרך", transliteration: "derek", title: "Way / Path" },
  { number: 7, slug: "h4941", strongId: "H4941", original: "משפט", transliteration: "mishpāṭ", title: "Judgment / Justice" },
  { number: 8, slug: "h6666", strongId: "H6666", original: "צדקה", transliteration: "ṣᵉdāqâh", title: "Righteousness" },
  { number: 9, slug: "h2416", strongId: "H2416", original: "חי", transliteration: "ḥay", title: "Life-State" },
  { number: 10, slug: "h2421", strongId: "H2421", original: "חיה", transliteration: "ḥāyâh", title: "Live / Revive" },
  { number: 11, slug: "g3551", strongId: "G3551", original: "νόμος", transliteration: "nomos", title: "Nomos / Law Witness" },
];

function normalizeSlug(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/^\/?lessons\//, "")
    .replace(/^\//, "");
}

function readStoredProgress(): StoredProgress {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return { completedLessons: parsed.map(normalizeSlug) };
    }

    if (parsed && typeof parsed === "object") {
      return parsed as StoredProgress;
    }
  } catch {
    return {};
  }

  return {};
}

function writeStoredProgress(next: StoredProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function getCompletedSet(progress: StoredProgress) {
  return new Set(
    [
      ...(progress.completedLessons ?? []),
      ...(progress.completedLessonSlugs ?? []),
      ...(progress.completed ?? []),
    ].map(normalizeSlug),
  );
}

export function TitusCourseProgress(_props: ProgressProps) {
  const [progress, setProgress] = useState<StoredProgress>({});

  useEffect(() => {
    setProgress(readStoredProgress());
  }, []);

  const completedSet = useMemo(() => getCompletedSet(progress), [progress]);
  const completedCount = proverbsLessons.filter((lesson) =>
    completedSet.has(lesson.slug),
  ).length;

  const currentLesson =
    proverbsLessons.find((lesson) => !completedSet.has(lesson.slug)) ??
    proverbsLessons[proverbsLessons.length - 1];

  const nextLesson = proverbsLessons.find(
    (lesson) => lesson.number === currentLesson.number + 1,
  );

  const previousLesson = proverbsLessons.find(
    (lesson) => lesson.number === currentLesson.number - 1,
  );

  const progressPercent = Math.round(
    (completedCount / proverbsLessons.length) * 100,
  );

  const visibleMilestones = [previousLesson, currentLesson, nextLesson].filter(
    Boolean,
  ) as typeof proverbsLessons;

  return (
    <section className="titus-course-progress-rail" aria-label="Course progress">
      <div className="titus-course-progress-rail__top">
        <div>
          <p>Course progress</p>
          <h3>
            Lesson {currentLesson.number} of {proverbsLessons.length}
          </h3>
        </div>
        <strong>{completedCount} studied</strong>
      </div>

      <div
        className="titus-course-progress-rail__bar"
        aria-label={`${completedCount} of ${proverbsLessons.length} lessons complete`}
      >
        <span style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="titus-course-progress-rail__current">
        <span>Current word</span>
        <h4>{currentLesson.title}</h4>
        <p>
          {currentLesson.strongId} · {currentLesson.original} /{" "}
          {currentLesson.transliteration}
        </p>
      </div>

      <div className="titus-course-progress-rail__milestones">
        {visibleMilestones.map((lesson) => {
          const isComplete = completedSet.has(lesson.slug);
          const isCurrent = lesson.slug === currentLesson.slug;

          return (
            <span
              className={[
                "titus-course-progress-rail__milestone",
                isComplete ? "is-complete" : "",
                isCurrent ? "is-current" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={lesson.slug}
            >
              <b>{isComplete ? "✓" : lesson.number}</b>
              <em>{isCurrent ? "Now" : lesson.title}</em>
            </span>
          );
        })}
      </div>
    </section>
  );
}

export function TitusCourseProgressMarker({
  lessonSlug,
  strongId,
  markComplete,
  status,
}: ProgressProps) {
  useEffect(() => {
    const slug = normalizeSlug(lessonSlug ?? strongId);
    if (!slug) return;

    const current = readStoredProgress();
    const startedLessons = new Set(
      (current.startedLessons ?? []).map(normalizeSlug),
    );

    startedLessons.add(slug);

    const completedLessons = getCompletedSet(current);

    if (markComplete || status === "complete" || status === "completed") {
      completedLessons.add(slug);
    }

    writeStoredProgress({
      ...current,
      startedLessons: [...startedLessons],
      completedLessons: [...completedLessons],
      lastLessonSlug: slug,
    });
  }, [lessonSlug, strongId, markComplete, status]);

  return null;
}

export function TitusCourseProgressCard(props: ProgressProps) {
  return <TitusCourseProgress {...props} />;
}

export function ProverbsCourseProgress(props: ProgressProps) {
  return <TitusCourseProgress {...props} />;
}

export function TitusCourseProgressPanel(props: ProgressProps) {
  return <TitusCourseProgress {...props} />;
}

export function TitusCourseProgressWidget(props: ProgressProps) {
  return <TitusCourseProgress {...props} />;
}

export default TitusCourseProgress;
