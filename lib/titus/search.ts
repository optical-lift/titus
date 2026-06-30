import { canonChains } from "@/data/titus/canon-chains";
import { courses } from "@/data/titus/courses";
import { functionLenses } from "@/data/titus/function-lenses";
import { lessons } from "@/data/titus/lessons";
import { patternDebriefs } from "@/data/titus/pattern-debriefs";
import {
  traditionCards,
  traditionPlacements,
} from "@/data/titus/tradition-notes";

export type TitusSearchResult = {
  type:
    | "Course"
    | "Published Word Lesson"
    | "Pattern Debrief"
    | "Function Lens"
    | "Canon Chain"
    | "Tradition Card"
    | "Queued Lesson"
    | "Planned Course";
  title: string;
  subtitle: string;
  href?: string;
  status: string;
  primaryTerms: string[];
  keywords: string[];
  bodyTerms: string[];
};

const queuedLessons: TitusSearchResult[] = [
  {
    type: "Queued Lesson",
    title: "H0127 — אֲדָמָה / adamah",
    subtitle: "ground, soil; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h0127", "adamah", "אדמה", "ground", "soil"],
    keywords: ["earth", "ecology"],
    bodyTerms: [],
  },
  {
    type: "Queued Lesson",
    title: "H4325 — מַיִם / mayim",
    subtitle: "water; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h4325", "mayim", "מים", "water", "waters"],
    keywords: ["ecology"],
    bodyTerms: [],
  },
  {
    type: "Queued Lesson",
    title: "H5869 — עַיִן / ayin",
    subtitle: "eye, spring, fountain; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h5869", "ayin", "עין", "eye", "spring", "fountain"],
    keywords: ["ecology"],
    bodyTerms: [],
  },
  {
    type: "Queued Lesson",
    title: "H7704 — שָׂדֶה / sadeh",
    subtitle: "field; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h7704", "sadeh", "שדה", "field"],
    keywords: ["ecology"],
    bodyTerms: [],
  },
  {
    type: "Queued Lesson",
    title: "H3754 — כֶּרֶם / kerem",
    subtitle: "vineyard; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h3754", "kerem", "כרם", "vineyard"],
    keywords: ["ecology"],
    bodyTerms: [],
  },
  {
    type: "Queued Lesson",
    title: "H6529 — פְּרִי / peri",
    subtitle: "fruit, yield; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h6529", "peri", "פרי", "fruit", "yield"],
    keywords: ["ecology"],
    bodyTerms: [],
  },
  {
    type: "Queued Lesson",
    title: "G2590 — καρπός / karpos",
    subtitle: "fruit, outcome; queued Greek companion lesson",
    status: "queued",
    primaryTerms: ["g2590", "karpos", "καρπός", "fruit", "outcome"],
    keywords: ["ecology"],
    bodyTerms: [],
  },
  {
    type: "Queued Lesson",
    title: "H7676 — שַׁבָּת / shabbath",
    subtitle: "Sabbath, rest; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h7676", "shabbath", "שבת", "sabbath", "rest"],
    keywords: ["release", "ecology"],
    bodyTerms: [],
  },
  {
    type: "Queued Lesson",
    title: "H1818 — דָּם / dam",
    subtitle: "blood; queued companion word lesson",
    status: "queued",
    primaryTerms: ["h1818", "dam", "דם", "blood"],
    keywords: ["bloodguilt", "land", "ground"],
    bodyTerms: [],
  },
];

export function getAllSearchResults(): TitusSearchResult[] {
  const courseResults: TitusSearchResult[] = courses.map((course) => ({
    type: course.status === "active" ? "Course" : "Planned Course",
    title: course.title,
    subtitle: course.subtitle,
    href: `/courses/${course.slug}`,
    status: course.status.replaceAll("_", " "),
    primaryTerms: [course.slug, course.title],
    keywords: [course.subtitle, course.status],
    bodyTerms: [course.description],
  }));

  const lessonResults: TitusSearchResult[] = lessons.map((lesson) => ({
    type: "Published Word Lesson",
    title: lesson.title,
    subtitle: `${lesson.language} · ${lesson.field}`,
    href: `/lessons/${lesson.slug}`,
    status: lesson.status,
    primaryTerms: [
      lesson.slug,
      lesson.strongId,
      lesson.originalWord,
      lesson.transliteration,
      lesson.title,
      lesson.field,
      ...lesson.field.split(/[\/,·]/).map((item) => item.trim()),
      ...lesson.subtitle.split(/[\/,·]/).map((item) => item.trim()),
    ],
    keywords: [
      lesson.language,
      lesson.subtitle,
      ...lesson.travelsWith,
      ...lesson.companionPatternSlugs,
    ],
    bodyTerms: [
      ...lesson.drawers.flatMap((drawer) => drawer.body),
      ...lesson.canonReading.flatMap((passage) => [
        passage.ref,
        passage.text,
        passage.notice,
      ]),
    ],
  }));

  const patternResults: TitusSearchResult[] = patternDebriefs.map((pattern) => ({
    type: "Pattern Debrief",
    title: pattern.title,
    subtitle: pattern.whyThisPatternMatters[0],
    href: `/patterns/${pattern.slug}`,
    status: pattern.status.replaceAll("_", " "),
    primaryTerms: [pattern.slug, pattern.title],
    keywords: [pattern.status, ...pattern.appearsIn],
    bodyTerms: [
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
    primaryTerms: [lens.slug, lens.title, lens.subtitle],
    keywords: [
      lens.status,
      ...lens.anchorLessons.map((lesson) => lesson.label),
      ...lens.stillMustAccountFor,
    ],
    bodyTerms: [
      ...lens.functionReading,
      ...lens.whatThisLensAllows,
      ...lens.whatThisLensDoesNotAllow,
    ],
  }));

  const chainResults: TitusSearchResult[] = canonChains.map((chain) => ({
    type: "Canon Chain",
    title: chain.title,
    subtitle: chain.subtitle,
    href: `/chains/${chain.slug}`,
    status: chain.status,
    primaryTerms: [chain.slug, chain.title, chain.subtitle],
    keywords: [
      chain.status,
      ...chain.anchorLessons.map((lesson) => lesson.label),
      ...chain.passages.flatMap((passage) => [
        passage.ref,
        passage.title,
        passage.originalLanguageFocus,
        passage.transliteration,
      ]),
    ],
    bodyTerms: [
      ...chain.chainReading,
      ...chain.unresolvedPressure,
      ...chain.passages.flatMap((passage) => [
        passage.publicText,
        passage.functionNotice,
      ]),
    ],
  }));

  const traditionResults: TitusSearchResult[] = traditionCards.map((card) => {
    const placements = traditionPlacements.filter(
      (placement) => placement.cardSlug === card.slug
    );

    return {
      type: "Tradition Card",
      title: card.title,
      subtitle: card.subtitle,
      href: `/traditions/${card.slug}`,
      status: card.status,
      primaryTerms: [
        card.slug,
        card.title,
        card.subtitle,
        card.cardKind,
        card.traditionFamily,
      ],
      keywords: [
        card.status,
        ...card.coreConcerns,
        ...card.commonReadingHabits,
        ...card.strengthsToPreserve,
        ...placements.flatMap((placement) => [
          placement.lessonSlug,
          placement.courseSlug,
          placement.placementTitle,
          placement.placementSummary,
        ]),
      ],
      bodyTerms: [
        ...card.summary,
        ...card.commonFlatteningRisks,
        ...card.sourceWitnessPlan,
        ...placements.flatMap((placement) => [
          ...placement.whyItBelongsHere,
          ...placement.whatThisKeepsInViewHere,
          ...placement.whatThisMayFlattenHere,
          ...placement.whatGetsToStayHere,
          ...placement.whatMustBeAccountedForHere,
        ]),
      ],
    };
  });

  return [
    ...lessonResults,
    ...patternResults,
    ...lensResults,
    ...chainResults,
    ...traditionResults,
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
      return 70;
    case "Function Lens":
      return 55;
    case "Canon Chain":
      return 50;
    case "Pattern Debrief":
      return 40;
    case "Tradition Card":
      return 36;
    case "Course":
      return 25;
    case "Queued Lesson":
      return 12;
    case "Planned Course":
      return 8;
  }
}

function exactTermMatch(values: string[], normalizedQuery: string) {
  return values.some((value) =>
    normalize(value)
      .split(" ")
      .filter(Boolean)
      .includes(normalizedQuery)
  );
}

function phraseMatch(values: string[], normalizedQuery: string) {
  return values.some((value) => normalize(value).includes(normalizedQuery));
}

function scoreResult(result: TitusSearchResult, normalizedQuery: string) {
  const priority = typePriority(result.type);
  const title = normalize(result.title);

  if (title === normalizedQuery) return 1000 + priority;
  if (exactTermMatch(result.primaryTerms, normalizedQuery)) return 900 + priority;
  if (phraseMatch(result.primaryTerms, normalizedQuery)) return 780 + priority;
  if (exactTermMatch(result.keywords, normalizedQuery)) return 620 + priority;
  if (phraseMatch(result.keywords, normalizedQuery)) return 480 + priority;
  if (phraseMatch(result.bodyTerms, normalizedQuery)) return 260 + priority;

  const allText = normalize(
    [
      result.title,
      result.subtitle,
      result.type,
      result.status,
      ...result.primaryTerms,
      ...result.keywords,
      ...result.bodyTerms,
    ].join(" ")
  );

  const queryWords = normalizedQuery.split(" ").filter(Boolean);
  const matchedWords = queryWords.filter((word) => allText.includes(word));

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
