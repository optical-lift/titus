import type { PublicNodeMeta } from "@/data/titus/public-node-meta";

export default function PublicNodeMetaCard({ meta }: { meta: PublicNodeMeta }) {
  return (
    <section className="meta-card" aria-label="Source review and version metadata">
      <div className="kicker">Source · Review · Version</div>

      <div className="meta-grid">
        <div>
          <span className="meta-label">Compiler</span>
          <p>{meta.compiler}</p>
        </div>
        <div>
          <span className="meta-label">Reviewer</span>
          <p>{meta.reviewer}</p>
        </div>
        <div>
          <span className="meta-label">Status</span>
          <p>{meta.status.replaceAll("_", " ")}</p>
        </div>
        <div>
          <span className="meta-label">Version</span>
          <p>
            {meta.version} · {meta.lastUpdated}
          </p>
        </div>
        <div>
          <span className="meta-label">Confidence</span>
          <p>{meta.confidence}</p>
        </div>
        <div>
          <span className="meta-label">Source Packet</span>
          <p>{meta.sourcePacket}</p>
        </div>
      </div>

      <details className="meta-details">
        <summary>Known limits</summary>
        <ul>
          {meta.knownLimits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </details>

      <details className="meta-details">
        <summary>Source list</summary>
        <ul>
          {meta.sourceList.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </details>
    </section>
  );
}
