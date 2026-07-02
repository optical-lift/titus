import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import { noel } from "@/lib/noel/client";

type AnyRecord = Record<string, any>;

export type ConcordanceLibraryPlacement = {
  courseSlug: string;
  lessonSlug: string;
  lessonNumber: number;
  title: string;
  courseTitle: string;
  publicSummary: string;
};

export type ConcordanceLibraryWord = {
  strongId: string;
  baselineSource?: string | null;
  baselineGloss?: string | null;
  baselineDefinitionText?: string | null;
  baselineTransliteration?: string | null;
  baselineLemma?: string | null;
  kjvUsage?: string | null;
  occurrenceCount: number;
  bookCount: number;
  placementCount: number;
  mirrorCount: number;
  lineageCount: number;
  placements: ConcordanceLibraryPlacement[];
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

function normalize(row: AnyRecord): ConcordanceLibraryWord {
  return {
    strongId: text(row.strong_id),
    baselineSource: row.baseline_source,
    baselineGloss: row.baseline_gloss,
    baselineDefinitionText: row.baseline_definition_text,
    baselineTransliteration: row.baseline_transliteration,
    baselineLemma: row.baseline_lemma,
    kjvUsage: row.kjv_usage,
    occurrenceCount: numberValue(row.occurrence_count),
    bookCount: numberValue(row.book_count),
    placementCount: numberValue(row.placement_count),
    mirrorCount: numberValue(row.mirror_count),
    lineageCount: numberValue(row.lineage_count),
    placements: list<AnyRecord>(row.placements).map((item) => ({
      courseSlug: text(item.course_slug),
      lessonSlug: text(item.lesson_slug),
      lessonNumber: numberValue(item.lesson_number, 1),
      title: text(item.title, text(item.primary_field)),
      courseTitle: text(item.course_title, text(item.course_slug)),
      publicSummary: text(item.public_summary),
    })),
  };
}

export async function getConcordanceLibrary(query?: string | null): Promise<ConcordanceLibraryWord[]> {
  noStore();

  const q = query?.trim().toLowerCase();
  let request = noel
    .from("titus_concordance_library_v1")
    .select("*")
    .order("placement_count", { ascending: false })
    .order("strong_id", { ascending: true });

  if (q) {
    request = request.ilike("search_text", `%${q}%`);
  }

  const { data, error } = await request;

  if (error) {
    throw new Error(`Noel concordance library lookup failed: ${error.message}`);
  }

  return list<AnyRecord>(data).map(normalize).filter((word) => word.strongId);
}
