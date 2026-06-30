export type QueuedLesson = {
  slug: string;
  title: string;
  originalWord: string;
  transliteration: string;
  subtitle: string;
  status: "queued";
  primaryTerms: string[];
  keywords: string[];
};

export const queuedLessons: QueuedLesson[] = [
  {
    slug: "h0127",
    title: "H0127 — אֲדָמָה / adamah",
    originalWord: "אֲדָמָה",
    transliteration: "adamah",
    subtitle: "ground, soil; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h0127", "adamah", "אדמה", "ground", "soil"],
    keywords: ["earth", "ecology"],
  },
  {
    slug: "h4325",
    title: "H4325 — מַיִם / mayim",
    originalWord: "מַיִם",
    transliteration: "mayim",
    subtitle: "water; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h4325", "mayim", "מים", "water", "waters"],
    keywords: ["ecology"],
  },
  {
    slug: "h5869",
    title: "H5869 — עַיִן / ayin",
    originalWord: "עַיִן",
    transliteration: "ayin",
    subtitle: "eye, spring, fountain; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h5869", "ayin", "עין", "eye", "spring", "fountain"],
    keywords: ["ecology"],
  },
  {
    slug: "h7704",
    title: "H7704 — שָׂדֶה / sadeh",
    originalWord: "שָׂדֶה",
    transliteration: "sadeh",
    subtitle: "field; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h7704", "sadeh", "שדה", "field"],
    keywords: ["ecology"],
  },
  {
    slug: "h3754",
    title: "H3754 — כֶּרֶם / kerem",
    originalWord: "כֶּרֶם",
    transliteration: "kerem",
    subtitle: "vineyard; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h3754", "kerem", "כרם", "vineyard"],
    keywords: ["ecology"],
  },
  {
    slug: "h6529",
    title: "H6529 — פְּרִי / peri",
    originalWord: "פְּרִי",
    transliteration: "peri",
    subtitle: "fruit, yield; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h6529", "peri", "פרי", "fruit", "yield"],
    keywords: ["ecology"],
  },
  {
    slug: "g2590",
    title: "G2590 — καρπός / karpos",
    originalWord: "καρπός",
    transliteration: "karpos",
    subtitle: "fruit, outcome; queued Greek companion lesson",
    status: "queued",
    primaryTerms: ["g2590", "karpos", "καρπός", "fruit", "outcome"],
    keywords: ["ecology"],
  },
  {
    slug: "h7676",
    title: "H7676 — שַׁבָּת / shabbath",
    originalWord: "שַׁבָּת",
    transliteration: "shabbath",
    subtitle: "Sabbath, rest; queued Ecology word lesson",
    status: "queued",
    primaryTerms: ["h7676", "shabbath", "שבת", "sabbath", "rest"],
    keywords: ["release", "ecology"],
  },
  {
    slug: "h1818",
    title: "H1818 — דָּם / dam",
    originalWord: "דָּם",
    transliteration: "dam",
    subtitle: "blood; queued companion word lesson",
    status: "queued",
    primaryTerms: ["h1818", "dam", "דם", "blood"],
    keywords: ["bloodguilt", "land", "ground"],
  },
];

export function getQueuedLesson(slug: string) {
  return queuedLessons.find((lesson) => lesson.slug === slug);
}
