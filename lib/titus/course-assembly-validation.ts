import { canonChains } from "@/data/titus/canon-chains";
import { courseAssemblies } from "@/data/titus/course-assemblies";
import { courses } from "@/data/titus/courses";
import { functionLenses } from "@/data/titus/function-lenses";
import { lessons } from "@/data/titus/lessons";
import { patternDebriefs } from "@/data/titus/pattern-debriefs";
import { queuedLessons } from "@/data/titus/queued-lessons";
import { traditionCards } from "@/data/titus/tradition-notes";

export type CourseAssemblyIssue = {
  severity: "error" | "warning";
  courseSlug: string;
  section: string;
  nodeSlug: string;
  message: string;
};

function hasSlug<T extends { slug: string }>(items: T[], slug: string) {
  return items.some((item) => item.slug === slug);
}

export function getCourseAssemblyIssues(): CourseAssemblyIssue[] {
  const issues: CourseAssemblyIssue[] = [];

  for (const node of courseAssemblies) {
    if (!hasSlug(courses, node.courseSlug)) {
      issues.push({
        severity: "error",
        courseSlug: node.courseSlug,
        section: node.section,
        nodeSlug: node.nodeSlug,
        message: `Course assembly points to missing course: ${node.courseSlug}`,
      });
    }

    if (node.type === "published_lesson" && !hasSlug(lessons, node.nodeSlug)) {
      issues.push({
        severity: "error",
        courseSlug: node.courseSlug,
        section: node.section,
        nodeSlug: node.nodeSlug,
        message: `Course assembly points to missing published lesson: ${node.nodeSlug}`,
      });
    }

    if (node.type === "queued_lesson" && !hasSlug(queuedLessons, node.nodeSlug)) {
      issues.push({
        severity: "error",
        courseSlug: node.courseSlug,
        section: node.section,
        nodeSlug: node.nodeSlug,
        message: `Course assembly points to missing queued lesson: ${node.nodeSlug}`,
      });
    }

    if (node.type === "canon_chain" && !hasSlug(canonChains, node.nodeSlug)) {
      issues.push({
        severity: "error",
        courseSlug: node.courseSlug,
        section: node.section,
        nodeSlug: node.nodeSlug,
        message: `Course assembly points to missing Canon Chain: ${node.nodeSlug}`,
      });
    }

    if (node.type === "function_lens" && !hasSlug(functionLenses, node.nodeSlug)) {
      issues.push({
        severity: "error",
        courseSlug: node.courseSlug,
        section: node.section,
        nodeSlug: node.nodeSlug,
        message: `Course assembly points to missing Function Lens: ${node.nodeSlug}`,
      });
    }

    if (node.type === "pattern_debrief" && !hasSlug(patternDebriefs, node.nodeSlug)) {
      issues.push({
        severity: "error",
        courseSlug: node.courseSlug,
        section: node.section,
        nodeSlug: node.nodeSlug,
        message: `Course assembly points to missing Pattern Debrief: ${node.nodeSlug}`,
      });
    }

    if (node.type === "tradition_card" && !hasSlug(traditionCards, node.nodeSlug)) {
      issues.push({
        severity: "error",
        courseSlug: node.courseSlug,
        section: node.section,
        nodeSlug: node.nodeSlug,
        message: `Course assembly points to missing Tradition Card: ${node.nodeSlug}`,
      });
    }
  }

  const activeCoursesWithoutAssemblies = courses.filter(
    (course) =>
      course.status === "active" &&
      !courseAssemblies.some((node) => node.courseSlug === course.slug)
  );

  for (const course of activeCoursesWithoutAssemblies) {
    issues.push({
      severity: "warning",
      courseSlug: course.slug,
      section: "all",
      nodeSlug: course.slug,
      message: `Active course has no course assembly nodes: ${course.slug}`,
    });
  }

  return issues;
}
