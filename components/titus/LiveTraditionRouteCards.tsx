import Link from "next/link";
import { traditionCards } from "@/data/titus/tradition-notes";

type Placement = {
  cardSlug: string;
  title: string;
  summary: string;
  route: string[];
  interaction: string[];
};

const placementsByLesson: Record<string, Placement[]> = {
  h8451: [
    {
      cardSlug: "covenantal-biblical-theology",
      title: "Covenantal Biblical Theology beside H8451 / Torah",
      summary: "This route reads Torah as covenant instruction: command, promise, household formation, responsibility, and life with God remain in the same field.",
      route: ["Torah is received as instruction within covenant life.", "Proverbs carries covenant formation into daily conduct."],
      interaction: ["H8451 keeps law, instruction, heart, household, speech, and obedience together.", "The course then follows that instruction into hearing, commandment, heart, mouth, path, judgment, and life."],
    },
    {
      cardSlug: "dispensationalism",
      title: "Dispensationalism beside H8451 / Torah",
      summary: "This route reads Torah with Israel, law administration, historical promise, and concrete covenant setting still visible.",
      route: ["Torah is read with attention to Israel and historical administration.", "Proverbs is read without dissolving law-language into generic spirituality."],
      interaction: ["H8451 keeps the legal-instruction field concrete.", "The lesson then watches how hear-and-do pressure remains visible across later canon witnesses."],
    },
    {
      cardSlug: "new-creation-restoration",
      title: "New Creation Restoration beside H8451 / Torah",
      summary: "This route reads Torah as instruction ordered toward life, restoration, and final dwelling rather than as an isolated legal artifact.",
      route: ["Torah is read inside the canon movement toward restored dwelling and tree/gate access.", "Proverbs is read as formation before life/death outcomes arrive openly."],
      interaction: ["H8451 joins instruction, heart, mouth, path, and life.", "The lesson keeps Revelation commandment, tree, and gate pressure available for later course movement."],
    },
  ],
  h8085: [
    {
      cardSlug: "covenantal-biblical-theology",
      title: "Covenantal Biblical Theology beside H8085 / Hear-Obey",
      summary: "This route reads hearing as covenant response: the instruction of God is received into obedient life.",
      route: ["Hearing is read as covenant response to instruction.", "Proverbs tests whether instruction is received or refused."],
      interaction: ["H8085 is the first response gate after Torah.", "The lesson keeps Deuteronomy, Proverbs, Jesus, James, and Revelation in one hear-and-do field."],
    },
    {
      cardSlug: "dispensationalism",
      title: "Dispensationalism beside H8085 / Hear-Obey",
      summary: "This route reads hearing inside real law, kingdom, Israel, and restoration questions while keeping obedience language concrete.",
      route: ["Hearing is read with attention to the administration and audience of the command.", "Proverbs is read as instruction that demands response inside its historical setting."],
      interaction: ["H8085 keeps response-pressure visible before the course moves into commandment, heart, mouth, path, and judgment.", "Later Greek witness can be tested without erasing historical setting."],
    },
    {
      cardSlug: "new-creation-restoration",
      title: "New Creation Restoration beside H8085 / Hear-Obey",
      summary: "This route reads hearing as the doorway between instruction and life: the hearer is being formed for dwellability.",
      route: ["Hearing is read as response that moves toward life, stability, and final access.", "Proverbs is read as mercy before collapse: wisdom calls while the path can still be turned."],
      interaction: ["H8085 joins ear, wisdom, Torah, prayer, doing, house-stability, and gate access.", "Restoration remains connected to response rather than detached from instruction."],
    },
  ],
};

export function LiveTraditionRouteCards({ lessonSlug, courseSlug }: { lessonSlug: string; courseSlug: string }) {
  const placements = placementsByLesson[lessonSlug] ?? [];
  const currentLessonHref = `/lessons/${lessonSlug}?from=/courses/${courseSlug}`;

  return (
    <section className="course-word-packet__hermeneutical-summary" aria-label="Theological reading routes">
      <article className="course-word-packet__method-statement">
        <p className="course-word-packet__field-label">Theological reading routes</p>
        <h3>How this word sits inside established Christian frameworks</h3>
        <p>These are reusable tradition cards. This lesson shows how the current word can be received inside each framework, then lets the Function Reading keep tracing the canon pattern.</p>
      </article>

      <div className="pattern-card-grid" aria-label="Tradition card links">
        {placements.map((placement) => {
          const card = traditionCards.find((candidate) => candidate.slug === placement.cardSlug);
          if (!card) return null;

          return (
            <article className="pattern-card" key={`${lessonSlug}-${placement.cardSlug}`}>
              <span className="status">Tradition Card</span>
              <h3>{card.title}</h3>
              <p>{placement.summary}</p>
              <div className="course-word-packet__two-column-note">
                <div>
                  <h4>Reading route</h4>
                  <ul>{placement.route.map((line) => <li key={line}>{line}</li>)}</ul>
                </div>
                <div>
                  <h4>Word interaction</h4>
                  <ul>{placement.interaction.map((line) => <li key={line}>{line}</li>)}</ul>
                </div>
              </div>
              <Link className="small-link" href={`/traditions/${card.slug}?from=${encodeURIComponent(currentLessonHref)}`}>Open tradition card →</Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
