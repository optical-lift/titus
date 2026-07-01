import type { PublicNodeMeta } from "@/data/titus/public-node-meta";

export type FunctionLens = {
  slug: string;
  title: string;
  subtitle: string;
  status: "beta" | "published" | "queued";
  anchorLessons: {
    label: string;
    href: string;
  }[];
  functionReading: string[];
  whatThisLensAllows: string[];
  whatThisLensDoesNotAllow: string[];
  stillMustAccountFor: string[];
  publicNodeMeta: PublicNodeMeta;
};

export const functionLenses: FunctionLens[] = [
  {
    slug: "created-domain-made-readable",
    title: "Created Domain Made Readable",
    subtitle:
      "A whole-canon function lens for land, earth, domain, witness, condition, and dwellability.",
    status: "beta",
    anchorLessons: [
      {
        label: "H0776 — אֶרֶץ / erets",
        href: "/lessons/h0776",
      },
    ],
    functionReading: [
      "This Function Lens observes that land language does not only name a place. In the canon, אֶרֶץ / erets can function as a created domain whose condition becomes publicly readable.",
      "The domain can be ordered, filled, polluted, inherited, rested, emptied, restored, and finally made dwellable.",
      "This is not a claim that every land passage means the same thing. It is a lens for asking what the canon repeatedly allows land-language to carry when companion patterns remain visible.",
    ],
    whatThisLensAllows: [
      "real geography to remain real",
      "inheritance history to remain active",
      "ecology, justice, rest, and fruitfulness to stay in the same conversation",
      "new creation language to connect backward without erasing earlier land texts",
      "the reader to ask whether a domain is dwellable, polluted, rested, fruitful, or under witness",
    ],
    whatThisLensDoesNotAllow: [
      "reducing land to scenery only",
      "reducing land to private property only",
      "reducing land to nation-state territory only",
      "treating creation as a neutral backdrop",
      "using spiritual meaning to erase concrete land, body, inheritance, or restoration language",
    ],
    stillMustAccountFor: [
      "Genesis creation order",
      "Israel's historical land promises",
      "bloodguilt and land pollution texts",
      "Sabbath and Jubilee land-rest texts",
      "exile and return",
      "prophetic restoration",
      "Revelation's new heaven and new earth",
    ],
    publicNodeMeta: {
      compiler: "Lex Bible Project",
      reviewer: "Pending theological and lexical review",
      sourcePacket: "Titus Function Lens seed set · Ecology / H0776 created domain lens",

      sourcePacketSlug: "titus-function-lens-seed-set-ecology-h0776-created-domain-lens",
      status: "beta",
      version: "1.0",
      lastUpdated: "2026-06-30",
      confidence: "medium",
      knownLimits: [
        "This is a Function Lens seed, not yet a fully pressure-tested canon-wide course module.",
        "The lens is anchored first in H0776 / erets and must be tested against additional land, ground, field, inheritance, rest, fruit, city, and new creation passages.",
        "The lens must remain distinct from a doctrinal claim. It is a controlled reading instrument for what the pattern allows to remain in the conversation.",
      ],
      sourceList: [
        "Titus H0776 / erets lesson",
        "Bloodguilt Pattern Debrief",
        "Inheritance Pattern Debrief",
        "Rest / Release Pattern Debrief",
        "Fruitfulness Pattern Debrief",
        "Lex Project governing method documents",
      ],
    },
  },
];

export function getFunctionLens(slug: string) {
  return functionLenses.find((lens) => lens.slug === slug);
}
