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
  public_sort_order: number;
};

export type TitusTriggerPreview = {
  surface: string;
  language: string;
  strong_id: string;
  original_language: string;
  transliteration: string;
  lexeme_display: string;
  lexical_note?: string;
  lexical_note_label?: string;
  public_identity_status: string;
  function_label: string;
  evidence_note?: string;
  review_note?: string;
  public_status?: string;
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
    notes?: string;
  };
  primary_governing_pattern: {
    pattern_id: string;
    pattern_name: string;
    pattern_status: string;
    authority_level: string;
    plain_language_caption?: string;
    core_claim?: string;
    core_sequence?: string[];
    rival_reading?: string;
    allowed_use?: string;
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

export async function getTitusPublicCatalog(): Promise<TitusCatalogCard[]> {
  noStore();

  const { data, error } = await noel
    .from("titus_song_object_lesson_catalog_v1")
    .select("*")
    .order("public_sort_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    throw new Error(`Failed to load Titus catalog: ${error.message}`);
  }

  return (data ?? []) as TitusCatalogCard[];
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

  return data as TitusFullLesson;
}
