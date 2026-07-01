export type TitusCourseStatus = "active" | "coming_later";

export type TitusHomePlacement = "active_path" | "packet_queue" | "hidden";

export type TitusCourse = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status: TitusCourseStatus;
  firstLessonSlug?: string;
  lessons: string[];

  /**
   * Homepage display control.
   * The homepage should render from these fields instead of hardcoding course cards.
   */
  homePlacement?: TitusHomePlacement;
  homeOrder?: number;
  homeBadge?: string;
  homeCtaLabel?: string;
  homeHref?: string;
  homeDescription?: string;
  homeMappedObjects?: string[];
};

export const courses: TitusCourse[] = [
  {
    slug: "proverbs-law-vocabulary",
    title: "Proverbs as Law Vocabulary",
    subtitle: "Torah in Discernment Form",
    description:
      "Law, hearing, commandment, heart, mouth, path, justice, house, king, life, and gate-right traced through the canon.",
    status: "active",
    lessons: [],
    homePlacement: "active_path",
    homeOrder: 10,
    homeBadge: "Active Path",
    homeCtaLabel: "Register for Proverbs",
    homeHref: "/courses/proverbs-law-vocabulary",
    homeDescription:
      "Follow law, hearing, commandment, heart, mouth, path, justice, house, king, life, and gate-right through the canon.",
    homeMappedObjects: [
      "Strong’s lessons",
      "canon chains",
      "function patterns",
      "guardrails",
    ],
  },
  {
    slug: "kingdom",
    title: "Kingdom",
    subtitle: "Prepared Inheritance, Public Rule, and Arrival",
    description:
      "Prepared inheritance, public rule, fruit, judgment, threshold entry, and arrival traced as a guided canon function path.",
    status: "coming_later",
    lessons: [],
    homePlacement: "packet_queue",
    homeOrder: 20,
    homeBadge: "Packet Ready · Guided Path Pending",
    homeCtaLabel: "Open map",
    homeHref: "/courses/kingdom",
    homeDescription:
      "Prepared inheritance, public rule, fruit, judgment, and arrival.",
    homeMappedObjects: [
      "kingdom fitness",
      "righteousness measure",
      "threshold entry",
      "inheritance end-state",
    ],
  },
  {
    slug: "righteousness",
    title: "Righteousness",
    subtitle: "Right-Order Made Visible",
    description:
      "Right-order becoming visible in body, speech, justice, judgment, commandment-doing, readable fruit, and final access.",
    status: "coming_later",
    lessons: [],
    homePlacement: "packet_queue",
    homeOrder: 30,
    homeBadge: "Packet Ready · Guided Path Pending",
    homeCtaLabel: "Open map",
    homeHref: "/courses/righteousness",
    homeDescription:
      "Right-order becoming visible in body, speech, justice, judgment, and final access.",
    homeMappedObjects: [
      "righteousness",
      "justice",
      "commandment-doing",
      "readable fruit",
    ],
  },
  {
    slug: "liberty",
    title: "Liberty",
    subtitle: "Lawful Release and Burden Reset",
    description:
      "Lawful release from burden into ordered participation, not self-sourced autonomy.",
    status: "coming_later",
    lessons: [],
    homePlacement: "packet_queue",
    homeOrder: 40,
    homeBadge: "Packet Ready · Guided Path Pending",
    homeCtaLabel: "Open map",
    homeHref: "/courses/liberty",
    homeDescription:
      "Lawful release from burden into ordered participation, not self-sourced autonomy.",
    homeMappedObjects: [
      "release",
      "burden reset",
      "obedience",
      "participation",
      "inheritance",
    ],
  },
  {
    slug: "ecology",
  homeDescription: "Creation as witness-field, ecology, land, creature, fruit, and dwellability traced through the canon.",
  homeCtaLabel: "Preview packet",
  homeBadge: "Packet Ready · Guided Path Pending",
  homeOrder: 1,
    title: "Ecology",
    subtitle: "Creation Vocabulary as Witness-Field",
    description:
      "Land, ground, water, seed, fruit, food, rest, yield, and dwelling traced as a guided canon word-study path.",
    status: "coming_later",
    firstLessonSlug: "h0776",
    lessons: ["h0776"],
    homePlacement: "packet_queue",
  },
  {
    slug: "romans",
    title: "Romans",
    subtitle: "Paul’s Argument Through Lexical Pressure",
    description:
      "Law, righteousness, faith, Spirit, flesh, body, creation, Israel, mercy, and nations.",
    status: "coming_later",
    lessons: [],
    homePlacement: "hidden",
  },
  {
    slug: "eschatology",
    title: "Eschatology",
    subtitle: "Revelation Vocabulary Through Whole-Canon Function",
    description:
      "Earth, sea, city, bride, beast, fire, resurrection, reign, and final dwelling.",
    status: "coming_later",
    lessons: [],
    homePlacement: "hidden",
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getHomeStudyPaths(placement?: TitusHomePlacement) {
  return courses
    .filter((course) => {
      if (!course.homePlacement || course.homePlacement === "hidden") {
        return false;
      }

      if (placement) {
        return course.homePlacement === placement;
      }

      return true;
    })
    .sort((a, b) => (a.homeOrder ?? 999) - (b.homeOrder ?? 999));
}
