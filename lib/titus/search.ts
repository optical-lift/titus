import { canonChains } from "@/data/titus/canon-chains";
import { courses } from "@/data/titus/courses";
import { lessons } from "@/data/titus/lessons";
import { functionLenses } from "@/data/titus/function-lenses";
import { patternDebriefs } from "@/data/titus/pattern-debriefs";

export type TitusSearchResult = {
  type:
    | "Course"
    | "Published Word Lesson"
    | "Pattern Debrief"
    | "Function Lens"
    | "Canon Chain"
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
      ...lesson.field.split(/[\/,·]/).map((item) => item.trim()),
      ...lesson.subtitle.split(/[\/,·]/).map((item) => item.trim()),
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

  const lensResults: TitusSearchResult[] = functionLenses.map((lens) => ({
    type: "Function Lens",
    title: lens.title,
    subtitle: lens.subtitle,
    href: `/lenses/${lens.slug}`,
    status: lens.status,
    keywords: [
      lens.slug,
      lens.title,
      lens.subtitle,
      lens.status,
      ...lens.functionReading,
      ...lens.whatThisLensAllows,
      ...lens.whatThisLensDoesNotAllow,
      ...lens.stillMustAccountFor,
      ...lens.anchorLessons.map((lesson) => lesson.label),
    ],
  }));

  const chainResults: TitusSearchResult[] = canonChains.map((chain) => ({
    type: "Canon Chain",
    title: chain.title,
    subtitle: chain.subtitle,
    href: `/chains/${chain.slug}`,
    status: chain.status,
    keywords: [
      chain.slug,
      chain.title,
      chain.subtitle,
      chain.status,
      ...chain.chainReading,
      ...chain.unresolvedPressure,
      ...chain.anchorLessons.map((lesson) => lesson.label),
      ...chain.passages.flatMap((passage) => [
        passage.ref,
        passage.title,
        passage.originalLanguageFocus,
        passage.transliteration,
        passage.publicText,
        passage.functionNotice,
      ]),
    ],
  }));

  return [
    ...lessonResults,
    ...patternResults,
    ...lensResults,
    ...chainResults,
    ...courseResults,
    ...queuedLessons,
  ];
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

function typePriority(type: TitusSearchResult["type"]) {
  switch (type) {
    case "Published Word Lesson":
      return 40;
    case "Pattern Debrief":
      return 25;
    case "Function Lens":
      return 22;
    case "Canon Chain":
      return 21;
    case "Course":
      return 15;
    case "Queued Lesson":
      return 8;
    case "Planned Course":
      return 4;
  }
}

function normalizedTerms(result: TitusSearchResult) {
  const pieces = [
    result.title,
    result.subtitle,
    result.type,
    result.status,
    ...result.keywords,
  ];

  return new Set(
    pieces
      .flatMap((piece) => normalize(piece).split(" "))
      .map((piece) => piece.trim())
      .filter(Boolean)
  );
}

function scoreResult(result: TitusSearchResult, normalizedQuery: string) {
  const searchable = normalize(
    [result.title, result.subtitle, result.type, result.status, ...result.keywords].join(" ")
  );

  const title = normalize(result.title);
  const keywordList = result.keywords.map((keyword) => normalize(keyword));
  const termSet = normalizedTerms(result);
  const priority = typePriority(result.type);

  if (title === normalizedQuery) return 1000 + priority;
  if (keywordList.includes(normalizedQuery)) return 900 + priority;
  if (termSet.has(normalizedQuery)) return 800 + priority;
  if (title.includes(normalizedQuery)) return 600 + priority;
  if (searchable.includes(normalizedQuery)) return 300 + priority;

  const queryWords = normalizedQuery.split(" ").filter(Boolean);
  const matchedWords = queryWords.filter((word) => searchable.includes(word));

  if (matchedWords.length === 0) return 0;

  return 100 + matchedWords.length * 20 + priority;
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
