import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import { noel } from "@/lib/noel/client";

export type SongLessonCatalogCard = {
  song_object_id: number;
  title: string;
  lesson_slug: string;
  public_path: string | null;
  titus_ui_status: string | null;
  public_badge: string | null;
  public_caveat: string | null;
  stage_count: number | null;
  song_anchor_count: number | null;
  confirmed_trigger_count: number | null;
  candidate_trigger_count: number | null;
  confirmed_stage_count: number | null;
  mixed_candidate_stage_count: number | null;
  candidate_heavy_stage_count: number | null;
  candidate_only_stage_count: number | null;
  expandable_stage_count: number | null;
  guardrail_count: number | null;
  contradiction_count: number | null;
  candidate_echo_count: number | null;
  trigger_preview_count: number | null;
};

export type SongLessonTriggerPreview = {
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

export type SongLessonStage = {
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
  confirmed_trigger_preview: SongLessonTriggerPreview[];
  candidate_trigger_preview: SongLessonTriggerPreview[];
};

export type SongLessonPacket = {
  lesson_card: SongLessonCatalogCard;
  source_packet?: Record<string, unknown> | null;
  object?: Record<string, unknown> | null;
  primary_governing_pattern?: Record<string, unknown> | null;
  public_render_rule?: Record<string, unknown> | null;
  song_anchors: Record<string, unknown>[];
  stages: SongLessonStage[];
  guardrails: Record<string, unknown>[];
  contradiction_controls: Record<string, unknown>[];
  pressure_buckets: Record<string, unknown>[];
  connected_song_objects: Record<string, unknown>[];
  canon_echoes_under_review: Record<string, unknown>[];
  known_limits: unknown[];
  error?: string;
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

function arr<T = Record<string, unknown>>(value: unknown): T[] {
  return Array.isArray(value) ? (value.filter(Boolean) as T[]) : [];
}

function normalizeCard(raw: Partial<SongLessonCatalogCard>): SongLessonCatalogCard {
  return {
    song_object_id: n(raw.song_object_id),
    title: s(raw.title, "Untitled Song Object Lesson"),
    lesson_slug: s(raw.lesson_slug),
    public_path: typeof raw.public_path === "string" ? raw.public_path : null,
    titus_ui_status: typeof raw.titus_ui_status === "string" ? raw.titus_ui_status : null,
    public_badge: typeof raw.public_badge === "string" ? raw.public_badge : "Public release seed",
    public_caveat: typeof raw.public_caveat === "string" ? raw.public_caveat : null,
    stage_count: n(raw.stage_count),
    song_anchor_count: n(raw.song_anchor_count),
    confirmed_trigger_count: n(raw.confirmed_trigger_count),
    candidate_trigger_count: n(raw.candidate_trigger_count),
    confirmed_stage_count: n(raw.confirmed_stage_count),
    mixed_candidate_stage_count: n(raw.mixed_candidate_stage_count),
    candidate_heavy_stage_count: n(raw.candidate_heavy_stage_count),
    candidate_only_stage_count: n(raw.candidate_only_stage_count),
    expandable_stage_count: n(raw.expandable_stage_count),
    guardrail_count: n(raw.guardrail_count),
    contradiction_count: n(raw.contradiction_count),
    candidate_echo_count: n(raw.candidate_echo_count),
    trigger_preview_count: n(raw.trigger_preview_count),
  };
}

function normalizeStage(raw: Partial<SongLessonStage>): SongLessonStage {
  return {
    stage_order: n(raw.stage_order),
    stage_id: s(raw.stage_id, `stage-${n(raw.stage_order)}`),
    stage_label: s(raw.stage_label, `Stage ${n(raw.stage_order)}`),
    stage_function: s(raw.stage_function),
    confirmed_trigger_count: n(raw.confirmed_trigger_count),
    candidate_trigger_count: n(raw.candidate_trigger_count),
    total_trigger_count: n(raw.total_trigger_count),
    public_trigger_display_rule: s(raw.public_trigger_display_rule, "public preview"),
    candidate_stage_status: s(raw.candidate_stage_status, "under review"),
    public_candidate_display_rule: s(
      raw.public_candidate_display_rule,
      "Candidate material remains under review."
    ),
    confirmed_trigger_preview: arr<SongLessonTriggerPreview>(raw.confirmed_trigger_preview),
    candidate_trigger_preview: arr<SongLessonTriggerPreview>(raw.candidate_trigger_preview),
  };
}

function normalizePacket(raw: SongLessonPacket): SongLessonPacket {
  return {
    ...raw,
    lesson_card: normalizeCard(raw.lesson_card ?? {}),
    song_anchors: arr(raw.song_anchors),
    stages: arr<Partial<SongLessonStage>>(raw.stages)
      .map(normalizeStage)
      .sort((a, b) => a.stage_order - b.stage_order),
    guardrails: arr(raw.guardrails),
    contradiction_controls: arr(raw.contradiction_controls),
    pressure_buckets: arr(raw.pressure_buckets),
    connected_song_objects: arr(raw.connected_song_objects),
    canon_echoes_under_review: arr(raw.canon_echoes_under_review),
    known_limits: Array.isArray(raw.known_limits) ? raw.known_limits : [],
  };
}

export async function getNoelSongLessonCatalog(): Promise<SongLessonCatalogCard[]> {
  noStore();

  const { data, error } = await noel
    .from("titus_song_object_lesson_catalog_v1")
    .select("*");

  if (error) {
    throw new Error(`Noel catalog read failed: ${error.message}`);
  }

  return ((data ?? []) as Partial<SongLessonCatalogCard>[])
    .map(normalizeCard)
    .filter((card) => card.lesson_slug)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getNoelSongLessonBySlug(
  lessonSlug: string
): Promise<SongLessonPacket | null> {
  noStore();

  const { data, error } = await noel.rpc("get_titus_song_object_lesson_by_slug", {
    p_lesson_slug: lessonSlug,
  });

  if (error) {
    throw new Error(`Noel lesson RPC failed: ${error.message}`);
  }

  if (!data || data.error) {
    return null;
  }

  return normalizePacket(data as SongLessonPacket);
}
