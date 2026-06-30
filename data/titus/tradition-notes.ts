import type { PublicNodeMeta } from "@/data/titus/public-node-meta";

export type TraditionNote = {
  slug: string;
  title: string;
  subtitle: string;
  status: "seed" | "beta" | "published";
  traditionFamily: string;
  anchorLessons: {
    label: string;
    href: string;
  }[];
  whatThisTraditionPreserves: string[];
  whereItCanFlatten: string[];
  whatGetsToStay: string[];
  whatMustStillBeAccountedFor: string[];
  publicNodeMeta: PublicNodeMeta;
};

export const traditionNotes: TraditionNote[] = [
  {
    slug: "creation-goodness",
    title: "Creation Goodness",
    subtitle:
      "A tradition note preserving the goodness, givenness, and ordered visibility of creation.",
    status: "beta",
    traditionFamily: "Creation / devotional / theological ecology",
    anchorLessons: [
      {
        label: "H0776 — אֶרֶץ / erets",
        href: "/lessons/h0776",
      },
    ],
    whatThisTraditionPreserves: [
      "Creation is not treated as evil, disposable, or merely temporary scenery.",
      "The created world is named, ordered, and called good before later pollution, exile, or restoration language appears.",
      "Land and earth language should be allowed to carry goodness, gift, visible order, and creaturely belonging.",
    ],
    whereItCanFlatten: [
      "It can become too general if creation goodness is detached from obedience, bloodguilt, rest, and restoration.",
      "It can turn land into beautiful scenery while ignoring the canon’s witness language.",
      "It can make creation affirmation sound complete before the question of dwellability has been tested.",
    ],
    whatGetsToStay: [
      "real creation goodness",
      "real embodied place",
      "the goodness of ordered domains",
      "God’s delight in visible creation",
    ],
    whatMustStillBeAccountedFor: [
      "blood crying from the ground",
      "land pollution",
      "exile and return",
      "land rest",
      "new creation",
    ],
    publicNodeMeta: {
      compiler: "Lex Bible Project",
      reviewer: "Pending theological and lexical review",
      sourcePacket:
        "Titus Tradition Note seed set · Ecology / H0776 traditions in conversation",
      status: "beta",
      version: "1.0",
      lastUpdated: "2026-06-30",
      confidence: "medium",
      knownLimits: [
        "This is a seed Tradition Note, not a full history of doctrine.",
        "The note names a tradition-family contribution without pretending to represent every theologian or denomination inside that family.",
        "The note must be expanded later with named source witnesses before paid-course use.",
      ],
      sourceList: [
        "Genesis 1:1–10",
        "Titus H0776 / erets lesson",
        "Titus Created Domain Made Readable Function Lens",
        "Lex Project governing method documents",
      ],
    },
  },
  {
    slug: "covenantal-inheritance",
    title: "Covenantal Inheritance",
    subtitle:
      "A tradition note preserving gift, promise, boundary, responsibility, dispossession, and restoration.",
    status: "beta",
    traditionFamily: "Covenantal / biblical theology / land promise",
    anchorLessons: [
      {
        label: "H0776 — אֶרֶץ / erets",
        href: "/lessons/h0776",
      },
    ],
    whatThisTraditionPreserves: [
      "Land is not merely dirt or scenery. It is bound to gift, promise, inheritance, boundary, obedience, dispossession, and return.",
      "The historical land promises to Israel must not be erased by abstract spiritual readings.",
      "The land field carries responsibility as well as reception.",
    ],
    whereItCanFlatten: [
      "It can collapse land into ownership without keeping gift and stewardship visible.",
      "It can isolate Israel’s land history from creation, bloodguilt, rest, and new creation.",
      "It can treat inheritance as a static possession rather than a domain that must remain dwellable.",
    ],
    whatGetsToStay: [
      "Israel’s historical land promise",
      "gift language",
      "boundary language",
      "responsibility and stewardship",
      "exile and return pressure",
    ],
    whatMustStillBeAccountedFor: [
      "creation before covenant land",
      "bloodguilt and pollution",
      "land Sabbath",
      "prophetic restoration",
      "New Testament inheritance language",
      "new heaven and new earth",
    ],
    publicNodeMeta: {
      compiler: "Lex Bible Project",
      reviewer: "Pending theological and lexical review",
      sourcePacket:
        "Titus Tradition Note seed set · Ecology / H0776 traditions in conversation",
      status: "beta",
      version: "1.0",
      lastUpdated: "2026-06-30",
      confidence: "medium",
      knownLimits: [
        "This is a seed Tradition Note, not a full covenant theology treatment.",
        "The note preserves the tradition-family contribution without resolving every land-promise debate.",
        "The note must later be strengthened with named source witnesses and resistant passages.",
      ],
      sourceList: [
        "Genesis 1:1–10",
        "Genesis 4:10–12",
        "Leviticus 25:2–5",
        "Titus H0776 / erets lesson",
        "Inheritance Pattern Debrief",
        "Lex Project governing method documents",
      ],
    },
  },
  {
    slug: "new-creation-restoration",
    title: "New Creation Restoration",
    subtitle:
      "A tradition note preserving the forward movement toward restored dwelling and new heaven / new earth.",
    status: "beta",
    traditionFamily: "Eschatological / restoration / new creation",
    anchorLessons: [
      {
        label: "H0776 — אֶרֶץ / erets",
        href: "/lessons/h0776",
      },
    ],
    whatThisTraditionPreserves: [
      "The canon does not leave creation in pollution, exile, curse, or emptiness.",
      "Land and earth language must eventually account for restoration, dwelling, and the new heaven / new earth movement.",
      "The final movement is not escape from created reality but restored dwellability under God’s order.",
    ],
    whereItCanFlatten: [
      "It can jump to the end before tracing the earlier land field.",
      "It can spiritualize new creation in a way that erases real creation, real land, or real bodies.",
      "It can read Revelation as detached from Genesis, Law, Prophets, and inheritance language.",
    ],
    whatGetsToStay: [
      "restoration hope",
      "new creation",
      "final dwellability",
      "Revelation’s new heaven and new earth",
      "the forward movement of the canon",
    ],
    whatMustStillBeAccountedFor: [
      "Genesis creation order",
      "land pollution",
      "inheritance and exile",
      "prophetic restoration",
      "New Testament creation groaning",
      "Revelation’s city and earth language",
    ],
    publicNodeMeta: {
      compiler: "Lex Bible Project",
      reviewer: "Pending theological and lexical review",
      sourcePacket:
        "Titus Tradition Note seed set · Ecology / H0776 traditions in conversation",
      status: "beta",
      version: "1.0",
      lastUpdated: "2026-06-30",
      confidence: "medium",
      knownLimits: [
        "This is a seed Tradition Note, not a full eschatology module.",
        "The note names the restoration contribution without settling every millennial or land-continuity debate.",
        "The note must later be expanded with prophetic and Revelation canon chains.",
      ],
      sourceList: [
        "Titus H0776 / erets lesson",
        "Domain Witness Chain",
        "Created Domain Made Readable Function Lens",
        "Lex Project governing method documents",
      ],
    },
  },
];

export function getTraditionNote(slug: string) {
  return traditionNotes.find((note) => note.slug === slug);
}

export function getTraditionNotes(slugs: string[]) {
  return slugs
    .map((slug) => getTraditionNote(slug))
    .filter((note): note is TraditionNote => Boolean(note));
}
