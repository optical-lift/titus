export type TitusCourse = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status: "active" | "coming_later";
  firstLessonSlug?: string;
  lessons: string[];
};

export const courses: TitusCourse[] = [
  {
    slug: "ecology",
    title: "Ecology",
    subtitle: "Creation Vocabulary as Witness-Field",
    description:
      "Land, ground, water, seed, fruit, food, rest, yield, and dwelling traced as a guided canon word-study path.",
    status: "active",
    firstLessonSlug: "erets",
    lessons: ["erets"],
  },
  {
    slug: "romans",
    title: "Romans",
    subtitle: "Paul’s Argument Through Lexical Pressure",
    description:
      "Law, righteousness, faith, Spirit, flesh, body, creation, Israel, mercy, and nations.",
    status: "coming_later",
    lessons: [],
  },
  {
    slug: "kingdom",
    title: "Kingdom of Heaven",
    subtitle: "Domain, Reign, Inheritance, City",
    description:
      "Domain, reign, inheritance, gates, throne, judgment, nations, and fruit.",
    status: "coming_later",
    lessons: [],
  },
  {
    slug: "eschatology",
    title: "Eschatology",
    subtitle: "Revelation Vocabulary Through Whole-Canon Function",
    description:
      "Earth, sea, city, bride, beast, fire, resurrection, reign, and final dwelling.",
    status: "coming_later",
    lessons: [],
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}
