import "server-only";
import type { CanonPassage } from "@/data/titus/lessons";
import { noel } from "./client";

type ParsedCanonRef = {
  book: string;
  chapter: number;
  startVerse: number;
  endVerse: number;
};

const BOOK_TO_NOEL_CODE: Record<string, string> = {
  Genesis: "Gen",
  Exodus: "Exo",
  Leviticus: "Lev",
  Numbers: "Num",
  Deuteronomy: "Deu",
  Joshua: "Jos",
  Judges: "Jdg",
  Ruth: "Rut",
  "1 Samuel": "1Sa",
  "2 Samuel": "2Sa",
  "1 Kings": "1Ki",
  "2 Kings": "2Ki",
  "1 Chronicles": "1Ch",
  "2 Chronicles": "2Ch",
  Ezra: "Ezr",
  Nehemiah: "Neh",
  Esther: "Est",
  Job: "Job",
  Psalms: "Psa",
  Psalm: "Psa",
  Proverbs: "Pro",
  Ecclesiastes: "Ecc",
  "Song of Songs": "Sng",
  Song: "Sng",
  Isaiah: "Isa",
  Jeremiah: "Jer",
  Lamentations: "Lam",
  Ezekiel: "Eze",
  Daniel: "Dan",
  Hosea: "Hos",
  Joel: "Joe",
  Amos: "Amo",
  Obadiah: "Oba",
  Jonah: "Jon",
  Micah: "Mic",
  Nahum: "Nah",
  Habakkuk: "Hab",
  Zephaniah: "Zep",
  Haggai: "Hag",
  Zechariah: "Zec",
  Malachi: "Mal",
  Matthew: "Mat",
  Mark: "Mar",
  Luke: "Luk",
  John: "Joh",
  Acts: "Act",
  Romans: "Rom",
  Revelation: "Rev",
};

function parseCanonRef(ref: string): ParsedCanonRef | null {
  const normalizedRef = ref.replace("—", "-").replace("–", "-").trim();
  const match = normalizedRef.match(/^(.+)\s+(\d+):(\d+)(?:-(\d+))?$/);

  if (!match) {
    return null;
  }

  const [, bookName, chapterText, startVerseText, endVerseText] = match;
  const book = BOOK_TO_NOEL_CODE[bookName.trim()];

  if (!book) {
    return null;
  }

  const chapter = Number(chapterText);
  const startVerse = Number(startVerseText);
  const endVerse = endVerseText ? Number(endVerseText) : startVerse;

  if (!Number.isInteger(chapter) || !Number.isInteger(startVerse) || !Number.isInteger(endVerse)) {
    return null;
  }

  return {
    book,
    chapter,
    startVerse,
    endVerse,
  };
}

export async function hydrateCanonReadingFromNoel(
  canonReading: CanonPassage[],
): Promise<CanonPassage[]> {
  const hydratedPassages: CanonPassage[] = [];

  for (const passage of canonReading) {
    const parsedRef = parseCanonRef(passage.ref);

    if (!parsedRef) {
      hydratedPassages.push(passage);
      continue;
    }

    const { data, error } = await noel
      .from("titus_public_verse_text_v1")
      .select("book, chapter, verse, public_text")
      .eq("book", parsedRef.book)
      .eq("chapter", parsedRef.chapter)
      .gte("verse", parsedRef.startVerse)
      .lte("verse", parsedRef.endVerse)
      .order("verse", { ascending: true });

    if (error) {
      throw new Error(`Noel canon reading lookup failed for ${passage.ref}: ${error.message}`);
    }

    const noelText = (data ?? [])
      .map((row) => row.public_text)
      .filter((text): text is string => Boolean(text))
      .join(" ");

    hydratedPassages.push({
      ...passage,
      text: noelText || passage.text,
    });
  }

  return hydratedPassages;
}
