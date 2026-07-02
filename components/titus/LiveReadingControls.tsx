type ControlCard = {
  label: string;
  title: string;
  lines: string[];
};

const controlsByLesson: Record<string, ControlCard[]> = {
  h8451: [
    {
      label: "Primary control",
      title: "Torah is real law-instruction",
      lines: [
        "The reading cannot reduce תורה / tôwrâh to advice, inspiration, or general wisdom.",
        "It must keep law visible while also keeping instruction visible.",
        "Course rendering: Torah / Law-Instruction.",
      ],
    },
    {
      label: "Book control",
      title: "Proverbs uses Torah inside ordinary life",
      lines: [
        "The reading must account for Torah inside father/mother instruction, sonship, heart, lamp, light, prayer, and speech.",
        "Proverbs is not treating Torah as a distant legal archive only.",
        "It shows the law-field operating before collapse becomes judgment.",
      ],
    },
    {
      label: "Household control",
      title: "Mother-law and father-commandment belong together",
      lines: [
        "Proverbs 1:8 and Proverbs 6:20 place father instruction/commandment and mother law in one formation field.",
        "The reading keeps these in the same household formation field.",
        "Household formation is one of the first places Torah becomes visible.",
      ],
    },
    {
      label: "Hearing control",
      title: "Law requires hearing that becomes obedience",
      lines: [
        "Proverbs 28:9 makes refused law-hearing govern prayer-readiness.",
        "A person cannot turn the ear away from Torah and then use prayer as a separate bypass.",
        "This is why H8085 / שמע / shâmaʻ comes next in the course path.",
      ],
    },
    {
      label: "Illumination control",
      title: "Commandment is lamp; law is light",
      lines: [
        "Proverbs 6:23 joins מצוה / mitsvâh, תורה / tôwrâh, lamp, light, reproof, instruction, and way of life.",
        "The reading preserves Torah as illumination for the path.",
        "Correction belongs to mercy before damage hardens.",
      ],
    },
    {
      label: "Speech control",
      title: "Torah reaches the mouth",
      lines: [
        "Proverbs 31:26 places the law of kindness in the tongue.",
        "The reading accounts for Torah as ordered covenant mercy carried in speech.",
        "Mouth, lips, tongue, truth, false witness, and kindness belong inside the law-field.",
      ],
    },
    {
      label: "Greek witness control",
      title: "Greek law-language does not erase the Hebrew field",
      lines: [
        "H8451 / תורה / tôwrâh remains visible beside G3551 / νόμος / nomos.",
        "H4687 / מצוה / mitsvâh presses toward G1785 / ἐντολή / entolē.",
        "The New Testament does not make the Proverbs law-field disappear.",
      ],
    },
    {
      label: "Control summary",
      title: "The Function Reading must carry the whole field",
      lines: [
        "law → hearing → instruction → correction → heart → mouth → path → justice → life",
        "A faithful reading accounts for the whole movement, not only one part of the data.",
      ],
    },
  ],
  h8085: [
    {
      label: "Primary control",
      title: "Hearing is response, not sound only",
      lines: [
        "The reading cannot reduce שמע / shâmaʻ to auditory reception only.",
        "In Proverbs, hearing sits at the response point where instruction is received or refused.",
        "Course rendering: Hear / Obey.",
      ],
    },
    {
      label: "Torah control",
      title: "The ear is measured by its relation to Torah",
      lines: [
        "Proverbs 28:9 places hearing and Torah directly together.",
        "The prayer-mouth is affected by the hearing-ear.",
        "This keeps hearing inside the law-instruction field.",
      ],
    },
    {
      label: "Wisdom control",
      title: "Wisdom calls before refusal hardens",
      lines: [
        "Proverbs makes hearing part of formation before later repair or judgment is needed.",
        "The ear can receive counsel, instruction, correction, and wisdom while the path can still turn.",
      ],
    },
    {
      label: "Doing control",
      title: "The canon keeps hearing joined to doing",
      lines: [
        "Jesus joins hearing His sayings with doing and house-stability.",
        "James refuses hearer-only deception.",
        "Greek witness keeps hear-and-do pressure in the conversation.",
      ],
    },
    {
      label: "Control summary",
      title: "The response word governs the next movement",
      lines: [
        "Torah instruction moves toward hearing.",
        "Hearing moves toward commandment, heart, mouth, path, justice, and life.",
      ],
    },
  ],
};

export function LiveReadingControls({
  lessonSlug,
  noelIntro,
  fallbackCards = [],
}: {
  lessonSlug: string;
  noelIntro?: string | null;
  fallbackCards?: ControlCard[];
}) {
  const controls = controlsByLesson[lessonSlug] ?? fallbackCards;

  return (
    <section className="course-word-packet__reading-controls-summary" aria-label="Reading controls for this Function Reading">
      {noelIntro ? (
        <article className="course-word-packet__method-statement">
          <p className="course-word-packet__field-label">Lesson intro</p>
          <h3>Before the controls</h3>
          <p>{noelIntro}</p>
        </article>
      ) : null}

      {controls.map((control) => (
        <article className="course-word-packet__method-statement" key={`${lessonSlug}-${control.title}`}>
          <p className="course-word-packet__field-label">{control.label}</p>
          <h3>{control.title}</h3>
          <ul>
            {control.lines.map((line) => (
              <li key={`${control.title}-${line}`}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
