import type { PublicNodeMeta } from "@/data/titus/public-node-meta";

export type QueuedLesson = {
  slug: string;
  title: string;
  originalWord: string;
  transliteration: string;
  subtitle: string;
  status: "queued";
  primaryTerms: string[];
  keywords: string[];
  publicNodeMeta: PublicNodeMeta;
};

const queuedLessonMeta: PublicNodeMeta = {
  compiler: "Lex Bible Project",
  reviewer: "Pending theological/source review",
  sourcePacket: "Titus Canon Word-Study Course Library Build Plan · Appendix A",
  sourcePacketSlug: "titus-canon-word-study-course-library-build-plan-appendix-a",
  status: "queued",
  version: "0.1.0",
  lastUpdated: "2026-06-30",
  confidence: "medium",
  knownLimits: [
    "Queued lesson records preserve public route, search identity, and course placement before full canon mapping is complete.",
    "These records should not be treated as finished word-study conclusions.",
  ],
  sourceList: [
    "Titus Canon Word-Study Course Library Build Plan",
    "Lex Bible Project public-node routing and course assembly rules",
  ],
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
    publicNodeMeta: queuedLessonMeta,
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
    publicNodeMeta: queuedLessonMeta,
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
    publicNodeMeta: queuedLessonMeta,
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
    publicNodeMeta: queuedLessonMeta,
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
    publicNodeMeta: queuedLessonMeta,
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
    publicNodeMeta: queuedLessonMeta,
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
    publicNodeMeta: queuedLessonMeta,
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
    publicNodeMeta: queuedLessonMeta,
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
    publicNodeMeta: queuedLessonMeta,
  },
];

export function getQueuedLesson(slug: string) {
  return queuedLessons.find((lesson) => lesson.slug === slug);
}
