export type LessonDrawer = {
  code: string;
  heading: string;
  body: string[];
};

export type CanonPassage = {
  ref: string;
  text: string;
  notice: string;
};

export type TitusLesson = {
  slug: string;
  courseSlug: string;
  lessonNumber: number;
  strongId: string;
  originalWord: string;
  transliteration: string;
  language: string;
  field: string;
  title: string;
  subtitle: string;
  status: "published" | "beta" | "queued";
  travelsWith: string[];
  companionPatternSlugs: string[];
  canonReading: CanonPassage[];
  drawers: LessonDrawer[];
};

export const lessons: TitusLesson[] = [
  {
    slug: "h0776",
    courseSlug: "ecology",
    lessonNumber: 1,
    strongId: "H0776",
    originalWord: "אֶרֶץ",
    transliteration: "erets",
    language: "Hebrew",
    field: "Land / Earth / Domain",
    title: "H0776 — אֶרֶץ / erets",
    subtitle: "Land, earth, country, domain.",
    status: "published",
    travelsWith: [
      "ground",
      "blood",
      "inheritance",
      "rest",
      "fruit",
      "dwelling",
    ],
    companionPatternSlugs: [
      "bloodguilt",
      "inheritance",
      "rest-release",
      "fruitfulness",
    ],
    canonReading: [
      {
        ref: "Genesis 1:1–10",
        text:
          "In the beginning God created the heaven and the earth. And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.",
        notice:
          "Notice separation, gathering, naming, water, dry land, and visible order before the Function Reading is stated.",
      },
      {
        ref: "Genesis 4:10–12",
        text:
          "The voice of thy brother's blood crieth unto me from the ground. And now art thou cursed from the earth, which hath opened her mouth to receive thy brother's blood from thy hand.",
        notice:
          "Notice that land is not scenery only. The field receives, testifies, and changes under human action.",
      },
      {
        ref: "Leviticus 25:2–5",
        text:
          "When ye come into the land which I give you, then shall the land keep a sabbath unto the LORD. Six years thou shalt sow thy field, and six years thou shalt prune thy vineyard, and gather in the fruit thereof.",
        notice:
          "Notice land touching gift, rhythm, rest, fruit, obedience, and release.",
      },
    ],
    drawers: [
      {
        code: "see",
        heading: "2 · See the Word",
        body: [
          "H0776 — אֶרֶץ / erets is a Hebrew word commonly rendered land, earth, country, ground, or domain depending on context.",
          "English often compresses this word into scenery, territory, planet, or property. Titus keeps those renderings visible but asks what the word is doing across the canon.",
        ],
      },
      {
        code: "trace",
        heading: "3 · Trace the Field",
        body: [
          "The word enters creation, inheritance, bloodguilt, exile, Sabbath, fruitfulness, restoration, and final dwelling.",
          "That means אֶרֶץ / erets should not be read as a flat place-word only. It repeatedly carries a domain whose condition becomes visible.",
        ],
      },
      {
        code: "companions",
        heading: "4 · Companion Patterns",
        body: [
          "Travels With: ground, blood, inheritance, rest, fruit, exile and return, dwelling.",
          "These companion patterns act as guardrails. They keep land from being reduced to scenery, private property, nation-state territory only, metaphor only, or heaven later.",
        ],
      },
      {
        code: "function",
        heading: "5 · Function Reading",
        body: [
          "The Function Reading observes that אֶרֶץ / erets functions as a created domain whose condition becomes publicly readable.",
          "The land can be ordered, filled, polluted, inherited, rested, emptied, restored, and finally made dwellable.",
        ],
      },
      {
        code: "traditions",
        heading: "6 · Traditions in Conversation",
        body: [
          "Devotional readings often preserve the goodness of creation and the pastoral nearness of God’s world.",
          "Covenantal readings often preserve land as gift, promise, inheritance, and responsibility.",
          "Eschatological readings often preserve the movement toward new creation.",
          "Each of these gets to stay in the conversation where it accounts for the canon pattern without flattening the word.",
        ],
      },
      {
        code: "stay",
        heading: "7 · What Gets to Stay",
        body: [
          "Real place gets to stay. Israel’s inheritance history gets to stay. New creation movement gets to stay. Spiritual meaning gets to stay.",
          "What cannot stay is any reading that makes land unreadable, morally neutral, disconnected from obedience, or detached from dwelling.",
        ],
      },
      {
        code: "accounted",
        heading: "8 · What Must Be Accounted For",
        body: [
          "This reading must still account for real geography, Israel’s historical land promises, exile and return, prophetic restoration, and Revelation’s new heaven and new earth.",
          "It must also avoid pretending that every land passage says the same thing in the same way.",
        ],
      },
      {
        code: "receive",
        heading: "9 · Receive Carefully",
        body: [
          "Before completing this lesson, the reader should be able to explain what אֶרֶץ / erets names, what English compresses, which companion patterns stay active, and what the reading must still account for.",
          "Next lesson queued: H0127 — אֲדָמָה / adamah.",
        ],
      },
    ],
  },
];

export function getLesson(slug: string) {
  const normalizedSlug = slug.toLowerCase();

  return lessons.find((lesson) => {
    const strongRoute = lesson.strongId.toLowerCase();
    const transliterationRoute = lesson.transliteration.toLowerCase();

    return (
      lesson.slug === normalizedSlug ||
      strongRoute === normalizedSlug ||
      transliterationRoute === normalizedSlug
    );
  });
}

export function getLessonsForCourse(courseSlug: string) {
  return lessons.filter((lesson) => lesson.courseSlug === courseSlug);
}
