import "server-only";
import type { LexStamp } from "@/data/titus/lex-stamps";
import type {
  LiveCourseWordLessonDrawer,
  LiveCourseWordLessonShell,
} from "@/data/titus/live-course-word-lesson-types";
import { noel } from "@/lib/noel/client";

type AnyRecord = Record<string, any>;

const PROVERBS_NEXT_LESSONS: Record<string, { href: string; label: string }> = {
  h8451: { href: "/lessons/h8085?from=/courses/proverbs-law-vocabulary", label: "Start Hear / Obey →" },
  h8085: { href: "/lessons/h4687?from=/courses/proverbs-law-vocabulary", label: "Start Commandment →" },
  h4687: { href: "/lessons/h3820?from=/courses/proverbs-law-vocabulary", label: "Start Heart →" },
  h3820: { href: "/lessons/h6310?from=/courses/proverbs-law-vocabulary", label: "Start Mouth →" },
  h6310: { href: "/lessons/h1870?from=/courses/proverbs-law-vocabulary", label: "Start Way / Path →" },
  h1870: { href: "/lessons/h4941?from=/courses/proverbs-law-vocabulary", label: "Start Judgment / Justice →" },
  h4941: { href: "/lessons/h6666?from=/courses/proverbs-law-vocabulary", label: "Start Righteousness →" },
  h6666: { href: "/lessons/h2416?from=/courses/proverbs-law-vocabulary", label: "Start Life-State →" },
  h2416: { href: "/lessons/h2421?from=/courses/proverbs-law-vocabulary", label: "Start Live / Revive →" },
  h2421: { href: "/lessons/g3551?from=/courses/proverbs-law-vocabulary", label: "Start Nomos / Law Witness →" },
};

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function list<T = AnyRecord>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function compact(value: unknown, fallback: string, max = 160) {
  const rendered = text(value, fallback).replace(/\s+/g, " ").trim();
  return rendered.length > max ? `${rendered.slice(0, max - 1)}…` : rendered;
}

function identityParts(label: string) {
  const parts = label.split("/").map((part) => part.trim()).filter(Boolean);

  return {
    primary: parts[0] ?? label,
    secondary: parts.length > 1 ? parts.slice(1).join(" / ") : undefined,
  };
}

function toDrawers(rows: AnyRecord[]): LiveCourseWordLessonDrawer[] {
  return rows.map((drawer) => ({
    drawerCode: text(drawer.drawer_code, "drawer"),
    heading: text(drawer.heading, "Lesson"),
    body: drawer.body ?? {},
    status: text(drawer.status, "draft"),
    sortOrder: typeof drawer.sort_order === "number" ? drawer.sort_order : 0,
  }));
}

function buildLexStamp(row: AnyRecord, word: AnyRecord | undefined): LexStamp {
  const mirrors = list<AnyRecord>(row.mirrors);
  const mirror = mirrors[0];
  const passages = list<AnyRecord>(row.canon_passages);
  const anchor = passages.find((passage) => passage.book === "Pro") ?? passages[0];
  const identity = identityParts(text(row.primary_field, text(word?.function_note, "Word Field")));
  const lineage = list<AnyRecord>(row.lineage)
    .map((item) => ({
      strongId: text(item.related_object_id),
      transliteration: text(item.related_transliteration, text(item.related_object_id)),
    }))
    .filter((item) => item.strongId);

  return {
    strongId: text(row.primary_strong_id, text(word?.strong_id, "")),
    identitySource: "public.titus_course_word_lesson_live_v1",
    kjvLexicalSource: "intelligence.v_object_baseline_lexicon",
    currentObject: {
      strongId: text(row.primary_strong_id, text(word?.strong_id, "")),
      transliteration: text(row.baseline_transliteration, text(word?.transliteration, "")),
    },
    objectIdentityEnglishPrimary: identity.primary,
    objectIdentityEnglishSecondary: identity.secondary,
    inheritedKjvLexical: compact(row.baseline_gloss, "Noel baseline pending"),
    lxxMoment: mirror?.greek_id
      ? {
          resolved: true,
          greekStrongId: text(mirror.greek_id),
          transliteration: text(mirror.transliteration, "Greek witness"),
          english: compact(mirror.baseline_gloss, "Greek witness", 60),
        }
      : { resolved: false },
    anchor: {
      book: text(anchor?.book, "Pro"),
      chapter: typeof anchor?.chapter === "number" ? anchor.chapter : 1,
      verse: typeof anchor?.start_verse === "number" ? anchor.start_verse : 1,
    },
    lineage,
  };
}

export async function getLiveCourseWordLessonShell(
  lessonSlug: string,
): Promise<LiveCourseWordLessonShell | undefined> {
  const normalizedLessonSlug = lessonSlug.toLowerCase();

  const { data, error } = await noel
    .from("titus_course_word_lesson_live_v1")
    .select("*")
    .eq("lesson_slug", normalizedLessonSlug)
    .maybeSingle();

  if (error) {
    throw new Error(`Noel live course word lookup failed for ${lessonSlug}: ${error.message}`);
  }

  if (!data) {
    return undefined;
  }

  const row = data as AnyRecord;
  const words = list<AnyRecord>(row.words);
  const word = words[0];
  const primaryStrongId = text(row.primary_strong_id, text(word?.strong_id, ""));
  const primaryField = text(row.primary_field, text(word?.function_note, "Word Field"));
  const nextLesson = PROVERBS_NEXT_LESSONS[normalizedLessonSlug];

  return {
    lessonSlug: text(row.lesson_slug, normalizedLessonSlug),
    course: {
      slug: text(row.course_slug, "proverbs-law-vocabulary"),
      title: text(row.source_packet_label, "Proverbs as Law Vocabulary"),
      subtitle: "Cross-Canon Pattern",
    },
    lessonNumber: typeof row.lesson_number === "number" ? row.lesson_number : 1,
    courseLessonTotal: 11,
    lessonKind: "Word Field",
    methodLabel: "Read",
    languageLabel: text(word?.language, "Hebrew Field"),
    wordDisplayTitle: primaryField,
    term: {
      strongId: primaryStrongId,
      transliteration: text(row.baseline_transliteration, text(word?.transliteration, "")),
      surface: text(row.baseline_lemma, text(word?.original_word, "")),
      gloss: primaryField,
    },
    termsInView: words.map((candidate) => ({
      strongId: text(candidate.strong_id),
      transliteration: text(candidate.transliteration),
      surface: text(candidate.original_word),
      gloss: text(candidate.function_note, text(candidate.role_label)),
    })),
    positionNote: text(row.public_summary),
    functionReading: text(row.function_reading),
    publicSummary: text(row.public_summary),
    status: text(row.status, "draft"),
    confidence: text(row.confidence, "medium"),
    knownLimits: list<string>(row.known_limits),
    lexStamp: buildLexStamp(row, word),
    drawers: toDrawers(list<AnyRecord>(row.drawers)),
    canonPassages: list<AnyRecord>(row.canon_passages).map((passage) => ({
      ref: text(passage.ref, "Reference"),
      book: passage.book,
      chapter: passage.chapter,
      startVerse: passage.start_verse,
      endVerse: passage.end_verse,
      passageRole: passage.passage_role,
      notice: passage.notice,
      text: passage.text ?? null,
      sortOrder: passage.sort_order,
    })),
    relationships: list<AnyRecord>(row.relationships).map((relationship) => ({
      relationshipType: relationship.relationship_type,
      targetLabel: relationship.target_label,
      targetSlug: relationship.target_slug,
      targetStrongId: relationship.target_strong_id,
      sourceTable: relationship.source_table,
      sourceRef: relationship.source_ref,
      functionNote: relationship.function_note,
      status: relationship.status,
      sortOrder: relationship.sort_order,
    })),
    mirrors: list<AnyRecord>(row.mirrors).map((mirror) => ({
      greekId: mirror.greek_id,
      weight: mirror.weight,
      transliteration: mirror.transliteration,
      lemma: mirror.lemma,
      baselineGloss: mirror.baseline_gloss,
    })),
    lineage: list<AnyRecord>(row.lineage).map((item) => ({
      directionKind: item.direction_kind,
      relationBucket: item.relation_bucket,
      relatedObjectId: item.related_object_id,
      relatedTransliteration: item.related_transliteration,
      relatedLemma: item.related_lemma,
    })),
    occurrenceCount: word?.occurrence_count ?? null,
    baseline: {
      source: text(row.baseline_source, "intelligence.v_object_baseline_lexicon"),
      gloss: text(row.baseline_gloss),
      definitionText: text(row.baseline_definition_text),
      kjvUsage: text(row.kjv_usage),
    },
    nextWordStudyHref: nextLesson?.href,
    nextWordStudyLabel: nextLesson?.label,
  };
}
