import Link from "next/link";
import { notFound } from "next/navigation";
import { getConcordanceWord } from "@/lib/noel/concordance-word";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ConcordancePageProps = {
  params: Promise<{ strongId: string }>;
};

function displayWord(word: Awaited<ReturnType<typeof getConcordanceWord>>) {
  if (!word) return "";
  const parts = [word.strongId, word.baselineLemma, word.baselineTransliteration].filter(Boolean);
  return parts.join(" · ");
}

export default async function ConcordanceWordPage({ params }: ConcordancePageProps) {
  const { strongId } = await params;
  const word = await getConcordanceWord(strongId);

  if (!word) {
    notFound();
  }

  const topBooks = word.bookCounts.slice(0, 12);

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
