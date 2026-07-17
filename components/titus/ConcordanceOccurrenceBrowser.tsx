import Link from "next/link";
import type { ConcordanceOccurrence } from "@/lib/noel/concordance-word";
import styles from "./ConcordanceOccurrenceBrowser.module.css";

type Props = {
  strongId: string;
  occurrences: ConcordanceOccurrence[];
};

function referenceLabel(book: string, chapter: number, verse: number) {
  return `${book} ${chapter}:${verse}`;
}

function surfaceLabel(occurrence: ConcordanceOccurrence) {
  const first = occurrence.surfaceForms[0];
  return first?.kjvSurface ?? first?.bibleRender ?? first?.readableRender ?? first?.conceptualRender ?? "—";
}

function highlightSurface(verseText: string, surface: string) {
  if (!surface || surface === "—") return verseText;

  const normalizedSurface = surface.replace(/^[,.;:\s]+|[,.;:\s]+$/g, "").trim();
  if (!normalizedSurface) return verseText;

  const index = verseText.toLowerCase().indexOf(normalizedSurface.toLowerCase());
  if (index < 0) return verseText;

  return (
    <>
      {verseText.slice(0, index)}
      <mark>{verseText.slice(index, index + normalizedSurface.length)}</mark>
      {verseText.slice(index + normalizedSurface.length)}
    </>
  );
}

export function ConcordanceOccurrenceBrowser({ strongId, occurrences }: Props) {
  const grouped = occurrences.reduce<Record<string, ConcordanceOccurrence[]>>((acc, occurrence) => {
    (acc[occurrence.book] ??= []).push(occurrence);
    return acc;
  }, {});

  return (
    <div className={styles.browser}>
      <nav className={styles.jumpBar} aria-label="Jump to book">
        {Object.entries(grouped).map(([book, rows]) => (
          <a className={styles.jumpLink} href={`#occurrences-${book.toLowerCase()}`} key={book}>
            {book} · {rows.length}
          </a>
        ))}
      </nav>

      {Object.entries(grouped).map(([book, rows]) => (
        <section className={styles.bookGroup} id={`occurrences-${book.toLowerCase()}`} key={book}>
          <header className={styles.bookHeader}>
            <h3>{book}</h3>
            <span>{rows.length} visible occurrence{rows.length === 1 ? "" : "s"}</span>
          </header>

          <div className={styles.rows}>
            {rows.map((occurrence) => {
              const ref = referenceLabel(occurrence.book, occurrence.chapter, occurrence.verse);
              const surface = surfaceLabel(occurrence);
              const verse = occurrence.verseText ?? occurrence.bibleText ?? "Verse text unavailable.";

              return (
                <details className={styles.row} key={`${ref}-${occurrence.firstPosition ?? 0}`}>
                  <summary className={styles.summary}>
                    <span className={styles.reference}>{ref}</span>
                    <p className={styles.verse}>{highlightSurface(verse, surface)}</p>
                    <span className={styles.badges}>
                      <span className={styles.surfaceBadge}>{surface}</span>
                      {occurrence.placementMatches.map((match) => (
                        <span className={styles.placementBadge} key={`${match.courseSlug}-${match.lessonSlug}-${match.passageRef ?? ref}`}>
                          {match.courseTitle}
                        </span>
                      ))}
                    </span>
                  </summary>

                  <div className={styles.details}>
                    <div className={styles.detailCard}>
                      <span>Strong&apos;s ID</span>
                      <p>{strongId}</p>
                    </div>
                    <div className={styles.detailCard}>
                      <span>Token position</span>
                      <p>{occurrence.firstPosition ?? "—"}</p>
                    </div>
                    <div className={styles.detailCard}>
                      <span>Tokens in verse</span>
                      <p>{occurrence.tokenCount}</p>
                    </div>

                    {occurrence.placementMatches.length > 0 ? (
                      <div className={styles.placementLinks}>
                        {occurrence.placementMatches.map((match) => (
                          <Link href={`/courses/${match.courseSlug}/words/${strongId.toLowerCase()}`} key={`${match.courseSlug}-${match.lessonSlug}`}>
                            Open {match.courseTitle} placement →
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </details>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
