import Link from "next/link";
import type { PublicNodeMeta } from "@/data/titus/public-node-meta";
import { getSourcePacketByTitle } from "@/data/titus/source-packets";

export default function PublicNodeMetaCard({ meta }: { meta: PublicNodeMeta }) {
  const sourcePacket = getSourcePacketByTitle(meta.sourcePacket);

  return (
    <section className="public-node-meta-card">
      <div>
        <div className="kicker">Source · Review · Version</div>
        <h2>Public Node Metadata</h2>
      </div>

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
          <p>{meta.status}</p>
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
          {sourcePacket ? (
            <p>
              <Link className="small-link" href={`/sources/${sourcePacket.slug}`}>
                {sourcePacket.title}
              </Link>
            </p>
          ) : (
            <p>{meta.sourcePacket}</p>
          )}
        </div>
      </div>

      <details className="meta-details">
        <summary>Known limits and source list</summary>

        <div className="meta-detail-grid">
          <div>
            <h3>Known limits</h3>
            <ul>
              {meta.knownLimits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Source list</h3>
            <ul>
              {meta.sourceList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </section>
  );
}
