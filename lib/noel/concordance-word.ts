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

export type ConcordanceSurfaceForm = {
  position?: number | null;
  kjvSurface?: string | null;
  bibleRender?: string | null;
  readableRender?: string | null;
  conceptualRender?: string | null;
  preferredReadableRender?: string | null;
  preferredConceptualRender?: string | null;
  strongsTransliteration?: string | null;
  hebrewSurface?: string | null;
  lemma?: string | null;
  morph?: string | null;
};

export type ConcordancePlacementMatch = {
  courseSlug: string;
  lessonSlug: string;
  courseTitle: string;
  lessonNumber: number;
  title: string;
  primaryField: string;
  passageRef?: string | null;
  passageRole?: string | null;
};

export type ConcordanceOccurrence = {
  strongId: string;
  book: string;
  chapter: number;
  verse: number;
  firstPosition?: number | null;
  tokenCount: number;
  canonOrder?: number | null;
  verseText?: string | null;
  bibleText?: string | null;
  readableText?: string | null;
  conceptualText?: string | null;
  surfaceForms: ConcordanceSurfaceForm[];
  placementMatches: ConcordancePlacementMatch[];
};

export type ConcordanceRenderingExample = {
  book: string;
  chapter: number;
  verse: number;
  position?: number | null;
  bibleRender?: string | null;
  readableRender?: string | null;
  conceptualRender?: string | null;
  preferredReadableRender?: string | null;
  preferredConceptualRender?: string | null;
};

export type ConcordanceRendering = {
  strongId: string;
  rendering: string;
  tokenCount: number;
  verseCount: number;
  examples: ConcordanceRenderingExample[];
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
  occurrences: ConcordanceOccurrence[];
  renderings: ConcordanceRendering[];
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

function mapSurfaceForm(item: AnyRecord): ConcordanceSurfaceForm {
  return {
    position: typeof item.position === "number" ? item.position : null,
    kjvSurface: item.kjv_surface,
    bibleRender: item.bible_render,
    readableRender: item.readable_render,
    conceptualRender: item.conceptual_render,
    preferredReadableRender: item.preferred_readable_render,
    preferredConceptualRender: item.preferred_conceptual_render,
    strongsTransliteration: item.strongs_transliteration,
    hebrewSurface: item.hebrew_surface,
    lemma: item.lemma,
    morph: item.morph,
  };
}

function mapPlacementMatch(item: AnyRecord): ConcordancePlacementMatch {
  return {
    courseSlug: text(item.course_slug),
    lessonSlug: text(item.lesson_slug),
    courseTitle: text(item.course_title, text(item.course_slug)),
    lessonNumber: numberValue(item.lesson_number, 1),
    title: text(item.title, text(item.primary_field)),
    primaryField: text(item.primary_field),
    passageRef: item.passage_ref,
    passageRole: item.passage_role,
  };
}

function mapOccurrence(item: AnyRecord): ConcordanceOccurrence {
  return {
    strongId: text(item.strong_id),
    book: text(item.book),
    chapter: numberValue(item.chapter),
    verse: numberValue(item.verse),
    firstPosition: typeof item.first_position === "number" ? item.first_position : null,
    tokenCount: numberValue(item.token_count),
    canonOrder: typeof item.canon_order === "number" ? item.canon_order : null,
    verseText: item.verse_text,
    bibleText: item.bible_text,
    readableText: item.readable_text,
    conceptualText: item.conceptual_text,
    surfaceForms: list<AnyRecord>(item.surface_forms).map(mapSurfaceForm),
    placementMatches: list<AnyRecord>(item.placement_matches).map(mapPlacementMatch),
  };
}

function mapRenderingExample(item: AnyRecord): ConcordanceRenderingExample {
  return {
    book: text(item.book),
    chapter: numberValue(item.chapter),
    verse: numberValue(item.verse),
    position: typeof item.position === "number" ? item.position : null,
    bibleRender: item.bible_render,
    readableRender: item.readable_render,
    conceptualRender: item.conceptual_render,
    preferredReadableRender: item.preferred_readable_render,
    preferredConceptualRender: item.preferred_conceptual_render,
  };
}

function mapRendering(item: AnyRecord): ConcordanceRendering {
  return {
    strongId: text(item.strong_id),
    rendering: text(item.rendering, "—"),
    tokenCount: numberValue(item.token_count),
    verseCount: numberValue(item.verse_count),
    examples: list<AnyRecord>(item.examples).map(mapRenderingExample),
  };
}

async function getOccurrences(normalizedStrongId: string): Promise<ConcordanceOccurrence[]> {
  const { data, error } = await noel.rpc("get_titus_concordance_occurrences", {
    p_strong_id: normalizedStrongId,
    p_limit: 250,
  });

  if (error) {
    throw new Error(`Noel concordance occurrence lookup failed for ${normalizedStrongId}: ${error.message}`);
  }

  return list<AnyRecord>(data).map(mapOccurrence);
}

async function getRenderings(normalizedStrongId: string): Promise<ConcordanceRendering[]> {
  const { data, error } = await noel.rpc("get_titus_concordance_renderings", {
    p_strong_id: normalizedStrongId,
    p_limit: 40,
  });

  if (error) {
    throw new Error(`Noel concordance rendering lookup failed for ${normalizedStrongId}: ${error.message}`);
  }

  return list<AnyRecord>(data).map(mapRendering);
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
  const [occurrences, renderings] = await Promise.all([
    getOccurrences(normalizedStrongId),
    getRenderings(normalizedStrongId),
  ]);

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
    occurrences,
    renderings,
  };
}
