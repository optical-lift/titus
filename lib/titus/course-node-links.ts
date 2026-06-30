import type { CourseAssemblyNode } from "@/data/titus/course-assemblies";

export function getCourseAssemblyNodeBaseHref(node: CourseAssemblyNode) {
  switch (node.type) {
    case "published_lesson":
      return `/lessons/${node.nodeSlug}`;
    case "canon_chain":
      return `/chains/${node.nodeSlug}`;
    case "function_lens":
      return `/lenses/${node.nodeSlug}`;
    case "pattern_debrief":
      return `/patterns/${node.nodeSlug}`;
    case "tradition_card":
      return `/traditions/${node.nodeSlug}`;
    case "queued_lesson":
      return `/lessons/${node.nodeSlug}`;
  }
}

export function getCourseAssemblyNodeHref(node: CourseAssemblyNode) {
  const baseHref = getCourseAssemblyNodeBaseHref(node);

  if (!baseHref) {
    return undefined;
  }

  const separator = baseHref.includes("?") ? "&" : "?";
  return `${baseHref}${separator}from=/courses/${node.courseSlug}`;
}

export function getCourseAssemblySectionLabel(section: CourseAssemblyNode["section"]) {
  switch (section) {
    case "course_path":
      return "Course Path";
    case "supporting_nodes":
      return "Supporting Nodes";
    case "traditions_in_conversation":
      return "Traditions in Conversation";
    case "queued_lessons":
      return "Queued Lessons";
  }
}

export function getCourseAssemblyTypeLabel(type: CourseAssemblyNode["type"]) {
  switch (type) {
    case "published_lesson":
      return "Published Lesson";
    case "queued_lesson":
      return "Queued Lesson";
    case "canon_chain":
      return "Canon Chain";
    case "function_lens":
      return "Function Lens";
    case "pattern_debrief":
      return "Pattern Debrief";
    case "tradition_card":
      return "Tradition Card";
  }
}
