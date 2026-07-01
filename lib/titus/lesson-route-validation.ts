import { lessons } from "@/data/titus/lessons";
import { queuedLessons } from "@/data/titus/queued-lessons";

export type LessonRouteIssue = {
  severity: "error" | "warning";
  route: string;
  message: string;
};

type RouteOwner = {
  route: string;
  ownerType: "published_lesson" | "queued_lesson" | "lesson_alias";
  ownerSlug: string;
};

type LessonWithOptionalAliases = {
  slug: string;
  aliases?: string[];
};

function normalizeRoute(value: string) {
  return value.trim().toLowerCase();
}

function getLessonAliases(lesson: LessonWithOptionalAliases) {
  return Array.isArray(lesson.aliases) ? lesson.aliases : [];
}

export function getLessonRouteIssues(): LessonRouteIssue[] {
  const issues: LessonRouteIssue[] = [];
  const routeOwners: RouteOwner[] = [];

  for (const lesson of lessons) {
    const lessonWithAliases = lesson as LessonWithOptionalAliases;
    const normalizedSlug = normalizeRoute(lesson.slug);

    if (lesson.slug !== normalizedSlug) {
      issues.push({
        severity: "error",
        route: lesson.slug,
        message: `Published lesson slug must be lowercase: ${lesson.slug}`,
      });
    }

    routeOwners.push({
      route: normalizedSlug,
      ownerType: "published_lesson",
      ownerSlug: lesson.slug,
    });

    for (const alias of getLessonAliases(lessonWithAliases)) {
      const normalizedAlias = normalizeRoute(alias);

      if (alias !== normalizedAlias) {
        issues.push({
          severity: "warning",
          route: alias,
          message: `Lesson alias should be lowercase for stable redirects: ${alias}`,
        });
      }

      routeOwners.push({
        route: normalizedAlias,
        ownerType: "lesson_alias",
        ownerSlug: lesson.slug,
      });
    }
  }

  for (const queuedLesson of queuedLessons) {
    const normalizedSlug = normalizeRoute(queuedLesson.slug);

    if (queuedLesson.slug !== normalizedSlug) {
      issues.push({
        severity: "error",
        route: queuedLesson.slug,
        message: `Queued lesson slug must be lowercase: ${queuedLesson.slug}`,
      });
    }

    routeOwners.push({
      route: normalizedSlug,
      ownerType: "queued_lesson",
      ownerSlug: queuedLesson.slug,
    });
  }

  const routes = [...new Set(routeOwners.map((owner) => owner.route))];

  for (const route of routes) {
    const owners = routeOwners.filter((owner) => owner.route === route);
    const publishedOwners = owners.filter(
      (owner) => owner.ownerType === "published_lesson"
    );
    const queuedOwners = owners.filter(
      (owner) => owner.ownerType === "queued_lesson"
    );
    const aliasOwners = owners.filter(
      (owner) => owner.ownerType === "lesson_alias"
    );

    if (publishedOwners.length > 1) {
      issues.push({
        severity: "error",
        route,
        message: `Multiple published lessons claim /lessons/${route}.`,
      });
    }

    if (queuedOwners.length > 1) {
      issues.push({
        severity: "error",
        route,
        message: `Multiple queued lessons claim /lessons/${route}.`,
      });
    }

    if (publishedOwners.length > 0 && queuedOwners.length > 0) {
      issues.push({
        severity: "error",
        route,
        message: `Lesson route /lessons/${route} is both published and queued. Remove it from queued lessons when publishing.`,
      });
    }

    for (const aliasOwner of aliasOwners) {
      const conflictsWithOtherPublished = publishedOwners.some(
        (owner) => owner.ownerSlug !== aliasOwner.ownerSlug
      );

      const conflictsWithQueued = queuedOwners.some(
        (owner) => owner.ownerSlug !== aliasOwner.ownerSlug
      );

      if (conflictsWithOtherPublished || conflictsWithQueued) {
        issues.push({
          severity: "error",
          route,
          message: `Lesson alias /lessons/${route} conflicts with another lesson route.`,
        });
      }
    }

    const duplicateAliasOwners = aliasOwners.filter(
      (owner, index) =>
        aliasOwners.findIndex(
          (candidate) =>
            candidate.route === owner.route &&
            candidate.ownerSlug === owner.ownerSlug
        ) !== index
    );

    if (duplicateAliasOwners.length > 0) {
      issues.push({
        severity: "warning",
        route,
        message: `Duplicate alias listed for /lessons/${route}.`,
      });
    }
  }

  return issues;
}

export function assertNoLessonRouteErrors() {
  const errors = getLessonRouteIssues().filter(
    (issue) => issue.severity === "error"
  );

  if (errors.length > 0) {
    throw new Error(
      `Titus lesson route validation failed:\n${errors
        .map((issue) => `- ${issue.message}`)
        .join("\n")}`
    );
  }
}
