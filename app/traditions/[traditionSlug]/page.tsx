import Link from "next/link";
import { notFound } from "next/navigation";
import PublicNodeMetaCard from "@/components/titus/PublicNodeMetaCard";
import { getReturnHref, getReturnLabel } from "@/lib/titus/return-links";
import {
  getPlacementsForTradition,
  getTraditionCard,
  getTraditionPlacement,
} from "@/data/titus/tradition-notes";

export default async function TraditionCardPage({
  params,
  searchParams,
}: {
  params: Promise<{ traditionSlug: string }>;
  searchParams: Promise<{ from?: string; placement?: string }>;
}) {
  const { traditionSlug } = await params;
  const { from, placement: placementSlug } = await searchParams;
  const card = getTraditionCard(traditionSlug);
  const returnHref = getReturnHref(from, "/lessons/h0776");
  const returnLabel = getReturnLabel(from);

  if (!card) {
    notFound();
  }

  const activePlacement = placementSlug
    ? getTraditionPlacement(placementSlug)
    : undefined;

  const allPlacements = getPlacementsForTradition(card.slug);

  return (
    <main className="page-shell lesson-shell">
      <Link className="small-link" href={returnHref}>
        {returnLabel}
      </Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">Tradition Card</div>
        <h1>{card.title}</h1>
        <p className="lede">
          {card.subtitle}
          <br />
          Family: {card.traditionFamily}
          <br />
          Type: {card.cardKind.replaceAll("_", " ")} · Status: {card.status}
        </p>
      </section>

      <section className="card pattern-section">
        <h2>What this tradition is</h2>
        {card.summary.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      {activePlacement ? (
        <section className="card pattern-section placement-card">
          <div className="kicker">Current Lesson Placement</div>
          <h2>{activePlacement.placementTitle}</h2>
          <p>{activePlacement.placementSummary}</p>

          <h3>Why it belongs here</h3>
          <ul className="pattern-list">
            {activePlacement.whyItBelongsHere.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>What this keeps in view here</h3>
          <ul className="pattern-list">
            {activePlacement.whatThisKeepsInViewHere.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>What this may flatten here</h3>
          <ul className="pattern-list">
            {activePlacement.whatThisMayFlattenHere.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>What gets to stay here</h3>
          <ul className="pattern-list">
            {activePlacement.whatGetsToStayHere.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>What must still be accounted for here</h3>
          <ul className="pattern-list">
            {activePlacement.whatMustBeAccountedForHere.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="card pattern-section">
        <h2>Core concerns</h2>
        <ul className="pattern-list">
          {card.coreConcerns.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>Common reading habits</h2>
        <ul className="pattern-list">
          {card.commonReadingHabits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>Strengths to preserve</h2>
        <ul className="pattern-list">
          {card.strengthsToPreserve.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>Common flattening risks</h2>
        <ul className="pattern-list">
          {card.commonFlatteningRisks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card pattern-section">
        <h2>Where this card is currently attached</h2>
        <div className="related-links">
          {allPlacements.map((placement) => (
            <Link
              className="pill related-pill"
              href={`/traditions/${card.slug}?placement=${placement.slug}&from=/lessons/${placement.lessonSlug}`}
              key={placement.slug}
            >
              {placement.courseSlug} · {placement.lessonSlug}
            </Link>
          ))}
        </div>
      </section>

      <section className="card pattern-section">
        <h2>Source witness plan</h2>
        <ul className="pattern-list">
          {card.sourceWitnessPlan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <PublicNodeMetaCard meta={card.publicNodeMeta} />

      <nav className="footer-nav">
        <Link className="small-link" href={returnHref}>
          {returnLabel}
        </Link>
        <Link className="small-link" href="/">
          Course catalogue
        </Link>
      </nav>
    </main>
  );
}
