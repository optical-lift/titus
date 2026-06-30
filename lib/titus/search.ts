import { courses } from "@/data/titus/courses";
import { lessons } from "@/data/titus/lessons";
import { patternDebriefs } from "@/data/titus/pattern-debriefs";

export type TitusSearchResult = {
  type:
    | "Course"
    | "Published Word Lesson"
    | "Pattern Debrief"
    | "Queued Lesson"
    | "Planned Course";
  title: string;
  subtitle: string;
  href?: string;
  status: string;
  keywords: string[];
};

const queuedLessons: TitusSearchResult[] = [
  {
    type: "Queued Lesson",
    title: "H0127 — אֲדָמָה / adamah",
    subtitle: "ground, soil; queued Ecology word lesson",
    status: "queued",
    keywords: ["h0127", "adamah", "אדמה", "ground", "soil", "earth", "ecology"],
  },
  {
    type: "Queued Lesson",
    title: "H4325 — מַיִם / mayim",
    subtitle: "water; queued Ecology word lesson",
    status: "queued",
    keywords: ["h4325", "mayim", "מים", "water", "waters", "ecology"],
  },
  {
    type: "Queued Lesson",
    title: "H5869 — עַיִן / ayin",
    subtitle: "eye, spring, fountain; queued Ecology word lesson",
    status: "queued",
    keywords: ["h5869", "ayin", "עין", "eye", "spring", "fountain", "ecology"],
  },
  {
    type: "Queued Lesson",
    title: "H7704 — שָׂדֶה / sadeh",
    subtitle: "field; queued Ecology word lesson",
    status: "queued",
    keywords: ["h7704", "sadeh", "שדה", "field", "ecology"],
  },
  {
    type: "Queued Lesson",
    title: "H3754 — כֶּרֶם / kerem",
    subtitle: "vineyard; queued Ecology word lesson",
    status: "queued",
    keywords: ["h3754", "kerem", "כרם", "vineyard", "ecology"],
  },
  {
    type: "Queued Lesson",
    title: "H6529 — פְּרִי / peri",
    subtitle: "fruit, yield; queued Ecology word lesson",
    status: "queued",
    keywords: ["h6529", "peri", "פרי", "fruit", "yield", "ecology"],
  },
  {
    type: "Queued Lesson",
    title: "G2590 — καρπός / karpos",
    subtitle: "fruit, outcome; queued Greek companion lesson",
    status: "queued",
    keywords: ["g2590", "karpos", "καρπός", "fruit", "outcome", "ecology"],
  },
  {
    type: "Queued Lesson",
    title: "H7676 — שַׁבָּת / shabbath",
    subtitle: "Sabbath, rest; queued Ecology word lesson",
    status: "queued",
    keywords: ["h7676", "shabbath", "שבת", "sabbath", "rest", "release", "ecology"],
  },
  {
    type: "Queued Lesson",
    title: "H1818 — דָּם / dam",
    subtitle: "blood; queued companion word lesson",
    status: "queued",
    keywords: ["h1818", "dam", "דם", "blood", "bloodguilt", "land", "ground"],
  },
];

export function getAllSearchResults(): TitusSearchResult[] {
  const courseResults: TitusSearchResult[] = courses.map((course) => ({
    type: course.status === "active" ? "Course" : "Planned Course",
    title: course.title,
    subtitle: course.subtitle,
    href: `/courses/${course.slug}`,
    status: course.status.replaceAll("_", " "),
    keywords: [
      course.slug,
      course.title,
      course.subtitle,
      course.description,
      course.status,
    ],
  }));

  const lessonResults: TitusSearchResult[] = lessons.map((lesson) => ({
    type: "Published Word Lesson",
    title: lesson.title,
    subtitle: `${lesson.language} · ${lesson.field}`,
    href: `/lessons/${lesson.slug}`,
    status: lesson.status,
    keywords: [
      lesson.slug,
      lesson.strongId,
      lesson.originalWord,
      lesson.transliteration,
      lesson.language,
      lesson.field,
      lesson.title,
      lesson.subtitle,
      ...lesson.travelsWith,
      ...lesson.companionPatternSlugs,
    ],
  }));

  const patternResults: TitusSearchResult[] = patternDebriefs.map((pattern) => ({
    type: "Pattern Debrief",
    title: pattern.title,
    subtitle: pattern.whyThisPatternMatters[0],
    href: `/patterns/${pattern.slug}`,
    status: pattern.status.replaceAll("_", " "),
    keywords: [
      pattern.slug,
      pattern.title,
      pattern.status,
      ...pattern.appearsIn,
      ...pattern.whyThisPatternMatters,
      ...pattern.whatThisPatternPrevents,
      ...pattern.relatedLessons.map((lesson) => lesson.label),
    ],
  }));

  return [...lessonResults, ...patternResults, ...courseResults, ...queuedLessons];
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/[^\p{L}\p{N}\s/-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreResult(result: TitusSearchResult, normalizedQuery: string) {
  const searchable = normalize(
    [result.title, result.subtitle, result.type, result.status, ...result.keywords].join(" ")
  );

  const title = normalize(result.title);

  if (title === normalizedQuery) return 100;
  if (title.includes(normalizedQuery)) return 80;
  if (searchable.includes(normalizedQuery)) return 60;

  const queryWords = normalizedQuery.split(" ").filter(Boolean);
  const matchedWords = queryWords.filter((word) => searchable.includes(word));

  if (matchedWords.length === 0) return 0;

  return 20 + matchedWords.length * 10;
}

export function searchTitus(query: string) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return [];
  }

  return getAllSearchResults()
    .map((result) => ({
      result,
      score: scoreResult(result, normalizedQuery),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title))
    .map((entry) => entry.result);
}
