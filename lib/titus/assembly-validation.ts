import { canonChains } from "@/data/titus/canon-chains";
import { courses } from "@/data/titus/courses";
import { functionLenses } from "@/data/titus/function-lenses";
import { lessonAssemblies } from "@/data/titus/lesson-assemblies";
import { lessons } from "@/data/titus/lessons";
import { patternDebriefs } from "@/data/titus/pattern-debriefs";
import { traditionPlacements } from "@/data/titus/tradition-notes";

export type AssemblyIssue = {
  severity: "error" | "warning";
  attachmentLabel: string;
  lessonSlug: string;
  drawerCode: string;
  nodeSlug: string;
  message: string;
};

function hasSlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.some((item) => item.slug === slug);
}

export function getAssemblyIssues(): AssemblyIssue[] {
  const issues: AssemblyIssue[] = [];

  for (const attachment of lessonAssemblies) {
    if (!hasSlug(lessons, attachment.lessonSlug)) {
      issues.push({
        severity: "error",
        attachmentLabel: attachment.label,
        lessonSlug: attachment.lessonSlug,
        drawerCode: attachment.drawerCode,
        nodeSlug: attachment.nodeSlug,
        message: `Assembly points to missing lesson: ${attachment.lessonSlug}`,
      });
    }

    if (!hasSlug(courses, attachment.courseSlug)) {
      issues.push({
        severity: "error",
        attachmentLabel: attachment.label,
        lessonSlug: attachment.lessonSlug,
        drawerCode: attachment.drawerCode,
        nodeSlug: attachment.nodeSlug,
        message: `Assembly points to missing course: ${attachment.courseSlug}`,
      });
    }

    if (attachment.type === "canon_chain" && !hasSlug(canonChains, attachment.nodeSlug)) {
      issues.push({
        severity: "error",
        attachmentLabel: attachment.label,
        lessonSlug: attachment.lessonSlug,
        drawerCode: attachment.drawerCode,
        nodeSlug: attachment.nodeSlug,
        message: `Canon Chain attachment points to missing node: ${attachment.nodeSlug}`,
      });
    }

    if (
      attachment.type === "pattern_debrief" &&
      !hasSlug(patternDebriefs, attachment.nodeSlug)
    ) {
      issues.push({
        severity: "error",
        attachmentLabel: attachment.label,
        lessonSlug: attachment.lessonSlug,
        drawerCode: attachment.drawerCode,
        nodeSlug: attachment.nodeSlug,
        message: `Pattern Debrief attachment points to missing node: ${attachment.nodeSlug}`,
      });
    }

    if (
      attachment.type === "function_lens" &&
      !hasSlug(functionLenses, attachment.nodeSlug)
    ) {
      issues.push({
        severity: "error",
        attachmentLabel: attachment.label,
        lessonSlug: attachment.lessonSlug,
        drawerCode: attachment.drawerCode,
        nodeSlug: attachment.nodeSlug,
        message: `Function Lens attachment points to missing node: ${attachment.nodeSlug}`,
      });
    }

    if (
      attachment.type === "tradition_placement" &&
      !hasSlug(traditionPlacements, attachment.nodeSlug)
    ) {
      issues.push({
        severity: "error",
        attachmentLabel: attachment.label,
        lessonSlug: attachment.lessonSlug,
        drawerCode: attachment.drawerCode,
        nodeSlug: attachment.nodeSlug,
        message: `Tradition Placement attachment points to missing node: ${attachment.nodeSlug}`,
      });
    }
  }

  const lessonsWithoutAssemblies = lessons.filter(
    (lesson) =>
      !lessonAssemblies.some((attachment) => attachment.lessonSlug === lesson.slug)
  );

  for (const lesson of lessonsWithoutAssemblies) {
    issues.push({
      severity: "warning",
      attachmentLabel: lesson.title,
      lessonSlug: lesson.slug,
      drawerCode: "all",
      nodeSlug: lesson.slug,
      message: `Published lesson has no assembly attachments: ${lesson.slug}`,
    });
  }

  return issues;
}

export function assertNoAssemblyErrors() {
  const errors = getAssemblyIssues().filter((issue) => issue.severity === "error");

  if (errors.length > 0) {
    throw new Error(
      `Titus lesson assembly validation failed:\n${errors
        .map((issue) => `- ${issue.message}`)
        .join("\n")}`
    );
  }
}
