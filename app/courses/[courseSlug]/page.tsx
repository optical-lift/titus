import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/data/titus/courses";
import { getCoursePacketPreview } from "@/data/titus/course-packet-previews";

type CoursePageProps = {
  params: Promise<{
    courseSlug: string;
  }>;
};

const courseMethod = [
  {
    label: "Read",
    summary: "Begin with the passage and word.",
  },
  {
    label: "Trace",
    summary: "Follow the repetition through Scripture.",
  },
  {
    label: "Walk",
    summary: "Move through the prepared lessons in order.",
  },
];

const preparedMaterials = [
  {
    label: "Word Field",
    summary: "Vocabulary and original-language identity used for the study.",
  },
  {
    label: "Canon Chain",
    summary: "Passage trail gathered across Scripture.",
  },
  {
    label: "Function Pattern",
    summary: "Repeated movement observed in the text.",
  },
  {
    label: "Guardrails",
    summary: "Related canon patterns kept in view.",
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

  if (!course) {
    notFound();
  }

  const packetPreview = getCoursePacketPreview(course.slug);

  const firstLessonSlug = course.firstLessonSlug ?? course.lessons[0];
  const beginHref = firstLessonSlug
    ? `/lessons/${firstLessonSlug}?from=/courses/${course.slug}`
    : undefined;
  return (
    <main className="course-landing">
      <Link className="course-landing__back" href="/">
        ← Course catalogue
      </Link>

      <section className="course-landing__hero" aria-labelledby="course-title">
        <p className="course-landing__eyebrow">Titus Course</p>
        <h1 id="course-title">{course.title}</h1>
        <p className="course-landing__subtitle">{course.subtitle}</p>
        <p className="course-landing__description">{course.description}</p>

        {beginHref ? (
          <Link className="course-landing__button" href={beginHref}>
            Begin course
          </Link>
        ) : (
          <p className="course-landing__pending">Guided path pending</p>
        )}
      </section>

      {packetPreview ? (
        <section
          className="course-landing__section course-landing__packet-preview"
          aria-labelledby="packet-preview"
        >
          <p className="course-landing__eyebrow" id="packet-preview">
            Packet Preview
          </p>

          <div className="course-landing__language-grid">
            <article>
              <h2>Hebrew Field</h2>
              <div className="course-landing__term-list">
                {packetPreview.hebrewField.map((term) => (
                  <span className="course-landing__term" key={term.strongId}>
                    <strong>{term.strongId}</strong>
                    <em>{term.transliteration}</em>
                    <small>{term.gloss}</small>
                  </span>
                ))}
              </div>
            </article>

            <article>
              <h2>Greek Witness</h2>
              <div className="course-landing__term-list">
                {packetPreview.greekWitness.map((term) => (
                  <span className="course-landing__term" key={term.strongId}>
                    <strong>{term.strongId}</strong>
                    <em>{term.transliteration}</em>
                    <small>{term.gloss}</small>
                  </span>
                ))}
              </div>
            </article>
          </div>

          <p className="course-landing__packet-note">{packetPreview.note}</p>
        </section>
      ) : null}

      <section className="course-landing__section" aria-labelledby="course-method">
        <p className="course-landing__eyebrow" id="course-method">
          Course Method
        </p>

        <div className="course-landing__method-grid">
          {courseMethod.map((item, index) => (
            <article className="course-landing__method-card" key={item.label}>
              <span>{index + 1}</span>
              <div>
                <h2>{item.label}</h2>
                <p>{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="course-landing__section"
        aria-labelledby="prepared-materials"
      >
        <p className="course-landing__eyebrow" id="prepared-materials">
          Prepared Materials
        </p>

        <div className="course-landing__material-grid">
          {preparedMaterials.map((item) => (
            <article className="course-landing__material-card" key={item.label}>
              <h2>{item.label}</h2>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
{beginHref ? (
        <div className="course-landing__final-action">
          <Link className="course-landing__button" href={beginHref}>
            Begin course
          </Link>
        </div>
      ) : null}
    </main>
  );
}
