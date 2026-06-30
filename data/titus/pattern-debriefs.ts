export type PatternDebrief = {
  slug: string;
  title: string;
  status: "debrief_only" | "full_lesson_queued" | "published";
  appearsIn: string[];
  fullLessonSlug?: string;
  whyThisPatternMatters: string[];
  whatThisPatternPrevents: string[];
  relatedLessons: {
    label: string;
    href?: string;
    status: "published" | "queued" | "course";
  }[];
};

export const patternDebriefs: PatternDebrief[] = [
  {
    slug: "bloodguilt",
    title: "Bloodguilt",
    status: "debrief_only",
    appearsIn: ["Ecology", "Land", "Ground", "Justice", "Priesthood"],
    whyThisPatternMatters: [
      "Bloodguilt is active in the land field because the canon repeatedly treats shed blood as something that does not remain private or invisible.",
      "In Genesis 4, blood cries from the ground. In the law, blood can pollute the land. This debrief keeps the pattern active so land is not flattened into scenery or property.",
    ],
    whatThisPatternPrevents: [
      "reducing land to neutral dirt",
      "treating violence as only interpersonal",
      "separating ecology from justice",
      "forgetting that created domains can testify",
    ],
    relatedLessons: [
      {
        label: "H0776 — אֶרֶץ / erets",
        href: "/lessons/h0776",
        status: "published",
      },
      {
        label: "H0127 — אֲדָמָה / adamah",
        status: "queued",
      },
      {
        label: "H1818 — דָּם / dam",
        status: "queued",
      },
    ],
  },
  {
    slug: "inheritance",
    title: "Inheritance",
    status: "debrief_only",
    appearsIn: ["Ecology", "Kingdom", "Land", "Promise", "Rest"],
    whyThisPatternMatters: [
      "Inheritance matters because land language is repeatedly attached to gift, promise, boundary, responsibility, dispossession, and restoration.",
      "This pattern keeps אֶרֶץ / erets from being read as mere geography. It asks who may dwell, under what conditions, and how the domain is received rather than seized.",
    ],
    whatThisPatternPrevents: [
      "reducing land to private ownership",
      "collapsing promise into abstraction",
      "ignoring boundary and stewardship",
      "separating gift from obedience",
    ],
    relatedLessons: [
      {
        label: "H0776 — אֶרֶץ / erets",
        href: "/lessons/h0776",
        status: "published",
      },
      {
        label: "H5159 — נַחֲלָה / nachalah",
        status: "queued",
      },
      {
        label: "Kingdom course",
        href: "/courses/kingdom",
        status: "course",
      },
    ],
  },
  {
    slug: "rest-release",
    title: "Rest / Release",
    status: "debrief_only",
    appearsIn: ["Ecology", "Sabbath", "Land", "Inheritance", "Exile / Return"],
    whyThisPatternMatters: [
      "Rest is active here because land language repeatedly touches Sabbath, release, yield, exile, and return.",
      "This debrief keeps the companion pattern active so land is not flattened into scenery, private property, national territory only, metaphor only, or heaven later.",
    ],
    whatThisPatternPrevents: [
      "reducing land to scenery",
      "reducing rest to private inward calm",
      "separating ecology from obedience, release, and dwellability",
      "reading Sabbath as detached from created order",
    ],
    relatedLessons: [
      {
        label: "H0776 — אֶרֶץ / erets",
        href: "/lessons/h0776",
        status: "published",
      },
      {
        label: "H0127 — אֲדָמָה / adamah",
        status: "queued",
      },
      {
        label: "H7676 — שַׁבָּת / shabbath",
        status: "queued",
      },
    ],
  },
  {
    slug: "fruitfulness",
    title: "Fruitfulness",
    status: "debrief_only",
    appearsIn: ["Ecology", "Creation", "Vineyard", "Kingdom", "Formation"],
    whyThisPatternMatters: [
      "Fruitfulness matters because the land field repeatedly becomes visible through yield, barrenness, cultivation, eating, offering, and final abundance.",
      "This pattern keeps fruit from being treated as a decorative metaphor only. It asks what a domain produces when it is ordered, tended, polluted, rested, or restored.",
    ],
    whatThisPatternPrevents: [
      "reducing fruit to metaphor only",
      "separating yield from domain condition",
      "ignoring cultivation and accountability",
      "flattening outcome language into productivity alone",
    ],
    relatedLessons: [
      {
        label: "H0776 — אֶרֶץ / erets",
        href: "/lessons/h0776",
        status: "published",
      },
      {
        label: "H6529 — פְּרִי / peri",
        status: "queued",
      },
      {
        label: "G2590 — καρπός / karpos",
        status: "queued",
      },
    ],
  },
];

export function getPatternDebrief(slug: string) {
  return patternDebriefs.find((pattern) => pattern.slug === slug);
}

export function getPatternDebriefs(slugs: string[]) {
  return slugs
    .map((slug) => getPatternDebrief(slug))
    .filter((pattern): pattern is PatternDebrief => Boolean(pattern));
}
