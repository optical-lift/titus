import Link from "next/link";
import { getConcordanceLibrary } from "@/lib/noel/concordance-library";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ConcordanceIndexPageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

function shortDefinition(value?: string | null) {
  if (!value) return "Shared word identity from Noel baseline data.";
  const collapsed = value.replace(/\s+/g, " ").trim();
  return collapsed.length > 220 ? `${collapsed.slice(0, 219)}…` : collapsed;
}

function displayTitle(word: Awaited<ReturnType<typeof getConcordanceLibrary>>[number]) {
  return [word.strongId, word.baselineLemma, word.baselineTransliteration].filter(Boolean).join(" · ");
}

export default async function ConcordanceIndexPage({ searchParams }: ConcordanceIndexPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const query = resolvedSearchParams.q ?? "";
  const words = await getConcordanceLibrary(query);
  const totalPlacements = words.reduce((sum, word) => sum + word.placementCount, 0);
  const totalOccurrences = words.reduce((sum, word) => sum + word.occurrenceCount, 0);

  return (
    <main className="course-landing course-sales-page">
      <section className="course-landing__hero course-sales-page__hero" aria-labelledby="concordance-library-title">
        <p className="course-landing__eyebrow">Titus Concordance</p>
        <h1 id="concordance-library-title">Strong&apos;s ID word library.</h1>
        <p className="course-landing__subtitle">Every finished word page gathers canon-wide spread, shared identity, Greek witness, lineage, and live Titus course placements.</p>
        <p className="course-landing__description">
          This is the library shelf for Titus word objects. The registry can keep the broader system map; the concordance names the Strong&apos;s IDs that are alive as reusable canon word studies.
        </p>

        <div className="course-sales-page__stats" aria-label="Concordance library facts">
          <span>{words.length} word pages</span>
          <span>{totalPlacements} live placements</span>
          <span>{totalOccurrences} canon occurrences represented</span>
          <span>Live Noel shelf</span>
        </div>

        <form className="course-sales-page__hero-actions" action="/concordance">
          <input
            aria-label="Search Strong's IDs, lemmas, transliterations, and glosses"
            className="course-word-packet__search-input"
            name="q"
            placeholder="Search H8451, Torah, law, tôwrâh…"
            type="search"
            defaultValue={query}
          />
          <button className="course-landing__button" type="submit">
            Search concordance
          </button>
          {query ? (
            <Link className="course-sales-page__secondary-link" href="/concordance">
              Clear
            </Link>
          ) : null}
        </form>
      </section>

      <section className="course-landing__section course-sales-page__section" aria-labelledby="concordance-words">
        <p className="course-landing__eyebrow" id="concordance-words">Word shelf</p>
        <h2>{query ? `Search results for “${query}”` : "Finished Strong’s ID pages"}</h2>

        {words.length === 0 ? (
          <article className="course-sales-page__included-card">
            <h3>No concordance word found</h3>
            <p>Try a Strong&apos;s ID, Hebrew/Greek lemma, transliteration, or English gloss already present in a live Titus word placement.</p>
          </article>
        ) : (
          <div className="course-sales-page__lesson-grid">
            {words.map((word) => {
              const firstPlacement = word.placements[0];

              return (
                <Link className="course-sales-page__lesson-card" href={`/concordance/${word.strongId.toLowerCase()}`} key={word.strongId}>
                  <span>{word.placementCount} placement{word.placementCount === 1 ? "" : "s"} · {word.bookCount} books</span>
                  <h3>{displayTitle(word)}</h3>
                  <p>{shortDefinition(word.baselineGloss ?? word.baselineDefinitionText ?? word.kjvUsage)}</p>
                  {firstPlacement ? (
                    <p>
                      First live placement: {firstPlacement.courseTitle} · {firstPlacement.title}
                    </p>
                  ) : null}
                  <p>
                    {word.occurrenceCount} canon occurrences · {word.mirrorCount} mirror{word.mirrorCount === 1 ? "" : "s"} · {word.lineageCount} lineage link{word.lineageCount === 1 ? "" : "s"}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
