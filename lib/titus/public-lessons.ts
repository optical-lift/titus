import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { noel } from "@/lib/noel/client";

export type TitusCatalogCard = {
  song_object_id: number;
  title: string;
  lesson_slug: string;
  public_path: string;
  titus_ui_status: string;
  public_badge: string;
  public_caveat: string | null;
  stage_count: number;
  song_anchor_count: number;
  confirmed_trigger_count: number;
  candidate_trigger_count: number;
  confirmed_stage_count: number;
  mixed_candidate_stage_count: number;
  candidate_heavy_stage_count: number;
  candidate_only_stage_count: number;
  expandable_stage_count: number;
  guardrail_count: number;
  contradiction_count: number;
  candidate_echo_count: number;
  trigger_preview_count: number;
  public_sort_order?: number | null;
};

export type TitusTriggerPreview = {
  surface?: string | null;
  language?: string | null;
  strong_id?: string | null;
  original_language?: string | null;
  transliteration?: string | null;
  lexeme_display?: string | null;
  lexical_note?: string | null;
  lexical_note_label?: string | null;
  public_identity_status?: string | null;
  function_label?: string | null;
  evidence_note?: string | null;
  review_note?: string | null;
  public_status?: string | null;
};

export type TitusLessonStage = {
  stage_order: number;
  stage_id: string;
  stage_label: string;
  stage_function: string;
  confirmed_trigger_count: number;
  candidate_trigger_count: number;
  total_trigger_count: number;
  public_trigger_display_rule: string;
  candidate_stage_status: string;
  public_candidate_display_rule: string;
  confirmed_trigger_preview: TitusTriggerPreview[];
  candidate_trigger_preview: TitusTriggerPreview[];
};

export type TitusFullLesson = {
  lesson_card: TitusCatalogCard;
  object: {
    song_object_id: number;
    object_name: string;
    object_type: string;
    object_status: string;
    provisional_function_lane: string;
    one_sentence_claim: string;
    mainstream_rival_reading: string;
    notes?: string | null;
  };
  primary_governing_pattern: {
    pattern_id: string;
    pattern_name: string;
    pattern_status: string;
    authority_level: string;
    plain_language_caption?: string | null;
    core_claim?: string | null;
    core_sequence?: string[] | null;
    rival_reading?: string | null;
    allowed_use?: string | null;
  };
  public_render_rule?: Record<string, unknown>;
  source_packet?: Record<string, unknown>;
  song_anchors: Array<Record<string, unknown>>;
  stages: TitusLessonStage[];
  guardrails: Array<Record<string, unknown>>;
  contradiction_controls: Array<Record<string, unknown>>;
  pressure_buckets: Array<Record<string, unknown>>;
  connected_song_objects: Array<Record<string, unknown>>;
  canon_echoes_under_review: Array<Record<string, unknown>>;
  known_limits: string[];
  error?: string;
};

function asRecordArray(value: unknown): Array<Record<string, unknown>> {
  return Array.isArray(value) ? (value.filter(Boolean) as Array<Record<string, unknown>>) : [];
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
}

function asTriggerArray(value: unknown): TitusTriggerPreview[] {
  return Array.isArray(value) ? (value.filter(Boolean) as TitusTriggerPreview[]) : [];
}

function asNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function asText(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() !== "" ? value : fallback;
}

function normalizeCatalogCard(raw: Partial<TitusCatalogCard>): TitusCatalogCard {
  return {
    song_object_id: asNumber(raw.song_object_id),
    title: asText(raw.title, "Untitled Titus Lesson"),
    lesson_slug: asText(raw.lesson_slug),
    public_path: asText(raw.public_path),
    titus_ui_status: asText(raw.titus_ui_status, "public_seed"),
    public_badge: asText(raw.public_badge, "Public seed"),
    public_caveat: typeof raw.public_caveat === "string" ? raw.public_caveat : null,
    stage_count: asNumber(raw.stage_count),
    song_anchor_count: asNumber(raw.song_anchor_count),
    confirmed_trigger_count: asNumber(raw.confirmed_trigger_count),
    candidate_trigger_count: asNumber(raw.candidate_trigger_count),
    confirmed_stage_count: asNumber(raw.confirmed_stage_count),
    mixed_candidate_stage_count: asNumber(raw.mixed_candidate_stage_count),
    candidate_heavy_stage_count: asNumber(raw.candidate_heavy_stage_count),
    candidate_only_stage_count: asNumber(raw.candidate_only_stage_count),
    expandable_stage_count: asNumber(raw.expandable_stage_count),
    guardrail_count: asNumber(raw.guardrail_count),
    contradiction_count: asNumber(raw.contradiction_count),
    candidate_echo_count: asNumber(raw.candidate_echo_count),
    trigger_preview_count: asNumber(raw.trigger_preview_count),
    public_sort_order:
      typeof raw.public_sort_order === "number" ? raw.public_sort_order : null,
  };
}

function normalizeStage(raw: Partial<TitusLessonStage>): TitusLessonStage {
  return {
    stage_order: asNumber(raw.stage_order),
    stage_id: asText(raw.stage_id, `stage-${asNumber(raw.stage_order)}`),
    stage_label: asText(raw.stage_label, `Stage ${asNumber(raw.stage_order)}`),
    stage_function: asText(raw.stage_function),
    confirmed_trigger_count: asNumber(raw.confirmed_trigger_count),
    candidate_trigger_count: asNumber(raw.candidate_trigger_count),
    total_trigger_count: asNumber(raw.total_trigger_count),
    public_trigger_display_rule: asText(raw.public_trigger_display_rule, "public preview"),
    candidate_stage_status: asText(raw.candidate_stage_status, "review status pending"),
    public_candidate_display_rule: asText(raw.public_candidate_display_rule, "candidate material remains under review"),
    confirmed_trigger_preview: asTriggerArray(raw.confirmed_trigger_preview),
    candidate_trigger_preview: asTriggerArray(raw.candidate_trigger_preview),
  };
}

function normalizeLesson(raw: TitusFullLesson): TitusFullLesson {
  return {
    ...raw,
    lesson_card: normalizeCatalogCard(raw.lesson_card ?? {}),
    object: {
      song_object_id: asNumber(raw.object?.song_object_id),
      object_name: asText(raw.object?.object_name, "Song object"),
      object_type: asText(raw.object?.object_type),
      object_status: asText(raw.object?.object_status),
      provisional_function_lane: asText(raw.object?.provisional_function_lane),
      one_sentence_claim: asText(raw.object?.one_sentence_claim),
      mainstream_rival_reading: asText(raw.object?.mainstream_rival_reading),
      notes: typeof raw.object?.notes === "string" ? raw.object.notes : null,
    },
    primary_governing_pattern: {
      pattern_id: asText(raw.primary_governing_pattern?.pattern_id),
      pattern_name: asText(raw.primary_governing_pattern?.pattern_name, "Primary governing pattern"),
      pattern_status: asText(raw.primary_governing_pattern?.pattern_status),
      authority_level: asText(raw.primary_governing_pattern?.authority_level),
      plain_language_caption:
        typeof raw.primary_governing_pattern?.plain_language_caption === "string"
          ? raw.primary_governing_pattern.plain_language_caption
          : null,
      core_claim:
        typeof raw.primary_governing_pattern?.core_claim === "string"
          ? raw.primary_governing_pattern.core_claim
          : null,
      core_sequence: asStringArray(raw.primary_governing_pattern?.core_sequence),
      rival_reading:
        typeof raw.primary_governing_pattern?.rival_reading === "string"
          ? raw.primary_governing_pattern.rival_reading
          : null,
      allowed_use:
        typeof raw.primary_governing_pattern?.allowed_use === "string"
          ? raw.primary_governing_pattern.allowed_use
          : null,
    },
    song_anchors: asRecordArray(raw.song_anchors),
    stages: Array.isArray(raw.stages)
      ? raw.stages.map(normalizeStage).sort((a, b) => a.stage_order - b.stage_order)
      : [],
    guardrails: asRecordArray(raw.guardrails),
    contradiction_controls: asRecordArray(raw.contradiction_controls),
    pressure_buckets: asRecordArray(raw.pressure_buckets),
    connected_song_objects: asRecordArray(raw.connected_song_objects),
    canon_echoes_under_review: asRecordArray(raw.canon_echoes_under_review),
    known_limits: asStringArray(raw.known_limits),
  };
}

export async function getTitusPublicCatalog(): Promise<TitusCatalogCard[]> {
  noStore();

  const { data, error } = await noel
    .from("titus_song_object_lesson_catalog_v1")
    .select("*");

  if (error) {
    throw new Error(`Failed to load Titus catalog: ${error.message}`);
  }

  return ((data ?? []) as Partial<TitusCatalogCard>[])
    .map(normalizeCatalogCard)
    .sort((a, b) => {
      const aSort = typeof a.public_sort_order === "number" ? a.public_sort_order : 999999;
      const bSort = typeof b.public_sort_order === "number" ? b.public_sort_order : 999999;

      if (aSort !== bSort) return aSort - bSort;
      return a.title.localeCompare(b.title);
    });
}

export async function getTitusPublicLessonBySlug(
  lessonSlug: string
): Promise<TitusFullLesson | null> {
  noStore();

  const { data, error } = await noel.rpc(
    "get_titus_song_object_lesson_by_slug",
    {
      p_lesson_slug: lessonSlug,
    }
  );

  if (error) {
    throw new Error(`Failed to load Titus lesson: ${error.message}`);
  }

  if (!data || data.error) {
    return null;
  }

  return normalizeLesson(data as TitusFullLesson);
}
