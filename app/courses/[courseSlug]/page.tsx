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
  { lessonNumber: 1, strongId: "H8451", original: "תורה", transliteration: "tôrâ", title: "Torah / Law-Instruction", href: "/lessons/h8451" },
  { lessonNumber: 2, strongId: "H8085", original: "שמע", transliteration: "shāmaʿ", title: "Hear / Obey", href: "/lessons/h8085" },
  { lessonNumber: 3, strongId: "H4687", original: "מצוה", transliteration: "mitsvâh", title: "Commandment", href: "/lessons/h4687" },
  { lessonNumber: 4, strongId: "H3820", original: "לב", transliteration: "lēb", title: "Heart", href: "/lessons/h3820" },
  { lessonNumber: 5, strongId: "H6310", original: "פה", transliteration: "peh", title: "Mouth", href: "/lessons/h6310" },
  { lessonNumber: 6, strongId: "H1870", original: "דרך", transliteration: "derek", title: "Way / Path", href: "/lessons/h1870" },
  { lessonNumber: 7, strongId: "H4941", original: "משפט", transliteration: "mishpāṭ", title: "Judgment / Justice", href: "/lessons/h4941" },
  { lessonNumber: 8, strongId: "H6666", original: "צדקה", transliteration: "ṣᵉdāqâh", title: "Righteousness", href: "/lessons/h6666" },
  { lessonNumber: 9, strongId: "H2416", original: "חי", transliteration: "ḥay", title: "Life-State", href: "/lessons/h2416" },
  { lessonNumber: 10, strongId: "H2421", original: "חיה", transliteration: "ḥāyâh", title: "Live / Revive", href: "/lessons/h2421" },
  { lessonNumber: 11, strongId: "G3551", original: "νόμος", transliteration: "nomos", title: "Nomos / Law Witness", href: "/lessons/g3551" },
];

const weeklyPath = [
  { week: "Week 1", title: "Law + Hearing", lessons: ["Torah / Law-Instruction", "Hear / Obey", "Commandment"] },
  { week: "Week 2", title: "Interior Formation", lessons: ["Heart", "Mouth", "Way / Path"] },
  { week: "Week 3", title: "Public Order", lessons: ["Judgment / Justice", "Righteousness", "Life-State"] },
  { week: "Week 4", title: "Life + Greek Witness", lessons: ["Live / Revive", "Nomos / Law Witness", "Course Review"] },
];

const courseOutcomes = [
  "Identify the core Hebrew and Greek law vocabulary behind the course.",
  "See how תורה / tôrâ / Torah functions as law-instruction, not a flat English label.",
  "Trace how one shared canon word can keep its identity while changing book-field emphasis.",
  "Recognize the word-field before applying a hermeneutic tradition to it.",
  "Follow canon chains from the local book outward into whole-canon witness language.",
];

const methodModules = [
  { label: "Lexicon", summary: "Name the Hebrew or Greek word, rendering, anchor, and witness language." },
  { label: "Book Context", summary: "See how the word behaves inside the course book before widening the claim." },
  { label: "Travels With", summary: "Study the companion words that travel inside the same field." },
  { label: "Canon Chains", summary: "Follow the pattern from the local book into wider Scripture." },
  { label: "Function Reading", summary: "State what the word does after the pattern has been traced." },
  { label: "Applied Traditions", summary: "See how established Christian hermeneutic traditions have been applied beside this word-field." },
  { label: "Reading Controls", summary: "Name what any faithful reading must account for." },
];

const includedItems = [
  { title: "Guided word-study lessons", summary: "Move through the course vocabulary sequence in order." },
  { title: "7 instructional modules + completion", summary: "Each word study follows the same repeatable Titus method." },
  { title: "Hebrew and Greek vocabulary", summary: "Original-language terms are shown with transliteration and course rendering." },
  { title: "Canon-chain study", summary: "Short passage trails show how the word travels through Scripture." },
  { title: "Applied tradition readings", summary: "Established Christian hermeneutic traditions are shown as applied readings beside the word-field." },
  { title: "Reading controls", summary: "Each Function Reading is held accountable to the whole word-field." },
];

export function generateStaticParams() {
  return courses.map((course) => ({ courseSlug: course.slug }));
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
    title: noelPacket?.title ?? course?.title ?? "Titus Course",
    subtitle: noelPacket?.subtitle ?? course?.subtitle ?? "Cross-Canon Pattern",
    description:
      noelPacket?.description ||
      "A guided Hebrew and Greek word-study course tracing how a canon word keeps shared identity while changing course placement.",
    firstLessonSlug: noelPacket?.lessons[0]?.lessonSlug ?? course?.firstLessonSlug ?? course?.lessons[0] ?? "h8451",
  };

  const courseLessons: CourseLessonView[] = noelPacket?.lessons.length
    ? noelPacket.lessons.map((lesson) => {
        const strongId = lesson.word.strongId;
        return {
          lessonNumber: lesson.lessonNumber,
          strongId,
          original: lesson.word.originalWord,
          transliteration: lesson.word.transliteration,
          title: lesson.lessonTitle,
          href: strongId ? `/courses/${courseView.slug}/words/${strongId.toLowerCase()}` : lesson.lessonHref,
        };
      })
    : proverbsLessonMetadata;

  const firstLessonHref = courseLessons[0]?.href ?? `/lessons/${courseView.firstLessonSlug}?from=/courses/${courseView.slug}`;
  const lessonCount = courseLessons.length;

  return (
    <main className="course-landing course-sales-page">
      <section className="course-landing__hero course-sales-page__hero" aria-labelledby="course-title">
        <p className="course-landing__eyebrow">Guided Titus course</p>
        <h1 id="course-title">{courseView.title}</h1>
        <p className="course-landing__subtitle">{courseView.subtitle}</p>
        <p className="course-landing__description">{courseView.description}</p>

        <div className="course-sales-page__stats" aria-label="Course facts">
          <span>{lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}</span>
          <span>7 modules + completion</span>
          <span>Live Noel packet</span>
          <span>Beta course</span>
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
        <p className="course-landing__eyebrow" id="course-outcomes">What you will learn</p>
        <h2>Shared word identity, course-shaped placement.</h2>
        <ul className="course-sales-page__check-list">
          {courseOutcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}
        </ul>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="course-rhythm">
        <p className="course-landing__eyebrow" id="course-rhythm">Course path</p>
        <div className="course-sales-page__week-grid">
          {weeklyPath.map((week) => (
            <article className="course-sales-page__week-card" key={week.week}>
              <span>{week.week}</span>
              <h2>{week.title}</h2>
              <ul>{week.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="course-lessons" id="course-lessons">
        <p className="course-landing__eyebrow">Course lessons</p>
        <h2 id="course-lessons">The course vocabulary path</h2>
        <div className="course-sales-page__lesson-grid">
          {courseLessons.map((lesson) => (
            <Link className="course-sales-page__lesson-card" href={lesson.href} key={`${lesson.lessonNumber}-${lesson.strongId}`}>
              <span>Lesson {lesson.lessonNumber}</span>
              <h3>{lesson.title}</h3>
              <p>{lesson.strongId} · {lesson.original} / {lesson.transliteration}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="course-method">
        <p className="course-landing__eyebrow" id="course-method">How each word study works</p>
        <h2>One repeated Titus method.</h2>
        <div className="course-sales-page__module-grid">
          {methodModules.map((module) => (
            <article className="course-sales-page__module-card" key={module.label}>
              <h3>{module.label}</h3>
              <p>{module.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="course-included">
        <p className="course-landing__eyebrow" id="course-included">Included</p>
        <h2>The study packet.</h2>
        <div className="course-sales-page__included-grid">
          {includedItems.map((item) => (
            <article className="course-sales-page__included-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
