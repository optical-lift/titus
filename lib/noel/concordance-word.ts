import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { noel } from "@/lib/noel/client";

type AnyRecord = Record<string, any>;

export type ConcordanceBookCount = {
  book: string;
  occurrences: number;
  bookOrder?: number | null;
};

export type ConcordancePlacement = {
  courseSlug: string;
  lessonSlug: string;
  lessonNumber: number;
  title: string;
  subtitle?: string | null;
  courseTitle: string;
  primaryField: string;
  publicSummary: string;
  functionReading: string;
  status: string;
  confidence: string;
  canonPassageCount: number;
  relationshipCount: number;
};

export type ConcordanceMirror = {
  greekId: string;
  weight?: number | null;
  transliteration?: string | null;
  lemma?: string | null;
  baselineGloss?: string | null;
};

export type ConcordanceLineageItem = {
  directionKind?: string | null;
  relationBucket?: string | null;
  relatedObjectId?: string | null;
  relatedTransliteration?: string | null;
  relatedLemma?: string | null;
  relatedBaselineGloss?: string | null;
};

export type ConcordanceWord = {
  strongId: string;
  baselineSource?: string | null;
  baselineGloss?: string | null;
  baselineDefinitionText?: string | null;
  baselineTransliteration?: string | null;
  baselineLemma?: string | null;
  kjvUsage?: string | null;
  occurrenceCount: number;
  bookCounts: ConcordanceBookCount[];
  placements: ConcordancePlacement[];
  mirrors: ConcordanceMirror[];
  lineage: ConcordanceLineageItem[];
};

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function numberValue(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function list<T = AnyRecord>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

export async function getConcordanceWord(strongId: string): Promise<ConcordanceWord | undefined> {
  noStore();

  const normalizedStrongId = strongId.toUpperCase();
  const { data, error } = await noel
    .from("titus_concordance_word_v1")
    .select("*")
    .eq("strong_id", normalizedStrongId)
    .maybeSingle();

  if (error) {
    throw new Error(`Noel concordance word lookup failed for ${strongId}: ${error.message}`);
  }

  if (!data) {
    return undefined;
  }

  const row = data as AnyRecord;

  return {
    strongId: text(row.strong_id, normalizedStrongId),
    baselineSource: row.baseline_source,
    baselineGloss: row.baseline_gloss,
    baselineDefinitionText: row.baseline_definition_text,
    baselineTransliteration: row.baseline_transliteration,
    baselineLemma: row.baseline_lemma,
    kjvUsage: row.kjv_usage,
    occurrenceCount: numberValue(row.occurrence_count),
    bookCounts: list<AnyRecord>(row.book_counts).map((item) => ({
      book: text(item.book),
      occurrences: numberValue(item.occurrences),
      bookOrder: typeof item.book_order === "number" ? item.book_order : null,
    })),
    placements: list<AnyRecord>(row.placements).map((item) => ({
      courseSlug: text(item.course_slug),
      lessonSlug: text(item.lesson_slug),
      lessonNumber: numberValue(item.lesson_number, 1),
      title: text(item.title, text(item.primary_field, normalizedStrongId)),
      subtitle: item.subtitle,
      courseTitle: text(item.course_title, text(item.course_slug)),
      primaryField: text(item.primary_field),
      publicSummary: text(item.public_summary),
      functionReading: text(item.function_reading),
      status: text(item.status, "draft"),
      confidence: text(item.confidence, "medium"),
      canonPassageCount: numberValue(item.canon_passage_count),
      relationshipCount: numberValue(item.relationship_count),
    })),
    mirrors: list<AnyRecord>(row.mirrors).map((item) => ({
      greekId: text(item.greek_id),
      weight: item.weight,
      transliteration: item.transliteration,
      lemma: item.lemma,
      baselineGloss: item.baseline_gloss,
    })).filter((item) => item.greekId),
    lineage: list<AnyRecord>(row.lineage).map((item) => ({
      directionKind: item.direction_kind,
      relationBucket: item.relation_bucket,
      relatedObjectId: item.related_object_id,
      relatedTransliteration: item.related_transliteration,
      relatedLemma: item.related_lemma,
      relatedBaselineGloss: item.related_baseline_gloss,
    })).filter((item) => item.relatedObjectId),
  };
}
