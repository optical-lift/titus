import Link from "next/link";
import { notFound } from "next/navigation";
import { getSourcePacket } from "@/data/titus/source-packets";
import { getSourcePacketUsage } from "@/lib/titus/source-packet-usage";

export default async function SourcePacketPage({
  params,
}: {
  params: Promise<{ sourceSlug: string }>;
}) {
  const { sourceSlug } = await params;
  const packet = getSourcePacket(sourceSlug);

  if (!packet) {
    notFound();
  }

  const usage = getSourcePacketUsage(packet);
  const currentSourceHref = `/sources/${packet.slug}`;

  return (
    <main className="page-shell">
      <Link className="small-link" href="/registry">
        ← Node Registry
      </Link>

      <section className="hero" style={{ marginTop: 18 }}>
        <div className="kicker">Titus Source Packet</div>
        <h1>{packet.title}</h1>
        <p className="lede">
          {packet.summary}
          <br />
          Status: {packet.status} · Kind: {packet.packetKind.replaceAll("_", " ")}
        </p>
      </section>

      <section className="card source-packet-detail-card">
        <h2>Registry Details</h2>
        <p>
          Owner: {packet.owner}
          <br />
          Last updated: {packet.lastUpdated}
          <br />
          Packet slug: {packet.slug}
        </p>
      </section>

      <section className="registry-section">
        <div className="kicker">Public Nodes Using This Packet</div>

        {usage.length === 0 ? (
          <article className="registry-health-card problem">
            <h2>No public nodes currently use this packet</h2>
            <p>
              This is allowed as a warning state, but every public-facing source
              packet should eventually be attached to a public node or retired.
            </p>
          </article>
        ) : (
          <div className="registry-grid">
            {usage.map((node) => (
              <Link
                className="registry-card placement-registry-card"
                href={`${node.href}?from=${encodeURIComponent(currentSourceHref)}`}
                key={`${node.nodeType}-${node.slug}`}
              >
                <span className="status">
                  {node.nodeType} · {node.status}
                </span>
                <h2>{node.title}</h2>
                <p>
                  Slug: {node.slug}
                  <br />
                  Source packet: {packet.title}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <nav className="footer-nav">
        <Link className="small-link" href="/registry">
          ← Node Registry
        </Link>
        <Link className="small-link" href="/">
          Course catalogue
        </Link>
      </nav>
    </main>
  );
}
