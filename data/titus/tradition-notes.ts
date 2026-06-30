import type { PublicNodeMeta } from "@/data/titus/public-node-meta";

export type TraditionCard = {
  slug: string;
  title: string;
  subtitle: string;
  cardKind:
    | "theological_system"
    | "tradition_family"
    | "reading_emphasis"
    | "method_stream";
  traditionFamily: string;
  status: "seed" | "beta" | "published";
  summary: string[];
  coreConcerns: string[];
  commonReadingHabits: string[];
  strengthsToPreserve: string[];
  commonFlatteningRisks: string[];
  sourceWitnessPlan: string[];
  publicNodeMeta: PublicNodeMeta;
};

export type TraditionPlacement = {
  slug: string;
  cardSlug: string;
  lessonSlug: string;
  courseSlug: string;
  placementTitle: string;
  placementSummary: string;
  whyItBelongsHere: string[];
  whatThisKeepsInViewHere: string[];
  whatThisMayFlattenHere: string[];
  whatGetsToStayHere: string[];
  whatMustBeAccountedForHere: string[];
};

export const traditionCards: TraditionCard[] = [
  {
    slug: "creation-theology",
    title: "Creation Theology",
    subtitle:
      "A tradition family that preserves the goodness, givenness, order, and creaturely visibility of creation.",
    cardKind: "tradition_family",
    traditionFamily: "Creation / theological ecology / devotional creation reading",
    status: "beta",
    summary: [
      "Creation Theology names the stream of Christian reading that treats the created world as good, ordered, given, and theologically meaningful rather than as disposable scenery.",
      "This card is reusable. It does not belong only to אֶרֶץ / erets or only to Ecology. It can later attach to water, seed, fruit, body, temple, new creation, Romans, Revelation, and other course paths.",
    ],
    coreConcerns: [
      "God creates and names a world that is good.",
      "Created things can carry witness, order, gift, and responsibility.",
      "Salvation should not be framed as escape from created reality in a way that erases embodied or ecological language.",
    ],
    commonReadingHabits: [
      "Noticing creation order before later fall, exile, restoration, or consummation language.",
      "Preserving concrete place, body, creatureliness, and visible goodness.",
      "Connecting creation and new creation without treating the middle of the canon as disposable.",
    ],
    strengthsToPreserve: [
      "real creation goodness",
      "real embodied place",
      "God’s delight in visible creation",
      "the goodness of ordered domains",
    ],
    commonFlatteningRisks: [
      "It can become too general if creation goodness is detached from obedience, bloodguilt, judgment, rest, and restoration.",
      "It can make creation affirmation sound complete before the question of dwellability has been tested.",
      "It can turn land into beautiful scenery while ignoring the canon’s witness language.",
    ],
    sourceWitnessPlan: [
      "Later source witnesses may include broad Protestant creation commentary, theological ecology writers, patristic creation witnesses, and major reception streams that preserve creation goodness.",
      "Named source witnesses are not yet attached in this V1 public seed.",
    ],
    publicNodeMeta: {
      compiler: "Lex Bible Project",
      reviewer: "Pending theological and lexical review",
      sourcePacket:
        "Titus Tradition Card seed set · reusable theological reading streams",
      status: "beta",
      version: "1.0",
      lastUpdated: "2026-06-30",
      confidence: "medium",
      knownLimits: [
        "This is a reusable tradition card, not a full doctrinal history.",
        "Named source witnesses still need to be attached before paid-course use.",
        "This card should not be treated as defining every reader or denomination that values creation goodness.",
      ],
      sourceList: [
        "Genesis 1:1–10",
        "Titus H0776 / erets lesson",
        "Created Domain Made Readable Function Lens",
        "Lex Project governing method documents",
      ],
    },
  },
  {
    slug: "covenantal-biblical-theology",
    title: "Covenantal Biblical Theology",
    subtitle:
      "A tradition family that preserves promise, inheritance, boundary, responsibility, exile, and restoration.",
    cardKind: "tradition_family",
    traditionFamily: "Covenantal / biblical theology / promise-inheritance reading",
    status: "beta",
    summary: [
      "Covenantal Biblical Theology names the stream of reading that keeps promise, covenant, inheritance, boundary, responsibility, exile, and return in view across the canon.",
      "This card is reusable. It can attach to land, seed, law, promise, circumcision, kingdom, Israel, inheritance, priesthood, city, and new creation course paths.",
    ],
    coreConcerns: [
      "God gives promises and binds people to covenant responsibility.",
      "Inheritance is received as gift and guarded by faithfulness, not seized as neutral possession.",
      "Exile and restoration must remain visible when land, people, and promise language are traced.",
    ],
    commonReadingHabits: [
      "Tracing promise and fulfillment across the canon.",
      "Holding together gift, obedience, boundary, inheritance, dispossession, and return.",
      "Reading the Old and New Testaments as connected rather than detached religious systems.",
    ],
    strengthsToPreserve: [
      "Israel’s historical land promise",
      "gift language",
      "boundary language",
      "responsibility and stewardship",
      "exile and return pressure",
    ],
    commonFlatteningRisks: [
      "It can collapse land into ownership without keeping gift and stewardship visible.",
      "It can isolate inheritance from creation, bloodguilt, rest, and new creation.",
      "It can make covenant categories so total that the smaller lexical behavior of a word is swallowed by system language.",
    ],
    sourceWitnessPlan: [
      "Later source witnesses may include covenant theology, biblical theology, and major Protestant reception witnesses.",
      "Named source witnesses are not yet attached in this V1 public seed.",
    ],
    publicNodeMeta: {
      compiler: "Lex Bible Project",
      reviewer: "Pending theological and lexical review",
      sourcePacket:
        "Titus Tradition Card seed set · reusable theological reading streams",
      status: "beta",
      version: "1.0",
      lastUpdated: "2026-06-30",
      confidence: "medium",
      knownLimits: [
        "This is a reusable tradition card, not a full covenant theology treatment.",
        "The card preserves the tradition-family contribution without resolving every covenant-continuity debate.",
        "Named source witnesses and resistant passages still need to be attached.",
      ],
      sourceList: [
        "Genesis 1:1–10",
        "Genesis 4:10–12",
        "Leviticus 25:2–5",
        "Inheritance Pattern Debrief",
        "Lex Project governing method documents",
      ],
    },
  },
  {
    slug: "dispensationalism",
    title: "Dispensationalism",
    subtitle:
      "A theological system that strongly preserves distinction, historical promise, Israel language, and staged administration across the canon.",
    cardKind: "theological_system",
    traditionFamily: "Dispensational / evangelical system / Israel-and-administration reading",
    status: "seed",
    summary: [
      "Dispensationalism names a Christian theological system that commonly emphasizes distinction across God’s administrations, the continuing importance of Israel language, and the integrity of historical promises.",
      "This card is reusable. It can later attach to land, Israel, kingdom, temple, law, church, Revelation, prophecy, inheritance, and eschatology course paths.",
    ],
    coreConcerns: [
      "Do not erase Israel’s historical identity or promises.",
      "Do not collapse every stage of biblical administration into one undifferentiated system.",
      "Do not spiritualize future-facing prophecy in a way that makes concrete promise language disappear.",
    ],
    commonReadingHabits: [
      "Watching for distinctions between Israel, nations, church, kingdom, and future restoration.",
      "Preserving literal or historical force where other readings may move quickly to typology or spiritual fulfillment.",
      "Reading prophecy and eschatology with strong attention to future concrete fulfillment.",
    ],
    strengthsToPreserve: [
      "Israel language remains visible",
      "historical promise remains concrete",
      "future restoration remains accountable",
      "prophetic specificity is not prematurely dissolved",
    ],
    commonFlatteningRisks: [
      "It can over-separate what the canon may be joining.",
      "It can treat administrative distinction as the controlling issue even when the local lexical issue is domain, witness, rest, or dwellability.",
      "It can preserve concrete promise well while under-reading companion patterns that cut across the system boundary.",
    ],
    sourceWitnessPlan: [
      "Later source witnesses should include representative dispensational sources and major critics/alternatives for fair contrast.",
      "Named source witnesses are not yet attached in this V1 public seed.",
    ],
    publicNodeMeta: {
      compiler: "Lex Bible Project",
      reviewer: "Pending theological and lexical review",
      sourcePacket:
        "Titus Tradition Card seed set · reusable theological reading streams",
      status: "seed",
      version: "1.0",
      lastUpdated: "2026-06-30",
      confidence: "low",
      knownLimits: [
        "This is only a seed card proving the reusable-theology architecture.",
        "It is not yet a sourced doctrinal history of dispensationalism.",
        "It should not be treated as representing every dispensational thinker or sub-school.",
        "Named source witnesses and denominational/source distinctions must be added before paid-course use.",
      ],
      sourceList: [
        "Titus H0776 / erets lesson placement",
        "Lex Project governing method documents",
      ],
    },
  },
  {
    slug: "new-creation-restoration",
    title: "New Creation Restoration",
    subtitle:
      "A tradition family that preserves the forward movement toward restored dwelling and new heaven / new earth.",
    cardKind: "tradition_family",
    traditionFamily: "Eschatological / restoration / new creation reading",
    status: "beta",
    summary: [
      "New Creation Restoration names the stream of reading that keeps the canon’s forward movement toward restored creation, final dwelling, and new heaven / new earth visible.",
      "This card is reusable. It can attach to earth, city, bride, kingdom, resurrection, body, temple, Revelation, Romans, and eschatology course paths.",
    ],
    coreConcerns: [
      "The canon does not leave creation in curse, pollution, exile, or emptiness.",
      "Final hope should not be reduced to escape from creation.",
      "Restored dwelling remains a major biblical endpoint.",
    ],
    commonReadingHabits: [
      "Reading Genesis and Revelation in conversation.",
      "Tracing restoration, dwelling, city, creation groaning, resurrection, and final renewal.",
      "Refusing to treat earth-language as merely disposable metaphor once eschatology appears.",
    ],
    strengthsToPreserve: [
      "restoration hope",
      "new creation",
      "final dwellability",
      "Revelation’s new heaven and new earth",
      "the forward movement of the canon",
    ],
    commonFlatteningRisks: [
      "It can jump to the end before tracing the earlier land field.",
      "It can spiritualize new creation in a way that erases real creation, real land, or real bodies.",
      "It can read Revelation as detached from Genesis, Law, Prophets, and inheritance language.",
    ],
    sourceWitnessPlan: [
      "Later source witnesses should include major new-creation, eschatological, and restoration streams.",
      "Named source witnesses are not yet attached in this V1 public seed.",
    ],
    publicNodeMeta: {
      compiler: "Lex Bible Project",
      reviewer: "Pending theological and lexical review",
      sourcePacket:
        "Titus Tradition Card seed set · reusable theological reading streams",
      status: "beta",
      version: "1.0",
      lastUpdated: "2026-06-30",
      confidence: "medium",
      knownLimits: [
        "This is a reusable tradition card, not a full eschatology module.",
        "The card names the restoration contribution without settling every millennial or land-continuity debate.",
        "Prophetic and Revelation canon chains still need to be attached.",
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

export const traditionPlacements: TraditionPlacement[] = [
  {
    slug: "h0776-ecology-creation-theology",
    cardSlug: "creation-theology",
    lessonSlug: "h0776",
    courseSlug: "ecology",
    placementTitle: "Creation Theology beside אֶרֶץ / erets",
    placementSummary:
      "In Ecology, this tradition keeps creation goodness and ordered visibility in the conversation while the lesson tests whether land also becomes witness-bearing and condition-readable.",
    whyItBelongsHere: [
      "H0776 / אֶרֶץ / erets begins in creation language before it enters pollution, inheritance, exile, rest, or restoration.",
      "The Ecology course needs this tradition because land must stay visibly created and good, not merely problematized.",
    ],
    whatThisKeepsInViewHere: [
      "created goodness",
      "visible order",
      "embodied place",
      "the land/earth field before later rupture",
    ],
    whatThisMayFlattenHere: [
      "It may understate bloodguilt, pollution, and witness if creation goodness is made the whole point.",
      "It may turn land into scenery unless the rest of the canon chain is kept active.",
    ],
    whatGetsToStayHere: [
      "real creation goodness",
      "real land and earth language",
      "the goodness of ordered domains",
    ],
    whatMustBeAccountedForHere: [
      "Genesis 4 blood crying from the ground",
      "land pollution",
      "land Sabbath",
      "exile and return",
      "new creation",
    ],
  },
  {
    slug: "h0776-ecology-covenantal-biblical-theology",
    cardSlug: "covenantal-biblical-theology",
    lessonSlug: "h0776",
    courseSlug: "ecology",
    placementTitle: "Covenantal Biblical Theology beside אֶרֶץ / erets",
    placementSummary:
      "In Ecology, this tradition keeps promise, inheritance, boundary, responsibility, exile, and return in view while the lesson asks how land functions as a readable domain.",
    whyItBelongsHere: [
      "Land language cannot be studied honestly without inheritance, promise, exile, and return remaining visible.",
      "This tradition helps prevent the Ecology course from becoming only nature-language.",
    ],
    whatThisKeepsInViewHere: [
      "gift",
      "promise",
      "inheritance",
      "boundary",
      "responsibility",
      "exile and return",
    ],
    whatThisMayFlattenHere: [
      "It may reduce land to covenant possession if creation, bloodguilt, rest, and final dwellability are not kept visible.",
      "It may make system categories too controlling for the local lexical behavior of אֶרֶץ / erets.",
    ],
    whatGetsToStayHere: [
      "Israel’s historical land promise",
      "gift and responsibility",
      "inheritance history",
      "exile and restoration pressure",
    ],
    whatMustBeAccountedForHere: [
      "creation before covenant land",
      "bloodguilt and pollution",
      "land Sabbath",
      "prophetic restoration",
      "new heaven and new earth",
    ],
  },
  {
    slug: "h0776-ecology-dispensationalism",
    cardSlug: "dispensationalism",
    lessonSlug: "h0776",
    courseSlug: "ecology",
    placementTitle: "Dispensationalism beside אֶרֶץ / erets",
    placementSummary:
      "In Ecology, this placement lets Dispensationalism keep historical promise, Israel language, and future concrete restoration in view while the lesson tests whether land-language also functions as witness-field and dwellability-field.",
    whyItBelongsHere: [
      "A land lesson inevitably touches Israel, promise, inheritance, and future restoration language.",
      "Dispensationalism is one of the Christian systems that most strongly resists dissolving those concrete categories too quickly.",
    ],
    whatThisKeepsInViewHere: [
      "Israel language",
      "historical promise",
      "concrete restoration",
      "future-facing prophecy pressure",
    ],
    whatThisMayFlattenHere: [
      "It may make Israel/future distinction the controlling issue before the local land-function has been traced.",
      "It may under-read creation, bloodguilt, rest, and domain witness patterns that move across the canon before system categories are applied.",
    ],
    whatGetsToStayHere: [
      "concrete promise language",
      "future restoration pressure",
      "Israel’s land-history cannot be erased",
    ],
    whatMustBeAccountedForHere: [
      "Genesis creation land before Israel’s land history",
      "bloodguilt and land pollution",
      "land Sabbath and release",
      "prophetic restoration",
      "new creation and final dwelling",
    ],
  },
  {
    slug: "h0776-ecology-new-creation-restoration",
    cardSlug: "new-creation-restoration",
    lessonSlug: "h0776",
    courseSlug: "ecology",
    placementTitle: "New Creation Restoration beside אֶרֶץ / erets",
    placementSummary:
      "In Ecology, this tradition keeps the final restored-dwelling movement in view while the lesson refuses to jump to the end before tracing land through creation, witness, inheritance, pollution, rest, and restoration.",
    whyItBelongsHere: [
      "H0776 / אֶרֶץ / erets cannot be cut off before the new heaven and new earth question.",
      "The Ecology course needs restoration hope without skipping the earlier canon chain.",
    ],
    whatThisKeepsInViewHere: [
      "restoration hope",
      "new heaven and new earth",
      "final dwellability",
      "creation’s forward movement",
    ],
    whatThisMayFlattenHere: [
      "It may jump to Revelation before the word has been traced through Law, Prophets, exile, and return.",
      "It may use final restoration to erase concrete land, body, or inheritance pressure.",
    ],
    whatGetsToStayHere: [
      "new creation movement",
      "final restored dwelling",
      "earth-language remains accountable at the end of the canon",
    ],
    whatMustBeAccountedForHere: [
      "Genesis creation order",
      "land pollution",
      "Israel’s inheritance history",
      "prophetic restoration",
      "Revelation’s city and earth language",
    ],
  },
];

export function getTraditionCard(slug: string) {
  return traditionCards.find((card) => card.slug === slug);
}

export function getTraditionPlacement(slug: string) {
  return traditionPlacements.find((placement) => placement.slug === slug);
}

export function getTraditionPlacements(slugs: string[]) {
  return slugs
    .map((slug) => getTraditionPlacement(slug))
    .filter((placement): placement is TraditionPlacement => Boolean(placement));
}

export function getPlacementsForTradition(cardSlug: string) {
  return traditionPlacements.filter((placement) => placement.cardSlug === cardSlug);
}
