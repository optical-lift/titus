import Link from "next/link";
import { notFound } from "next/navigation";
import { getConcordanceWord } from "@/lib/noel/concordance-word";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ConcordancePageProps = {
  params: Promise<{ strongId: string }>;
};

type ConcordanceWord = Awaited<ReturnType<typeof getConcordanceWord>>;

function displayWord(word: ConcordanceWord) {
  if (!word) return "";
  const parts = [word.strongId, word.baselineLemma, word.baselineTransliteration].filter(Boolean);
  return parts.join(" · ");
}

function referenceLabel(book: string, chapter: number, verse: number) {
  return `${book} ${chapter}:${verse}`;
}

function compact(value?: string | null, max = 180) {
  if (!value) return "—";
  const collapsed = value.replace(/\s+/g, " ").trim();
  return collapsed.length > max ? `${collapsed.slice(0, max - 1)}…` : collapsed;
}

function surfaceLabel(surfaceForms: NonNullable<ConcordanceWord>["occurrences"][number]["surfaceForms"]) {
  const first = surfaceForms[0];
  return first?.kjvSurface ?? first?.bibleRender ?? first?.readableRender ?? first?.conceptualRender ?? "—";
}

export default async function ConcordanceWordPage({ params }: ConcordancePageProps) {
  const { strongId } = await params;
  const word = await getConcordanceWord(strongId);

  if (!word) {
    notFound();
  }

  const topBooks = word.bookCounts.slice(0, 12);
  const topRenderings = word.renderings.slice(0, 20);
  const visibleOccurrences = word.occurrences.slice(0, 80);

  return (
    <main className="course-landing course-sales-page">
      <section className="course-landing__hero course-sales-page__hero" aria-labelledby="concordance-title">
        <p className="course-landing__eyebrow">Titus Concordance</p>
        <h1 id="concordance-title">{displayWord(word)}</h1>
        <p className="course-landing__subtitle">{word.baselineGloss ?? "Shared Strong's ID word study"}</p>
        <p className="course-landing__description">
          This concordance page gathers the shared word identity, whole-canon occurrence spread, Greek witness, lexical lineage, and every live Titus course placement using this Strong&apos;s ID.
        </p>

        <div className="course-sales-page__stats" aria-label="Concordance facts">
          <span>{word.occurrenceCount} canon occurrences</span>
          <span>{word.bookCounts.length} books</span>
          <span>{word.placements.length} live placements</span>
          <span>{word.mirrors.length} Greek mirrors</span>
        </div>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="shared-identity">
        <p className="course-landing__eyebrow" id="shared-identity">Shared word identity</p>
        <h2>One word, multiple course placements.</h2>
        <div className="course-sales-page__included-grid">
          <article className="course-sales-page__included-card">
            <h3>Strong&apos;s ID</h3>
            <p>{word.strongId}</p>
          </article>
          <article className="course-sales-page__included-card">
            <h3>Original word</h3>
            <p>{word.baselineLemma ?? "—"} / {word.baselineTransliteration ?? "—"}</p>
          </article>
          <article className="course-sales-page__included-card">
            <h3>Baseline source</h3>
            <p>{word.baselineSource ?? "Noel baseline pending"}</p>
          </article>
          <article className="course-sales-page__included-card">
            <h3>Definition field</h3>
            <p>{word.baselineDefinitionText ?? word.kjvUsage ?? "Definition text pending."}</p>
          </article>
        </div>
      </section>

      {word.mirrors.length > 0 ? (
        <section className="course-landing__section course-sales-page__section" aria-labelledby="greek-witness">
          <p className="course-landing__eyebrow" id="greek-witness">Greek witness</p>
          <h2>Mirror pressure stays visible.</h2>
          <div className="course-sales-page__lesson-grid">
            {word.mirrors.map((mirror) => (
              <article className="course-sales-page__lesson-card" key={mirror.greekId}>
                <span>Greek mirror</span>
                <h3>{mirror.greekId} · {mirror.lemma ?? "Greek term"}</h3>
                <p>{mirror.transliteration ?? "—"} · weight {mirror.weight ?? "—"}</p>
                {mirror.baselineGloss ? <p>{mirror.baselineGloss}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {word.lineage.length > 0 ? (
        <section className="course-landing__section course-sales-page__section" aria-labelledby="lineage">
          <p className="course-landing__eyebrow" id="lineage">Lexical lineage</p>
          <h2>Related word-family pressure.</h2>
          <div className="course-sales-page__lesson-grid">
            {word.lineage.map((item) => (
              <article className="course-sales-page__lesson-card" key={`${item.directionKind}-${item.relatedObjectId}`}>
                <span>{item.relationBucket ?? item.directionKind ?? "lineage"}</span>
                <h3>{item.relatedObjectId}</h3>
                <p>{item.relatedTransliteration ?? item.relatedLemma ?? "Lineage term"}</p>
                {item.relatedBaselineGloss ? <p>{item.relatedBaselineGloss}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="course-landing__section course-sales-page__section" aria-labelledby="canon-spread">
        <p className="course-landing__eyebrow" id="canon-spread">Whole-canon spread</p>
        <h2>This word has to be read across the canon.</h2>
        <div className="course-sales-page__lesson-grid">
          {topBooks.map((book) => (
            <article className="course-sales-page__lesson-card" key={book.book}>
              <span>{book.book}</span>
              <h3>{book.occurrences} occurrence{book.occurrences === 1 ? "" : "s"}</h3>
              <p>Book-field pressure for {word.strongId}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="rendering-pressure">
        <p className="course-landing__eyebrow" id="rendering-pressure">Rendering pressure</p>
        <h2>How this word appears on the English surface.</h2>
        <p className="course-landing__description">
          This panel carries the Lex rendering workflow into Titus: Bible/KJV surface, readable render, conceptual render, and course rendering stay visible beside the same Strong&apos;s ID.
        </p>

        {topRenderings.length > 0 ? (
          <div className="course-sales-page__lesson-grid">
            {topRenderings.map((rendering) => (
              <article className="course-sales-page__lesson-card" key={`${rendering.rendering}-${rendering.tokenCount}`}>
                <span>{rendering.tokenCount} token{rendering.tokenCount === 1 ? "" : "s"} · {rendering.verseCount} verse{rendering.verseCount === 1 ? "" : "s"}</span>
                <h3>{rendering.rendering}</h3>
                {rendering.examples.length > 0 ? (
                  <p>
                    Examples: {rendering.examples.slice(0, 3).map((example) => referenceLabel(example.book, example.chapter, example.verse)).join(" · ")}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <article className="course-sales-page__included-card">
            <h3>No rendering rows surfaced yet</h3>
            <p>The rendering panel will fill when Lex token rendering rows exist for this Strong&apos;s ID.</p>
          </article>
        )}

        <div className="course-sales-page__included-grid" aria-label="Titus course renderings">
          {word.placements.map((placement) => (
            <article className="course-sales-page__included-card" key={`render-${placement.courseSlug}-${placement.lessonSlug}`}>
              <h3>{placement.courseTitle}</h3>
              <p>{placement.primaryField}</p>
              <p>{compact(placement.functionReading, 220)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="occurrence-table">
        <p className="course-landing__eyebrow" id="occurrence-table">Occurrence table</p>
        <h2>Canon-order occurrence rows.</h2>
        <p className="course-landing__description">
          Showing {visibleOccurrences.length} of {word.occurrenceCount} known occurrence rows. Rows surface the verse, the token rendering, and any live Titus course placement that has claimed that passage.
        </p>

        <div className="course-sales-page__lesson-grid">
          {visibleOccurrences.map((occurrence) => {
            const ref = referenceLabel(occurrence.book, occurrence.chapter, occurrence.verse);
            const matches = occurrence.placementMatches;

            return (
              <article className="course-sales-page__lesson-card" key={`${ref}-${occurrence.firstPosition ?? 0}`}>
                <span>{ref} · position {occurrence.firstPosition ?? "—"}</span>
                <h3>{surfaceLabel(occurrence.surfaceForms)}</h3>
                <p>{compact(occurrence.verseText ?? occurrence.bibleText, 240)}</p>
                <p>{occurrence.tokenCount} token{occurrence.tokenCount === 1 ? "" : "s"} in this verse</p>
                {matches.length > 0 ? (
                  <div>
                    {matches.map((match) => (
                      <p key={`${ref}-${match.courseSlug}-${match.passageRef ?? match.lessonSlug}`}>
                        <Link href={`/courses/${match.courseSlug}/words/${word.strongId.toLowerCase()}`}>
                          {match.courseTitle} · {match.passageRef ?? match.title}
                        </Link>
                      </p>
                    ))}
                  </div>
                ) : (
                  <p>No live Titus placement has selected this verse yet.</p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="course-placements">
        <p className="course-landing__eyebrow" id="course-placements">Live Titus placements</p>
        <h2>Where this word has been studied.</h2>
        <div className="course-sales-page__lesson-grid">
          {word.placements.map((placement) => (
            <Link
              className="course-sales-page__lesson-card"
              href={`/courses/${placement.courseSlug}/words/${word.strongId.toLowerCase()}`}
              key={`${placement.courseSlug}-${placement.lessonSlug}`}
            >
              <span>{placement.courseTitle} · Lesson {placement.lessonNumber}</span>
              <h3>{placement.title}</h3>
              <p>{placement.publicSummary}</p>
              <p>{placement.canonPassageCount} passages · {placement.relationshipCount} relationships · {placement.status}/{placement.confidence}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
