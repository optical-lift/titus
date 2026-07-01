import "server-only";
import { noel } from "./client";

export type NoelWordIdentity = {
  strong_id: string;
  lemma: string | null;
  transliteration: string | null;
  gloss: string | null;
  definition: string | null;
  language: string | null;
};

export type NoelWordOccurrence = {
  strong_id: string;
  book: string;
  chapter: number;
  verse: number;
  first_position: number | null;
  token_count: number;
  canon_order: number | null;
};

export type NoelVerseText = {
  book: string;
  chapter: number;
  verse: number;
  bible_text: string | null;
  readable_text: string | null;
  conceptual_text: string | null;
};

export type TitusNoelWordPacket = {
  identity: NoelWordIdentity | null;
  occurrences: NoelWordOccurrence[];
  canonVerses: NoelVerseText[];
};

export async function getTitusNoelWordPacket(
  strongId: string,
): Promise<TitusNoelWordPacket> {
  const normalizedStrongId = strongId.toUpperCase();

  const { data: identity, error: identityError } = await noel
    .from("titus_word_identity_v1")
    .select("*")
    .eq("strong_id", normalizedStrongId)
    .maybeSingle();

  if (identityError) {
    throw new Error(`Noel identity lookup failed: ${identityError.message}`);
  }

  const { data: occurrences, error: occurrenceError } = await noel
    .from("titus_word_occurrences_v1")
    .select("*")
    .eq("strong_id", normalizedStrongId)
    .order("canon_order", { ascending: true, nullsFirst: false })
    .order("chapter", { ascending: true })
    .order("verse", { ascending: true })
    .limit(25);

  if (occurrenceError) {
    throw new Error(`Noel occurrence lookup failed: ${occurrenceError.message}`);
  }

  const occurrenceRows = occurrences ?? [];
  const canonVerses: NoelVerseText[] = [];

  for (const occurrence of occurrenceRows.slice(0, 8)) {
    const { data: verse, error: verseError } = await noel
      .from("titus_verse_text_v1")
      .select("*")
      .eq("book", occurrence.book)
      .eq("chapter", occurrence.chapter)
      .eq("verse", occurrence.verse)
      .maybeSingle();

    if (verseError) {
      throw new Error(`Noel verse lookup failed: ${verseError.message}`);
    }

    if (verse) {
      canonVerses.push(verse);
    }
  }

  return {
    identity: identity ?? null,
    occurrences: occurrenceRows,
    canonVerses,
  };
}
