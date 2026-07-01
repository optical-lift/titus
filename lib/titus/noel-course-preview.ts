import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { noel } from "@/lib/noel/client";

export type NoelCoursePreviewWord = {
  strongId: string;
  entityType: string;
  entityId: string;
  entityLabel: string;
  originalWord: string;
  transliteration: string;
  language: string;
  gloss: string;
  definition: string | null;
  roleLabel: string;
  functionNote: string;
};

export type NoelCoursePreviewLesson = {
  lessonNumber: number;
  lessonSlug: string;
  lessonHref: string;
  slotKey: string;
  slotTitle: string;
  slotRole: string;
  researchStatus: string;
  slotStatus: string;
  whyThisSlotExists: string;
  prerequisitesNote: string;
  lessonTitle: string;
  lessonSubtitle: string;
  lessonStatus: string;
  lessonConfidence: string;
  functionReading: string;
  publicSummary: string;
  knownLimits: string[];
  word: NoelCoursePreviewWord;
};

export type NoelCoursePreviewPacket = {
  courseSlug: string;
  title: string;
  subtitle: string;
  description: string;
  intendedReader: string;
  courseStatus: string;
  previewStatus: string;
  publicCaveat: string;
  source: {
    schema: string;
    view: string;
    mode: string;
  };
  lessons: NoelCoursePreviewLesson[];
};

function n(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function s(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function maybeString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function record(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return {};
}

function arr<T = Record<string, unknown>>(value: unknown): T[] {
  return Array.isArray(value) ? (value.filter(Boolean) as T[]) : [];
}

function normalizeWord(rawValue: unknown): NoelCoursePreviewWord {
  const raw = record(rawValue);

  return {
    strongId: s(raw.strongId),
    entityType: s(raw.entityType, "strong_id"),
    entityId: s(raw.entityId, s(raw.strongId)),
    entityLabel: s(raw.entityLabel),
    originalWord: s(raw.originalWord),
    transliteration: s(raw.transliteration),
    language: s(raw.language),
    gloss: s(raw.gloss),
    definition: maybeString(raw.definition),
    roleLabel: s(raw.roleLabel),
    functionNote: s(raw.functionNote),
  };
}

function normalizeLesson(rawValue: unknown): NoelCoursePreviewLesson {
  const raw = record(rawValue);
  const word = normalizeWord(raw.word);

  return {
    lessonNumber: n(raw.lessonNumber),
    lessonSlug: s(raw.lessonSlug),
    lessonHref: s(raw.lessonHref, `/lessons/${s(raw.lessonSlug)}`),
    slotKey: s(raw.slotKey),
    slotTitle: s(raw.slotTitle),
    slotRole: s(raw.slotRole),
    researchStatus: s(raw.researchStatus),
    slotStatus: s(raw.slotStatus),
    whyThisSlotExists: s(raw.whyThisSlotExists),
    prerequisitesNote: s(raw.prerequisitesNote),
    lessonTitle: s(raw.lessonTitle, word.strongId),
    lessonSubtitle: s(raw.lessonSubtitle, word.entityLabel),
    lessonStatus: s(raw.lessonStatus),
    lessonConfidence: s(raw.lessonConfidence),
    functionReading: s(raw.functionReading),
    publicSummary: s(raw.publicSummary),
    knownLimits: arr<string>(raw.knownLimits),
    word,
  };
}

function normalizePacket(rawValue: unknown): NoelCoursePreviewPacket | null {
  const raw = record(rawValue);

  const courseSlug = s(raw.courseSlug);
  if (!courseSlug) return null;

  const source = record(raw.source);

  return {
    courseSlug,
    title: s(raw.title, "Untitled Titus Course"),
    subtitle: s(raw.subtitle),
    description: s(raw.description),
    intendedReader: s(raw.intendedReader),
    courseStatus: s(raw.courseStatus),
    previewStatus: s(raw.previewStatus),
    publicCaveat: s(raw.publicCaveat),
    source: {
      schema: s(source.schema, "public"),
      view: s(source.view, "titus_course_preview_path_v1"),
      mode: s(source.mode, "draft_preview"),
    },
    lessons: arr(raw.lessons)
      .map(normalizeLesson)
      .filter((lesson) => lesson.lessonSlug)
      .sort((a, b) => a.lessonNumber - b.lessonNumber),
  };
}

export async function getNoelCoursePreviewPacketBySlug(
  courseSlug: string
): Promise<NoelCoursePreviewPacket | null> {
  noStore();

  const { data, error } = await noel.rpc(
    "get_titus_course_preview_packet_by_slug",
    {
      p_course_slug: courseSlug,
    }
  );

  if (error) {
    console.error(`Noel course preview RPC failed: ${error.message}`);
    return null;
  }

  return normalizePacket(data);
}

export type NoelCoursePreviewLessonPacket = {
  courseSlug: string;
  title: string;
  subtitle: string;
  description: string;
  courseStatus: string;
  previewStatus: string;
  publicCaveat: string;
  source: {
    schema: string;
    view: string;
    mode: string;
  };
  lesson: NoelCoursePreviewLesson;
};

function normalizeLessonPreviewRow(rawValue: unknown): NoelCoursePreviewLessonPacket | null {
  const raw = record(rawValue);
  const courseSlug = s(raw.course_slug);
  const lessonSlug = s(raw.lesson_slug);

  if (!courseSlug || !lessonSlug) return null;

  const strongId = s(raw.primary_strong_id, s(raw.strong_id));
  const word: NoelCoursePreviewWord = {
    strongId,
    entityType: s(raw.primary_entity_type, "strong_id"),
    entityId: s(raw.primary_entity_id, strongId),
    entityLabel: s(raw.primary_entity_label, s(raw.primary_field)),
    originalWord: s(raw.original_word),
    transliteration: s(raw.transliteration),
    language: s(raw.language),
    gloss: s(raw.gloss),
    definition: maybeString(raw.definition),
    roleLabel: s(raw.role_label),
    functionNote: s(raw.word_function_note, s(raw.function_note)),
  };

  return {
    courseSlug,
    title: s(raw.course_title, "Titus Course"),
    subtitle: s(raw.course_subtitle),
    description: s(raw.course_description),
    courseStatus: s(raw.course_status),
    previewStatus: s(raw.titus_preview_status, "preview_seed"),
    publicCaveat: s(raw.public_caveat),
    source: {
      schema: "public",
      view: "titus_course_preview_path_v1",
      mode: "draft_preview",
    },
    lesson: {
      lessonNumber: n(raw.slot_number),
      lessonSlug,
      lessonHref: `/lessons/${lessonSlug}`,
      slotKey: s(raw.slot_key),
      slotTitle: s(raw.slot_title),
      slotRole: s(raw.slot_role),
      researchStatus: s(raw.research_status),
      slotStatus: s(raw.slot_status),
      whyThisSlotExists: s(raw.why_this_slot_exists),
      prerequisitesNote: s(raw.prerequisites_note),
      lessonTitle: s(raw.lesson_title, strongId),
      lessonSubtitle: s(raw.lesson_subtitle, s(raw.primary_field)),
      lessonStatus: s(raw.lesson_status),
      lessonConfidence: s(raw.lesson_confidence),
      functionReading: s(raw.function_reading),
      publicSummary: s(raw.public_summary),
      knownLimits: arr<string>(raw.known_limits),
      word,
    },
  };
}

export async function getNoelCoursePreviewLessonBySlug(
  lessonSlug: string,
  courseSlug?: string | null
): Promise<NoelCoursePreviewLessonPacket | null> {
  noStore();

  let query = noel
    .from("titus_course_preview_path_v1")
    .select("*")
    .eq("lesson_slug", lessonSlug.toLowerCase())
    .order("sort_order", { ascending: true })
    .limit(1);

  if (courseSlug) {
    query = query.eq("course_slug", courseSlug);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Noel course preview lesson read failed: ${error.message}`);
    return null;
  }

  const firstRow = Array.isArray(data) ? data[0] : null;
  return firstRow ? normalizeLessonPreviewRow(firstRow) : null;
}
