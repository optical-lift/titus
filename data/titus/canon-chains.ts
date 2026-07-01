import type { PublicNodeMeta } from "@/data/titus/public-node-meta";

export type CanonChainPassage = {
  ref: string;
  title: string;
  originalLanguageFocus: string;
  transliteration: string;
  publicText: string;
  functionNotice: string;
};

export type CanonChain = {
  slug: string;
  title: string;
  subtitle: string;
  status: "seed" | "beta" | "published";
  anchorLessons: {
    label: string;
    href: string;
  }[];
  passages: CanonChainPassage[];
  chainReading: string[];
  unresolvedPressure: string[];
  publicNodeMeta: PublicNodeMeta;
};

export const canonChains: CanonChain[] = [
  {
    slug: "erets-domain-witness-chain",
    title: "Domain Witness Chain",
    subtitle:
      "A first canon chain for אֶרֶץ / erets, land, earth, ground, bloodguilt, rest, and dwellability.",
    status: "beta",
    anchorLessons: [
      {
        label: "H0776 — אֶרֶץ / erets",
        href: "/lessons/h0776",
      },
    ],
    passages: [
      {
        ref: "Genesis 1:1–10",
        title: "Creation, separation, naming",
        originalLanguageFocus: "אֶרֶץ",
        transliteration: "erets",
        publicText:
          "In the beginning God created the heaven and the earth. And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.",
        functionNotice:
          "The chain begins with created domain, separation, naming, gathered waters, dry land, and visible goodness.",
      },
      {
        ref: "Genesis 4:10–12",
        title: "Blood, ground, witness",
        originalLanguageFocus: "אֲדָמָה / דָּם",
        transliteration: "adamah / dam",
        publicText:
          "The voice of thy brother's blood crieth unto me from the ground. And now art thou cursed from the earth, which hath opened her mouth to receive thy brother's blood from thy hand.",
        functionNotice:
          "The field is no longer neutral scenery. Ground receives blood, blood cries, and the domain becomes a witness surface.",
      },
      {
        ref: "Leviticus 25:2–5",
        title: "Land rest, yield, release",
        originalLanguageFocus: "אֶרֶץ / שַׁבָּת",
        transliteration: "erets / shabbath",
        publicText:
          "When ye come into the land which I give you, then shall the land keep a sabbath unto the LORD. Six years thou shalt sow thy field, and six years thou shalt prune thy vineyard, and gather in the fruit thereof.",
        functionNotice:
          "Land touches gift, rhythm, yield, obedience, and rest. The domain has a commanded order, not merely a location.",
      },
    ],
    chainReading: [
      "This chain does not prove the whole Ecology course by itself. It gives the first public reading path for how land-language begins to carry created domain, visible condition, witness, yield, rest, and dwellability.",
      "The chain keeps together what modern readers often separate: creation, justice, ecology, Sabbath, inheritance, and final restoration.",
      "The next build step is to expand this seed chain with exile, return, prophetic restoration, and new creation passages before treating it as a mature public chain.",
    ],
    unresolvedPressure: [
      "This chain still needs more land-pollution passages.",
      "It still needs exile and return passages.",
      "It still needs prophetic restoration passages.",
      "It still needs Revelation new-earth pressure.",
      "It still needs a cleaner distinction between אֶרֶץ / erets and אֲדָמָה / adamah.",
    ],
    publicNodeMeta: {
      compiler: "Lex Bible Project",
      reviewer: "Pending theological and lexical review",
      sourcePacket: "Titus Canon Chain seed set · Ecology / H0776 domain witness chain",

      sourcePacketSlug: "titus-canon-chain-seed-set-ecology-h0776-domain-witness-chain",
      status: "beta",
      version: "1.0",
      lastUpdated: "2026-06-30",
      confidence: "medium",
      knownLimits: [
        "This is a seed Canon Chain, not a complete whole-canon occurrence map.",
        "The chain is intentionally short for V1 and must be expanded before paid-course use.",
        "The Hebrew distinction between אֶרֶץ / erets and אֲדָמָה / adamah is visible but not yet fully mapped.",
        "The chain must later account for exile, return, prophetic restoration, and Revelation's new heaven and new earth.",
      ],
      sourceList: [
        "Genesis 1:1–10",
        "Genesis 4:10–12",
        "Leviticus 25:2–5",
        "Titus H0776 / erets lesson",
        "Lex Project governing method documents",
      ],
    },
  },
];

export function getCanonChain(slug: string) {
  return canonChains.find((chain) => chain.slug === slug);
}
