import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/data/titus/courses";
import { getNoelCoursePreviewPacketBySlug } from "@/lib/titus/noel-course-preview";

type CoursePageProps = {
  params: Promise<{
    courseSlug: string;
  }>;
};

type CourseLessonView = {
  lessonNumber: number;
  strongId: string;
  original: string;
  transliteration: string;
  title: string;
  href: string;
};

const proverbsLessonMetadata: CourseLessonView[] = [
  {
    lessonNumber: 1,
    strongId: "H8451",
    original: "תורה",
    transliteration: "tôrâ",
    title: "Torah / Law-Instruction",
    href: "/lessons/h8451",
  },
  {
    lessonNumber: 2,
    strongId: "H8085",
    original: "שמע",
    transliteration: "shāmaʿ",
    title: "Hear / Obey",
    href: "/lessons/h8085",
  },
  {
    lessonNumber: 3,
    strongId: "H4687",
    original: "מצוה",
    transliteration: "mitsvâh",
    title: "Commandment",
    href: "/lessons/h4687",
  },
  {
    lessonNumber: 4,
    strongId: "H3820",
    original: "לב",
    transliteration: "lēb",
    title: "Heart",
    href: "/lessons/h3820",
  },
  {
    lessonNumber: 5,
    strongId: "H6310",
    original: "פה",
    transliteration: "peh",
    title: "Mouth",
    href: "/lessons/h6310",
  },
  {
    lessonNumber: 6,
    strongId: "H1870",
    original: "דרך",
    transliteration: "derek",
    title: "Way / Path",
    href: "/lessons/h1870",
  },
  {
    lessonNumber: 7,
    strongId: "H4941",
    original: "משפט",
    transliteration: "mishpāṭ",
    title: "Judgment / Justice",
    href: "/lessons/h4941",
  },
  {
    lessonNumber: 8,
    strongId: "H6666",
    original: "צדקה",
    transliteration: "ṣᵉdāqâh",
    title: "Righteousness",
    href: "/lessons/h6666",
  },
  {
    lessonNumber: 9,
    strongId: "H2416",
    original: "חי",
    transliteration: "ḥay",
    title: "Life-State",
    href: "/lessons/h2416",
  },
  {
    lessonNumber: 10,
    strongId: "H2421",
    original: "חיה",
    transliteration: "ḥāyâh",
    title: "Live / Revive",
    href: "/lessons/h2421",
  },
  {
    lessonNumber: 11,
    strongId: "G3551",
    original: "νόμος",
    transliteration: "nomos",
    title: "Nomos / Law Witness",
    href: "/lessons/g3551",
  },
];

const weeklyPath = [
  {
    week: "Week 1",
    title: "Law + Hearing",
    lessons: ["Torah / Law-Instruction", "Hear / Obey", "Commandment"],
  },
  {
    week: "Week 2",
    title: "Interior Formation",
    lessons: ["Heart", "Mouth", "Way / Path"],
  },
  {
    week: "Week 3",
    title: "Public Order",
    lessons: ["Judgment / Justice", "Righteousness", "Life-State"],
  },
  {
    week: "Week 4",
    title: "Life + Greek Witness",
    lessons: ["Live / Revive", "Nomos / Law Witness", "Course Review"],
  },
];

const courseOutcomes = [
  "Identify the core Hebrew and Greek law vocabulary behind Proverbs.",
  "See how תורה / tôrâ / Torah functions as law-instruction, not advice.",
  "Trace how law travels into hearing, commandment, heart, mouth, path, judgment, righteousness, and life.",
  "Recognize the word-field before applying a hermeneutic tradition to it.",
  "Follow canon chains from Torah through Proverbs and into Greek witness language.",
];

const methodModules = [
  {
    label: "Lexicon",
    summary: "Name the Hebrew or Greek word, rendering, anchor, and witness language.",
  },
  {
    label: "Book Context",
    summary: "See how the word behaves inside Proverbs before widening the claim.",
  },
  {
    label: "Travels With",
    summary: "Study the companion words that travel inside the same field.",
  },
  {
    label: "Canon Chains",
    summary: "Follow the pattern from Torah through Proverbs and into later Scripture.",
  },
  {
    label: "Function Reading",
    summary: "State what the word does after the pattern has been traced.",
  },
  {
    label: "Applied Traditions",
    summary: "See how established Christian hermeneutic traditions have been applied beside this word-field.",
  },
  {
    label: "Reading Controls",
    summary: "Name what any faithful reading must account for.",
  },

];

const includedItems = [
  {
    title: "11 guided word-study lessons",
    summary: "Move through the Proverbs vocabulary sequence in order.",
  },
  {
    title: "7 instructional modules + completion",
    summary: "Each word study follows the same repeatable Titus method.",
  },
  {
    title: "Hebrew and Greek vocabulary",
    summary: "Original-language terms are shown with transliteration and course rendering.",
  },
  {
    title: "Canon-chain study",
    summary: "Short passage trails show how the word travels through Scripture.",
  },
  {
    title: "Applied tradition readings",
    summary: "Established Christian hermeneutic traditions are shown as applied readings beside the word-field.",
  },
  {
    title: "Reading controls",
    summary: "Each Function Reading is held accountable to the whole word-field.",
  },
];

export function generateStaticParams() {
  return courses.map((course) => ({
    courseSlug: course.slug,
  }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  const noelPacket = await getNoelCoursePreviewPacketBySlug(courseSlug);

  if (!course && !noelPacket) {
    notFound();
  }

  const courseView = {
    slug: noelPacket?.courseSlug ?? course?.slug ?? courseSlug,
    title: noelPacket?.title ?? course?.title ?? "Proverbs as Law Vocabulary",
    subtitle: "Torah in Discernment Form",
    firstLessonSlug:
      noelPacket?.lessons[0]?.lessonSlug ??
      course?.firstLessonSlug ??
      course?.lessons[0] ??
      "h8451",
  };

  const firstLessonHref = `/lessons/${courseView.firstLessonSlug}?from=/courses/${courseView.slug}`;

  return (
    <main className="course-landing course-sales-page">
<section className="course-landing__hero course-sales-page__hero" aria-labelledby="course-title">
        <p className="course-landing__eyebrow">4-week guided Titus course</p>
        <h1 id="course-title">{courseView.title}</h1>
        <p className="course-landing__subtitle">{courseView.subtitle}</p>
        <p className="course-landing__description">
          A guided Hebrew and Greek word-study course tracing how Proverbs carries God’s
          law-instruction into hearing, heart, mouth, path, justice, and life.
        </p>

        <div className="course-sales-page__stats" aria-label="Course facts">
          <span>4 weeks</span>
          <span>11 lessons</span>
          <span>7 modules + completion</span>
          <span>$99 course</span>
        </div>

        <div className="course-sales-page__hero-actions">
          <Link className="course-landing__button" href={firstLessonHref}>
            Start the Course
          </Link>
          <a className="course-sales-page__secondary-link" href="#course-lessons">
            View lessons
          </a>
        </div>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="course-outcomes">
        <p className="course-landing__eyebrow" id="course-outcomes">
          What you will learn
        </p>
        <h2>Proverbs as law-instruction, not detached advice.</h2>
        <ul className="course-sales-page__check-list">
          {courseOutcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="course-rhythm">
        <p className="course-landing__eyebrow" id="course-rhythm">
          4-week course path
        </p>

        <div className="course-sales-page__week-grid">
          {weeklyPath.map((week) => (
            <article className="course-sales-page__week-card" key={week.week}>
              <span>{week.week}</span>
              <h2>{week.title}</h2>
              <ul>
                {week.lessons.map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        className="course-landing__section course-sales-page__section"
        aria-labelledby="course-lessons"
        id="course-lessons"
      >
        <p className="course-landing__eyebrow">
          Course lessons
        </p>
        <h2 id="course-lessons">The Proverbs vocabulary path</h2>

        <div className="course-sales-page__lesson-grid">
          {proverbsLessonMetadata.map((lesson) => (
            <Link
              className="course-sales-page__lesson-card"
              href={`${lesson.href}?from=/courses/${courseView.slug}`}
              key={lesson.strongId}
            >
              <span>Lesson {lesson.lessonNumber}</span>
              <h3>{lesson.title}</h3>
              <p>
                {lesson.strongId} · {lesson.original} / {lesson.transliteration}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="course-method">
        <p className="course-landing__eyebrow" id="course-method">
          How each word study works
        </p>

        <div className="course-sales-page__method-list">
          {methodModules.map((item, index) => (
            <article className="course-sales-page__method-row" key={item.label}>
              <span>{index + 1}</span>
              <div>
                <h2>{item.label}</h2>
                <p>{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="included">
        <p className="course-landing__eyebrow" id="included">
          Included in the course
        </p>

        <div className="course-sales-page__included-grid">
          {includedItems.map((item) => (
            <article className="course-sales-page__included-card" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="course-sales-page__fit-panel" aria-labelledby="course-fit">
        <div className="course-sales-page__fit-head">
          <p className="course-landing__eyebrow" id="course-fit">
            Course fit
          </p>
          <h2>A guided word-field course for serious Bible readers.</h2>
          <p>
            Titus is built for readers who want more than a devotional prompt and
            more structure than a concordance search. The course begins with the
            word-field, then traces how the pattern moves through Proverbs and the
            wider canon.
          </p>
        </div>

        <div className="course-sales-page__fit-columns" aria-label="Who this course serves and how Titus works">
          <div>
            <p className="course-sales-page__fit-label">Built for readers who want</p>
            <ul>
              <li>original-language study without needing Hebrew or Greek first</li>
              <li>a guided path instead of a search box</li>
              <li>help seeing what English translation compresses</li>
              <li>a way to compare applied traditions with the word-field itself</li>
            </ul>
          </div>

          <div>
            <p className="course-sales-page__fit-label">Titus does not start with</p>
            <ul>
              <li>application before the word has been traced</li>
              <li>isolated occurrences without a field</li>
              <li>a theological conclusion placed over the text too early</li>
              <li>a flat definition when the canon is showing function</li>
            </ul>
          </div>
        </div>

        <div className="course-sales-page__fit-method">
          <span>Method anchor</span>
          <p>
            What is the word? Where does it appear? What travels with it? How does
            the pattern move through the canon? What must any faithful reading
            account for?
          </p>
        </div>
      </section>

      <section className="course-landing__section course-sales-page__final-cta" aria-labelledby="start-course">
        <p className="course-landing__eyebrow" id="start-course">
          Begin the guided course
        </p>
        <h2>Start with Torah / Law-Instruction.</h2>
        <p>
          The first lesson establishes H8451 / תורה / tôrâ / Torah as the law-instruction
          anchor for the Proverbs vocabulary path.
        </p>
        <Link className="course-landing__button" href={firstLessonHref}>
          Start Lesson 1
        </Link>
      </section>
    </main>
  );
}
