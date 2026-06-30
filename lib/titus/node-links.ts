import type { LessonAssemblyAttachment } from "@/data/titus/lesson-assemblies";
import { getTraditionPlacement } from "@/data/titus/tradition-notes";

export function getAttachmentBaseHref(attachment: LessonAssemblyAttachment) {
  switch (attachment.type) {
    case "canon_chain":
      return `/chains/${attachment.nodeSlug}`;
    case "pattern_debrief":
      return `/patterns/${attachment.nodeSlug}`;
    case "function_lens":
      return `/lenses/${attachment.nodeSlug}`;
    case "tradition_placement": {
      const placement = getTraditionPlacement(attachment.nodeSlug);
      return placement
        ? `/traditions/${placement.cardSlug}?placement=${placement.slug}`
        : undefined;
    }
  }
}

export function getAttachmentHref(attachment: LessonAssemblyAttachment) {
  const baseHref = getAttachmentBaseHref(attachment);

  if (!baseHref) {
    return undefined;
  }

  const separator = baseHref.includes("?") ? "&" : "?";
  return `${baseHref}${separator}from=/lessons/${attachment.lessonSlug}`;
}

export function getAttachmentTypeLabel(attachment: LessonAssemblyAttachment) {
  switch (attachment.type) {
    case "canon_chain":
      return "Canon Chain";
    case "pattern_debrief":
      return "Pattern Debrief";
    case "function_lens":
      return "Function Lens";
    case "tradition_placement":
      return "Tradition Placement";
  }
}
