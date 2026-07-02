"use client";

import Link from "next/link";
import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import type { CourseWordLessonShell } from "@/data/titus/course-word-lessons";
import { TitusLexStamp } from "@/components/titus-lex-stamp";

import { TitusCourseProgressMarker } from "@/components/titus-course-progress";


type CourseWordLessonShellViewProps = {
  shell: CourseWordLessonShell;
};

export function CourseWordLessonShellView({
  shell,
}: CourseWordLessonShellViewProps) {
  const [activeDrawerIndex, setActiveDrawerIndex] = useState(0);
  const [isLessonComplete, setIsLessonComplete] = useState(false);

  const identityRows = [
    ["Course", shell.course.title],
    ["Lesson", `${shell.lessonNumber} · ${shell.lessonKind}`],
    ["Method", shell.methodLabel],
    ["Field", shell.languageLabel],
    ["Strong’s ID", shell.term.strongId],
    ["Surface", shell.term.surface],
    ["Transliteration", shell.term.transliteration],
    ["Gloss", shell.term.gloss],
  ];

  const drawerTabs = useMemo(
    () => [
      {
        title: "Lexicon",
        description:
          "",
        body: <LexiconDataStatements />,
      },
      {
        title: "Book Context",
        description: "",
        body: <BookContextDataStatements />,
      },
      {
        title: "Travels With",
        description: "",
        body: <TravelsWithDataStatements />,
      },
      {
        title: "Canon Chains",
        description: "",
        body: <CanonChainsDataStatements />,
      },
      {
        title: "Function Reading",
        description: "",
        body: <FunctionReadingDataStatements />,
      },
      {
        title: "Traditions",
        description: "",
        body: <TraditionPlacementsDataStatements />,
      },
      {
        title: "Reading Controls",
        description: "",
        body: <ReadingControlsDataStatements />,
      },
    ],
    [identityRows, shell],
  );

  const activeDrawer = drawerTabs[activeDrawerIndex];
  const drawerBodyRef = useRef<HTMLDivElement | null>(null);
  const [hasReachedDrawerEnd, setHasReachedDrawerEnd] = useState(false);

  const updateDrawerEndState = useCallback(() => {
    const node = drawerBodyRef.current;

    if (!node) {
      setHasReachedDrawerEnd(false);
      return;
    }

    const scrollable = node.scrollHeight > node.clientHeight + 8;
    const atEnd = node.scrollTop + node.clientHeight >= node.scrollHeight - 16;

    setHasReachedDrawerEnd(!scrollable || atEnd);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const node = drawerBodyRef.current;

      if (node) {
        node.scrollTop = 0;
      }

      updateDrawerEndState();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeDrawerIndex, updateDrawerEndState]);

function goPrevious() {
    setActiveDrawerIndex((current) => Math.max(current - 1, 0));
  }

  function goNext() {
    setActiveDrawerIndex((current) =>
      Math.min(current + 1, drawerTabs.length - 1),
    );
  }

  
  const drawerProgressCurrent = Number(activeDrawerIndex) + 1;
  const drawerProgressTotal = drawerTabs.length;
  const drawerProgressPercent = Math.min(
    100,
    Math.max(0, Math.round((drawerProgressCurrent / drawerProgressTotal) * 100)),
  );


  const isFinalDrawer = drawerProgressCurrent >= drawerProgressTotal;
  const nextWordStudyHref = "/lessons/h8085?from=/courses/proverbs-law-vocabulary";

  useEffect(() => {
    if (!isFinalDrawer && isLessonComplete) {
      setIsLessonComplete(false);
    }
  }, [isFinalDrawer, isLessonComplete]);

return (
    <main className="course-word-packet">
{(() => {
  const courseTopPacket = (shell as Record<string, unknown>);
  const proverbsOrder: Record<string, number> = {
    h8451: 1,
    h8085: 2,
    h4687: 3,
    h3820: 4,
    h6310: 5,
    h1870: 6,
    h4941: 7,
    h6666: 8,
    h2416: 9,
    h2421: 10,
    g3551: 11,
  };

  const identityKey = String(
    courseTopPacket["lessonSlug"] ??
      courseTopPacket["strongId"] ??
      "",
  ).toLowerCase();

  const lessonNumberRaw = Number(
    courseTopPacket["lessonNumber"] ??
      proverbsOrder[identityKey] ??
      1,
  );

  const currentLesson =
    Number.isFinite(lessonNumberRaw) && lessonNumberRaw > 0
      ? lessonNumberRaw
      : 1;

  const totalLessonRaw = Number(
    courseTopPacket["courseLessonTotal"] ??
      courseTopPacket["lessonTotal"] ??
      11,
  );

  const totalLessons =
    Number.isFinite(totalLessonRaw) && totalLessonRaw >= currentLesson
      ? totalLessonRaw
      : 11;

  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((currentLesson / totalLessons) * 100)),
  );

  const strongId = String(courseTopPacket["strongId"] ?? courseTopPacket["lessonSlug"] ?? "H8451").toUpperCase();

  const studyTitle =
    strongId === "H8451"
      ? "Torah / Law-Instruction"
      : String(
          courseTopPacket["positionNote"] ??
            courseTopPacket["lessonTitle"] ??
            courseTopPacket["methodLabel"] ??
            "Word Study",
        );

  const courseTitle = String(
    courseTopPacket["courseTitle"] ??
      courseTopPacket["courseLabel"] ??
      "Proverbs as Law Vocabulary",
  );

  return (
    <section className="course-word-packet__top-study" aria-label="Current word study">
      <p className="course-word-packet__top-study-kicker">Greek & Hebrew Word Study</p>
      <h1>{studyTitle}</h1>
      <p className="course-word-packet__top-study-subtitle">
        {courseTitle} · Lesson {currentLesson} of {totalLessons}
      </p>
      <div className="course-word-packet__top-progress" aria-label={`Lesson progress: drawer ${drawerProgressCurrent} of ${drawerProgressTotal}`}>
        <span>
          <span style={{ width: `${drawerProgressPercent}%` }} />
        </span>
      </div>
    </section>
  );
})()}


      <section className="course-word-packet__drawer" aria-live="polite">
        <p className="course-word-packet__eyebrow">
          Module {activeDrawerIndex + 1} of {drawerTabs.length}
        </p>

        <h2>{activeDrawer.title.replace(/^\d+\s·\s/, "")}</h2>

        {activeDrawer.description ? (
            <p className="course-word-packet__drawer-description">
              {activeDrawer.description}
            </p>
          ) : null}

      {(() => {
    const shouldShowDrawerStamp =
      Number(
        (activeDrawer as Record<string, unknown>)["drawerNumber"] ??
          (activeDrawer as Record<string, unknown>)["number"] ??
          (activeDrawer as Record<string, unknown>)["step"] ??
          (activeDrawer as Record<string, unknown>)["id"] ??
          NaN,
      ) === 1 ||
      Number(activeDrawerIndex) === 0;

    return shouldShowDrawerStamp ? (
      <div className="course-word-packet__drawer-stamp course-word-packet__drawer-stamp-only-first" aria-label="Lesson vocabulary stamp">
                <TitusLexStamp stamp={shell.lexStamp} />

          {activeDrawerIndex === 0 ? (
            <div className="course-word-packet__lexicon-under-stamp">
              <LexiconDataStatements />
            </div>
          ) : null}
      </div>
    ) : null;
  })()}

        <div
            ref={drawerBodyRef}
            onScroll={updateDrawerEndState}
            className="course-word-packet__drawer-body course-word-packet__drawer-body--viewport"
          >{activeDrawer.body}

            

            </div>
<div className="course-word-packet__drawer-actions course-movement-rail">
          <button
            disabled={activeDrawerIndex === 0}
            onClick={goPrevious}
            type="button"
           aria-label="Previous lesson section" title="Previous">←</button>

          <div className="course-movement-rail__label">
            {isFinalDrawer && isLessonComplete
              ? "Lesson complete"
              : `${activeDrawer.title.replace(/^\d+\s·\s/, "")} · ${activeDrawerIndex + 1} of ${drawerTabs.length}`}
          </div>

          {isFinalDrawer ? (
            isLessonComplete ? (
              <div className="course-movement-rail__complete-actions">
                <Link
                  className="course-movement-rail__course-link"
                  href={`/courses/${shell.course.slug}`}
                >
                  Course
                </Link>
                <Link
                  className="course-movement-rail__next-study-link"
                  href={nextWordStudyHref}
                >
                  Start Hear / Obey →
                </Link>
              </div>
            ) : (
              <button
                className="button compact-button course-movement-finish"
                type="button"
                onClick={() => setIsLessonComplete(true)}
              >
                Finish
              </button>
            )
          ) : (
            <button className="button compact-button" type="button" onClick={goNext} aria-label="Continue to next lesson section" title="Continue">→</button>
          )}
        </div>
      </section>

          <TitusCourseProgressMarker />
</main>
  );
}


function LexiconDiscoverySummary() {
  const statements = [
    {
      label: "Primary Hebrew term",
      title: "H8451 · תורה / tôrâ / Torah",
      lines: [
        "Course rendering: law / instruction",
        "First Proverbs anchor: Proverbs 1:8",
        "Appears with hearing language and father/mother instruction: שמע / shāmaʿ, מוסר / mûsār, תורה / tôrâ.",
      ],
    },
    {
      label: "Lineage pointer",
      title: "ירה / yārâ",
      lines: [
        "The stamp keeps yārâ visible as the lineage pointer under Torah.",
        "This belongs in the lexicon layer, not the full function argument yet.",
      ],
    },
    {
      label: "Greek law witness",
      title: "G3551 · νόμος / nomos",
      lines: [
        "Rendering: law",
        "Held beside H8451 so the Proverbs law field can remain visible when the course later crosses into Greek witness language.",
      ],
    },
    {
      label: "Course placement",
      title: "Lesson 1 anchor",
      lines: [
        "This word starts the Proverbs Law Vocabulary path.",
        "Next course word: H8085 · שמע / shāmaʿ / Hear-Obey.",
      ],
    },
  ];

  return (
    <section className="course-word-packet__lexicon-summary">
      {statements.map((statement) => (
        <article className="course-word-packet__lexicon-statement" key={statement.title}>
          <p className="course-word-packet__field-label">{statement.label}</p>
          <h3>{statement.title}</h3>
          <ul>
            {statement.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}


function LexiconDataStatements() {
  const statements = [
    {
      label: "Primary Hebrew term",
      title: "H8451 · תורה / tôrâ / Torah",
      lines: [
        "Language: Hebrew",
        "Course rendering: law / instruction",
        "First Proverbs anchor: Proverbs 1:8",
        "Travels immediately with hearing and instruction language: שמע / shāmaʿ and מוסר / mûsār.",
      ],
    },
    {
      label: "English compression",
      title: "law → law / instruction",
      lines: [
        "Inherited English keeps law visible.",
        "The Titus course rendering keeps the instructional function visible.",
        "In Proverbs, תורה / tôrâ is not treated as abstract legal category only.",
      ],
    },
    {
      label: "Lineage pointer",
      title: "ירה / yārâ",
      lines: [
        "The stamp keeps yārâ visible as the lineage pointer beneath Torah.",
        "This stays in the lexicon layer until the function pattern is traced later.",
      ],
    },
    {
      label: "Greek law witness",
      title: "G3551 · νόμος / nomos",
      lines: [
        "Language: Greek",
        "Rendering: law",
        "Held beside H8451 so the Proverbs law-field can stay visible when the course reaches Greek witness language.",
      ],
    },
    {
      label: "Course placement",
      title: "Lesson 1 anchor",
      lines: [
        "This word opens the Proverbs as Law Vocabulary path.",
        "Next course word: H8085 · שמע / shāmaʿ / Hear-Obey.",
      ],
    },
  ];

  return (
    <section className="course-word-packet__lexicon-summary" aria-label="Lexicon data statements">
      {statements.map((statement) => (
        <article className="course-word-packet__lexicon-statement" key={statement.title}>
          <p className="course-word-packet__field-label">{statement.label}</p>
          <h3>{statement.title}</h3>
          <ul>
            {statement.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}


function BookContextDataStatements() {
  const statements = [
    {
      label: "Proverbs local field",
      title: "Torah inside Proverbs",
      lines: [
        "תורה / tôrâ / Torah is not treated as an external legal code only.",
        "Inside Proverbs, Torah enters household formation, memory, heart, lamp, light, prayer, sonship, and speech.",
        "The word is already moving through ordinary life before the course widens into the whole canon.",
      ],
    },
    {
      label: "First Proverbs anchor",
      title: "Proverbs 1:8",
      lines: [
        "The law of thy mother places תורה / tôrâ inside household formation.",
        "The mother’s Torah is not optional sentiment.",
        "It is law-instruction entering the child’s first formation field.",
      ],
    },
    {
      label: "Interior field",
      title: "Proverbs 3:1",
      lines: [
        "Torah can be forgotten by the heart.",
        "That means Proverbs does not treat law as an external document only.",
        "It is something that must be carried internally.",
      ],
    },
    {
      label: "Light + life field",
      title: "Proverbs 6:20–23",
      lines: [
        "Father commandment and mother law form one household instruction field.",
        "Commandment is lamp.",
        "Law is light.",
        "Reproofs of instruction are the way of life.",
      ],
    },
    {
      label: "Hearing + prayer field",
      title: "Proverbs 28:9",
      lines: [
        "The one who turns away the ear from hearing Torah cannot use prayer to bypass refusal.",
        "Refused law-hearing corrupts the mouth even when the mouth is praying.",
      ],
    },
    {
      label: "Speech field",
      title: "Proverbs 31:26",
      lines: [
        "Torah reaches the tongue.",
        "The law of kindness is not vague niceness.",
        "It is ordered covenant mercy carried in speech.",
      ],
    },
    {
      label: "Book context summary",
      title: "ear → heart → mouth → path → house → prayer → judgment → life",
      lines: [
        "Inside Proverbs, תורה / tôrâ / Torah is law-instruction moving through the ordinary places where a life becomes readable.",
      ],
    },
  ];

  return (
    <section className="course-word-packet__book-context-summary" aria-label="Book context data statements">
      {statements.map((statement) => (
        <article className="course-word-packet__book-context-statement" key={statement.title}>
          <p className="course-word-packet__field-label">{statement.label}</p>
          <h3>{statement.title}</h3>
          <ul>
            {statement.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}


function TravelsWithDataStatements() {
  const statements = [
    {
      label: "Law-field vocabulary",
      title: "Torah does not travel alone",
      lines: [
        "Commandment: מצוה / mitsvâh / H4687",
        "Hear-obey: שמע / shāmaʿ / H8085",
        "Keep-guard: שמר / shāmar / H8104",
        "Way: דרך / derek / H1870",
        "Path: ארח / ʾōraḥ / H0734",
        "Heart: לב / lēb / H3820",
        "Mouth: פה / peh / H6310",
        "Judgment: משפט / mishpāṭ / H4941",
        "Righteousness: צדקה / ṣᵉdāqâh / H6666",
        "Life and death: חי / ḥay / H2416 and מות / māveth / H4194",
      ],
    },
    {
      label: "First response words",
      title: "hearing · keeping · doing",
      lines: [
        "H8085 / שמע / shāmaʿ — hearing as response, not sound only.",
        "H8104 / שמר / shāmar — keeping, guarding, preserving.",
        "H6213 / עשה / ʿāśâ — doing, making obedience visible.",
      ],
    },
    {
      label: "Formation words",
      title: "instruction · reproof · heart",
      lines: [
        "מוסר / mûsār — instruction and discipline.",
        "תוכחת / tôkaḥath — reproof and correction.",
        "לב / lēb — the interior field that receives, forgets, trusts, hardens, or is written upon.",
      ],
    },
    {
      label: "Speech words",
      title: "Torah reaches the mouth",
      lines: [
        "פה / peh — mouth.",
        "שפה / śāphâh — lips.",
        "לשון / lāshôn — tongue.",
        "חסד / ḥesed — kindness / covenant mercy.",
        "Proverbs 31:26 places the law of kindness in the tongue.",
      ],
    },
    {
      label: "Path + outcome words",
      title: "The law-field becomes readable as a road",
      lines: [
        "דרך / derek — way.",
        "ארח / ʾōraḥ — path.",
        "חי / ḥay — life.",
        "מות / māveth — death.",
        "The road taken makes the instruction field publicly visible.",
      ],
    },
    {
      label: "Travels With summary",
      title: "תורה / tôrâ has a field",
      lines: [
        "In Proverbs, law-instruction travels with hearing, keeping, correction, heart, mouth, path, justice, life, and death.",
        "That is why the word cannot be studied as a flat definition.",
        "The word has a field.",
      ],
    },
  ];

  return (
    <section className="course-word-packet__travels-summary" aria-label="Travels With data statements">
      {statements.map((statement) => (
        <article className="course-word-packet__travels-statement" key={statement.title}>
          <p className="course-word-packet__field-label">{statement.label}</p>
          <h3>{statement.title}</h3>
          <ul>
            {statement.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}


function CanonChainsDataStatements() {
  const statements = [
    {
      label: "Torah → Proverbs",
      title: "Heart · house · way · gate",
      references: "Deuteronomy 6; Deuteronomy 11 → Proverbs 1; Proverbs 3; Proverbs 6",
      lines: [
        "Torah commands the words to enter heart, children, house, way, hand, and gate.",
        "Proverbs shows that same instruction field working inside the son’s hearing, the mother’s law, the heart’s tablet, the bound command, and the lamp of instruction.",
        "Hinge words: תורה / tôrâ · שמע / shāmaʿ · לב / lēb · דרך / derek · שער / shaʿar.",
      ],
    },
    {
      label: "Hearing chain",
      title: "Law heard or refused",
      references: "Deuteronomy 30 → Proverbs 28:9 → Matthew 7 → James 1",
      lines: [
        "The law-field requires hearing that becomes obedience.",
        "Proverbs 28:9 shows the negative form: the one who turns away the ear from hearing law cannot use prayer to bypass refusal.",
        "Jesus and James keep the same pressure: hearing without doing is exposed as unstable.",
        "Hinge words: שמע / shāmaʿ · תורה / tôrâ · ποιέω / poieō.",
      ],
    },
    {
      label: "Light chain",
      title: "Commandment · lamp · light · way of life",
      references: "Proverbs 6:20–23 → Psalm 119 → John 8 → John 14–15",
      lines: [
        "Proverbs joins commandment, law, lamp, light, reproof, instruction, and the way of life.",
        "The chain later opens into light, word, commandment-keeping, abiding, and love-language.",
        "Hinge words: מצוה / mitsvâh · תורה / tôrâ · אור / ʾôr · ἐντολή / entolē.",
      ],
    },
    {
      label: "Speech chain",
      title: "Mouth · false witness · kindness · city access",
      references: "Exodus 20; Leviticus 19 → Proverbs 10–31 → Matthew 12 → James 3 → Revelation 21–22",
      lines: [
        "The law forbids false witness and commands neighbor-love.",
        "Proverbs trains the mouth, lips, tongue, truth, lie, kindness, and violence field.",
        "Jesus and James expose speech as heart and body evidence. Revelation excludes the lie from the city.",
        "Hinge words: פה / peh · לשון / lāshôn · חסד / ḥesed · ψεύδος / pseudos.",
      ],
    },
    {
      label: "Justice chain",
      title: "Poor · weights · judgment · worship",
      references: "Leviticus 19; Deuteronomy 25 → Proverbs → Isaiah; Amos; Micah → Matthew 23 → James 2",
      lines: [
        "Torah governs market honesty, weights, poor-treatment, neighbor-love, and judgment.",
        "Proverbs carries that law into scales, lips, bribes, rulers, gates, prayer, sacrifice, and poor-treatment.",
        "The Prophets prosecute worship that keeps ritual while refusing justice. Jesus and James keep the same structure.",
        "Hinge words: משפט / mishpāṭ · צדקה / ṣᵉdāqâh · עני / ʿānî.",
      ],
    },
    {
      label: "Outcome chain",
      title: "Life · death · path · gate",
      references: "Deuteronomy 30 → Proverbs → Matthew 7 → Revelation 22",
      lines: [
        "Torah sets life and death before the people.",
        "Proverbs trains the reader to recognize the road before the destination arrives.",
        "Matthew preserves the two-way structure. Revelation completes it with tree-of-life and gate access.",
        "Hinge words: דרך / derek · חיים / ḥayyîm · מות / māveth · ζωή / zōē.",
      ],
    },
    {
      label: "Canon chain summary",
      title: "The law-field travels",
      references: "heart → house → hearing → commandment → light → mouth → justice → path → life → gate",
      lines: [
        "Proverbs is not using תורה / tôrâ as local wisdom decoration.",
        "The law-field travels through the canon as a governed instruction field.",
        "That is why the next module can state a Function Reading.",
      ],
    },
  ];

  return (
    <section className="course-word-packet__canon-chain-summary" aria-label="Canon chain data statements">
      {statements.map((statement) => (
        <article className="course-word-packet__canon-chain-statement" key={statement.title}>
          <p className="course-word-packet__field-label">{statement.label}</p>
          <h3>{statement.title}</h3>
          <p className="course-word-packet__canon-chain-refs">{statement.references}</p>
          <ul>
            {statement.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}


function FunctionReadingDataStatements() {
  const statements = [
    {
      label: "Function statement",
      title: "תורה / tôrâ trains discernment before breach becomes judgment",
      lines: [
        "The Function Reading observes that Torah in Proverbs is law-instruction that reaches a person before collapse has to be answered by judgment.",
        "The word is not merely a legal label. It operates as instruction that can be heard, kept, remembered, spoken, walked, or refused.",
      ],
    },
    {
      label: "Proverbs form",
      title: "Torah moves through ordinary life",
      lines: [
        "Proverbs carries Torah into ear, heart, mouth, path, house, market, gate, king, justice, and life/death outcome.",
        "That movement is why Proverbs should not be reduced to detached wisdom advice.",
      ],
    },
    {
      label: "Mercy before damage",
      title: "Correction before collapse",
      lines: [
        "Proverbs places correction while the matter can still become instruction.",
        "The law-field arrives before the damage requires rescue, sacrifice, legal repair, or public judgment.",
      ],
    },
    {
      label: "Pattern sentence",
      title: "law → hearing → instruction → correction → heart → mouth → path → justice → life",
      lines: [
        "This is the first functional rail for the Proverbs Law Vocabulary path.",
        "The next word has to be H8085 / שמע / shāmaʿ because law-instruction immediately requires hearing-obedience.",
      ],
    },
  ];

  return (
    <section className="course-word-packet__function-reading-summary" aria-label="Function Reading data statements">
      {statements.map((statement) => (
        <article className="course-word-packet__method-statement" key={statement.title}>
          <p className="course-word-packet__field-label">{statement.label}</p>
          <h3>{statement.title}</h3>
          <ul>
            {statement.lines.map((line) => (
              <li key={`${statement.title}-${line}`}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

function HermeneuticalReadingsDataStatements() {
  const readings = [
    {
      label: "Common devotional reading",
      title: "Personal guidance and encouragement",
      keeps: [
        "Torah as guidance for daily life.",
        "Proverbs as personal wisdom and moral formation.",
      ],
      mayFlatten: [
        "The law-field as covenant instruction with public consequences.",
        "The justice, mouth, gate, and judgment pressure inside Proverbs.",
      ],
    },
    {
      label: "Covenant theology reading",
      title: "Law, promise, fulfillment, and wisdom continuity",
      keeps: [
        "Continuity between Torah, wisdom, commandment, fulfillment, and life in Christ.",
        "The internalizing of God’s instruction as part of covenant formation.",
      ],
      mayFlatten: [
        "The concrete Proverbs mechanisms: ear, heart, mouth, path, market, and gate.",
        "The way Proverbs trains before breach becomes judgment.",
      ],
    },
    {
      label: "Dispensational reading",
      title: "Law, Israel, kingdom, and future fulfillment",
      keeps: [
        "The seriousness of Torah as given law and Israel’s covenant history.",
        "The distinction between law administration and later fulfillment questions.",
      ],
      mayFlatten: [
        "The way Proverbs carries Torah into universal human discernment and public wisdom.",
        "The continuity of hear-and-do pressure across Jesus, Epistles, and Revelation.",
      ],
    },
    {
      label: "Historical-critical reading",
      title: "Ancient instruction setting and social formation",
      keeps: [
        "The household, court, school, wisdom, and social-world setting of Proverbs.",
        "The real ancient function of instruction inside family and public order.",
      ],
      mayFlatten: [
        "The whole-canon recurrence of law, hearing, doing, justice, and life.",
        "The canonical resolution of the pattern beyond ancient setting alone.",
      ],
    },
    {
      label: "Allegorical or spiritualized reading",
      title: "Inner wisdom and soul formation",
      keeps: [
        "The inward formation of the person by wisdom, correction, and desire.",
        "The spiritual meaning of path, heart, mouth, and life-language.",
      ],
      mayFlatten: [
        "Torah as actual law-instruction with embodied public consequences.",
        "The market, neighbor, poor, witness, and justice field inside Proverbs.",
      ],
    },
  ];

  return (
    <section className="course-word-packet__hermeneutical-summary" aria-label="Hermeneutical readings in conversation">
      {readings.map((reading) => (
        <article className="course-word-packet__method-statement" key={reading.label}>
          <p className="course-word-packet__field-label">{reading.label}</p>
          <h3>{reading.title}</h3>

          <div className="course-word-packet__two-column-note">
            <div>
              <h4>Keeps in view</h4>
              <ul>
                {reading.keeps.map((line) => (
                  <li key={`${reading.label}-keeps-${line}`}>{line}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4>May flatten</h4>
              <ul>
                {reading.mayFlatten.map((line) => (
                  <li key={`${reading.label}-flattens-${line}`}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function WhatGetsToStayDataStatements() {
  const statements = [
    {
      label: "What remains",
      title: "Law is real command",
      lines: [
        "The Function Reading does not erase law as command.",
        "תורה / tôrâ still carries obligation, instruction, correction, and consequence.",
      ],
    },
    {
      label: "What remains",
      title: "Wisdom does not replace Torah",
      lines: [
        "Proverbs does not leave Torah behind by becoming wisdom literature.",
        "It shows Torah operating in discernment, speech, household, public justice, and life-outcome.",
      ],
    },
    {
      label: "What remains",
      title: "Torah can be internalized",
      lines: [
        "The heart can forget, keep, trust, turn, and be instructed.",
        "Proverbs treats the law-field as something that must enter the person, not merely stand outside the person.",
      ],
    },
    {
      label: "What remains",
      title: "Fulfillment cannot mean flattening",
      lines: [
        "Greek law and commandment language does not make the Proverbs law-field disappear.",
        "νόμος / nomos, ἐντολή / entolē, hearing, doing, love, and gate-access continue the pressure in Greek witness language.",
      ],
    },
    {
      label: "Must account for",
      title: "The reading must hold both mercy and judgment",
      lines: [
        "Proverbs shows mercy before damage: instruction, correction, warning, and reproof.",
        "It also shows judgment after refusal: prayer corrupted, path bent, mouth destructive, neighbor harmed, life closed.",
      ],
    },
  ];

  return (
    <section className="course-word-packet__what-stays-summary" aria-label="What gets to stay in the conversation">
      {statements.map((statement) => (
        <article className="course-word-packet__method-statement" key={statement.title}>
          <p className="course-word-packet__field-label">{statement.label}</p>
          <h3>{statement.title}</h3>
          <ul>
            {statement.lines.map((line) => (
              <li key={`${statement.title}-${line}`}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

function ReviewDataStatements() {
  const statements = [
    {
      label: "Lesson established",
      title: "H8451 / תורה / tôrâ / Torah",
      lines: [
        "Torah is the opening law-instruction anchor for Proverbs as Law Vocabulary.",
        "In Proverbs, Torah travels through hearing, instruction, correction, heart, mouth, path, justice, and life/death outcome.",
      ],
    },
    {
      label: "Student should be able to explain",
      title: "What this word does",
      lines: [
        "Why תורה / tôrâ is not reduced to advice.",
        "How Proverbs carries law-instruction into ordinary life.",
        "Why H8085 / שמע / shāmaʿ is the necessary next word.",
      ],
    },
    {
      label: "Next word study",
      title: "H8085 · שמע / shāmaʿ / Hear-Obey",
      lines: [
        "The first response to law-instruction is not more abstraction.",
        "The next module path moves into hearing as obedience.",
      ],
    },
  ];

  return (
    <section className="course-word-packet__review-summary" aria-label="Review data statements">
      {statements.map((statement) => (
        <article className="course-word-packet__method-statement" key={statement.title}>
          <p className="course-word-packet__field-label">{statement.label}</p>
          <h3>{statement.title}</h3>
          <ul>
            {statement.lines.map((line) => (
              <li key={`${statement.title}-${line}`}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}


function TraditionPlacementsDataStatements() {
  const placements = [
    {
      label: "Applied tradition",
      cardTitle: "Covenantal Biblical Theology",
      href: "/traditions/covenantal-biblical-theology?from=/lessons/h8451&placement=h8451-proverbs-covenantal-biblical-theology",
      placedBeside: "H8451 · תורה / tôrâ / Torah",
      whyHere:
        "Law, covenant, promise, commandment, fulfillment, and heart-internalized instruction already belong in this conversation.",
      keepsHere: [
        "Torah as covenant instruction, not detached advice.",
        "Continuity between law, wisdom, commandment, fulfillment, and life.",
        "The seriousness of hearing, keeping, and walking.",
      ],
      accountFor: [
        "Proverbs is not only a system category; it shows Torah working in ear, heart, mouth, path, house, market, and gate.",
        "The local word-field must stay visible before broad covenant language takes over.",
      ],
    },
    {
      label: "Applied tradition",
      cardTitle: "Dispensationalism",
      href: "/traditions/dispensationalism?from=/lessons/h8451&placement=h8451-proverbs-dispensationalism",
      placedBeside: "H8451 · תורה / tôrâ / Torah",
      whyHere:
        "Law-language often enters Christian reading through questions of Israel, administration, covenant era, kingdom, and future fulfillment.",
      keepsHere: [
        "Torah as real given law with historical seriousness.",
        "The importance of administration, distinction, and concrete promise language.",
        "The need to avoid dissolving Israel and law vocabulary too quickly into generic spirituality.",
      ],
      accountFor: [
        "Proverbs carries Torah into wisdom, household, speech, justice, and ordinary discernment.",
        "The hear-and-do pressure continues through Jesus, the Epistles, and Revelation instead of disappearing from the conversation.",
      ],
    },
    {
      label: "Applied tradition",
      cardTitle: "New Creation Restoration",
      href: "/traditions/new-creation-restoration?from=/lessons/h8451&placement=h8451-proverbs-new-creation-restoration",
      placedBeside: "H8451 · תורה / tôrâ / Torah",
      whyHere:
        "The Proverbs law-field eventually presses toward life, gate-access, tree-of-life language, and restored dwelling order.",
      keepsHere: [
        "The forward movement toward restored dwelling and final right-order.",
        "The connection between commandments, life, city, gates, and non-defiled dwelling.",
        "The fact that Torah is not simply erased when the canon reaches completion.",
      ],
      accountFor: [
        "The lesson cannot jump to the end before tracing the Proverbs field.",
        "The path still has to pass through hearing, correction, heart, mouth, justice, and life/death outcome.",
      ],
    },
  ];

  return (
    <section className="course-word-packet__tradition-placement-summary" aria-label="Applied traditions beside this word study">
      {placements.map((placement) => (
        <article className="course-word-packet__tradition-placement-card" key={placement.cardTitle}>
          <p className="course-word-packet__field-label">{placement.label}</p>
          <h3>{placement.cardTitle}</h3>

          <p className="course-word-packet__tradition-placed-beside">
            Placed beside: {placement.placedBeside}
          </p>

          <p>{placement.whyHere}</p>

          <div className="course-word-packet__two-column-note">
            <div>
              <h4>Keeps in conversation here</h4>
              <ul>
                {placement.keepsHere.map((line) => (
                  <li key={`${placement.cardTitle}-keeps-${line}`}>{line}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4>Must still account for here</h4>
              <ul>
                {placement.accountFor.map((line) => (
                  <li key={`${placement.cardTitle}-account-${line}`}>{line}</li>
                ))}
              </ul>
            </div>
          </div>

          <Link className="course-word-packet__tradition-link" href={placement.href}>
            Open tradition card →
          </Link>
        </article>
      ))}
    </section>
  );
}


function ReadingControlsDataStatements() {
  const statements = [
    {
      label: "Primary control",
      title: "Torah is real law-instruction",
      lines: [
        "The reading cannot reduce תורה / tôrâ to advice, inspiration, or general wisdom.",
        "It must keep law visible while also keeping instruction visible.",
        "Course rendering: law / instruction.",
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
        "The reading cannot split these into rival authorities.",
        "Household formation is one of the first places Torah becomes visible.",
      ],
    },
    {
      label: "Hearing control",
      title: "Law requires hearing that becomes obedience",
      lines: [
        "Proverbs 28:9 makes refused law-hearing govern prayer-readiness.",
        "A person cannot turn the ear away from Torah and then use prayer to bypass refusal.",
        "This is why H8085 / שמע / shāmaʿ must come next in the course path.",
      ],
    },
    {
      label: "Illumination control",
      title: "Commandment is lamp; law is light",
      lines: [
        "Proverbs 6:23 joins מצוה / mitsvâh, תורה / tôrâ, lamp, light, reproof, instruction, and way of life.",
        "The reading must preserve Torah as illumination for the path.",
        "Correction belongs to mercy before damage hardens.",
      ],
    },
    {
      label: "Speech control",
      title: "Torah reaches the mouth",
      lines: [
        "Proverbs 31:26 places the law of kindness in the tongue.",
        "The reading must account for Torah as ordered covenant mercy carried in speech.",
        "Mouth, lips, tongue, truth, false witness, and kindness belong inside the law-field.",
      ],
    },
    {
      label: "Greek witness control",
      title: "Greek law-language does not erase the Hebrew field",
      lines: [
        "H8451 / תורה / tôrâ remains visible beside G3551 / νόμος / nomos.",
        "H4687 / מצוה / mitsvâh presses toward G1785 / ἐντολή / entolē.",
        "H6213 / עשה / ʿāśâ presses toward G4160 / ποιέω / poieō as doing.",
        "The New Testament does not make the Proverbs law-field disappear.",
      ],
    },
    {
      label: "Control summary",
      title: "The Function Reading must carry the whole field",
      lines: [
        "law → hearing → instruction → correction → heart → mouth → path → justice → life",
        "If a reading cannot account for that movement, it is using only part of the data.",
      ],
    },
  ];

  return (
    <section className="course-word-packet__reading-controls-summary" aria-label="Reading controls for this Function Reading">
      {statements.map((statement) => (
        <article className="course-word-packet__method-statement" key={statement.title}>
          <p className="course-word-packet__field-label">{statement.label}</p>
          <h3>{statement.title}</h3>
          <ul>
            {statement.lines.map((line) => (
              <li key={`${statement.title}-${line}`}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}


function LessonReviewSummary() {
  const statements = [
    {
      label: "Lesson summary",
      title: "Torah begins the Proverbs law path",
      lines: [
        "H8451 / תורה / tôrâ / Torah is the opening law-instruction anchor for this course.",
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
        "If תורה / tôrâ is law-instruction, the next required movement is שמע / shāmaʿ.",
        "The course now moves from the instruction word to the response word.",
      ],
    },
  ];

  return (
    <section className="course-word-packet__review-summary" aria-label="Lesson review summary">
      <WordStudyCompleteCard />

      {statements.map((statement) => (
        <article className="course-word-packet__method-statement" key={statement.title}>
          <p className="course-word-packet__field-label">{statement.label}</p>
          <h3>{statement.title}</h3>
          <ul>
            {statement.lines.map((line) => (
              <li key={`${statement.title}-${line}`}>{line}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}



function WordStudyCompleteCard() {
  return (
    <article className="course-word-packet__complete-card">
      <p className="course-word-packet__field-label">Word study complete</p>
      <h3>H8451 · תורה / tôrâ / Torah</h3>
      <p className="course-word-packet__complete-subtitle">
        Law-Instruction anchor · Proverbs as Law Vocabulary
      </p>
    </article>
  );
}

