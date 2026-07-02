import Link from "next/link";

type CompleteCard = {
  label: string;
  title: string;
  lines: string[];
};

const completeByLesson: Record<string, { subtitle: string; cards: CompleteCard[] }> = {
  h8451: {
    subtitle: "Law-Instruction anchor · Proverbs as Law Vocabulary",
    cards: [
      {
        label: "Lesson summary",
        title: "Torah begins the Proverbs law path",
        lines: [
          "H8451 / תורה / tôwrâh / Torah is the opening law-instruction anchor for this course.",
          "The Greek witness G3551 / νόμος / nomos stays visible beside it so the law-field is not lost when the course later crosses into Greek witness language.",
        ],
      },
      {
        label: "Book finding",
        title: "Proverbs places Torah inside lived formation",
        lines: [
          "Torah enters household instruction, heart-memory, lamp/light, correction, prayer-readiness, speech, justice, and life/death outcome.",
          "The word is not being handled as a flat definition or a detached legal category.",
        ],
      },
      {
        label: "Function reading",
        title: "Law-instruction before breach becomes judgment",
        lines: [
          "The pattern traced in this lesson is: law → hearing → instruction → correction → heart → mouth → path → justice → life.",
          "Proverbs trains discernment while the matter can still become correction instead of collapse.",
        ],
      },
      {
        label: "Course handoff",
        title: "The next word is Hear / Obey",
        lines: [
          "If תורה / tôwrâh is law-instruction, the next required movement is שמע / shâmaʻ.",
          "The course now moves from the instruction word to the response word.",
        ],
      },
    ],
  },
  h8085: {
    subtitle: "Hear-Obey response word · Proverbs as Law Vocabulary",
    cards: [
      {
        label: "Lesson summary",
        title: "Hearing is the first response gate",
        lines: [
          "H8085 / שמע / shâmaʻ names the response point where instruction is received or refused.",
          "The lesson keeps hearing and obedience in the same field without collapsing every occurrence into a single English gloss.",
        ],
      },
      {
        label: "Book finding",
        title: "Proverbs measures the ear",
        lines: [
          "The wise hear and increase learning.",
          "The one who turns the ear from hearing Torah exposes the prayer-mouth.",
        ],
      },
      {
        label: "Function reading",
        title: "Instruction received before breach hardens",
        lines: [
          "Hearing is mercy before collapse: wisdom, counsel, instruction, and correction can still be received.",
          "The pattern now moves toward commandment, heart, mouth, path, justice, and life.",
        ],
      },
      {
        label: "Course handoff",
        title: "The next word is Commandment",
        lines: [
          "If hearing is the response gate, the next course movement names the commanded instruction being received.",
          "The course now moves from Hear / Obey to H4687 / מצוה / mitsvâh / Commandment.",
        ],
      },
    ],
  },
};

export function LiveWordStudyComplete({
  lessonSlug,
  wordDisplayTitle,
  nextHref,
  nextLabel,
  courseHref,
  noelSummary,
  fallbackCards = [],
}: {
  lessonSlug: string;
  wordDisplayTitle: string;
  nextHref?: string;
  nextLabel?: string;
  courseHref: string;
  noelSummary?: string | null;
  fallbackCards?: CompleteCard[];
}) {
  const content = completeByLesson[lessonSlug] ?? {
    subtitle: noelSummary ?? "Proverbs as Law Vocabulary",
    cards:
      fallbackCards.length > 0
        ? fallbackCards
        : [
            {
              label: "Lesson summary",
              title: `${wordDisplayTitle} word study complete`,
              lines: ["This live word-study pass is complete."],
            },
          ],
  };

  return (
    <section className="course-word-packet__review-summary" aria-label="Word study complete">
      <article className="course-word-packet__complete-card">
        <p className="course-word-packet__field-label">Word study complete</p>
        <h3>{wordDisplayTitle}</h3>
        <p className="course-word-packet__complete-subtitle">{content.subtitle}</p>
      </article>

      {content.cards.map((card) => (
        <article className="course-word-packet__method-statement" key={`${lessonSlug}-${card.title}`}>
          <p className="course-word-packet__field-label">{card.label}</p>
          <h3>{card.title}</h3>
          <ul>
            {card.lines.map((line) => (
              <li key={`${card.title}-${line}`}>{line}</li>
            ))}
          </ul>
        </article>
      ))}

      <article className="course-word-packet__method-statement">
        <p className="course-word-packet__field-label">Continue</p>
        <h3>Choose the next movement</h3>
        <div className="course-movement-rail__complete-actions">
          <Link className="course-movement-rail__course-link" href={courseHref}>
            Course
          </Link>
          {nextHref ? (
            <Link className="course-movement-rail__next-study-link" href={nextHref}>
              {nextLabel ?? "Next word study →"}
            </Link>
          ) : null}
        </div>
      </article>
    </section>
  );
}
