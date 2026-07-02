type VocabularyCard = {
  label: string;
  title: string;
  lines: string[];
};

const vocabularyByLesson: Record<string, VocabularyCard[]> = {
  h8451: [
    {
      label: "Primary Hebrew term",
      title: "H8451 · תורה / tôwrâh / Torah",
      lines: [
        "Language: Hebrew.",
        "Course rendering: Torah / Law-Instruction.",
        "First Proverbs anchor: Proverbs 1:8.",
        "This word opens the Proverbs as Law Vocabulary path.",
      ],
    },
    {
      label: "English compression",
      title: "law → law / instruction",
      lines: [
        "Inherited English keeps law visible.",
        "The course rendering keeps the instructional function visible.",
        "In Proverbs, Torah is not treated as abstract legal category only.",
      ],
    },
    {
      label: "Lineage pointer",
      title: "H3384 · ירה / yârâh",
      lines: [
        "The stamp keeps yârâh visible as the lineage pointer beneath Torah.",
        "This stays in the lexicon layer until the function pattern is traced through the lesson.",
      ],
    },
    {
      label: "Greek law witness",
      title: "G3551 · νόμος / nomos",
      lines: [
        "Language: Greek.",
        "Rendering: law.",
        "Held beside H8451 so the Proverbs law-field can remain visible when the course reaches Greek witness language.",
      ],
    },
    {
      label: "Course placement",
      title: "Lesson 1 anchor",
      lines: [
        "This word starts the Proverbs Law Vocabulary path.",
        "Next course word: H8085 · שמע / shâmaʻ / Hear-Obey.",
      ],
    },
  ],
  h8085: [
    {
      label: "Primary Hebrew term",
      title: "H8085 · שמע / shâmaʻ / Hear-Obey",
      lines: [
        "Language: Hebrew.",
        "Course rendering: Hear / Obey.",
        "First Proverbs anchor: Proverbs 1:5.",
        "This word names the first response gate after Torah.",
      ],
    },
    {
      label: "English compression",
      title: "hear → hear / obey",
      lines: [
        "Inherited English keeps hearing visible.",
        "The course rendering keeps the response function visible.",
        "In Proverbs, hearing is the point where instruction is received or refused.",
      ],
    },
    {
      label: "Greek hearing witness",
      title: "G0191 · ἀκούω / akouō",
      lines: [
        "Language: Greek.",
        "Rendering: hear.",
        "Held beside H8085 so the hear-and-do field can remain visible when the course reaches Greek witness language.",
      ],
    },
    {
      label: "Course placement",
      title: "Lesson 2 response word",
      lines: [
        "This word follows H8451 because law-instruction requires a response.",
        "Next course word: H4687 · מצוה / mitsvâh / Commandment.",
      ],
    },
  ],
};

export function LiveLexiconUnderStamp({
  lessonSlug,
  noelIntro,
}: {
  lessonSlug: string;
  noelIntro?: string | null;
}) {
  const cards = vocabularyByLesson[lessonSlug] ?? [];

  if (cards.length === 0 && !noelIntro) {
    return null;
  }

  return (
    <section className="course-word-packet__lexicon-under-stamp" aria-label="Lesson vocabulary under stamp">
      {noelIntro ? (
        <article className="course-word-packet__lexicon-statement">
          <p className="course-word-packet__field-label">Lesson intro</p>
          <h3>Before the word study begins</h3>
          <p>{noelIntro}</p>
        </article>
      ) : null}

      {cards.map((card) => (
        <article className="course-word-packet__lexicon-statement" key={`${lessonSlug}-${card.title}`}>
          <p className="course-word-packet__field-label">{card.label}</p>
          <h3>{card.title}</h3>
          <ul>
            {card.lines.map((line) => (
              <li key={`${card.title}-${line}`}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
