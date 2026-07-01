import Link from "next/link";
import { searchTitus } from "@/lib/titus/search";

function withReturnPath(href: string, returnPath: string) {
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}from=${encodeURIComponent(returnPath)}`;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || "";
  const results = searchTitus(query);
  const currentSearchHref = query
    ? `/search?q=${encodeURIComponent(query)}`
    : "/search";

  return (
    <main className="page-shell">
      <Link className="small-link" href="/">← Course catalogue</Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">Curated Titus Search</div>
        <h1>Search public study nodes.</h1>
        <p className="lede">
          Search returns Titus courses, published word lessons, Pattern Debriefs,
          and queued public nodes. It does not dump raw verse results.
        </p>

        <form className="search-form" action="/search">
          <label className="search-label" htmlFor="q">
            Search by Strong’s ID, original word, transliteration, English
            rendering, course, or pattern.
          </label>
          <div className="search-row">
            <input
              className="search-input"
              id="q"
              name="q"
              placeholder="Try H0776, erets, land, bloodguilt, rest, ecology"
              defaultValue={query}
            />
            <button className="button search-button" type="submit">
              Search
            </button>
          </div>
        </form>
      </section>

      <section style={{ marginTop: 28 }}>
        <div className="kicker">
          {query ? `Results for “${query}”` : "Search suggestions"}
        </div>

        {query && results.length === 0 ? (
          <article className="card" style={{ marginTop: 14 }}>
            <span className="status">No public node found</span>
            <h2 style={{ marginTop: 12 }}>Nothing matched yet</h2>
            <p>
              This does not mean the word or pattern is absent from Scripture.
              It means Titus does not yet have a public-safe node for this query.
            </p>
          </article>
        ) : null}

        {query ? (
          <div className="search-results">
            {results.map((result) =>
              result.href ? (
                <Link
                  className="search-result-card"
                  href={withReturnPath(result.href, currentSearchHref)}
                  key={`${result.type}-${result.title}`}
                >
                  <span className="status">{result.type}</span>
                  <h2>{result.title}</h2>
                  <p>{result.subtitle}</p>
                  <span className="small-link">Open node →</span>
                </Link>
              ) : (
                <article
                  className="search-result-card queued-result"
                  key={`${result.type}-${result.title}`}
                >
                  <span className="status">{result.type}</span>
                  <h2>{result.title}</h2>
                  <p>{result.subtitle}</p>
                  <span className="pill queued-pill">{result.status}</span>
                </article>
              )
            )}
          </div>
        ) : (
          <div className="search-results">
            {[
              "H0776",
              "erets",
              "land",
              "bloodguilt",
              "rest",
              "fruit",
              "kingdom",
            ].map((suggestion) => (
              <Link
                className="pill related-pill"
                href={`/search?q=${encodeURIComponent(suggestion)}`}
                key={suggestion}
              >
                {suggestion}
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
